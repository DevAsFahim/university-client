import { ReactNode } from "react";

export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

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
