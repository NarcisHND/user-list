import {Component, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {UserModel} from "../../services/models/user.model";

@Component({
  selector: 'app-user-filters',
  templateUrl: './user-filters.component.html',
  styleUrls: ['./user-filters.component.css']
})
export class UserFiltersComponent {
  @Input() public allCountries!: string[];
  @Input() public userData!: UserModel[];
  @Output() selectCountry: Subject<string> = new Subject<string>();
  @Output() sendSearchRes: Subject<string> = new Subject<string>();
  public enteredSearchValue: string = ''

  constructor() {
  }
  
  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  searchUser() {
    let value = this._normalizeValue(this.enteredSearchValue);
    this.sendSearchRes.next(value);
  }

  filterDataByCountry(country: string) {
    this.selectCountry.next(country);
  }
}
