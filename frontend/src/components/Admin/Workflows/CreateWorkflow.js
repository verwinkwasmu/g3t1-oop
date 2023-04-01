import { IoGitPullRequestOutline } from 'react-icons/io5';

import { React, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

import { createWorkflowTemplate, getQuestionnaires } from '../../../apiCalls';


function CreateWorkflow() {

    const navigate = useNavigate();

    const [workflowName, setWorkflowName] = useState("");
    const [selectedQuestionnaires, setSelectedQuestionnaires] = useState("");
    const [questionnaireOptions, setQuestionnaireOptions] = useState();
    // const [selectedOptions, setSelectedOptions] = useState();

    const validateForm = () => {
        return !(workflowName.length == 0 || selectedQuestionnaires.length == 0);
    }

    // const selectedOptions = [];
    const handleSelect = (data) => {
        setSelectedQuestionnaires(data);
    }

    useEffect(() => {
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

        // eslint-disable-next-line
    }, [])

    const handleCreate = () => {
        console.log("INSIDE HANDLE CREATE");

        const temp = [];
        for (const element of selectedQuestionnaires) {
            temp.push(element.value);
        }

        createWorkflowTemplate({ workflowName: workflowName, workflowList: temp })
            .then(function (response) {
                navigate('/workflows');
            })
            .catch(function (error) {
                console.log("ERROR CREATING WORKFLOW")
            })
    }

    return (
        <>
            <label htmlFor="CreateWorkflow" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <IoGitPullRequestOutline size={20} className="mr-3"></IoGitPullRequestOutline>
                Create New Workflow Template
            </label>

            <input type="checkbox" id="CreateWorkflow" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="CreateWorkflow" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Create New Workflow</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowname">
                                Workflow Name
                            </label>
                            <input onChange={e => setWorkflowName(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workflowname" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin" htmlFor="forms">
                                Questionnaires
                            </label>
                            <Select
                                options={questionnaireOptions}
                                placeholder="Select questionnaire"
                                value={selectedQuestionnaires}
                                onChange={handleSelect}
                                isSearchable={true}
                                isMulti
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="CreateWorkflow" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" onClick={() => handleCreate()} type="button" disabled={!validateForm()}>
                                Create New Workflow
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CreateWorkflow;