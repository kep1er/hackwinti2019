import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";
import {AuthService} from "../../services/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userChats$;
  constructor(public auth: AuthService, public cs: ChatService, public router: Router) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
  }
}
