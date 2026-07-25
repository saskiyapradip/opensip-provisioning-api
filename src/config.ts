import dotenv from "dotenv";
dotenv.config();

const MONGOURI = process.env.MONGOURI || "";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";
const PORT = process.env.PORT
const SECRET_KEY = process.env.JWT_SECRATE_KEY || "";
const ENVIRONMENT = process.env.ENVIRONMENT || "";
const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET
const API_URL = process.env.API_URL
const DEFAULT_DOMAIN = process.env.DEFAULT_DOMAIN
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const ADMIN_API_ACCESS_USERNAME = process.env.ADMIN_API_ACCESS_USERNAME
const ADMIN_API_ACCESS_PASSWORD = process.env.ADMIN_API_ACCESS_PASSWORD
const SEND_SMS_TOKEN = process.env.SEND_SMS_TOKEN
const PASSWORD_RESET_LINK = process.env.PASSWORD_RESET_LINK
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const REGISTRANT_REGISTRAR = process.env.REGISTRANT_REGISTRAR
const REGISTRANT_BINDING_URI = process.env.REGISTRANT_BINDING_URI
const MYSQL_PORT = process.env.MYSQL_PORT
const SECONDARY_API_URL = process.env.SECONDARY_API_URL
const SECONDARY_API_CALL_TIME: any = process.env.SECONDARY_API_CALL_TIME
const REGISTRANT_REGISTRAR_SECONDARY = process.env.REGISTRANT_REGISTRAR_SECONDARY
const REGISTRANT_BINDING_URI_SECONDARY = process.env.REGISTRANT_BINDING_URI_SECONDARY
const FILE_URL = process.env.FILE_URL

export const config = {
    mongo: {
        uri: MONGOURI
    },
    server: {
        port: PORT
    },
    db: {
        dbname: MONGO_DB_NAME
    },
    key: {
        secret_key: SECRET_KEY
    },
    enviroment: {
        enviroment_type: ENVIRONMENT
    },
    service: {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID || "",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
    private_key: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
    client_id: process.env.FIREBASE_CLIENT_ID || "",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL || "",
    universe_domain: "googleapis.com"
  },
    token: {
        token_expire: TOKEN_EXPIRE
    },
    pbxcore_api: {
        login: `:9092/pbxcoresm/api/getAuthToken`,
        create_enterprise: `:9092/pbxcoresm/rest/enterprise/createEnterprise`,
        edit_enterprise: `:9092/pbxcoresm/rest/enterprise/updateEnterprise?domainName=`,
        delete_enterprise: `:9092/pbxcoresm/rest/enterprise/deleteEnterprise?domainName=`,
        create_subscriber: `:9092/pbxcoresm/rest/subscriber/createSubscriber`,
        edit_subscriber: `:9092/pbxcoresm/rest/subscriber/updateSubscriber`,
        delete_subscriber: `:9092/pbxcoresm/rest/subscriber/deleteSubscriber`,
        get_feturepkages_list: `:9092/pbxcoresm/rest/packages/getPackages`,
        incomming_did: `:9092/pbxcoresm/rest/did/getDid`,
        createUser: `${API_URL}/pbxcoresm/rest/subscriber/createSubscriber`,
        get_susbsriber_feture_detail: `:9092/pbxcoresm/rest/feature/getFeatures`,
        get_susbsriber_feture_detail_byfetreid: `:9092/pbxcoresm/rest/feature/featureDetail`,
        update_susbsriber_feture_detail_byfetreid: `:9092/pbxcoresm/rest/feature/updateFeature`,
        getLicence: `:9092/pbxcoresm/rest/license/getLicense`,
        secondary_login: `${SECONDARY_API_URL}/pbxcoresm/api/getAuthToken`,
        secondary_create_enterprise: `${SECONDARY_API_URL}/pbxcoresm/rest/enterprise/createEnterprise`,
        secondary_edit_enterprise: `${SECONDARY_API_URL}/pbxcoresm/rest/enterprise/updateEnterprise?domainName=`,
        secondary_delete_enterprise: `${SECONDARY_API_URL}/pbxcoresm/rest/enterprise/deleteEnterprise?domainName=`,
        secondary_create_subscriber: `${SECONDARY_API_URL}/pbxcoresm/rest/subscriber/createSubscriber`,
        secondary_edit_subscriber: `${SECONDARY_API_URL}/pbxcoresm/rest/subscriber/updateSubscriber`,
        secondary_delete_subscriber: `${SECONDARY_API_URL}/pbxcoresm/rest/subscriber/deleteSubscriber`,
        secondary_get_feturepkages_list: `${SECONDARY_API_URL}/pbxcoresm/rest/packages/getPackages`,
        secondary_incomming_did: `${SECONDARY_API_URL}/pbxcoresm/rest/did/getDid`,
        secondary_createUser: `${SECONDARY_API_URL}/pbxcoresm/rest/subscriber/createSubscriber`,
        secondary_get_susbsriber_feture_detail: `${SECONDARY_API_URL}/pbxcoresm/rest/feature/getFeatures`,
        secondary_get_susbsriber_feture_detail_byfetreid: `${SECONDARY_API_URL}/pbxcoresm/rest/feature/featureDetail`,
        secondary_update_susbsriber_feture_detail_byfetreid: `${SECONDARY_API_URL}/pbxcoresm/rest/feature/updateFeature`,
        secondary_getLicence: `${SECONDARY_API_URL}/pbxcoresm/rest/license/getLicense`,
        SECONDARY_API_CALL_TIME: SECONDARY_API_CALL_TIME,
        default_Ip: "203.0.113.20",
        default_domain: "example.com",
        https: "https://"
    },
    pbxcore_configs: {
        DEFAULT_DOMAIN: DEFAULT_DOMAIN,
        USERNAME: USERNAME,
        PASSWORD: PASSWORD,
        PASSWORD_RESET_LINK: PASSWORD_RESET_LINK
    },
    admin_api_accec_config: {
        ADMIN_API_ACCESS_USERNAME: ADMIN_API_ACCESS_USERNAME,
        ADMIN_API_ACCESS_PASSWORD: ADMIN_API_ACCESS_PASSWORD
    },
    livekit: {
        livekit_api_key: LIVEKIT_API_KEY,
        livekit_api_secret: LIVEKIT_API_SECRET
    },
    sms_config: {
        SEND_SMS_TOKEN: SEND_SMS_TOKEN
    },
    sql_config: {
        msql_host: MYSQL_HOST,
        msql_user: MYSQL_USER,
        mysql_password: MYSQL_PASSWORD,
        mysql_database: MYSQL_DATABASE,
        mysql_port: MYSQL_PORT
    },
    MYSQL_CONSTANT: {
        registrant_registrar: REGISTRANT_REGISTRAR,
        registrant_binding_uri: REGISTRANT_BINDING_URI,
        registrant_registrar_secondary: REGISTRANT_REGISTRAR_SECONDARY,
        registrant_binding_uri_secondary: REGISTRANT_BINDING_URI_SECONDARY
    },
    DEFAULT_IMG_USER: {
        default_img_url: `${FILE_URL}uploads/image/IMG_20240909_125655_811.jpg`
    }

}