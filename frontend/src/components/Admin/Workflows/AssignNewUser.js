import { AiOutlineUser } from "react-icons/ai";

import { React, useState, useEffect, Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import {
  createWorkflowAssigned,
  createQuestionnaire,
  getVendors,
} from "../../../apiCalls";
import useToken from "../../../useToken";
import axios from "axios";
import CreationSuccess from "./CreationSuccess";

function AssignNewUser(props) {
  console.log("ASSIGN NEW USER");

  const navigate = useNavigate();

  const workflowData = props.workflow;
  const workflowName = workflowData.workflowName;
  const workflowDescription = workflowData.workflowDescription;
  const questionnaireList = workflowData.questionnaireList;
  const questionnaires = workflowData.questionnaires;
  var questionnairesInput = [];
  const token = useToken().token;

  for (var index in questionnaires) {
    delete questionnaires[index].id;
    delete questionnaires[index].createdAt;
    questionnairesInput.push(questionnaires[index]);
  }

  const [vendors, setVendors] = useState([]);
  const [vendorOptions, setVendorOptions] = useState();
  const [selectedVendors, setSelectedVendors] = useState("");
  const [questionnaireTitles, setQuestionnaireTitles] = useState([]);
  const [questionnaireDeadlines, setQuestionnaireDeadlines] = useState([]);
  const [values, setValues] = useState([]);
  const [duplicatedQuestionnaire, setDuplicatedQuestionnaire] = useState([]);

  const user = useToken().token;

  useEffect(() => {
    load();
  }, [props]);

  async function load() {
    const response = await getVendors();
    setVendors(response.data);

    const selectOptions = [];
    for (const element of response.data) {
      selectOptions.push({
        value: element.id,
        label: element.name,
      });
    }

    setVendorOptions(selectOptions);

    const temp = [];
    for (const index in questionnaires) {
      temp.push([questionnaires[index].id, questionnaires[index].title]);
    }
    setQuestionnaireTitles(temp);
    console.log("questionnaireTitles");
    console.log(questionnaireTitles);
  }

  const validateForm = () => {
    return (
      selectedVendors.length != 0 && values.length == questionnaires.length
    );
  };

  const handleSelect = (data) => {
    setSelectedVendors(data);
  };

  async function handleAddUserClick() {
    const handleQuestionnairesPromise = await handleQuestionnaires();
    const workflowCopy = JSON.parse(JSON.stringify(workflowData));
    delete workflowCopy.id;
    delete workflowCopy.createdAt;
    delete workflowCopy.questionnaires;
    delete workflowCopy.questionnaireList;

    workflowCopy.questionnaireList = handleQuestionnairesPromise;
    workflowCopy.assignedVendorId = selectedVendors.value;
    workflowCopy.assignedAdminId = user[0];
    workflowCopy["approverReviewStatus"] = "INITIAL_DRAFT";
    const response = await createWorkflowAssigned(workflowCopy);

    if (response.status == 200) {
        navigate(`/workflow-assigned/${response.data.id}`, { state: { workflowId: response.data.id } });
    }
  }

  const handleQuestionnaires = () => {
    return new Promise(async (resolve, reject) => {
      var questionnaireIds = [];

      await questionnaires.map(async (questionnaire, index) => {
        const questionnaireFR = JSON.parse(JSON.stringify(questionnaire));
        questionnaireFR["submissionDeadline"] = values[index];
        questionnaireFR["assignedVendorId"] = selectedVendors.value;
        questionnaireFR["assignedAdminId"] = user[0];
        questionnaireFR["status"] = "NOT_STARTED";
        const createQuestionnaireResponse = await createQuestionnaire(
          questionnaireFR
        );
        // console.log("createQuestionnaireResponse", createQuestionnaireResponse);

        const questionnaireId = createQuestionnaireResponse.data.id;

        questionnaireIds.push(questionnaireId);
        if (questionnaireIds.length == questionnaires.length) {
          resolve(questionnaireIds);
        }
      });
    });
  };

  const handleDateChange = (event, index) => {
    let dateTime = event.target.value;
    dateTime = dateTime.concat(":00.000");

    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = dateTime;
      return newValues;
    });
    console.log("VALUES", values);
  };

  return (
    <>
      <label
        htmlFor="AssignNewUser"
        className="btn bg-cyan border-transparent outline-none rounded-full mr-2"
      >
        <AiOutlineUser size={20} className="mr-3"></AiOutlineUser>
        Assign New User
      </label>

      <input type="checkbox" id="AssignNewUser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl relative py-12 px-20">
          <label
            htmlFor="AssignNewUser"
            className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12"
          >
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            Assign New User
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-thin mb-2"
                htmlFor="userid"
              >
                Vendor
              </label>
              <Select
                options={vendorOptions}
                placeholder={"Choose Vendor"}
                value={selectedVendors}
                onChange={handleSelect}
                isSearchable={true}
                className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              {questionnaireTitles.map((questionnaireInfo, idx) => (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin"
                    htmlFor="deadline"
                    key={questionnaireInfo[0]}
                  >
                    {questionnaireInfo[1]}
                  </label>
                  <label
                    className="block text-gray-700 text-xs font-thin mb-2"
                    htmlFor="deadline"
                    key={questionnaireInfo[0]}
                  >
                    Please input deadline in DD/MM/YYYY format.
                  </label>
                  {/* <input 
                                        key={questionnaireInfo[0]}
                                        onChange={(event) => handleDeadlines(event, index)}
                                        id="questionnairedeadline" 
                                        type="text"
                                        className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" 
                                    /> */}
                  <input
                    type="datetime-local"
                    onChange={(event) => handleDateChange(event, idx)}
                    min={new Date()
                      .toISOString()
                      .slice(0, new Date().toISOString().lastIndexOf(":"))}
                    className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"
                  ></input>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <label
                onClick={() => handleAddUserClick()}
                htmlFor="AssignNewUser"
                className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4"
                type="button"
                disabled={!validateForm()}
              >
                Assign New User
              </label>
            </div>
            <CreationSuccess workflowName={workflowName}></CreationSuccess>
          </form>
        </div>
      </div>
    </>
  );
}

export default AssignNewUser;
