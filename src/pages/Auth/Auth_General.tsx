// This code here is not being used, its just the raw api call without redux

import axios from "axios";

const AUTH_API_URL = "https://dev-api.locumspace.co/api/v1/auth-service";

const JOB_API_URL = "https://dev-api.locumspace.co/api/v1/jobs-service";

export const signupUser = async (userData: any) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during user signup:", error);
    throw error;
  }
};

export const signinUser = async (userData: any) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/users/signin`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during user signin:", error);
    throw error;
  }
};

export const postJob = async (params: any) => {
  try {
    const response = await axios.post(`${JOB_API_URL}/jobs`, params);
    return response.data;
  } catch (error) {
    console.error("Error during job creation:", error);
    throw error;
  }
}