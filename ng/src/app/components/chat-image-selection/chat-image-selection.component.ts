import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-chat-image-selection',
    templateUrl: './chat-image-selection.component.html',
    styleUrls: ['./chat-image-selection.component.scss']
})
export class ChatImageSelectionComponent implements OnInit {

    constructor(
        private afs: AngularFirestore,
    ) {
    }

    images = [];

    ngOnInit() {
        this.afs.collection('photos').get().subscribe(
            res => {
                this.images = res.docs.map(doc => doc.data());
                this.images.sort(() => Math.random() - 0.5);
                this.images = this.images.slice(0, 9);
                console.log(this.images);
            }
        );
    }

}
