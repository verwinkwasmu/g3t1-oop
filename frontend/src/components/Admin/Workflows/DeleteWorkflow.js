import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import { AiOutlineDelete } from "react-icons/ai";

import { deleteWorkflow } from '../../../apiCalls';

function DeleteWorkflow(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const workflowsData = location.state.workflow;
    console.log(workflowsData)

    // useEffect(() => {
    //     document.title = 'Delete Workflow'

    //     deleteWorkflow(workflowsData.id)
    //         .then(function (response) {
    //             console.log(response.data)
    //             // if (response.data.length > 0) {
    //             //     setWorkflowsData(response.data)
    //             // } else {
    //             //     setWorkflowsData([])
    //             // }
    //         })

    //     // eslint-disable-next-line
    // }, [])

    // console.log("WORKFLOWSDATA")
    // console.log(workflowsData)

    // const [workflowToRemove, setWorkflowToRemove] = useState(props.workflow);

    const deleteWorkflow = (workflowObject) => {
        console.log("INSIDE DELETE WORKFLOW");

        document.title = 'Delete Workflow'

        deleteWorkflow(workflowsData.id)
            .then(function (response) {
                console.log(response.data)
            })

            // eslint-disable-next-line
    }

    return (
        <>
            <label htmlFor="DeleteWorkflow" className="btn bg-red border-transparent rounded-full mr-2">
                <AiOutlineDelete size={20} className="mr-3"></AiOutlineDelete>
                    Delete Workflow
                </label>
            
            <input type="checkbox" id="DeleteWorkflow" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="DeleteWorkflow" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Confirm Deletion</h1>
                <form>
                <div className="mb-4">

                    <label className="block text-gray-700 text-lg font-thin my-7 text-center" htmlFor="userid">
                        Are you sure you want to delete this workflow?
                    </label>
                </div>
                <div className="flex justify-center">
                    <label htmlFor="DeleteWorkflow" onClick={() => deleteWorkflow(workflowsData)} className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
                        Confirm Deletion
                    </label>
                </div>
                </form>
            </div>
            </div>
        </>
        
    )
}

export default DeleteWorkflow;