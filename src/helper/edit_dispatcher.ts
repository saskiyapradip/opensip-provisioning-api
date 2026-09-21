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

const edit_dispatcher = async (destination: string,oldDestination:string) => {
  let connection;

  try {
    connection = await mysql.createConnection(config_mysql);
console.log("destination",destination)
console.log("oldDestination",oldDestination)
    const sql = `
       UPDATE dispatcher
        SET
        destination = ?
        WHERE destination = ?;
    `;

    const [rows]: any = await connection.execute(sql, [
      destination,
      oldDestination
    ]);

    return rows;
  } catch (error: any) {
  }
};

export default edit_dispatcher;