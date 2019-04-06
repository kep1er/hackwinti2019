import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ChatComponent} from './components/chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {HttpClientModule} from "@angular/common/http";
import {ChatBotComponent} from './components/chat-bot/chat-bot.component';
import {BotService} from "./services/bot/bot.service";
import {WebcamModule} from 'ngx-webcam';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, MatProgressBarModule,
} from '@angular/material';
import {ChatImageSelectionComponent} from './components/chat-image-selection/chat-image-selection.component';
import {ChatImageComponent} from './components/chat-image/chat-image.component';
import {ChatImageUploadComponent} from './components/chat-image-upload/chat-image-upload.component';
import {DropZoneDirective} from './directive/drop-zone/drop-zone.directive';
import {FileSizePipe} from './pipes/file-size/file-size.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        HomeComponent,
        ChatBotComponent,
        ChatImageSelectionComponent,
        ChatImageComponent,
        ChatImageUploadComponent,
        DropZoneDirective,
        FileSizePipe
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        WebcamModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
    ],
    providers: [
        BotService,
        AngularFirestore
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
