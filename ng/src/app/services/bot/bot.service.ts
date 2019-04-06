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
    readonly client = new ApiAiClient({accessToken: this.token});

    conversation = new BehaviorSubject<Message[]>([]);

    constructor() {
    }

    // Sends and receives messages via DialogFlow
    converse(msg: string) {
        const userMessage = new Message(msg, 'user');
        this.update(userMessage);

        return this.client.textRequest(msg, {sessionId: 'VYFatwYW2AG8379JgyzF'})
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
