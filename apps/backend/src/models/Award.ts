import {connectiondb} from "../database/firebase";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

interface AwardData {
    imageUrl: string;
    points: number;
    title: string;
}

class Award
{

    static async find() {
        const snapshot = await connectiondb.collection("reward").get();

        return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
            uid: doc.id
        }));
    }

    async findById(uid: string) {
        const doc = await connectiondb.collection("reward")
            .doc(uid)
            .get();
        return doc.data();
    }


    async create(data: Omit<AwardData, 'createdAt'>) {
        try {
            const docRef = await connectiondb.collection("reward").add({
                imageUrl: data.imageUrl,
                points: data.points,
                title: data.title   
            });

            return docRef;
        } catch (error) {
            console.error('Error creating authority:', error);
            throw error;
        }
    }


    async update(uid: string, data: Partial<AwardData>) {
        try {
            const docRef = connectiondb.collection("reward").doc(uid);
            await docRef.update({
                imageUrl: data.imageUrl,
                points: data.points,
                title: data.title
            });

            return docRef;
        } catch (error) {
            console.error('Error updating award:', error);
            throw error;
        }
    }

    async delete(uid: string) {
        try {
            const docRef = connectiondb.collection("reward").doc(uid);
            await docRef.delete();
            return { message: `Award with uid ${uid} successfully deleted.` };
        } catch (error) {
            console.error('Error deleting award:', error);
            throw error;
        }
    }
    
}
export default Award;