import { getToken } from "@/utils/auth";
import axios from "axios";

type Metadata = {
  major_head: string;
  minor_head: string;
  document_date: string;
  document_remarks: string;
  user_id: string;
  tags: { tag_name: string }[];
};

const API = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement/",
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const generateOTP = (mobile: string) =>
  API.post("generateOTP", { mobile_number: mobile });

export const validateOTP = (mobile: string, otp: string) =>
  API.post("validateOTP", { mobile_number: mobile, otp });

export const uploadDocument = async (
  fileUri: string,
  fileName: string,
  fileType: string,
  metadata: {
    major_head: string;
    minor_head: string;
    document_date: string;
    document_remarks: string;
    tags: { tag_name: string }[];
    user_id: string;
  }
) => {
  console.log(metadata.document_date);
  const formData = new FormData();

  formData.append("file", {
    uri: fileUri,
    name: fileName,
    type: fileType,
  } as any);

  formData.append("data", JSON.stringify(metadata));

  const res = await API.post("saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const upload = async (
  fileUri: string,
  fileName: string,
  metadata: Metadata
) => {
  const formData = new FormData();

  formData.append("file", {
    uri: fileUri,
    name: fileName,
    type: "application/octet-stream",
  } as any);

  formData.append("data", JSON.stringify(metadata));

  return await API.post("saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchTags = async (term: string) => {
  return await API.post("documentTags", { term });
};

export const createTag = async (tag: string) => {
  return await API.post("saveDocumentTag", {
    tag_name: tag,
  });
};

export const searchDocuments = async (filters: {
  major_head: string;
  minor_head: string;
  from_date: string;
  to_date: string;
  tags: { tag_name: string }[];
  uploaded_by: string;
  start: number;
  length: number;
  filterId: string;
  search: { value: string };
}) => {
  return API.post("searchDocumentEntry", filters);
};
