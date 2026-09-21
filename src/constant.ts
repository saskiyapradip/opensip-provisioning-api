export const MESSAGE = {
  user_type: {
    super_admin: 1,
    sub_admin: 2,
    enterprise_admin: 3,
    enterprise_subscriber: 4
  },
  MESSAGE_TYPES:{
    REGULAR: 0,
    REPLY: 1,
    FORWARD: 2,
    SCHEDULE: 3,
  },
  MESSAGE_DELIVERY_STATUS: {
    NOTHING: 0,
    SENDED: 1,
    DELIVERED: 2,
    READED: 3,
    FAILED: 4,
  },
  MESSAGE_MEDIA_TYPES: {
    TEXT: 0,
    IMAGE: 1,
    VIDEO: 2,
    AUDIO: 3,
    DOCUMENTS: 4,
    CONTACT: 5,
    LOCATION: 6,
    INFO: 7,
  },
  message_disappear_type:{
    "24Hours":0,
    "7Days":1,
    "90Days":2,
    "default":3,
    "off":4
  },
  notification_mute_type:{
    "8hours":1,
    "1week":2,
    "always":3,
    "unmute":4
  },
};

export const PROVISIONLOG = {
  ACTVITY_TYPE:{
    SUCCESSFULLY_MOBILE_LOGIN:1,
    FAILED_MOBILE_LOGIN:2,
    SUCCESSFULLY_LOGOUT:3,
    FAILED_LOGOUT:4,
    SUCCESSFULLY_FQDN_LOGIN:5,
    FAILED_FQDN_LOGIN:5,
    SUCCESSFULLY_FQDN_LOGOUT:6,
    FAILED_FQDN_LOGOUT:6,
    SUCCESSFULLY_LOGIN:7
  }
}