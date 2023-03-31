import { AiOutlineUser } from "react-icons/ai";

import { React, useState, useEffect, Component } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select'
import axios from 'axios'

import { createWorkflowAssigned, createQuestionnaire, getVendors } from '../../../apiCalls';

function AssignNewUser(props) {
    console.log("ASSIGN NEW USER")

    const navigate = useNavigate();

    const workflowData = props.workflow
    const workflowName = workflowData.workflowName
    const workflowDescription = workflowData.workflowDescription
    const questionnaireList = workflowData.questionnaireList
    // console.log(questionnaireList)
    const questionnaires = workflowData.questionnaires
    var questionnairesInput = []

    for (var index in questionnaires) {
        // console.log(questionnaires[index])
        // console.log("BEFORE DELETE")
        // console.log(questionnaires[index])
        delete questionnaires[index].id
        delete questionnaires[index].createdAt
        // console.log("AFTER DELETE")
        // console.log(questionnaires[index])
        questionnairesInput.push(questionnaires[index])
    }

    const [vendors, setVendors] = useState([]);
    const [vendorOptions, setVendorOptions] = useState();
    const [selectedVendors, setSelectedVendors] = useState("");
    // const [questionnaireIds, setQuestionnaireIds] = useState([])

    useEffect(() => {
        getVendors()
            .then(function (response) {
                setVendors(response.data)

                const selectOptions = [];
                for (const element of response.data) {
                    selectOptions.push(
                        {
                            value: element.id,
                            label: element.name
                        }
                    )
                }
                setVendorOptions(selectOptions)
            })
        // eslint-disable-next-line
    }, [])

    const validateForm = () => {
        return selectedVendors.length != 0;
    }

    const handleSelect = (data) => {
        setSelectedVendors(data);
    }

    const handleQuestionnaires = async () => {
        console.log("HANDLE QUESTIONNAIRE")
        
        let isConditionSettled = false;
        const output = []

        for (const questionnaire of questionnairesInput) {
            createQuestionnaire(questionnaire)
                .then(function (response) {
                    output.push(response.data.id)
                })
                .catch(function (error) {
                    console.log("ERROR CREATING QUESTIONNAIRE")
                })
        }

        setTimeout(() => {
            isConditionSettled = true;
        }, 1500);

        while (!isConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return output
    };

    const handleCreate = async () => {
        console.log("INSIDE HANDLE CREATE");

        let isCreatingConditionSettled = false;
        let isResolvingConditionSettled = false;
        let promises = handleQuestionnaires()
        let questionnaireIds = []

        setTimeout(() => {
            isCreatingConditionSettled = true;
        }, 3000);

        while (!isCreatingConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log("THIS IS AFTER QUESTIONNAIREIDS HAS BEEN DECLARED")
        console.log("RESOLVING PROMISE NOW")

        promises.then(result => {
            console.log(result); // Output: Promise resolved
            questionnaireIds.push(result[0])
          });

        console.log("QUESTIONNAIRE IDS")
        console.log(questionnaireIds)

        setTimeout(() => {
            isResolvingConditionSettled = true;
        }, 3000);

        while (!isResolvingConditionSettled) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        createWorkflowAssigned({
            "workflowName": workflowName,
            "workflowDescription": workflowDescription,
            "questionnaireList": questionnaireIds,
            "assignedAdminId": "temp",
            "assignedVendorId": selectedVendors.value,
            "approvalRequestDate": null,
            "approverReviewStatus": null,
            "approvedAt": null
        })
            .then(function (response) {
                console.log(response.data.id)
                navigate(`/workflow-assigned/${response.data.id}`, { state: { workflowId: response.data.id } });
            })
            .catch(function (error) {
                console.log("ERROR CREATING WORKFLOW")
            })
    }

    return (
        <>
            <label htmlFor="AssignNewUser" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <AiOutlineUser size={20} className="mr-3"></AiOutlineUser>
                Assign New User
            </label>

            <input type="checkbox" id="AssignNewUser" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="AssignNewUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Assign New User</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="userid">
                                Vendor
                            </label>
                            <Select
                                options={vendorOptions}
                                placeholder={"Choose Vendor"}
                                value={selectedVendors}
                                onChange={handleSelect}
                                isSearchable={true}
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex justify-center">
                            <label onClick={() => handleCreate()} htmlFor="AssignNewUser" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button" disabled={!validateForm()}>
                                Assign New User
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default AssignNewUser;