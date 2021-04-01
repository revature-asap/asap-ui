import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import { HomeComponent } from './components/pages/home/home.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import { ProfileComponent } from './components/user-profile/profile/profile.component'
import { WatchListComponent } from './components/user-profile/watch-list/watch-list.component';
import { ProfileResolverService } from './services/profile-resolver.service';
import {NewsComponent} from "./components/news/news.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'newsArticles', component: NewsComponent},
  {path: 'profile', resolve: {profile: ProfileResolverService}, component: ProfileComponent//,  children: [
    //{path: 'watchlist', component: WatchListComponent}
  //]
},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
