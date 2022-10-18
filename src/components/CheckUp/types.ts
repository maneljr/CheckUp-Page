import { ICheckItemType } from "../../InstallMoldal/types";

export interface ICheckup {
  text: string;
  type: ICheckItemType;
  counter: () => void;
}

export enum ICheckItemStatus {
  Loading,
  Success,
  Fail,
}
