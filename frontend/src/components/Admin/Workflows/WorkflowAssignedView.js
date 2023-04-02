import { IoGitPullRequestOutline } from 'react-icons/io5';
import { MdKeyboardArrowLeft } from 'react-icons/md'

import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';
import FlagApproval from './FlagApproval';
import SubmitReview from '../../Approver/SubmitReview';
import SaveWorkflowAsPDF from './SaveWorkflowAsPDF';
import { getIndividualAssignedWorkflow } from '../../../apiCalls';

import useToken from '../../../useToken';

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
                // console.log(response.data)
                setWorkflowsData(response.data)
                console.log("KILL ME")
                console.log(response.data)
                console.log(response.data.questionnaires)

                const temp = [];
                for (const index in response.data.questionnaires) {
                    temp.push(
                        [response.data.questionnaires[index].id,
                        response.data.questionnaires[index].title,
                        response.data.questionnaires[index].status,
                        response.data.questionnaires[index].submissionDeadline]
                    );
                }
                setQuestionnaireTitles(temp);
                console.log(questionnaireTitles)
            })
        // eslint-disable-next-line
    }, [])

    const approverReviewStatus = workflowsData.approverReviewStatus;

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

    const formatDate = (dateTime) => {
        const splitFirst = dateTime.split("T");
        const date = splitFirst[0];
        const dateSplit = date.split("-");
        return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0] + ", " + splitFirst[1];
    }

    const toWorkflowDash = () => {
        navigate(`/workflows`);
    }

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-8 px-20 shadow-2xl">
                <div className="bg-white h-full overflow-y-auto">
                    <div id="back">
                        <button className="text-blue flex hover:opacity-75"
                            onClick={
                                () => { toWorkflowDash() }
                            }
                        >
                            <MdKeyboardArrowLeft className="font-bold"></MdKeyboardArrowLeft>
                            <span className="text-xs font-semibold">BACK TO WORKFLOWS DASH</span>
                        </button>
                    </div>
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
                                {approverReviewStatus != "FLAGGED" ? <UpdateWorkflow workflow={workflowsData} render="assigned"></UpdateWorkflow> : null}
                                <FlagApproval workflow={workflowsData}></FlagApproval>
                                <SaveWorkflowAsPDF workflow={workflowsData}></SaveWorkflowAsPDF>
                                {approverReviewStatus != "FLAGGED" ? <DeleteWorkflow workflow={workflowsData} render="assigned"></DeleteWorkflow> : null}
                            </span>
                            <span hidden={token[1] == "APPROVER" ? false : true}>
                                <SubmitReview workflow={workflowsData} />
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 gap-x-2 gap-y-8">
                        <ul className="steps steps-vertical lg:steps-horizontal my-7">
                            {(questionnaireTitles).map(questionnaireTitle =>
                                <li className={checkStatusSteps(questionnaireTitle[2])} key={questionnaireTitle[0]}>{questionnaireTitle[1]}</li>
                            )}
                        </ul>
                    </div>
                    <div className='grid grid-rows-1 gap-2 grid-cols-2 my-5'>
                        <div className="card w-full bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Included Questionnaires</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                        <table>
                                            <tbody>
                                                {console.log(questionnaireTitles)}
                                                {(questionnaireTitles).map(questionnaireTitle =>
                                                    <div key={questionnaireTitle[0]}>
                                                        <tr className="card-title mb-2 text-lg font-normal">{
                                                            questionnaireTitle[1]}
                                                            <span className={checkStatusBadge(questionnaireTitle[2])}>{questionnaireTitle[2]}</span>
                                                        </tr>
                                                        <tr className='text-md italic'>
                                                            Deadline: {formatDate(questionnaireTitle[3])}
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