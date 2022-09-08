import { ReactNode } from "react";

// Basic interface for properties

export interface PropsInterface {
  children?: ReactNode;
}

// API

export enum APIKeys {
  TOKEN = "token",
  USER = "user",
}

export enum APIPaths {
  BASE_URL = "http://127.0.0.1:8000/api",
  MEDIA_URL = "http://127.0.0.1:8000/media",
}

// HTTP request methods

export enum HTTPRequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface APIResponseInterface {
  response: boolean;
  data?: any;
  detail?: string;
  errors?: any;
  message?: string;
  redirect?: string;
  token?: string;
  token_is_expired?: boolean;
}

export interface APIUserDataResponseInterface extends APIResponseInterface {
  data?: UserDataInterface;
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

export interface LoginContext {
  login: (response: APIResponseInterface) => void;
  logout: () => void;
  refresh: () => void;
  auth?: UserDataInterface | null;
}

// Side menu

export interface UserDataInterface {
  username: string;
  user: string;
  position: string;
  profile_image: string;
}

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

export interface LogoutButtonInterface {
  logout: () => void;
  icon: ReactNode;
}

// Reusable components

export interface ButtonInterface extends PropsInterface {
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
  Root = "/",
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
