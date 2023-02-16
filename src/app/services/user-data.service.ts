import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {ResultModel} from "./models/result.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {
  }

  getRandomUsers(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.randomUserUrl + '?seed=2283edfc8e27521a&results=250');
  }
}
