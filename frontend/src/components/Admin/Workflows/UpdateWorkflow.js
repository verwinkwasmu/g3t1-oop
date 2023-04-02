import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import { BsGear } from "react-icons/bs";

import { updateIndividualTemplateWorkflow, getQuestionnaires, updateIndividualAssignedWorkflow } from '../../../apiCalls';
import { current } from 'tailwindcss/colors';

function UpateWorkflow(props) {

    const navigate = useNavigate();

    console.log("UPDATEWORKFLOW")
    console.log(props.render)
    console.log(props.workflow)

    const workflowId = props.workflow.id;
    const workflowName = props.workflow.workflowName;
    const currentWorkflowDescription = props.workflow.workflowDescription;
    const currentQuestionnaireList = props.workflow.questionnaireList;
    const [newWorkflowName, setNewWorkflowName] = useState("");
    const [newWorkflowDescription, setNewWorkflowDescription] = useState("");
    const [selectedQuestionnaires, setSelectedQuestionnaires] = useState("");
    const [questionnaireOptions, setQuestionnaireOptions] = useState();

    const validateForm = () => {
        return !(workflowName.length == 0 || selectedQuestionnaires.length == 0);
    }

    const handleSelect = (data) => {
        setSelectedQuestionnaires(data);
        console.log(selectedQuestionnaires);
    }

    useEffect(() => {
        setNewWorkflowName(props.workflow.workflowName)

        getQuestionnaires()
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    const selectOptions = [];
                    for (const element of response.data) {
                        selectOptions.push(
                            {
                                value: element.id,
                                label: element.title
                            }
                        )
                    }
                    setQuestionnaireOptions(selectOptions)
                } else {
                    setQuestionnaireOptions([])
                }
            })
    }, [])

    const handleUpdate = () => {
        console.log("INSIDE HANDLE UPDATE");

        let questionnaireListInput = [];
        if (selectedQuestionnaires.length == 0) {
            questionnaireListInput = currentQuestionnaireList
        }
        else {
            for (const element of selectedQuestionnaires) {
                questionnaireListInput.push(element.value);
            }
        }

        if (props.render == "templates") {
            var workflowNameToPass = workflowName;
            if (newWorkflowName != undefined) {
                workflowNameToPass = newWorkflowName;
            }

            var workflowDescriptionToPass = currentWorkflowDescription;
            if (newWorkflowDescription != undefined) {
                workflowDescriptionToPass = newWorkflowDescription;
            }

            updateIndividualTemplateWorkflow({ 
                id: workflowId, 
                workflowName: workflowNameToPass, 
                workflowDescription: workflowDescriptionToPass, 
                questionnaireList: questionnaireListInput 
            })
                .then(function (response) {
                    window.location.reload(false)
                })
                .catch(function (error) {
                    console.log("ERROR UPDATING WORKFLOW")
                })
        }
        else if (props.render == "assigned") {
            const createdAt = props.workflow.createdAt;
            const assignedVendorId = props.workflow.assignedVendorId;
            const assignedAdminId = props.workflow.assignedAdminId;
            const approvalRequestDate = props.workflow.approvalRequestDate;
            const approvedAt = props.workflow.approvedAt;

            var workflowNameToPass = workflowName;
            if (newWorkflowName != undefined) {
                workflowNameToPass = newWorkflowName;
            }

            var workflowDescriptionToPass = currentWorkflowDescription;
            if (newWorkflowDescription != undefined) {
                workflowDescriptionToPass = newWorkflowDescription;
            }

            var approverReviewStatus = "INITIAL_DRAFT"
            if (props.workflow.approverReviewStatus != null) {
                approverReviewStatus = props.workflow.approverReviewStatus
            }

            updateIndividualAssignedWorkflow({ 
                id: workflowId, 
                workflowName: workflowNameToPass, 
                questionnaireList: questionnaireListInput, 
                createdAt: createdAt, 
                assignedVendorId: assignedVendorId, 
                assignedAdminId: assignedAdminId, 
                approvalRequestDate: approvalRequestDate, 
                approverReviewStatus: approverReviewStatus, 
                approvedAt: approvedAt 
            })
                .then(function (response) {
                    console.log(response.data)
                    window.location.reload(false)
                })
                .catch(function (error) {
                    console.log("ERROR UPDATING WORKFLOW")
                })
        }
    }

    return (
        <>
            <label htmlFor="UpateWorkflow" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <BsGear size={20} className="mr-3"></BsGear>
                <span className="text-sm">Update Workflow</span>
            </label>

            <input type="checkbox" id="UpateWorkflow" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="UpateWorkflow" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Update Workflow</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowname">
                                Workflow Name
                            </label>
                            <input defaultValue={workflowName} onChange={e => setNewWorkflowName(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="workflowname" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowdescription">
                                Workflow Description
                            </label>
                            <input defaultValue={currentWorkflowDescription} onChange={e => setNewWorkflowDescription(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="workflowdescription" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin" htmlFor="forms">
                                Questionnaires
                            </label>
                            <Select
                                options={questionnaireOptions}
                                placeholder={"Update Questionnaires"}
                                value={selectedQuestionnaires}
                                onChange={handleSelect}
                                isSearchable={true}
                                isMulti
                                className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex justify-center">
                            <label onClick={() => { handleUpdate() }} htmlFor="UpateWorkflow" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
                                Update Workflow
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default UpateWorkflow;