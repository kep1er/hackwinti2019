import {Component, DoCheck, KeyValueDiffer, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ChatService} from "../../services/chat/chat.service";
import {AuthService} from "../../services/auth/auth.service";
import {BotService} from "../../services/bot/bot.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {async} from "rxjs/internal/scheduler/async";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    chat$: Observable<any>;
    newMsg: string;
    botActive: false;

    constructor(
        public cs: ChatService,
        private route: ActivatedRoute,
        public auth: AuthService,
        public bot: BotService,
        public afs: AngularFirestore
    ) {
    }

    ngOnInit() {
        const chatId = this.route.snapshot.paramMap.get('id');
        const source: any = this.cs.get(chatId);
        source.subscribe(res => this.botActive = res.botActive);
        this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
        this.scrollBottom();
    }

    fileUploaded(chatId, $event){
        this.cs.sendMessage(chatId, 'IMAGE', $event);
        if (this.botActive) {
            this.bot.converse('IMAGE', chatId);
        }
    }

    submit(chatId) {
        if (!this.newMsg) {
            return alert('you need to enter something');
        }
        this.cs.sendMessage(chatId, this.newMsg);
        if (this.botActive) {
            this.bot.converse(this.newMsg, chatId);
        }
        this.newMsg = '';
        this.scrollBottom();
    }

    trackByCreated(i, msg) {
        return msg.createdAt;
    }

    private scrollBottom() {
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
    }
}
