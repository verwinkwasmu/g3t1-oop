import { IoGitPullRequestOutline } from 'react-icons/io5';

import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';
import FlagApproval from './FlagApproval';
import SubmitReview from '../../Approver/SubmitReview';
import { getIndividualAssignedWorkflow } from '../../../apiCalls';

import useToken from '../../../useToken';
import jsPDF from 'jspdf';

function WorkflowAssignedView() {
    console.log("IN ASSIGNED VIEW?")

    const navigate = useNavigate();
    const location = useLocation();
    const token = useToken().token

    const workflowId = location.state.workflowId;
    const [workflowsData, setWorkflowsData] = useState([]);
    const [questionnaireTitles, setQuestionnaireTitles] = useState([]);
    const [workflowAssignedUsers, setWorkflowAssignedUsers] = useState([]);

    console.log(workflowId)

    const handleViewClick = (questionnaireId) => {
        navigate(`/questionnaires/view-indiv-questionnaire/${questionnaireId}`,
            {
                state: {
                    workflowId: workflowId,
                    fromAssigned: "fromAssigned",
                    questionnaireId: questionnaireId

                }
            });
    }

    useEffect(() => {
        getIndividualAssignedWorkflow(workflowId)
            .then(function (response) {
                console.log(response.data)
                setWorkflowsData(response.data)

                const temp = [];
                for (const index in response.data.questionnaires) {
                    temp.push(
                        [response.data.questionnaires[index].id, 
                        response.data.questionnaires[index].title, 
                        response.data.questionnaires[index].status]
                    );
                }
                setQuestionnaireTitles(temp);
            })
        // eslint-disable-next-line
    }, [])

    const checkStatusSteps = (status) => {
        if (status == "SUBMITTED") {
            return "step step-primary"
        }
        else if (status == "ADMIN_APPROVED") {
            return "step step-secondary"
        }
        else if (status == "RETURNED") {
            return "step step-error"
        }
        else if (status == "APPROVER_APPROVED") {
            return "step step-accent"
        }
        else {
            return "step"
        }
    }

    const checkStatusBadge = (status) => {
        if (status == "SUBMITTED") {
            return "badge badge-primary"
        }
        else if (status == "ADMIN_APPROVED") {
            return "badge badge-secondary"
        }
        else if (status == "RETURNED") {
            return "badge badge-error"
        }
        else if (status == "APPROVER_APPROVED") {
            return "badge badge-accent"
        }
        else {
            return "badge"
        }
    }

    const handleSaveAsPDF = (questions) => {
        console.log("saving pdf fuck")
        const doc = new jsPDF({unit: "cm"});
      
        // Define the x and y coordinates for the first question
        let x = 2.54;
        let y = 2.54;
      
        Object.values(questions).forEach((question, index) => {
          doc.text(`${index + 1}. ${question.prompt}`, x, y);
      
          y += 10;
      
          if (question.options.length > 0) {
            question.options.forEach((option) => {
              doc.text(`- ${option.value}`, x + 10, y);
              y += 10;
            });
          }
      
          y += 10;
        });
      
        doc.save('questionnaire.pdf');
      };

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white h-full overflow-y-auto">
                    <div className="flex flex-wrap mt-10 mb-6">
                        <div className="mr-3">
                            <IoGitPullRequestOutline size={70} color="3278AE" />
                        </div>
                        <div className="flex-auto">
                            <p className="font-thin mt-1">ID: {workflowId}</p>
                            <h2 className="text-3xl font-semibold text-blue">{workflowsData.workflowName}</h2>
                        </div>
                        <div className="flex mt-5">
                            <span hidden={token[1] == "ADMIN" ? false : true}>
                                <UpdateWorkflow workflow={workflowsData} render="assigned"></UpdateWorkflow>
                                <FlagApproval workflow={workflowsData}></FlagApproval>
                                <DeleteWorkflow workflow={workflowsData} render="assigned"></DeleteWorkflow>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        <ul className="steps steps-vertical lg:steps-horizontal my-7">
                            {(questionnaireTitles).map(questionnaireTitle =>
                                <li className={checkStatusSteps(questionnaireTitle[2])} key={questionnaireTitle[0]}>{questionnaireTitle[1]}</li>
                            )}
                        </ul>
                    </div>
                    <div className='grid grid-rows-1 grid-cols-2 mt-5'>
                        <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Included Forms</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                        <table>
                                            <tbody>
                                                {(questionnaireTitles).map(questionnaireTitle =>
                                                    <div key={questionnaireTitle[0]}>
                                                        <tr className="card-title mb-2 text-lg font-normal">{
                                                            questionnaireTitle[1]}
                                                            <span className={checkStatusBadge(questionnaireTitle[2])}>{questionnaireTitle[2]}</span>
                                                        </tr>
                                                        <button className="btn btn-link" onClick={() => handleViewClick(questionnaireTitle[0])}>GO TO QUESTIONNAIRE</button>

                                                    </div>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Assigned Users</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left text-blue">
                                        <table>
                                            <tbody>
                                                <tr className="card-title mb-2 text-lg font-normal">Vendor ID: {workflowsData.assignedVendorId != null ? workflowsData.assignedVendorId : "Not Assigned"}</tr>
                                                <tr className="card-title mb-2 text-lg font-normal">Admin ID: {workflowsData.assignedAdminId != null ? workflowsData.assignedAdminId : "Not Assigned"}</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default WorkflowAssignedView;