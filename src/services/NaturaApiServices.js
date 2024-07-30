import axios from "axios";
import { HttpService } from "./HttpService";

export class NaturaApiServices extends HttpService {
    constructor() {
        const instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_HOST}`
        });

        super(instance);
    }

    async makeHttpRequest(config) {
        const authData = this.getAuthData();
        if (authData) {
            config.headers = {
                ...(config.headers || {}),
                Authorization: `Bearer ${authData.token}`,
                "Access-Control-Expose-Headers": "Content-Disposition"
            };
        }

        return super.makeHttpRequest(config);
    }

    getAuthData() {
        const authData = localStorage.getItem('user');
        return JSON.parse(authData);
    }

    getCart() {
        const cart = localStorage.getItem('cart');
        return JSON.parse(cart);
    }
}
