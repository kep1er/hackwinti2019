import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import {firestore} from "firebase/app";
const path = require('path')

admin.initializeApp();

const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export const archiveChat = functions.firestore
    .document("chats/{chatId}")
    .onUpdate(change => {
        let data: any;
        data = change.after.data();

        const maxLen = 50;
        const msgLen = data.messages.length;
        const charLen = JSON.stringify(data).length;

        const batch = db.batch();

        if (charLen >= 10000 || msgLen >= maxLen) {
            data.messages.splice(0, msgLen - maxLen);
            console.log(data.messages.length);
            const ref = db.collection("chats").doc(change.after.id);

            batch.set(ref, data, {merge: true});

            return batch.commit();
        } else {
            return null;
        }
    });

const {WebhookClient} = require("dialogflow-fulfillment");

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    const sessionId = path.basename(agent.session);

    console.log(`Intent: ${agent.intent}`);

    function createMessage(agent: any){

        const data = {
            uid: 'jqFFtNxiXIdOdBDtB129',
            content: agent.request_.body.queryResult.fulfillmentText,
            createdAt: Date.now() + 500
        };
        const ref = db.collection('chats').doc(sessionId);
        return ref.update({
            messages: admin.firestore.FieldValue.arrayUnion(data)
        });
    }

    function writeToDb(agent: any) {
        // Get parameter from Dialogflow with the string to add to the database
        const databaseEntry = agent.parameters.databaseEntry;

        // Get the database collection 'dialogflow' and document 'agent' and store
        // the document  {entry: "<value of database entry>"} in the 'agent' document
        const dialogflowAgentRef = db.collection('dialogflow').doc('agent');
        return db.runTransaction(t => {
            t.set(dialogflowAgentRef, {entry: databaseEntry});
            return Promise.resolve('Write complete');
        }).then(doc => {
            console.log(doc);
            agent.add(`Wrote "${databaseEntry}" to the Firestore database.`);
        }).catch(err => {
            console.log(`Error writing to Firestore: ${err}`);
            agent.add(`Failed to write "${databaseEntry}" to the Firestore database.`);
        });
    }

    function readFromDb(agent: any) {
        // Get the database collection 'dialogflow' and document 'agent'
        const dialogflowAgentDoc = db.collection('dialogflow').doc('agent');

        // Get the value of 'entry' in the document and send it to the user
        return dialogflowAgentDoc.get()
            .then(doc => {
                if (!doc.exists) {
                    agent.add('No data found in the database!');
                } else {
                    agent.add(doc.data()!.entry);
                }
                return Promise.resolve('Read complete');
            }).catch(() => {
                agent.add('Error reading entry from the Firestore database.');
                agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
            });
    }

    // Map from Dialogflow intent names to functions to be run when the intent is matched
    let intentMap = new Map();
    intentMap.set('ReadFromFirestore', readFromDb);
    intentMap.set('WriteToFirestore', writeToDb);
    intentMap.set(agent.intent, createMessage);
    agent.handleRequest(intentMap);
});
