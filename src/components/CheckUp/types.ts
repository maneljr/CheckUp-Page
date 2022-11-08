import { ICheckItemType } from "../../InstallMoldal/types";

export interface ICheckup {
  text: string;
  type: ICheckItemType;
  counter: () => void;
  payload: (type: ICheckItemType, value: any) => void;
}

export enum ICheckItemStatus {
  Loading,
  Success,
  Fail,
}
