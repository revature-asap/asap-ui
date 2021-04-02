import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import { AssetDisplayComponent } from './components/asset-display/asset-display.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { TickerCardComponent } from './components/ticker-card/ticker-card.component';
import { AssetCandleChartComponent } from './components/asset-candle-chart/asset-candle-chart.component';
import { AssetCompanyProfileComponent } from './components/asset-company-profile/asset-company-profile.component';
import { AssetChartComponent } from './components/asset-chart/asset-chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AssetChartOptionsComponent } from './components/asset-chart-options/asset-chart-options.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssetDisplayComponent,
    NavbarComponent,
    RegistrationComponent,
    TickerCardComponent,
    AssetCandleChartComponent,
    AssetCompanyProfileComponent,
    AssetChartComponent,
    AssetChartOptionsComponent
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
    GoogleChartsModule,
    MatExpansionModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
