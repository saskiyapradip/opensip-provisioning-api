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

const add_pbx_server_details = async (data: any) => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);
    console.log(connection,"connection log")
    const sql = `
      INSERT INTO pbx_server_details (
        enterprice_name,
        domain_name,
        primary_server_ip,
        primary_server_port,
        secondary_server_ip,
        secondary_server_port,
        is_enabled,
        realm_primary,
        realm_secondary,
        last_modified
      )
      SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM pbx_server_details 
        WHERE domain_name = ?
      )
    `;

    const values = [
      data.enterprice_name,
      data.domain_name,
      data.primary_server_ip || null,
      data.primary_server_port || null,
      data.secondary_server_ip || null,
      data.secondary_server_port || null,
      data.is_enabled,
      data.realm_primary || null,
      data.realm_secondary || null,
      data.domain_name // for duplicate check
    ];

    const [rows]: any = await connection.execute(sql, values);
    console.log([rows],"[rows] log")
    return rows;
  } catch (error: any) {
    console.log(error,"error")
  } 
};

export default add_pbx_server_details;