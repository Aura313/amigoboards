import axios from "axios";
import Config from '../Configuration/Config.json';

class AuthenticationService{
     login=(userName,password)=>
    {
        return axios.post(Config.users_url+"/login" , {
            userName,
            password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
          ;
    }

    logout() {
        localStorage.removeItem("user");
      }

      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
}

export default new AuthenticationService();