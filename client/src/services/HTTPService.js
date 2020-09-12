import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

//Adapter
const request = async (config) => {
  const token = localStorage.getItem("token");
  console.log(token);

  setAuthToken(token);
  config.headers = {
      ...config.headers,
      'Content-Type':'application/json'
  };

  const { data } = await axios(config);


  console.log(`Response je: ${data}`);
  return data;
};


export default request;
