import { ReactNode } from "react";

// Basic interface for properties

export interface PropsInterface {
  children?: ReactNode;
}

// HTTP request methods

export enum HTTPRequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface DSRedirectResponse {
  response: boolean;
  redirect?: string;
  message?: string;
}

// Login

export enum LoginModes {
  SignIn = "sign__in__mode",
  SignUp = "sign__up__mode",
  Recovery = "recovery__mode",
}

export interface LoginFormInterface {
  document: string;
  email?: string;
  password?: string;
}

export interface LoginOptionInterface extends PropsInterface {
  mode: LoginModes;
  formContainerRef: React.RefObject<HTMLDivElement>;
  onModeChange: (mode: LoginModes) => void;
}

// Side menu

export interface ToggleButtonInterface extends PropsInterface {
  openSideMenu: boolean;
  setOpenSideMenu: (value: React.SetStateAction<boolean>) => void;
}

export interface NavBarItemInterface extends ToggleButtonInterface {
  detail: string;
  destination?: AdminPaths | CustomerPaths | SharedPaths;
}

export interface NavBarCategoryInterface extends NavBarItemInterface {
  icon: ReactNode;
}

// Reusable components

export interface ButtonInterface extends PropsInterface {
  action?: (form: LoginFormInterface) => void;
  executeAction: boolean;
}

export interface InputInterface extends PropsInterface {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Navigation

export enum AdminPaths {
  Dashboard = "/dashboard",
  LicensingTables = "/licensingtables",
  Credentials = "/credentials",
  OpenRequest = "/openrequest",
  ClosedRequest = "/closedrequest",
  Team = "/team",
  Reports = "/reports",
  Settings = "/settings",
}

export enum CustomerPaths {
  Home = "/home",
}

export enum SharedPaths {
  Login = "/login",
  NotFound = "*",
  Settings = "Settings",
}

export interface RouteInterface {
  path: AdminPaths | CustomerPaths | SharedPaths;
  layout?: React.FC<PropsInterface>;
  component: React.FC<PropsInterface>;
}
