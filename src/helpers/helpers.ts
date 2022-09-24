import {
  APIKeys,
  APIPaths,
  APIRequestInterface,
  APIResponseInterface,
  APIUserDataResponseInterface,
  HTTPRequestMethods,
  ItemCardInterface,
  OpenRequestOptionsInterface,
} from "./interfaces";

// API

export const getToken = async (): Promise<string> => {
  const token = localStorage.getItem(APIKeys.TOKEN);
  if (token !== null) {
    if ((await isExpired(token)).token_is_expired) {
      console.log("Expirado", token);
      const response = await refreshToken();
      console.log(response);
      if (response.response && response.token !== undefined) {
        console.log("Nuevo", response.token);
        setToken(response.token);
        return response.token;
      }
      return token;
    }
    return token;
  }
  return "";
};

export const setToken = (token: string) =>
  localStorage.setItem(APIKeys.TOKEN, token);

export const removeToken = (): void => localStorage.removeItem(APIKeys.TOKEN);

export const setUser = (user: string): void => {
  localStorage.setItem(APIKeys.USER, user);
};

export const getUser = (): string | null => localStorage.getItem(APIKeys.USER);

export const removeUser = (): void => localStorage.removeItem(APIKeys.USER);

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

export const isExpired = async (
  token: string
): Promise<APIUserDataResponseInterface> => {
  const response: Response = await fetch(`${APIPaths.BASE_URL}/token/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (await response.json()) as Promise<APIUserDataResponseInterface>;
};

// Formatters and validators

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

export const checkRequiredData = (text: string): boolean => {
  const notEmptyRegex: RegExp = /^[\w.áéíóú,;: ()[\]¡!'"¿?*/+-=]+$/i;
  text = text.trim();
  return notEmptyRegex.test(text);
};

export const formatRequestData = (
  requestData: APIRequestInterface[]
): ItemCardInterface["data"] =>
  requestData.map((data) => ({
    id: data.id,
    request: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.client_image}`,
      registrationDate: data.registration_date,
      modificationDate: data.modification_date,
      requestType: data.request_type,
      description: data.description,
      applicant: data.applicant,
      technician: data.technician,
      isClosed: data.is_closed,
    },
    card: {
      cardImageUrl: `${APIPaths.MEDIA_URL}/${data.client_image}`,
      info: [
        { detail: "Creado: ", content: data.modification_date },
        { detail: "Tipo: ", content: data.request_type },
      ],
      title: data.client,
    },
  }));

// Sending and receiving data

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

export const loginAPI = async (
  user: string,
  password: string
): Promise<APIResponseInterface> => {
  const data: FormData = new FormData();
  data.append(
    "login",
    JSON.stringify({
      username: onlyDigits(user),
      password: password,
    })
  );
  const response: APIResponseInterface = await sendData(
    `${APIPaths.BASE_URL}/login/`,
    HTTPRequestMethods.POST,
    data
  );
  return response;
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

export const createOpenRequest = async (
  client: string,
  type: string,
  description: string,
  applicant: string,
  technician: string
): Promise<APIResponseInterface> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("client", client);
  data.append("type", type);
  data.append("description", description);
  data.append("applicant", applicant);
  data.append("technician", technician);
  const response = await sendData(
    `${APIPaths.BASE_URL}/clientrequest/`,
    HTTPRequestMethods.POST,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  return response;
};

export const getUserData = async (): Promise<APIUserDataResponseInterface> => {
  const token = await getToken();
  const response: Response = await fetch(`${APIPaths.BASE_URL}/userdata/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return (await response.json()) as Promise<APIUserDataResponseInterface>;
};

export const getOpenRequestOptions =
  async (): Promise<OpenRequestOptionsInterface> => {
    const token = await getToken();
    const clientRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/clients/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const requestTypesRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/requesttype/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const techniciansRequest: Response = await fetch(
      `${APIPaths.BASE_URL}/technicians/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return {
      client: (await clientRequest.json()).data,
      requestTypes: (await requestTypesRequest.json()).data,
      technicians: (await techniciansRequest.json()).data,
    };
  };

export const getRequestData = async (
  setRequestData: React.Dispatch<React.SetStateAction<APIRequestInterface[]>>,
  is_closed: boolean = false
) => {
  const token = await getToken();
  const wsDestination = is_closed
    ? `${APIPaths.WS_URL}/closedrequest/`
    : `${APIPaths.WS_URL}/openrequest/`;
  const socket = new WebSocket(wsDestination);
  socket.addEventListener("open", (): void => {
    socket.send(
      JSON.stringify({
        key: token,
        is_closed: is_closed,
      })
    );
  });
  socket.addEventListener("close", (): void => {
    console.error("Connection has been cut off (WS: Open request)");
  });
  socket.addEventListener("message", async (event) => {
    const data: { data: APIRequestInterface[]; status: number } =
      await JSON.parse(event.data);
    if (data.status) {
      setRequestData(data.data);
    }
  });
};

export const cancelOpenRequest = async (requestId: string): Promise<void> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("id", requestId);
  const response = await sendData(
    `${APIPaths.BASE_URL}/cancelopenrequest/`,
    HTTPRequestMethods.DELETE,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  if (response.response && response.redirect !== undefined) {
    window.location.replace(response.redirect);
  }
};

export const closeOpenRequest = async (requestId: string): Promise<void> => {
  const token = await getToken();
  const data: FormData = new FormData();
  data.append("id", requestId);
  const response = await sendData(
    `${APIPaths.BASE_URL}/closeopenrequest/`,
    HTTPRequestMethods.PUT,
    data,
    {
      Authorization: `Token ${token}`,
    }
  );
  if (response.response && response.redirect !== undefined) {
    window.location.replace(response.redirect);
  }
};

// Esthetics helpers

export const getCornersClasses = (
  corners: [boolean, boolean, boolean, boolean]
): string => {
  let cornersClasses: string = "";
  corners[0]
    ? (cornersClasses += " reusable__input--top-left-radius")
    : (cornersClasses += "");
  corners[1]
    ? (cornersClasses += " reusable__input--top-right-radius")
    : (cornersClasses += "");
  corners[2]
    ? (cornersClasses += " reusable__input--bottom-right-radius")
    : (cornersClasses += "");
  corners[3]
    ? (cornersClasses += " reusable__input--bottom-left-radius")
    : (cornersClasses += "");
  return cornersClasses;
};

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
