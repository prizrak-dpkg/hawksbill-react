import { DSRedirectResponse, HTTPRequestMethods } from "./interfaces";

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
  csrfToken: string,
  data: FormData,
  method: HTTPRequestMethods
): Promise<DSRedirectResponse> => {
  const response: Response = await fetch(destinationURL, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    method: method,
    body: data,
  });
  return (await response.json()) as Promise<DSRedirectResponse>;
};
