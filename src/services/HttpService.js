import { CancelToken } from 'axios';

export class HttpService {
  constructor(axiosInstance) {
    if (!axiosInstance) {
      throw new Error('Setup do axios não fornecido');
    }

    this.axios = axiosInstance;
  }

  async makeHttpRequest(config) {
    console.log("🚀 ~ HttpService ~ makeHttpRequest ~ config:", config)
    try {
      const source = await CancelToken.source();
      config.cancelToken = source.token;

      const httpResponse = await this.axios.request(config);

      return httpResponse.data;
    } catch (e) {
      if (!e.response) {
        throw e;
      }

      return this.handleRequestError(e, config);
    }
  }

  handleRequestError(e, config) {
    if (process.env.REACT_APP_DEBUG === 'true') {
      const reponsePayload = typeof e.response.data === 'string'
        ? e.response.data
        : JSON.stringify(e.response.data);

      console.error(`
        Error: ${e.message},
        StatusCode: ${e.response.status},
        Request Config: ${JSON.stringify(config)},
        Response Payload: ${reponsePayload}
      `);
    }

    throw e;
  }
}
