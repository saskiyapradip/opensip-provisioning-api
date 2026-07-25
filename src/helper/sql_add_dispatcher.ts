import * as mysql from 'mysql2/promise';
import { config } from '../config';

const config_mysql: any = {
  host: config.sql_config.msql_host,
  user: config.sql_config.msql_user,
  password: config.sql_config.mysql_password,
  database: config.sql_config.mysql_database,
  port: config.sql_config.mysql_port,
  connectTimeout: 10000
};

const add_dispatcher = async (setid: number, destination: string) => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);

    const sql = `
      INSERT INTO dispatcher (
        setid,
        destination,
        state,
        weight,
        priority,
        attrs,
        description,
        probe_mode
      )
      SELECT ?, ?, 0, 1, 0, '', '', 0
      WHERE NOT EXISTS (
        SELECT 1 FROM dispatcher 
        WHERE setid = ? AND destination = ?
      )
    `;

    const [rows]: any = await connection.execute(sql, [
      setid,
      destination,
      setid,
      destination
    ]);

    return rows;
  } catch (error: any) {
      console.error("[sql_add_dispatcher.ts] error:", error);
    }
};

export default add_dispatcher;