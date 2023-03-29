import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import CreateWorkflow from "./CreateWorkflow"
import { getWorkflows, getAssignedWorkflows } from '../../../apiCalls';

function WorkflowDash() {

    const navigate = useNavigate();

    const [workflowsData, setWorkflowsData] = useState([]);
    const [render, setRender] = useState("");

    useEffect(() => {
        document.title = 'Workflows Dashboard'
        setRender("Templates");

        getWorkflows()
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    setWorkflowsData(response.data)
                } else {
                    setWorkflowsData([])
                }
            })

        // eslint-disable-next-line
    }, [])

    console.log("WORKFLOWSDATA")
    console.log(workflowsData)

    const renderTemplates = () => {
        console.log("RENDER TEMPLATES")
        setRender("Templates");

        getWorkflows()
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    setWorkflowsData(response.data)
                } else {
                    setWorkflowsData([])
                }
            })
    }

    const renderAssigned = () => {
        console.log("RENDER ASSIGNED")
        setRender("Assigned");

        getAssignedWorkflows()
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    setWorkflowsData(response.data)
                } else {
                    setWorkflowsData([])
                }
            })
    }

    const toWorkflowView = (workflow) => {
        console.log("===== INSIDE toWorkflowView =====")

        if (render == "Templates") {
            navigate(`/workflow-templates/${workflow.id}`, { state: { workflowId: workflow.id } });
        }
        else {
            navigate(`/workflow-assigned/${workflow.id}`, { state: { workflowId: workflow.id } });
        }
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white h-full overflow-y-auto">

                    <div className="flex justify-between mb-5">
                        <div className="flex">
                            <h1 className="text-3xl font-semibold text-blue mr-5">Workflows
                                <span hidden={render == "Templates" ? false : true}>: Templates</span>
                                <span hidden={render != "Templates" ? false : true}>: Assigned</span>
                            </h1>
                            <div className="pb-2 inline-flex">
                                <button onClick={() => renderTemplates()} hidden={render == "Templates" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    See Templates
                                </button>
                                <button onClick={() => renderAssigned()} hidden={render != "Templates" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    See Assigned
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <CreateWorkflow></CreateWorkflow>
                        </div>
                    </div>
                    <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {(workflowsData).map(workflow =>
                            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                                <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                                <div className="card-body m-1.5">
                                    <h2 className="card-title">{workflow.workflowName}</h2>
                                    <p className="text-base text-md">{workflow.workflowDescription}</p>
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

export default WorkflowDash;