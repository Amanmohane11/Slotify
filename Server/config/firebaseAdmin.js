import admin from "firebase-admin";

if(!admin.apps.length){
    if(process.env.FIREBASE_SERVICE_ACCOUNT_JSON){
        admin.initializeApp({
            credentials: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)),
        });
    }else{
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
    }
}

export default admin;