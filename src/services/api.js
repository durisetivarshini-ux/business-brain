import { env } from "@/config/env";

class ApiService {
  constructor() {
    this.baseURL = env.API_URL;
  }

  async get(endpoint) {
    // Boilerplate for future axios/fetch GET implementation
    console.log(`[API GET] ${this.baseURL}${endpoint}`);
    return { data: [] };
  }

  async post(endpoint, payload) {
    // Boilerplate for future axios/fetch POST implementation
    console.log(`[API POST] ${this.baseURL}${endpoint}`, payload);
    return { data: {} };
  }
}

export const api = new ApiService();
