import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {ChatService} from "./services/chat/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackwinti2019';
  constructor(public auth: AuthService, public cs: ChatService) {}
}
