import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { getWorkflows, getAssignedWorkflowsByStatus } from '../../apiCalls';


function ApproverDash() {

    const navigate = useNavigate();
    const [workflowsData, setWorkflowsData] = useState([]);

    useEffect(() => {
        document.title = 'Workflows Dashboard'
            getAssignedWorkflowsByStatus("FLAGGED")
            .then(function (response) {
                    setWorkflowsData(response.data)
                
            }).catch(error =>{
                setWorkflowsData([])
            })
        
        // eslint-disable-next-line
    }, [])

    const toWorkflowView = (workflow) => {
        navigate(`/workflow-assigned/${workflow.id}`, { state: { workflowId: workflow.id } });
    }

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <p className="text-3xl font-semibold text-blue">Workflows for Approval</p>
                        </div>
                    </div>

                    <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {(workflowsData).map(workflow =>
                            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                                <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                                <div className="card-body m-1.5">
                                    <h2 className="card-title">{workflow.workflowName}</h2>
                                    <p className="text-base">
                                        Vendor: {workflow.assignedVendorId}
                                        <br/>
                                        Admin: {workflow.assignedAdminId}
                                        <br/>
                                        Flagged on: {workflow.approvalRequestDate}
                                    
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <h2 hidden={workflowsData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No workflows for approval.</h2>
                </div>
            </div>
        </>

    )
}

export default ApproverDash;