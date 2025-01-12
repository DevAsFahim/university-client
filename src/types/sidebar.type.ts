import { ReactNode } from "react";

export interface ISidebarItem {
  key: string;
  label: ReactNode;
  children?: ISidebarItem[];
}

export interface IRoute {
  path: string;
  element: ReactNode;
}

export interface IUserPaths {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPaths[];
}
