import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { MdRemoveRedEye, MdEdit } from 'react-icons/md';

import { getWorkflows, getAssignedWorkflowsByAdminId, getQuestionnairesByAdminId } from '../../apiCalls';

import useToken from '../../useToken';

function AdminDash() {

    const navigate = useNavigate();

    const accountId = useToken().token[0];
    const accountType = useToken().token[1];

    useEffect(() => {
        document.title = 'Admin Dashboard'

        getAssignedWorkflowsByAdminId(accountId)
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    setCurrentWorkflowsView("ACTIVE")
                    setCurrentWorkflowsData(response.data.filter(w => w.approverReviewStatus == "INITIAL_DRAFT" || w.approverReviewStatus == "REJECTED"))
                    setWorkflowsData(response.data)
                } else {
                    setWorkflowsData([])
                }
            })
        
        getQuestionnairesByAdminId(accountId)
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length > 0) {
                    setCurrentQuestionnairesView("ACTIVE")
                    setCurrentQuestionnairesData(response.data.filter(qnnaire => (qnnaire.assignedTo == "VENDOR" && qnnaire.status == "SUBMITTED") || (qnnaire.assignedTo == "ADMIN" && (qnnaire.status == "NOT_STARTED" || qnnaire.status == "RETURNED"))))
                    setQuestionnairesData(response.data)
                } else {
                    setQuestionnairesData([])
                }
            })

        // eslint-disable-next-line
    }, [])

    const [workflowsData, setWorkflowsData] = useState([]);
    const [questionnairesData, setQuestionnairesData] = useState([]);
    const [currentWorkflowsData, setCurrentWorkflowsData] = useState([]);
    const [currentQuestionnairesData, setCurrentQuestionnairesData] = useState([]);
    const [currentWorkflowsView, setCurrentWorkflowsView] = useState("ACTIVE");
    const [currentQuestionnairesView, setCurrentQuestionnairesView] = useState("ACTIVE");

    const toggleWorkflowsView = (status) => {
        if (status == "ACTIVE") {
            console.log('inside ACTIVE toggle')
            setCurrentWorkflowsData(workflowsData.filter(w => w.approverReviewStatus == "INITIAL_DRAFT" || w.approverReviewStatus == "REJECTED"))
        } else if (status == "PENDING") {
            setCurrentWorkflowsData(workflowsData.filter(w => w.approverReviewStatus == "FLAGGED"))
        }
        setCurrentWorkflowsView(status);
    }

    const toggleQuestionnairesView = (status) => {
        if (status == "ACTIVE") {
            setCurrentQuestionnairesData(questionnairesData.filter(qnnaire => (qnnaire.assignedTo == "VENDOR" && qnnaire.status == "SUBMITTED") || (qnnaire.assignedTo == "ADMIN" && (qnnaire.status == "NOT_STARTED" || qnnaire.status == "RETURNED"))))
        } else if (status == "PENDING") {
            setCurrentQuestionnairesData(questionnairesData.filter(qnnaire => qnnaire.status == "ADMIN_APPROVED"))
        }
        setCurrentQuestionnairesView(status);
    }

    const toWorkflowView = (workflow) => {
        console.log("===== INSIDE toWorkflowView =====")
        navigate(`/workflow-assigned/${workflow.id}`, { state: { workflowId: workflow.id } });
    }

    const getWorkflowCompletion = (questionnaires) => {
        if (questionnaires != null) {
            var complete = 0; 
            var total = questionnaires != null ? questionnaires.length : 0;

            questionnaires.map((qnnaire, idx)=>{
                if (qnnaire.status != "NOT_STARTED" && qnnaire.status != "RETURNED") { 
                    complete += 1;
                }
            })
            return `${complete} / ${total}`;
        } else {
            return 'nil';
        }
    }

    return (
        <>
        <div className="mx-10 mt-10 pt-8 px-20">

        <h1 className="text-3xl font-semibold text-blue mr-5">Welcome, Admin</h1>

        <div className="mt-10">
            <div className="flex justify-between mb-5">
                <div className="flex">
                    <h1 className="text-xl font-semibold text-blue mr-5">Assigned Workflows
                        <span hidden={currentWorkflowsView == "ACTIVE" ? false : true}>: Active</span>
                        <span hidden={currentWorkflowsView != "ACTIVE" ? false : true}>: Pending Approval</span>
                    </h1>
                </div>
                <div className="pb-2 inline-flex">
                        <button onClick={() => toggleWorkflowsView("ACTIVE")} hidden={currentWorkflowsView == "ACTIVE" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                            Go to Current Active Workflows
                        </button>
                        <button onClick={() => toggleWorkflowsView("PENDING")} hidden={currentWorkflowsView != "ACTIVE" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                            Go to Workflows Pending Approval
                        </button>
                    </div>
            </div>
            <div hidden={currentWorkflowsData.length == 0 ? true : false}>
            <div className="carousel carousel-center p-4 space-x-4 shadow-2xl rounded-box">
            {(currentWorkflowsData).map(workflow =>
                <div className="carousel-item">
                    <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                        <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                        <div className="card-body m-1.5">
                            <h2 className="card-title">{workflow.workflowName}</h2>
                            <div>
                                <p className="text-base">Vendor: {workflow.assignedVendorId}</p>
                                <p className="text-base">Completion Status: {getWorkflowCompletion(workflow.questionnaires)}</p>
                            </div>
                            <p></p> 
                            <div className="card-actions justify-end">
                                <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
                            </div>
                        </div>
                    </div>
                </div> 
            )}
            
            </div>

            </div>
            
            <h2 hidden={currentWorkflowsData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No 
                <span hidden={currentWorkflowsView == "ACTIVE" ? false : true}> active workflows.</span>
                <span hidden={currentWorkflowsView != "ACTIVE" ? false : true}> workflows pending approval.</span>
            </h2>
        </div>

        <div className="mt-10">
            <div className="flex justify-between mb-5">
                <div className="flex">
                    <h1 className="text-xl font-semibold text-blue mr-5">Assigned Questionnaires
                        <span hidden={currentQuestionnairesView == "ACTIVE" ? false : true}>: Active</span>
                        <span hidden={currentQuestionnairesView != "ACTIVE" ? false : true}>: Pending Approval</span>
                    </h1>  
                </div>
                <div className="pb-2 inline-flex">
                    <button onClick={() => toggleQuestionnairesView("ACTIVE")} hidden={currentQuestionnairesView == "ACTIVE" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                        Go to Current Active Questionnaires
                    </button>
                    <button onClick={() => toggleQuestionnairesView("PENDING")} hidden={currentQuestionnairesView != "ACTIVE" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                        Go to Questionnaires Pending Approval
                    </button>
                </div>
            </div>
            <div hidden={currentQuestionnairesData.length == 0 ? true : false} className="rounded-3xl mb-10 py-8 px-20 shadow-2xl">
                <div className="flex flex-wrap text-left">
                    <table className="flex-auto table-fixed divide-y-2 divide-slate-700">
                        <thead>
                            <tr>
                                <th className="p-2">Deadline</th>
                                <th>Questionnaire</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {(currentQuestionnairesData).map(qnnaire =>
                                <tr key={qnnaire.id}>
                                    <td className="p-2">[DEADLINE]</td>
                                    <td className="name">{qnnaire.title}</td>
                                    <td className="workflow"><span className={qnnaire.assignedTo == "VENDOR" ? "font-normal badge bg-blue-500" : "font-normal badge"}>{qnnaire.assignedTo}</span></td>
                                    <td className="status"><span className="badge">{qnnaire.status}</span></td>
                                    <td></td>
                                    <td>
                                        <span hidden={currentQuestionnairesView == "ACTIVE" ? false : true}>
                                            <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"><MdEdit></MdEdit></button>
                                        </span>
                                        <span hidden={currentQuestionnairesView == "PENDING" ? false : true}>
                                            <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"><MdRemoveRedEye></MdRemoveRedEye></button>
                                        </span>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 hidden={currentQuestionnairesData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No 
                <span hidden={currentQuestionnairesView == "ACTIVE" ? false : true}> active questionnaires.</span>
                <span hidden={currentQuestionnairesView != "ACTIVE" ? false : true}> questionnaires pending approval.</span>
            </h2>
        </div>
        </div>
        
        </>
    )
}

export default AdminDash;