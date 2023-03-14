import React, { useState } from 'react';

import { AiOutlineDelete } from "react-icons/ai";

function DeleteWorkflow(props) {

    const [workflowToRemove, setWorkflowToRemove] = useState(props.workflow);

    const deleteWorkflow = (workflowObject) => {
        console.log("INSIDE DELETE WORKFLOW");
        console.log("NAME OF WORKFLOW TO BE DELETED: " + workflowObject.workflowName)
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
                    <label htmlFor="DeleteWorkflow" onClick={() => deleteWorkflow(workflowToRemove)} className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
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