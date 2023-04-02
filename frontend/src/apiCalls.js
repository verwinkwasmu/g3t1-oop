import axios from "axios";

import accountsData from "./mock-data/accounts.json";
import workflowsData from "./mock-data/workflows.json";

// INTERCEPTOR

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8080/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "http://localhost:3000/";
    }
    console.error(error);
    return Promise.reject(error);
  }
);

// eslint-disable-next-line
export default {
  axiosClient,
};

// AUTHENTICATION

export function loginUser(data) {
  return axiosClient.post("/api/v1/users/login", JSON.stringify(data));
}

export function loginVendor(data) {
  return axiosClient.post("/api/v1/users/vendors/login", JSON.stringify(data));
}

// ACCOUNT MANAGEMENT

export function getUsers() {
  return axiosClient.get("/api/v1/users");
}

export function getVendors() {
  return axiosClient.get("/api/v1/users/vendors");
}

export function getUsersByType(userType) {
  // ADMIN, APPROVER
  return axiosClient.get(`/api/v1/users/type/${userType}`);
}

export function getVendorsByCompany(companyName) {
  // {companyName}
  return axiosClient.get(`/api/v1/users/vendors/${companyName}`);
}

export function getUserById(id) {
  // unique ID
  return axiosClient.get(`/api/v1/users/${id}`);
}

export function getVendorById(id) {
  // unique ID
  return axiosClient.get(`/api/v1/users/vendors/${id}`);
}

export function createUser(data) {
  return axiosClient.post("/api/v1/users/create", JSON.stringify(data));
}

export function createVendor(data) {
  return axiosClient.post("/api/v1/users/vendors/create", JSON.stringify(data));
}

export function deleteUser(id, deleterId) {
  // unique ID
  return axiosClient.delete(`/api/v1/users/delete/${id}/${deleterId}`);
}

export function deleteVendor(id, deleterId) {
  // unique ID
  return axiosClient.delete(`/api/v1/users/vendors/delete/${id}/${deleterId}`);
}

export function updateUser(data) {
  return axiosClient.put("/api/v1/users/update", JSON.stringify(data));
}

export function updateVendor(data) {
  return axiosClient.put("/api/v1/users/vendors/update", JSON.stringify(data));
}

// WORKFLOW MANAGEMENT

// TEMPLATES
export function getWorkflows() {
  return axiosClient.get("/api/v1/workflow");
}

export function getIndividualTemplateWorkflow(id) {
  return axiosClient.get(`/api/v1/workflow/${id}`);
}

export function createWorkflowTemplate(data) {
  return axiosClient.post("/api/v1/workflow", JSON.stringify(data));
}

export function updateIndividualTemplateWorkflow(data) {
  return axiosClient.put("/api/v1/workflow", JSON.stringify(data));
}

export function deleteWorkflow(id, userId) {
  // unique ID
  return axiosClient.delete(`/api/v1/workflow/delete/${id}/${userId}`);
}

// ASSIGNED
export function getAssignedWorkflows() {
  return axiosClient.get("/api/v1/workflow/assigned");
}

export function getIndividualAssignedWorkflow(id) {
  return axiosClient.get(`/api/v1/workflow/assigned/${id}`);
}

export function getAssignedWorkflowsByStatus(data) {
  return axiosClient.get(`/api/v1/workflow/assigned/status/${data}`);
}

export function getAssignedWorkflowsByAdminId(id) {
  return axiosClient.get(`/api/v1/workflow/assigned/admin/${id}`);
}

export function getAssignedWorkflowsByVendorId(id) {
  return axiosClient.get(`/api/v1/workflow/assigned/vendor/${id}`);
}

export function createWorkflowAssigned(data) {
  console.log("DATA", JSON.stringify(data));
  return axiosClient.post("/api/v1/workflow/assigned", JSON.stringify(data));
}

export function updateIndividualAssignedWorkflow(data) {
  console.log(JSON.stringify(data));
  return axiosClient.put("/api/v1/workflow/assigned", JSON.stringify(data));
}

export function deleteAssignedWorkflow(id, userId) {
  // unique ID
  return axiosClient.delete(`/api/v1/workflow/assigned/delete/${id}/${userId}`);
}

// QUESTIONNAIRE MANAGEMENT

export function getQuestionnaires() {
  return axiosClient.get("/api/v1/questionnaire");
}

export function getIndividualQuestionnaire(id) {
  return axiosClient.get(`/api/v1/questionnaire/${id}`);
}

export function getQuestionnairesByVendorId(id) {
  return axiosClient.get(`/api/v1/questionnaire/vendor/${id}`)
}

export function getQuestionnairesByAdminId(id) {
  return axiosClient.get(`/api/v1/questionnaire/admin/${id}`)
}

export function createQuestionnaire(data) { 
  return axiosClient.post("/api/v1/questionnaire/create", JSON.stringify(data));  
}
// ARCHIVE MANAGEMENT

export function getArchiveByCollection(collection) {
  return axiosClient.get(`/api/v1/archive/collection/${collection}`);
}

export function restoreFromArchive(id) {
  return axiosClient.delete(`/api/v1/archive/restoreDocument/${id}`);
}
