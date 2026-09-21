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
const add_registrant_detail_update = async (post:any,oldExtantion:any,ipaddress:any,port:any,secondary_ip:any,secondary_port:any)=>{
    try {
        console.log("into sql function")
        const connection = await mysql.createConnection(config_mysql);
        console.log(connection,"connection done")
        let create_md5_string:any = `${post.endpointNumber}:${post.sipDomain}:${post.password}`;
        let md5_string = crypto.createHash('md5').update(create_md5_string).digest('hex');
        let insert_obj:any = {
          endpointNumber:post.endpointNumber,
          sipDomain:post.sipDomain,
          password:post.password,
          md5_string:md5_string
        }
        let update_subscriber = "UPDATE subscriber SET password =?, ha1 =?,username=?,domain=?  WHERE username =? AND domain =?"
        const [update_subscriber_row, fields_user_update_subscriber_row] = await connection.execute(update_subscriber,[insert_obj.password,insert_obj.md5_string,insert_obj.endpointNumber,insert_obj.sipDomain,oldExtantion,insert_obj.sipDomain]);
        console.log(update_subscriber_row, fields_user_update_subscriber_row,"update_subscriber_row, fields_user_update_subscriber_row")
        let update_subscriber_secondary = "UPDATE subscriber_secondary SET password =?, ha1 =?,username=?,domain=?  WHERE username =? AND domain =?"
        const [update_subscriber_secondary_row, fields_user_update_subscriber_secondary] = await connection.execute(update_subscriber_secondary,[insert_obj.password,insert_obj.md5_string,insert_obj.endpointNumber,insert_obj.sipDomain,oldExtantion,insert_obj.sipDomain]);
         
         let add_registart_Obj:any = {
          aor:`sip:${post.endpointNumber}@${post.sipDomain}`,
          username:post.endpointNumber,
          password:post.password,
          registrar:`sip:${ipaddress}:${port}`,
          binding_URI:`sip:${post.endpointNumber}@${config.MYSQL_CONSTANT.registrant_binding_uri}`
         }

         let old_aor:any = `sip:${oldExtantion}@${post.sipDomain}`

        let update_registrant = "UPDATE registrant SET registrar=?,username=?,password=?,binding_URI=?,aor=? WHERE aor=?"
        const [update_registrant_row, fields_update_registrant] = await connection.execute(update_registrant,[add_registart_Obj.registrar,add_registart_Obj.username,add_registart_Obj.password,add_registart_Obj.binding_URI,add_registart_Obj.aor,old_aor]);
        
        if(secondary_ip != ""){
          let add_registart_Obj_secondary:any = {
            aor:`sip:${post.endpointNumber}@${post.sipDomain}`,
            username:post.endpointNumber,
            password:post.password,
            registrar:`sip:${secondary_ip}:${secondary_port}`,
            binding_URI:`sip:${post.endpointNumber}@${config.MYSQL_CONSTANT.registrant_binding_uri_secondary}`
          }
  
          let update_registrant_secondary = "UPDATE registrant_secondary SET registrar=?,username=?,password=?,binding_URI=?,aor=? WHERE aor=?"
          const [update_registrant_row_secondary, fields_update_registrant_secondary] = await connection.execute(update_registrant_secondary,[add_registart_Obj_secondary.registrar,add_registart_Obj_secondary.username,add_registart_Obj_secondary.password,add_registart_Obj_secondary.binding_URI,add_registart_Obj_secondary.aor,old_aor]);
        }
        await connection.end(); 
        return;
      } catch (error:any) {
      }
}  

export default add_registrant_detail_update;