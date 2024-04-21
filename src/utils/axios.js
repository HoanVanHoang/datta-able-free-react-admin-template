import axios from 'axios';


const token = localStorage.getItem('access_token');
let header = {};
if(token == null){
 header =  { Authorization: `Bearer ${token}`};
}
const axiosServices = axios.create({baseURL: process.env.REACT_APP_BASE_URL_LOCAL, headers: header});

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
