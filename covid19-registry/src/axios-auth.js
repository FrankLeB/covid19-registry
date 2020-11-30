import axios from "axios";

const instance = axios.create({
  baseURL: `http://${process.env.VUE_APP_SERVER_API}/`
});

export default instance;
