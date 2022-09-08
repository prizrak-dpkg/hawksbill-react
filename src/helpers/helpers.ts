import {
  APIKeys,
  APIPaths,
  APIResponseInterface,
  APIUserDataResponseInterface,
  HTTPRequestMethods,
} from "./interfaces";

export const setToken = (token: string): void => {
  localStorage.setItem(APIKeys.TOKEN, token);
};

export const getToken = (): string | null =>
  localStorage.getItem(APIKeys.TOKEN);

export const removeToken = (): void => localStorage.removeItem(APIKeys.TOKEN);

export const setUser = (user: string): void => {
  localStorage.setItem(APIKeys.USER, user);
};

export const getUser = (): string | null => localStorage.getItem(APIKeys.USER);

export const removeUser = (): void => localStorage.removeItem(APIKeys.USER);

export const preventDrag = (
  event: React.DragEvent<HTMLAnchorElement | HTMLImageElement>
): void => {
  event.preventDefault();
};

export const collapseNavSubLists = (): void => {
  Array.from(
    document.querySelectorAll<HTMLElement>(".side-menu__item-sublist")
  ).forEach((sublist): void => {
    sublist.style.height = "0px";
  });
};

export const filteredDigits = (text: string): string[] => {
  const digitRegex: RegExp = /^[\d]{1}$/;
  const nonZeroRegex: RegExp = /^[1-9]{1}$/;
  return Array.from(text).filter((char: string, index: number): boolean =>
    index === 0 ? nonZeroRegex.test(char) : digitRegex.test(char)
  );
};

export const formattedInteger = (
  text: string,
  start: number,
  end: number
): [boolean, string] => {
  const filteredText: string[] = filteredDigits(text).slice(0, end);
  const numberLength = filteredText.length;
  const firstBreakpoint = numberLength % 3;
  const isItValid: boolean = numberLength >= start && numberLength <= end;
  const breakpoints: number[] = [];
  let breakpointAdder = 0;
  while (breakpoints.length < Math.floor(end / 3)) {
    const newBreakpoint = firstBreakpoint + breakpointAdder;
    if (newBreakpoint > 0) {
      breakpoints.push(newBreakpoint);
    }
    breakpointAdder += 3;
  }
  const formattedText = !isItValid
    ? filteredText.join("")
    : filteredText.reduce(
        (previousDigit: string, currentDigit: string, currentIndex: number) =>
          breakpoints.includes(currentIndex)
            ? previousDigit + "." + currentDigit
            : previousDigit + currentDigit,
        ""
      );
  return [isItValid, formattedText];
};

export const onlyDigits = (text: string): string => {
  return filteredDigits(text).join("");
};

export const formattedEmail = (text: string): [boolean, string] => {
  const emailRegex: RegExp =
    /^[a-z\d]{1}[\w.-]{3,}@[\w-]{2,}([.]{1}[\w-]{2,})+$/i;
  return [emailRegex.test(text), text.toLowerCase()];
};

export const checkPassword = (text: string): boolean => {
  const lowerCaseRegex: RegExp = /[a-z]+/;
  const upperCaseRegex: RegExp = /[A-Z]+/;
  const digitRegex: RegExp = /\d+/;
  const greaterThanEightRegex: RegExp = /[\s\S]{8,}/;
  return (
    lowerCaseRegex.test(text) &&
    upperCaseRegex.test(text) &&
    digitRegex.test(text) &&
    greaterThanEightRegex.test(text)
  );
};

export const sendData = async (
  destinationURL: string,
  method: HTTPRequestMethods,
  data?: FormData,
  headers?: HeadersInit
): Promise<APIResponseInterface> => {
  const response: Response = await fetch(destinationURL, {
    headers: headers,
    method: method,
    body: data,
  });
  return (await response.json()) as Promise<APIResponseInterface>;
};

export const getUserData = async (
  token: string
): Promise<APIUserDataResponseInterface> => {
  const response: Response = await fetch(`${APIPaths.BASE_URL}/userdata/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (await response.json()) as Promise<APIUserDataResponseInterface>;
};

export const logoutAPI = async (
  token: string
): Promise<APIResponseInterface> => {
  const data: FormData = new FormData();
  data.append("token", token);
  const response = await sendData(
    `${APIPaths.BASE_URL}/logout/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
};

export const refreshToken = async (): Promise<APIResponseInterface> => {
  const user = getUser();
  const data: FormData = new FormData();
  if (user !== null) {
    data.append("username", user);
  }
  const response = await sendData(
    `${APIPaths.BASE_URL}/gettoken/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
};
