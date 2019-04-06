import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BotService, Message} from "../../services/bot/bot.service";
import {scan} from "rxjs/internal/operators/scan";


@Component({
    selector: 'app-chat-bot',
    templateUrl: './chat-bot.component.html',
    styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

    messages: Observable<Message[]>;
    formValue: string;

    constructor(public chat: BotService) {
    }

    ngOnInit() {
        // appends to array after each new message is added to feedSource
        this.messages = this.chat.conversation.asObservable().pipe(
            scan((acc, val) => acc.concat(val))
        )
    }

    sendMessage() {
        this.chat.converse(this.formValue);
        this.formValue = '';
    }

}
