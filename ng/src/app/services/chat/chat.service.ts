import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {firestore} from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {Observable, combineLatest, of} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {BotService} from "../bot/bot.service";
import {computeStyle} from "@angular/animations/browser/src/util";
import {log} from 'util';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(
        private afs: AngularFirestore,
        private auth: AuthService,
        private router: Router,
        private bot: BotService,
    ) {
    }

    get(chatId) {
        return this.afs
            .collection<any>('chats')
            .doc(chatId)
            .snapshotChanges()
            .pipe(
                map(doc => {
                    return {id: doc.payload.id, ...doc.payload.data()};
                })
            );
    }

    getUserChats() {
        return this.auth.user$.pipe(
            switchMap(user => {
                return this.afs
                    .collection('chats')
                    .snapshotChanges()
                    .pipe(
                        map(actions => {
                            return actions.map(a => {
                                let newChat = false;
                                // @ts-ignore
                                if (a.payload.doc.data().messages.find(a => a.uid === user.uid)) {
                                    newChat = true;
                                }
                                // @ts-ignore
                                let messages = a.payload.doc.data().messages;
                                let lastMsg = '';
                                if (messages.length) {
                                    lastMsg = messages.splice(-1)[0].content;
                                }
                                const data: Object = a.payload.doc.data();
                                const id = a.payload.doc.id;
                                return {id, ...data, newChat, lastMsg};
                            });
                        })
                    );
            })
        );
    }

    async create() {
        const {uid} = await this.auth.getUser();
        const data = {
            uid,
            createdAt: Date.now(),
            count: 0,
            botActive: true,
            messages: []
        };
        const docRef = await this.afs.collection('chats').add(data);
        this.bot.converse('START',docRef.id);
        return this.router.navigate(['chats', docRef.id]);
    }

    async sendMessage(chatId, content, imageUrl?) {
        if(!imageUrl){
            imageUrl = null;
        }
        const {uid} = await this.auth.getUser();

        const data = {
            uid,
            content,
            createdAt: Date.now() - 500,
            imageUrl: imageUrl
        };

        if (uid) {
            const ref = this.afs.collection('chats').doc(chatId);
            return ref.update({
                messages: firestore.FieldValue.arrayUnion(data)
            });
        }
    }

    async deleteMessage(chat, msg) {
        const {uid} = await this.auth.getUser();

        const ref = this.afs.collection('chats').doc(chat.id);
        if (chat.uid === uid || msg.uid === uid) {
            // Allowed to delete
            delete msg.user;
            return ref.update({
                messages: firestore.FieldValue.arrayRemove(msg)
            });
        }
    }

    joinUsers(chat$: Observable<any>) {
        let chat;
        const joinKeys = {};

        return chat$.pipe(
            switchMap(c => {
                // Unique User IDs
                chat = c;
                const uids = Array.from(new Set(c.messages.map(v => v.uid)));

                // Firestore User Doc Reads
                const userDocs = uids.map(u =>
                    this.afs.doc(`users/${u}`).valueChanges()
                );

                return userDocs.length ? combineLatest(userDocs) : of([]);
            }),
            map(arr => {
                arr.forEach(v => (joinKeys[(<any>v).uid] = v));
                const dateNow = new Date();
                const midnight = new Date(dateNow.getTime());

                chat.messages = chat.messages.map(v => {
                    const date = new Date(v.createdAt);
                    const hours = this.zeroed(date.getHours());
                    const minutes = this.zeroed(date.getMinutes());
                    const mDate = this.zeroed(date.getDate());
                    const month = this.zeroed(date.getMonth() + 1);

                    let time = `${hours}:${minutes}`;
                    if (midnight.getTime() < date.getTime()) {
                        time = `${mDate}.${month}.${date.getFullYear()} ` + time;
                    }
                    return {...v, user: joinKeys[v.uid], _time: time};
                }).sort((a, b) => {
                    return a.createdAt - b.createdAt;
                });

                return chat;
            })
        );
    }

    zeroed(str: any) {
        return `0${str}`.slice(-2);
    }
}
