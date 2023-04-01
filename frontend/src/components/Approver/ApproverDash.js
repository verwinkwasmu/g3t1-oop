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
                // console.log(response.data)
                    setWorkflowsData(response.data)
                
            }).catch(error =>{
                console.log("FAIL")
                setWorkflowsData([])
            })
        
        // eslint-disable-next-line
    }, [])


    console.log("WORKFLOWSDATA")
    console.log(workflowsData)

    const toWorkflowView = (workflow) => {
        console.log("===== INSIDE toWorkflowView =====")
        navigate(`/workflow-assigned/${workflow.id}`, { state: { workflow: workflow } });
    }

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <p className="text-3xl font-semibold text-blue">Workflows for Approval</p>
                        </div>
                        <div className="flex ">
                            {/* <CreateWorkflow></CreateWorkflow> */}
                        </div>
                    </div>

                    {/* <h1 className="text-3xl font-semibold text-blue pb-6">Workflows</h1> */}

                    <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {(workflowsData).map(workflow =>
                            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                                <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                                <div className="card-body m-1.5">
                                    <h2 className="card-title">{workflow.workflowName}</h2>
                                    <p className="text-base">
                                        Lorem Ipsum
                                    
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>

    )
}

export default ApproverDash;