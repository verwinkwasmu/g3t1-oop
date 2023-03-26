import React, { useState } from 'react';

import { BsGear } from "react-icons/bs";

function UpateWorkflow(props) {

    const [attachedUserId, setattachedUserId] = useState(props.workflow.attachedUserId);
    const [workflowName, setworkflowName] = useState(props.workflow.workflowName);
    const [questionnaireList, setworkflowList] = useState(props.workflow.questionnaireList);

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
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="userid">
                                User ID
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userid" type="text" defaultValue={attachedUserId} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowname">
                                Workflow Name
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workflowname" type="text" defaultValue={workflowName} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin" htmlFor="forms">
                                Forms
                            </label>
                            <label className="block text-gray-700 text-xs font-thin mb-2" htmlFor="description">
                                Separate forms with a comma (,)
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="forms" type="text" defaultValue={questionnaireList.join(", ")} />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="UpateWorkflow" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
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