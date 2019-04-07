import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-chat-image-selection',
    templateUrl: './chat-image-selection.component.html',
    styleUrls: ['./chat-image-selection.component.scss']
})
export class ChatImageSelectionComponent implements OnInit {

    constructor(
        private afs: AngularFirestore,
        private route: ActivatedRoute,
    ) {
    }

    images = [];

    ngOnInit() {
        const chatId = this.route.snapshot.paramMap.get('id');
        this.afs.collection('photos').get().subscribe(
            res => {
                this.images = res.docs.map(doc => doc.data());
                this.images = this.images
                    .filter((img) => {
                        console.log(chatId, img.chatId, img.chatId !== chatId)
                        return img.chatId !== chatId;
                    })
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4);
            }
        );
    }

}
