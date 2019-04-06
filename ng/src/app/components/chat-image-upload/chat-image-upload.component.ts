import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {from} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {log} from 'util';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-chat-image-upload',
    templateUrl: './chat-image-upload.component.html',
    styleUrls: ['./chat-image-upload.component.scss']
})
export class ChatImageUploadComponent implements OnInit {

    // Main task
    task: AngularFireUploadTask;

    // Progress monitoring
    percentage: Observable<number>;

    snapshot: Observable<any>;

    // Download URL
    downloadURL: Observable<string>;

    // State for dropzone CSS toggling
    isHovering: boolean;

    currentSnap: any;
    chatId: string;

    @Output() fileUploadedEvent = new EventEmitter();

    constructor(
        private storage: AngularFireStorage,
        private db: AngularFirestore,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.chatId = this.route.snapshot.paramMap.get('id');
    }


    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(event: FileList) {
        // The File object
        const file = event.item(0);

        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            return;
        }

        // The storage path
        const path = `test/${new Date().getTime()}_${file.name}`;

        // Totally optional metadata
        const customMetadata = {app: 'My AngularFire-powered PWA!'};

        // The main task
        this.task = this.storage.upload(path, file, {customMetadata});
        const fileRef = this.storage.ref(path);

        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            // The file's download URL
            finalize(() => {
                this.downloadURL = this.storage.ref(path).getDownloadURL();
                this.downloadURL.subscribe((url) => {
                    if (this.currentSnap.bytesTransferred === this.currentSnap.totalBytes) {
                        // Update firestore on completion
                        this.db.collection('photos')
                            .add({path, size: this.currentSnap.totalBytes, downloadUrl: url, chatId: this.chatId})
                            .then(res => this.fileUploadedEvent.emit(url));
                    }
                });
            }),
            tap(snap => {
                this.currentSnap = snap;
            })
        );
        this.snapshot.subscribe();
    }


    // Determines if the upload task is active
    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }


}
