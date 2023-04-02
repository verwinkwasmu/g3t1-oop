import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, withRouter} from "react-router-dom";
import { IoGitPullRequestOutline } from 'react-icons/io5';
import { getIndividualAssignedWorkflow } from '../../../apiCalls';
import { Link } from "react-router-dom";
import useToken from "../../../useToken";

// VIEWS ASSIGNED QUESTIONNAIRES FROM ASSIGNED WORKFLOWS 

const baseURL = "http://localhost:8080/api/v1/questionnaire";
const updateBaseURL = "http://localhost:8080/api/v1/workflow/assigned"


export default function ViewIndivQuestionnaire(props) {
    console.log("IN INDIV QUESTIONNAIRE VIEW")


    // const user = localStorage.getItem('token');
    const user = useToken().token;
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state)
    console.log(user)


    const [questionnaire, setQuestionnaire] = useState(null);
    const [workflow, setWorkflow] = useState([])
    const [feedback, setFeedback] = useState([])
    const  id  = useParams()

    const workflowId = location.state.workflowId
    const fromAssigned = location.state.fromAssigned
    const questionnaireId = location.state.questionnaireId

    // console.log(userInfo)

    useEffect(() => {
        const getQuestionnaire = async () => {
            console.log('I AM GETTING QUESTIONNNAIRES BY ID FROM WORKFLOW')

            try {
                const response = await axios.get(`${baseURL}/${questionnaireId}`);
                setQuestionnaire(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        getQuestionnaire();
    }, [id.id]);
   

    useEffect(() => {
        getIndividualAssignedWorkflow(workflowId)
            .then(function (response) {
                // console.log(response.data)
                setWorkflow(response.data)
                console.log('HI WORKFLOW HERE')
                console.log(workflow)

            })
        // eslint-disable-next-line
    }, [])

    if (!questionnaire) return null;

    const handleAdminApproveClick = async () => {
        console.log("CLICKING")
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "ADMIN_APPROVED"
        };

        // change the id to the id from workflow
        try {
            const response = await axios.put(`${baseURL}/update`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // add in feedback field 
    const handleAdminRejectClick = async () => {
        console.log("CLICKING reject")
        console.log(feedback)
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "RETURNED",
            feedback: feedback

        };
        // change the id to the id gotten from workflow
        console.log("weeheeeheehee")
        console.log(updatedQuestionnaire)
        try {
            const response = await axios.put(`${baseURL}/update`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleApproverApproveClick = async () => {
        console.log("CLICKING")
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "APPROVER_APPROVED"
        };

        // change the id to the id from workflow
        try {
            const response = await axios.put(`${baseURL}/update`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // add in feedback field 
    const handleApproverRejectClick = async () => {
        console.log("CLICKING reject")
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "RETURNED",
            feedback: feedback
        };
        // change the id to the id gotten from workflow

        try {
            const response = await axios.put(`${baseURL}/update`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleEditClick = (questionnaireId) => {
        navigate(`/vendor/questionnaires/edit-questionnaire/${questionnaireId}`, 
        { state: {   
            workflowId: workflowId,
            questionnaireId: questionnaireId
        }});    
    }

    const checkStatusBadge = (status) => {
        if (status=="SUBMITTED") {
            return "badge badge-primary"
        }
        else if (status=="ADMIN_APPROVED") {
            return "badge badge-secondary"
        }
        else if (status=="RETURNED") {
            return "badge badge-error"
        }
        else if (status=="APPROVER_APPROVED") {
            return "badge badge-accent"
        }
        else {
            return "badge"
        }
    }



    // for vendor view first 
    // show workflow name + questionnaire name 
    // edit button 
    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    {/* from ssigned should show edit button, approve, reject button for answers */}
                    {/* else its just view of template for admin and approver only  */}
                    {/* {fromAssigned == "fromAssigned" && (

                    )} */}

                    {/* for vendor and for assigned to show edit button and workflow name */}
                    {/* if there are already answers, i want an update button, if not i want edit button */}
                    {user[1] == "VENDOR" && (
                        <div className="flex flex-wrap mt-10 mb-6">
                            <div className="mr-3">
                                <IoGitPullRequestOutline size={70} color="3278AE" />
                            </div>
                            <div className="flex-auto">
                                <p className="font-thin mt-1">ID: {workflowId}</p>
                                <h2 className="text-3xl font-semibold text-blue">{workflow.workflowName}</h2>
                            </div>


                            <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                                <div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-blue">{questionnaire.title}</h2>
                                        <span className={checkStatusBadge(questionnaire.status)}>{questionnaire.status}</span>
                                    </div>
                                    <p>{questionnaire.assignedVendorId}</p>
                                </div>
                                <div>

                                    <p className="text-xl font-semibold text-blue">{questionnaire.assignedVendorId}</p>

                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                    <ul>
                                        {Object.keys(questionnaire.questionsAndAnswers).map((questionId) => {
                                        const question = questionnaire.questionsAndAnswers[questionId];
                                        const hasAnswers = question.answers && question.answers.length > 0;
                                        return (
                                            <li key={questionId}>
                                            <p>Question: {question.prompt}</p>
                                            {question.options.length > 0 && (
                                                <ul>
                                                {question.options.map((option, index) => (
                                                    <li key={index}>{option.label}</li>
                                                ))}
                                                </ul>
                                            )}
                                            <p>Answer: {question.answer}</p>
                                            </li>
                                        );
                                        })}
                                    </ul>
                                    </div>
                                    <div className="text-center mt-6">
                                        {questionnaire.status == "NOT_STARTED" && (
                                            <button className="btn btn-info w-full mb-2" onClick={() => {
                                                handleEditClick(questionnaire.id)
                                            }}>
                                                Start Questionnaire
                                            </button>
                                        )}

                                        {(questionnaire.status == "NOT_STARTED" || questionnaire.status == "RETURNED" || questionnaire.status == "SUBMITTED") && (
                                            <button className="btn btn-info w-full mb-2" onClick={() => {
                                                handleEditClick(questionnaire.id)
                                            }}>
                                                Update Questionnaire
                                            </button>
                                           
                                        )}

                                        {questionnaire.status == "RETURNED" && (
                                        <div>
                                            <button className="btn btn-info w-full mb-2" onClick={() => handleEditClick(questionnaire.id)}>
                                            Update Questionnaire
                                            </button>
                                            
                                            <p>{questionnaire.feedback}</p>
                                        </div>
                                        )}
                                        {(questionnaire.status == "ADMIN_APPROVED" || questionnaire.status == "APPROVER_APPROVED") && (
                                              <button className="btn w-full mb-2" disabled>
                                                Update Questionnaire
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>   
                    )}
                    {/* for admin view, add approve button  */}
                    {(user[1] == "ADMIN" || user[1] == "APPROVER") && (
                        <div className="flex flex-wrap mt-10 mb-6">
                            <div className="mr-3">
                                <IoGitPullRequestOutline size={70} color="3278AE" />
                            </div>
                            <div className="flex-auto">
                                <p className="font-thin mt-1">ID: {workflowId}</p>
                                <h2 className="text-3xl font-semibold text-blue">{workflow.workflowName}</h2>
                            </div>


                            <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">{questionnaire.title}</h2>
                                    <span className={checkStatusBadge(questionnaire.status)}>{questionnaire.status}</span>
                                    <p>{questionnaire.assignedVendorId}</p>
                                </div>
                                <div>

                                    <p className="text-xl font-semibold text-blue">{questionnaire.assignedVendorId}</p>

                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                    <ul>
                                        {Object.keys(questionnaire.questionsAndAnswers).map((questionId) => {
                                        const question = questionnaire.questionsAndAnswers[questionId];
                                        const hasAnswers = question.answers && question.answers.length > 0;
                                        return (
                                            <li key={questionId}>
                                            <p>Question: {question.prompt}</p>
                                            {question.options.length > 0 && (
                                                <ul>
                                                {question.options.map((option, index) => (
                                                    <li key={index}>{option.label}</li>
                                                ))}
                                                </ul>
                                            )}
                                            <p>Answer: {question.answer}</p>
                                            </li>
                                        );
                                        })}
                                    </ul>
                                    </div>
                                    <div className="text-center mt-6">
                                        {questionnaire.status == "NOT_STARTED" || questionnaire.status == "RETURNED" && (
                                            <div>
                                                <button className="btn w-full mb-2" disabled>
                                                    APPROVE
                                                </button>

                                                <button className="btn w-full mb-2" disabled>
                                                    REJECT
                                                </button>
                                                
                                            </div> 
                                        )}

                                        {(questionnaire.status == "SUBMITTED") && (
                                            <div>
                                                <button className="btn btn-success w-full mb-2" onClick={() => {
                                                handleAdminApproveClick(questionnaire.id)
                                                }}>
                                                    APPROVE
                                                </button>

                                                <button className="btn btn-warning w-full mb-2" onClick={() => {
                                                    handleAdminRejectClick(questionnaire.id)
                                                }}>
                                                    REJECT
                                                </button>
                                                {/* add lbel */}
                                                <input type="text" name="feedback" onChange={(e) => {
                                                    setFeedback([e.target.value])
                                                }}>
                                                    
                                                </input>

                                            </div>
                                    
                                        )}
                                        {(questionnaire.status == "ADMIN_APPROVED") && (
                                              <div>
                                              <button className="btn btn-success w-full mb-2" onClick={() => {
                                              handleApproverApproveClick(questionnaire.id)
                                              }}>
                                                  APPROVE
                                              </button>

                                              <button className="btn btn-warning w-full mb-2" onClick={() => {
                                                  handleApproverRejectClick(questionnaire.id)
                                              }}>
                                                  REJECT
                                              </button>
                                              {/* add label */}
                                              <input type="text" name="feedback" onChange={(e) => {
                                                    setFeedback([e.target.value])
                                                }}>
                                                </input>
                                                {console.log("feedback" + feedback)}

                                          </div>
                                        )}
                                        {/* {(questionnaire.status == "ADMIN_APPROVED" || questionnaire.status == "APPROVER_APPROVED") && (
                                              <button className="btn w-full mb-2" disabled>
                                                Update Questionnaire
                                            </button>
                                        )} */}

                                    </div>
                                </div>
                            </div>
                        </div>   
                    )}
                </div>
            </div>      
        </>
    );

}