// services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement/",
});

export const generateOTP = (mobile: string) =>
  API.post("generateOTP", { mobile_number: mobile });

export const validateOTP = (mobile: string, otp: string) =>
  API.post("validateOTP", { mobile_number: mobile, otp });
