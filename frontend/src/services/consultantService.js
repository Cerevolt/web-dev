
import { apiGet } from "./api";

const consultantService = {
  getAssessments() {
    return apiGet("/consultant/assessments/");
  },

  getProgress() {
    return apiGet("/consultant/progress/");
  },
};

export default consultantService;
