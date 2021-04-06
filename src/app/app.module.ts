import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {InterceptorService} from "./services/interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AssetDisplayComponent } from './components/asset-display/asset-display.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RegisterEmailConfirmationDialog, RegistrationComponent } from './components/registration/registration.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProfileComponent } from './components/user-profile/profile/profile.component'
import { WatchListComponent } from './components/user-profile/watch-list/watch-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NewsComponent } from './components/news/news.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { TickerCardComponent } from './components/ticker-card/ticker-card.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TickerContainerComponent } from './components/ticker-container/ticker-container.component';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommentBoxComponent } from './components/comment/comment-box/comment-box.component';
import { CommentsContainerComponent } from './components/comment/comments-container/comments-container.component';
import { DisplayCommentsComponent } from './components/comment/display-comments/display-comments.component';
import { ReplyBoxComponent } from './components/comment/reply-box/reply-box.component';
import { AssetCandleChartComponent } from './components/asset-candle-chart/asset-candle-chart.component';
// import { AssetCompanyProfileComponent } from './components/asset-company-profile/asset-company-profile.component';
import { AssetChartComponent } from './components/asset-chart/asset-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AssetChartOptionsComponent } from './components/asset-chart-options/asset-chart-options.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CompanyDetailsComponent } from './components/pages/asset-profile/company-details/company-details.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AssetNewsStoriesComponent } from './components/asset-news-stories/asset-news-stories.component';
import { AbbrCompDeetsComponent } from './components/pages/asset-profile/abbr-comp-deets/abbr-comp-deets.component';

@NgModule({
  declarations: [
    AppComponent,
    SentimentComponent,
    LoginComponent,
    AssetDisplayComponent,
    NavbarComponent,
    RegistrationComponent,
    ProfileComponent,
    WatchListComponent,
    NewsComponent,
    RegisterEmailConfirmationDialog,
    TickerCardComponent,
    HomeComponent,
    TickerContainerComponent,
    CommentBoxComponent,
    CommentsContainerComponent,
    DisplayCommentsComponent,
    AssetCandleChartComponent,
    // AssetCompanyProfileComponent,
    AssetChartComponent,
    AssetChartOptionsComponent,
    CompanyDetailsComponent,
    ReplyBoxComponent,
    AssetNewsStoriesComponent,
    AbbrCompDeetsComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    OverlayModule,
    ScrollingModule,
    MatGridListModule,
    GoogleChartsModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
