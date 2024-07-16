import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  // baseURL: "http://localhost:1337/api/",
  baseURL: import.meta.env.VITE_BASE_URL + "/api/",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

const getUserResumes = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

const UpdateResumeDetail = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

const GetResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");

const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);

export default {
  CreateNewResume,
  getUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};

// checkout Strapi documentation to filter the request/response: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication
