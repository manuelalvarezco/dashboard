import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CampanasComponent } from './components/adwords/components/campanas/campanas.component';
import { AdwordsComponent } from './components/adwords/components/adwords/adwords.component';
import { AdGroupsComponent } from './components/adwords/components/ad-groups/ad-groups.component';
import { KeywordsComponent } from './components/adwords/components/keywords/keywords.component';
import { AdComponent } from './components/adwords/components/ad/ad.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'adwords/campaigns', component: CampanasComponent },
  { path: 'adwords/adgroups', component: AdGroupsComponent },
  { path: 'adwords/ad', component: AdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }