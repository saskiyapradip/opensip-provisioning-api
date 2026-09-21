import * as mysql from 'mysql2/promise';
import crypto from "crypto";
import { config } from '../config';
const config_mysql:any = {
    host:config.sql_config.msql_host,
    user:config.sql_config.msql_user,
    password:config.sql_config.mysql_password,
    database:config.sql_config.mysql_database,
    port: config.sql_config.mysql_port,
    connectTimeout: 10000 
  };
const add_registrant_detail = async (post:any,oldExtantion:any,ipaddress:any,port:any,secondary_ip:any,secondary_port:any)=>{
    try {
        const connection = await mysql.createConnection(config_mysql);
        let create_md5_string:any = `${post.endpointNumber}:${post.sipDomain}:${post.password}`;
        let md5_string = crypto.createHash('md5').update(create_md5_string).digest('hex');
        let insert_obj:any = {
          endpointNumber:post.endpointNumber,
          sipDomain:ipaddress,
          password:post.password,
          md5_string:md5_string
        }
        
        var sql_user = `INSERT INTO subscriber (username, domain, password, ha1)
        SELECT ?, ?, ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM subscriber WHERE username = ? AND domain = ?
        )`;
        const [rows_user, fields_user] = await connection.execute(sql_user,[insert_obj.endpointNumber,insert_obj.sipDomain,insert_obj.password,insert_obj.md5_string,insert_obj.endpointNumber,insert_obj.sipDomain]);


        // var sql_user_secondary = `INSERT INTO subscriber_secondary (username, domain, password, ha1)
        // SELECT ?, ?, ?, ?
        // WHERE NOT EXISTS (
        //     SELECT 1 FROM subscriber_secondary WHERE username = ? AND domain = ?
        // )`;
        // const [rows_user_secondary, fields_user_secondary] = await connection.execute(sql_user_secondary,[insert_obj.endpointNumber,insert_obj.sipDomain,insert_obj.password,insert_obj.md5_string,insert_obj.endpointNumber,insert_obj.sipDomain]);
        
        let add_registart_Obj:any = {
          aor:`sip:${post.endpointNumber}@${ipaddress}`,
          username:post.endpointNumber,
          password:post.password,
          registrar:`sip:${ipaddress}:${port}`,
          binding_URI:`sip:${post.endpointNumber}@${config.MYSQL_CONSTANT.registrant_binding_uri}`
        }
        var sql_registrant = `INSERT INTO registrant (registrar,aor,username,password,binding_URI)
        SELECT ?, ?, ?, ?, ?
        WHERE NOT EXISTS (
            SELECT 1 FROM registrant WHERE aor= ?
        )`;
        const [rows, fields] = await connection.execute(sql_registrant,[add_registart_Obj.registrar,add_registart_Obj.aor,add_registart_Obj.username,add_registart_Obj.password,add_registart_Obj.binding_URI,add_registart_Obj.aor]);

        if(secondary_ip != ""){

          let add_registart_Obj_secondary:any = {
            aor:`sip:${post.endpointNumber}@${post.sipDomain}`,
            username:post.endpointNumber,
            password:post.password,
            registrar:`sip:${secondary_ip}:${secondary_port}`,
            binding_URI:`sip:${post.endpointNumber}@${config.MYSQL_CONSTANT.registrant_binding_uri_secondary}`
          }

          // var sql_secondary = `INSERT INTO registrant_secondary (registrar,aor,username,password,binding_URI)
          // SELECT ?, ?, ?, ?, ?
          // WHERE NOT EXISTS (
          //     SELECT 1 FROM registrant_secondary WHERE aor = ?
          // )`;
          // const [rows_secondary, fields_secondary] = await connection.execute(sql_secondary,[add_registart_Obj_secondary.registrar,add_registart_Obj_secondary.aor,add_registart_Obj_secondary.username,add_registart_Obj_secondary.password,add_registart_Obj_secondary.binding_URI,add_registart_Obj_secondary.aor]);
        }

        await connection.end(); 
        return;
      } catch (error:any) {
      }
}  

export default add_registrant_detail;