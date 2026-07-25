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

const delete_pbx_server_details = async (data: any) => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);
    console.log(connection,"connection log")
    const sql = `
      DELETE FROM pbx_server_details
      WHERE
      domain_name = ?
    `;

    const values = [
      data.domain_name
    ];

    const [rows]: any = await connection.execute(sql, values);
    console.log([rows],"[rows] log")
    return rows;
  } catch (error: any) {
    console.log(error,"error")
  } 
};

export default delete_pbx_server_details;