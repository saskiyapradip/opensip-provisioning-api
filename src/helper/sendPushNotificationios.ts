import apn from "apn";
import fs from "fs";
const key_file = process.env.APN_AUTH_KEY ? Buffer.from(process.env.APN_AUTH_KEY.replace(/\\n/g, "\n")) : fs.readFileSync(__dirname + "/AuthKey.p8");
const appprovider: any = new apn.Provider({
	token:{
		keyId: process.env.APN_KEY_ID || "",
		teamId: process.env.APN_TEAM_ID || "",
		key:key_file
	},
	production:true
});
const debugappprovider: any = new apn.Provider({
        token:{
                keyId: process.env.APN_KEY_ID || "",
                teamId: process.env.APN_TEAM_ID || "",
                key:key_file
        },
        production:false
});
const sendPushNotificationios = async (title: any, body: any, myTokens: any, mydata: any) => {
	try {
	let registrationTokens = [...new Set(myTokens)];

	let notification = new apn.Notification();
    notification.topic = "com.example.app.voip"; 
	notification.expiry = 10;
	notification.badge = 0;
	notification.sound = "default";
	notification.alert = "Incoming Call";
	notification.priority = 10;
	notification.payload = mydata;
	if(mydata.caller_number == "3001" || mydata.caller_number == "7007" || mydata.caller_number == "7474") {
	let apiresponse:any = await debugappprovider.send(notification,registrationTokens)
        .then((response:any) => {
            return response;
        });
	return apiresponse;
	} else {
	let apiresponse:any = await appprovider.send(notification,registrationTokens)
	.then((response:any) => {
		return response;
	});
	return apiresponse;
	}
} catch (error: any) {
      console.error("[sendPushNotificationios.ts] error:", error);
    }
}

export default sendPushNotificationios;






