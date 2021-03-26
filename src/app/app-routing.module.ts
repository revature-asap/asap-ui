import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import { ProfileComponent } from './components/user-profile/profile/profile.component'
import { WatchListComponent } from './components/user-profile/watch-list/watch-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, children: [
    {path: 'watchlist', component: WatchListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
