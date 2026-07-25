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
const add_enterprise_detail = async (post: any) => {
  try {
    const connection = await mysql.createConnection(config_mysql);
    let enterprice_name: any = post.enterprise_name
    let domain_name: any = post.sipDomain
    let primary_server_ip: any = post.ipAddress
    let primary_server_port: any = post.Port
    let secondary_server_ip: any = post.SecondoryipAddress != undefined ? post.SecondoryipAddress : null;
    let secondary_server_port: any = post.SecondoryPort != undefined ? post.SecondoryPort : null;
    let is_enabled: any = post.status == "A" ? 'true' : 'false';
    let last_modified: any = new Date()
    let realm_primary: any = post.realm_primary != undefined ? post.realm_primary : null;
    let realm_secondary: any = post.realm_secondary != undefined ? post.realm_secondary : null;
    let is_local_rtp:any = post.is_local_rtp; 

    var sql_add_enterprise = `INSERT INTO pbx_server_details (enterprice_name,domain_name,primary_server_ip,primary_server_port,secondary_server_ip,secondary_server_port,is_enabled,last_modified,realm_primary,realm_secondary,is_local_rtp)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    const [rows_enterprise, fields_enterprise] = await connection.execute(sql_add_enterprise, [enterprice_name, domain_name, primary_server_ip, primary_server_port, secondary_server_ip, secondary_server_port, is_enabled, last_modified, realm_primary, realm_secondary,is_local_rtp]);

    let setid = 1
    let destination = `sip:${realm_primary}:${post.Port}`
    let state = 1
    let weight = 1
    let priority= 1
    var sql_add_dispatcher = `INSERT INTO dispatcher (setid,destination,state,weight,priority)
        VALUES (?,?,?,?,?)`;
    const [rows_dispatcher, fields_dispatcher] = await connection.execute(sql_add_dispatcher, [setid, destination, state, weight, priority]);
    await connection.end();
    return;
  } catch (error: any) {
      console.error("[sql_enterprise_add.ts] error:", error);
    }
}

export default add_enterprise_detail;