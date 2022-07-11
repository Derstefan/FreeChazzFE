import axios from 'axios';
import serverConfig from "../services/server-config.json";

//// alternative "http://localhost"
const MAIN_API_BASE_URL = serverConfig.host + ":8080/api";

class ServerService {



    getServerData() {
        return axios.get(MAIN_API_BASE_URL + "/serverdata")
    }

}

export default new ServerService()