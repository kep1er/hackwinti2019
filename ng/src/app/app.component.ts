import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {ChatService} from "./services/chat/chat.service";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackwinti2019';
  constructor(public auth: AuthService, public cs: ChatService, public location: Location, public router: Router) {}
}
