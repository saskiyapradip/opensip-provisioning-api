import * as mysql from 'mysql2/promise';
import crypto from "crypto";
import { config } from '../config';

const config_mysql: any = {
  host: config.sql_config.msql_host,
  user: config.sql_config.msql_user,
  password: config.sql_config.mysql_password,
  database: config.sql_config.mysql_database,
  port: config.sql_config.mysql_port,
  connectTimeout: 10000
};

const upsertSubscriberAndRegistrant = async (
  post: any,
  ipaddress: string,
  port: string
) => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);

    await connection.beginTransaction();

    // 🔹 Create HA1 (MD5)
    const md5_string = crypto
      .createHash('md5')
      .update(`${post.endpointNumber}:${post.sipDomain}:${post.password}`)
      .digest('hex');

    const username = post.endpointNumber;
    const domain = post.sipDomain;

    // =========================
    // ✅ SUBSCRIBER LOGIC
    // =========================
    const [subRows]: any = await connection.execute(
      `SELECT id FROM subscriber WHERE username = ? AND domain = ? FOR UPDATE`,
      [username, domain]
    );

    if (subRows.length > 0) {
      // UPDATE
      await connection.execute(
        `UPDATE subscriber 
         SET password = ?, ha1 = ?
         WHERE username = ? AND domain = ?`,
        [post.password, md5_string, username, domain]
      );
    } else {
      // INSERT
      await connection.execute(
        `INSERT INTO subscriber (username, domain, password, ha1)
         VALUES (?, ?, ?, ?)`,
        [username, domain, post.password, md5_string]
      );
    }

    // =========================
    // ✅ REGISTRANT LOGIC
    // =========================
    const aor = `sip:${username}@${ipaddress}`;
    const registrar = `sip:${ipaddress}:${port}`;
    const binding_URI = `sip:${username}@${config.MYSQL_CONSTANT.registrant_binding_uri}`;

    const [regRows]: any = await connection.execute(
      `SELECT id FROM registrant WHERE aor = ? FOR UPDATE`,
      [aor]
    );

    if (regRows.length > 0) {
      // UPDATE
      await connection.execute(
        `UPDATE registrant 
         SET password = ?, registrar = ?, binding_URI = ?
         WHERE aor = ?`,
        [post.password, registrar, binding_URI, aor]
      );
    } else {
      // INSERT
      await connection.execute(
        `INSERT INTO registrant (registrar, aor, username, password, binding_URI)
         VALUES (?, ?, ?, ?, ?)`,
        [registrar, aor, username, post.password, binding_URI]
      );
    }

    await connection.commit();

    return {
      success: 1,
      message: "Subscriber & Registrant processed"
    };

  } catch (error: any) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

export default upsertSubscriberAndRegistrant;