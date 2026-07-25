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
const edit_enterprise_detail = async (post: any,oldDetail:any) => {
  try {
    const connection = await mysql.createConnection(config_mysql);
    let enterprice_name: any = post.enterprise_name
    let domain_name: any = post.sipDomain
    let primary_server_ip: any = post.ipAddress
    let primary_server_port: any = post.Port
    let secondary_server_ip: any = post.SecondoryipAddress !== "" ? post.SecondoryipAddress : null;
    let secondary_server_port: any = post.SecondoryPort !== "" ? post.SecondoryPort : null;
    let is_enabled: any = post.status == "A" ? 'true' : 'false';
    let last_modified: any = new Date()
    let realm_primary: any = null;
    if (post.realm_primary && post.realm_primary !== undefined || post.realm_primary !== "") {
      realm_primary = post.realm_primary
    }
    let realm_secondary: any = null;
    if (post.realm_secondary && post.realm_secondary !== undefined || post.realm_secondary !== "") {
      realm_secondary = post.realm_secondary
    }
    let is_local_rtp:any = post.is_local_rtp; 

    var sql_edit_enterprise = `UPDATE pbx_server_details SET enterprice_name=?,primary_server_ip=?,primary_server_port=?,secondary_server_ip=?,secondary_server_port=?,is_enabled=?,last_modified=?,realm_primary=?,realm_secondary=?,is_local_rtp=?
        WHERE domain_name = ?`;
    const [rows_enterprise, fields_enterprise] = await connection.execute(sql_edit_enterprise, [enterprice_name, primary_server_ip, primary_server_port, secondary_server_ip, secondary_server_port, is_enabled, last_modified, realm_primary, realm_secondary,is_local_rtp, domain_name]);

    let setid = 1
    let destination = `sip:${realm_primary}:${post.Port}`
    let state = 1
    let weight = 1
    let priority= 1
    let old_destination = `sip:${oldDetail.realm_primary}:${oldDetail.Port}`
    var sql_edit_dispatcher = `UPDATE dispatcher SET setid=?,destination=?,state=?,weight=?,priority=?
    WHERE destination = ?`;
    const [rows_dispatcher, fields_dispatcher] = await connection.execute(sql_edit_dispatcher, [setid, destination, state, weight, priority,old_destination]);

    await connection.end();
    return;
  } catch (error: any) {
  }
}

export default edit_enterprise_detail;