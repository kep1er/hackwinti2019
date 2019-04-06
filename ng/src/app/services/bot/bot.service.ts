import {Injectable} from '@angular/core';
import {ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient'
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";

// Message class for displaying messages in the component
export class Message {
    constructor(public content: string, public sentBy: string) {
    }
}

@Injectable()
export class BotService {

    readonly token = environment.dialogflow.hackwinti2019bot;
    readonly client = new ApiAiClient({
        accessToken: this.token,
    });

    conversation = new BehaviorSubject<Message[]>([]);

    constructor() {
    }

    // Sends and receives messages via DialogFlow
    converse(msg: string, chatId?: string) {
        const userMessage = new Message(msg, 'user');
        this.update(userMessage);

        if (chatId) {
            this.client.setSessionId(chatId)
        }

        // return this.client.eventRequest('gugus_test', {sessionId: 'hallovelo'})
        return this.client.textRequest(msg)
            .then(res => {
                const speech = res.result.fulfillment.speech;
                const botMessage = new Message(speech, 'bot');
                this.update(botMessage);
            });
    }


    // Adds message to source
    update(msg: Message) {
        this.conversation.next([msg]);
    }

}
