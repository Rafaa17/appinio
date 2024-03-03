import { DefaultApi } from "appinio-api";
import axios from "axios";

class Appinio {
  public readonly api: DefaultApi;

  constructor() {
    // this.axios = axios.create({});

    this.api = new DefaultApi(
      {
        isJsonMime: () => true,
      },
      "http://localhost:8000",
      // @ts-ignore
      axios
    );

    console.log(this.api);
  }
}

export const AppinioApi = new Appinio();
