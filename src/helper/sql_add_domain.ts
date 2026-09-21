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

const add_domain = async (domainName: string, attrs: string = "") => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);

    const sql = `
      INSERT INTO domain (domain, attrs, last_modified)
      SELECT ?, ?, NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM domain WHERE domain = ?
      )
    `;

    const [rows]: any = await connection.execute(sql, [
      domainName,
      attrs,
      domainName
    ]);

    return rows; 
  } catch (error: any) {
    console.log(error)
  }
};

export default add_domain;