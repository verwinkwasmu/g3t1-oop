import axios from 'axios';

import accountsData from './mock-data/accounts.json';
import workflowsData from './mock-data/workflows.json';

// INTERCEPTOR

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8080/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  }, 
  function (error) {
    console.log("error: ", error)

    let res = error.response;
    console.log("res: ", res)
    if (res.status === 401) {
      window.location.href = "http://localhost:3000/";
    }
    console.error(error);
    return Promise.reject(error);
  }
);

// eslint-disable-next-line
export default {
  axiosClient
};

export function getUsers() {
  return axiosClient.get("/api/v1/users");  
}

export function getUsersByType(userType) { // VENDOR, ADMIN, APPROVER
  return axiosClient.get(`/api/v1/users/all/${userType}`);  
}

export function getUsersByCompany(companyName) { // {companyName}
  return axiosClient.get(`/api/v1/users/company/${companyName}`);  
}

export function getUserById(id) { // unique ID
  return axiosClient.get(`/api/v1/users/${id}`);  
}

export function createUser(data) { 
  return axiosClient.post("/api/v1/users/create/", JSON.stringify(data));  
}

export function deleteUser(id) { // unique ID
  return axiosClient.delete(`/api/v1/users/delete/${id}`);  
}

export function updateUser(data) {
  return axiosClient.put("/api/v1/users/update/", JSON.stringify(data));  
}

export function getWorkflows() {
  return axiosClient.get("/api/v1/workflow");  
}

export function getWorkflowsByVendor(id) {
  return axiosClient.get(`/api/v1/workflow/assigned/vendor/${id}`);  
}

export function deleteWorkflow(id) { // unique ID
  return axiosClient.delete(`/api/v1/workflow/${id}`);  
}