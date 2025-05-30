import {connectiondb} from "../database/firebase";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import * as admin from 'firebase-admin';

interface NotificationData
{
    IdUser: string,
    body: string,
    createdAt: Date, 
    title: string
}

class Notification
{
    private title: string;
    private message: string;
    private token: string;
    constructor(title?:string,message?:string,token?:string)
    {
        this.title = title || "";
        this.message = message || "";
        this.token = token || "";
    }
    async create(notification: NotificationData) {
        try {
            const docRef = await connectiondb.collection("notifications").add(notification);
            
            return docRef;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }

    async getFCMToken() {
        const snapshot = await connectiondb.collection("fcm").get();
        return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data()
        }));
    }

    async sendPush()
    {
        try {
            const data = {
                notification: {
                    title: this.title,
                    body: this.message,
                },
                token: this.token
            };

            const response = await admin.messaging().send(data);
          
            return response;
               
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }
    
    async find() {
        const snapshot = await connectiondb.collection("notifications").get();
        return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
            uid: doc.id
        }));
    }

    async findById(uid: string) {
        const snapshot = await connectiondb.collection("notifications")
            .doc(uid)
            .get();
        return snapshot.exists ? { ...snapshot.data(), uid: snapshot.id } : null;
    }

}
 
export default Notification;