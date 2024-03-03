import { DefaultApi } from "appinio-api";
import axios from "axios";

const HOST = // @ts-ignore
  window?.API_URL
    ? // @ts-ignore
      window?.API_URL
    : process.env.REACT_APP_API_URL ?? "https://appinio.thedevbar.com/api";

class Appinio {
  public readonly api: DefaultApi;

  constructor() {
    this.api = new DefaultApi(
      {
        isJsonMime: () => true,
      },
      HOST,
      // @ts-ignore
      axios.create()
    );
  }
}

export const AppinioApi = new Appinio();
