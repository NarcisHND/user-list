import {UserModel} from "./user.model";

export class ResultModel {
  public info: {};
  public results: UserModel[];

  constructor(info: {}, results: UserModel[]) {
    this.info = info;
    this.results = results;
  }
}
