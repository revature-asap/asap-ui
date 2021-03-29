import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import { ProfileComponent } from './components/user-profile/profile/profile.component'
import { WatchListComponent } from './components/user-profile/watch-list/watch-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileResolverService } from './services/profile-resolver.service';


const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'profile', resolve: {profile: ProfileResolverService}, component: ProfileComponent, canActivate: [AuthGuardService],  children: [
    {path: 'watchlist', component: WatchListComponent}
  ]
},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
