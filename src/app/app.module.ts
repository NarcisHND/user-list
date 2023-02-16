import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UserListTableComponent} from './home-page/user-list-table/user-list-table.component';
import {HttpClientModule} from "@angular/common/http";
import {ModalComponent} from './shared/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFiltersComponent} from './home-page/user-filters/user-filters.component';
import {DropdownBehaviorDirective} from './services/directive/dropdown-behavior.directive';
import {SortDropdownBehaviorDirective} from './services/directive/sort-dropdown-behavior.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserListTableComponent,
    ModalComponent,
    UserFiltersComponent,
    DropdownBehaviorDirective,
    SortDropdownBehaviorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
