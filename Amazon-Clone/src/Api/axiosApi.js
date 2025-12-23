import axios from "axios";
 
const axiosInstance = axios.create(

{
    //local instance of firebase functions
// baseURL: "http://127.0.0.1:5001/clone-df27d/us-central1/api"

//render instance of firebase functions
    baseURL: 'https://amazon-backend-k9c4.onrender.com'
}
)

export  {axiosInstance};