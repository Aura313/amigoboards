import axios from "../middleware/axios";
import Config from "../Configuration/Config.json";
import authservice from "./AuthenticationService.js";

class AuthenticationService {
  getuserStats = async () => {
    const username = authservice.getCurrentUser().userName;
    return await axios.post(Config.userStories_url + "/username", {
      username,
    }).then((response)=>{ return response.data});
  };

  getuseranalysis = async () => {
    const data  = await this.getuserStats();
    const resultArray = {
      todo: data.filter((item) => item.status === "To do").length,
      inProgress: data.filter((item) => item.status === "In Progress").length,
      completed: data.filter((item) => item.status === "Completed").length,
    };
    
    return resultArray;
  };
}
export default new AuthenticationService();
