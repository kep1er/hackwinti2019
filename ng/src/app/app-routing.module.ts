import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
