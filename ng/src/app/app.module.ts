import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ChatComponent} from './components/chat/chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {HttpClientModule} from "@angular/common/http";
import {ChatBotComponent} from './components/chat-bot/chat-bot.component';
import {BotService} from "./services/bot/bot.service";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        HomeComponent,
        ChatBotComponent
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
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
    ],
    providers: [
        BotService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
