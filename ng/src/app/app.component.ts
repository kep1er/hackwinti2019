import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {ChatService} from "./services/chat/chat.service";
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MessagingService} from "./services/messaging/messaging.service";
import {filter, take} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'hackwinti2019';

    constructor(
        public auth: AuthService,
        public cs: ChatService,
        public location: Location,
        public router: Router,
        public msg: MessagingService
    ) {
    }

    ngOnInit() {
        this.auth.user$.pipe(
            filter(user => !!user), // filter null
            take(1), // take first real user
        ).subscribe(user => {
            if (user) {
                this.msg.getPermission(user);
                this.msg.monitorRefresh(user);
                this.msg.receiveMessages()
            }
        })
    }
}
