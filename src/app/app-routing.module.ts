import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path: 'user-list', component: HomePageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'user-list'},
  {path: '**', redirectTo: 'user-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
