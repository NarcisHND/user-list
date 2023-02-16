import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDataService} from "../../services/user-data.service";
import {map, Subscription} from "rxjs";
import {UserModel} from "../../services/models/user.model";
import {ModalService} from "../../services/modal.service";
import {ResultModel} from "../../services/models/result.model";

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.css']
})

export class UserListTableComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  @Output() public userData!: UserModel[];
  public userImg!: string;
  public getCountries!: string[];
  private selectCountry!: string;
  public filterActive: boolean = false;
  public orderSortActive: boolean = false;
  private allUsers!: UserModel[];
  private sortBy!: string;

  constructor(private userDataService: UserDataService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subscription = this.userDataService.getRandomUsers().pipe(map((res: ResultModel) => {
      const locations: string[] = [];
      res.results.forEach((user: UserModel) =>
        locations.push(user.location.country)
      );
      const clearLoc: Set<string> = new Set(locations);
      const newSetLoc: string[] = [...clearLoc];
      this.getCountries = newSetLoc.sort();

      if (this.filterActive) {
        return res.results.filter(user => user.location.country === this.selectCountry);
      } else {
        return res;
      }
    })).subscribe({
      next: (res) => {
        let resModel;
        if (this.filterActive) {
          resModel = res as UserModel[];
          this.userData = resModel;
          this.allUsers = resModel;
          if (this.orderSortActive) {
            this.orderBy(this.sortBy);
          }
        } else {
          resModel = res as ResultModel;
          this.userData = resModel.results;
          this.allUsers = resModel.results;
        }
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  getSearchRes(event: string): void {
    if (event) {
      this.userData = this.userData.filter((user) => user.name.first.toLowerCase().includes(event));
    } else {
      this.userData = this.allUsers;
    }
  }

  getCountry(event: string): void {
    this.selectCountry = event;
    this.filterActive = event !== 'default';
    this.loadData();
  }

  orderBy(order: string): void {
    this.orderSortActive = order !== 'all'
    if (order !== 'all') {
      this.sortBy = order;
    }
    switch (order) {
      case 'first':
        this.userData.sort((a: UserModel, b: UserModel) => {
          if (a.name.first < b.name.first) {
            return -1;
          }
          if (a.name.first > b.name.first) {
            return 1
          }
          return 0;
        });
        break;
      case 'last':
        this.userData.sort((a: UserModel, b: UserModel) => {
          if (a.name.last < b.name.last) {
            return -1;
          }
          if (a.name.last > b.name.last) {
            return 1
          }
          return 0;
        });
        break;
      case 'country':
        this.userData.sort((a: UserModel, b: UserModel) => {
          if (a.location.country < b.location.country) {
            return -1;
          }
          if (a.location.country > b.location.country) {
            return 1
          }
          return 0;
        });
        break;
      case 'all':
        this.loadData();
        break;
    }
  }

  openModal(id: string, img: string): void {
    this.modalService.open(id);
    this.userImg = img;
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
