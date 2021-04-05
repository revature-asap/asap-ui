import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import { HomeComponent } from './components/pages/home/home.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import { ProfileComponent } from './components/user-profile/profile/profile.component'
import { WatchListComponent } from './components/user-profile/watch-list/watch-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileResolverService } from './services/profile-resolver.service';
import {NewsComponent} from "./components/news/news.component";
import { CompanyDetailsComponent } from "./components/pages/asset-profile/company-details/company-details.component"
import { WatchListResolverService } from './services/watch-list-resolver.service';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'asset', component: CompanyDetailsComponent},
  {path: 'newsArticles', component: NewsComponent},
  {path: 'companyDisplay', component: CompanyDetailsComponent},
  {path: 'profile', resolve: {profile: ProfileResolverService}, component: ProfileComponent, canActivate: [AuthGuardService],  children: [
    {path: 'watchlist', resolve: {asset: WatchListResolverService}, component: WatchListComponent}
  ]
},
  {path: 'home', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
