import * as mysql from 'mysql2/promise';
import { config } from '../config';
const config_mysql:any = {
    host:config.sql_config.msql_host,
    user:config.sql_config.msql_user,
    password:config.sql_config.mysql_password,
    database:config.sql_config.mysql_database,
    port: config.sql_config.mysql_port,
    connectTimeout: 10000 
  };
const remove_register_user_detail = async (post:any)=>{
    try {
        const connection = await mysql.createConnection(config_mysql);
       
         let endpointNumber:any  = post.endpointNumber;
         let password:any = post.password;
         let domain:any = post.sipDomain;
         let aor:any = `sip:${post.endpointNumber}@${post.sipDomain}`;
        
        var sql_user = `DELETE FROM subscriber
        WHERE username = ? AND password = ? AND domain= ?`;
        const [rows_user, fields_user] = await connection.execute(sql_user,[endpointNumber,password,domain]);

        var sql_user_secondary = `DELETE FROM subscriber_secondary
        WHERE username = ? AND password = ? AND domain= ?`;
        const [rows_user_secondary, fields_user_secondary] = await connection.execute(sql_user_secondary,[endpointNumber,password,domain]);
        
        var sql = `DELETE FROM registrant
        WHERE username = ? AND password = ? AND aor = ?`;
        const [rows, fields] = await connection.execute(sql,[endpointNumber,password,aor]);

        var sql_secondary = `DELETE FROM registrant_secondary
        WHERE username = ? AND password = ? AND aor = ?`;
        const [rows_secondary, fields_secondary] = await connection.execute(sql_secondary,[endpointNumber,password,aor]);

        await connection.end(); 
        return;
      } catch (error:any) {
      }
}  

export default remove_register_user_detail;