
import { apiGet } from "./api";

const parentService = {
  getFeedbacks() {
    return apiGet("/parents/feedbacks/");
  },

  getDoctorRequests() {
    return apiGet("/parents/doctor-requests/");
  },
};

export default parentService;
