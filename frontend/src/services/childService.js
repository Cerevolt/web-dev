
import { apiGet } from "./api";

const childService = {
  getVideos() {
    return apiGet("/children/videos/");
  },

  getGames() {
    return apiGet("/children/games/");
  },

  getRewards() {
    return apiGet("/children/rewards/");
  },

  getDailyGoals() {
    return apiGet("/children/dailygoals/");
  },
};

export default childService;
