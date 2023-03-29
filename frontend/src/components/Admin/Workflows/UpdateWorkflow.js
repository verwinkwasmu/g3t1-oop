import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import { BsGear } from "react-icons/bs";

import { updateIndividualTemplateWorkflow, getQuestionnaires, updateIndividualAssignedWorkflow } from '../../../apiCalls';

function UpateWorkflow(props) {

    const navigate = useNavigate();

    console.log("UPDATEWORKFLOW")
    console.log(props.render)
    console.log(props.workflow)

    const workflowId = props.workflow.id;
    const workflowName = props.workflow.workflowName;
    const [test, setworkflowName] = useState("");
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
        setworkflowName(props.workflow.workflowName)
        console.log("TEST NAME")
        console.log(test)

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

        // for (const index in props.workflow.questionnaires) {
        //     selectedQuestionnaires.push(
        //         {
        //             value: props.workflow.questionnaires[index].id, 
        //             label: props.workflow.questionnaires[index].title
        //         }
        //     );
        // }
        console.log("selectedQuestionnaires")
        console.log(selectedQuestionnaires)
        // eslint-disable-next-line
    }, [])

    // console.log("selectedQuestionnaires")
    // console.log(selectedQuestionnaires)

    const handleUpdate = () => {
        console.log("INSIDE HANDLE CREATE");

        const temp = [];
        for (const element of selectedQuestionnaires) {
            temp.push(element.value);
        }

        console.log("workflowname")
        console.log(workflowId)
        console.log(workflowName)
        console.log(temp)
        console.log(props.workflow.createdAt)

        if (props.render=="templates") {
            updateIndividualTemplateWorkflow({ id: workflowId, workflowName: workflowName, questionnaireList: temp, createdAt: props.workflow.createdAt })
            .then(function (response) {
                window.location.reload(false)
            })
            .catch(function (error) {
                console.log("ERROR UPDATING WORKFLOW")
            })
        }
        else if (props.render=="assigned") {
            updateIndividualAssignedWorkflow({ workflowName: workflowName, questionnaireList: temp })
            .then(function (response) {
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
                            <input defaultValue={workflowName} onChange={e => setworkflowName(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workflowname" type="text" />
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
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex justify-center">
                            <label onClick={() => {handleUpdate()}} htmlFor="UpateWorkflow" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
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