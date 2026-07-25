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
const delete_enterprise_detail = async (post: any) => {
    try {
        const connection = await mysql.createConnection(config_mysql);
        let domain_name: any = post.sipDomain
        var sql_delete_enterprise = `DELETE FROM pbx_server_details WHERE domain_name = ?`;
        const [rows_enterprise, fields_enterprise] = await connection.execute(sql_delete_enterprise, [domain_name]);

        let destination = `sip:${post.realm_primary}:${post.Port}`

        var sql_delete_dispatcher = `DELETE FROM dispatcher WHERE destination = ?`;
    const [rows_dispatcher, fields_dispatcher] = await connection.execute(sql_delete_dispatcher, [destination]);
        await connection.end();
        return;
    } catch (error: any) {
      console.error("[sql_enterprise_delete.ts] error:", error);
    }
}

export default delete_enterprise_detail;