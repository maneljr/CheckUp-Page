export enum ICheckItemType {
  NetworkSpeed,
  ServerAccess,
  PjeOfficeUninstalled,
  ShodoUninstalled,
  WebSignerUninstalled,
}

export interface ICheckItem {
  label: string;
  type: ICheckItemType;
}
