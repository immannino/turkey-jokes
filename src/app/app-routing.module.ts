import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        routes
        // { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}