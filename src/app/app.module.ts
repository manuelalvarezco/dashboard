import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// rutas
import { AppRoutingModule } from './app-routing.module';

// componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AdwordsComponent } from './components/adwords/components/adwords/adwords.component';
import { SdcComponent } from './components/sdc/sdc.component';
import { KpiComponent } from './components/sdc/kpi/kpi.component';

//pipes
import { TotalSalesPipe } from './pipes/total-sales.pipe';
import { InboundSalesPipe } from './pipes/inbound-sales.pipe';

// módulos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CampanasComponent } from './components/adwords/components/campanas/campanas.component';
import { ToolbarAdwordsComponent } from './components/adwords/components/toolbar-adwords/toolbar-adwords.component';
import { TopbarComponent } from './components/toolbar/components/topbar/topbar.component';
import { MainComponent } from './components/adwords/components/main/main.component';
import { AdGroupsComponent } from './components/adwords/components/ad-groups/ad-groups.component';
import { KeywordsComponent } from './components/adwords/components/keywords/keywords.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidenavComponent,
    ToolbarComponent,
    AdwordsComponent,
    SdcComponent,
    KpiComponent,
    TotalSalesPipe,
    InboundSalesPipe,
    CampanasComponent,
    ToolbarAdwordsComponent,
    TopbarComponent,
    MainComponent,
    AdGroupsComponent,
    KeywordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
