import { ICheckItemType } from "../../InstallMoldal/types";

export interface ICheckup {
  text: string;
  type: ICheckItemType;
}

export enum ICheckItemStatus {
  Loading,
  Success,
  Fail,
}
