import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, withRouter} from "react-router-dom";
import { IoGitPullRequestOutline } from 'react-icons/io5';
import { getIndividualAssignedWorkflow } from '../../../apiCalls';
import { Link } from "react-router-dom";




const baseURL = "http://localhost:8080/api/v1/questionnaire";
const updateBaseURL = "http://localhost:8080/api/v1/workflow/assigned"

// LOOK INTO HOW TO TOGGLE BETWEEN VIEWS FOR EACH USER

export default function ViewIndivQuestionnaire(props) {
    console.log("IN INDIV QUESTIONNAIRE VIEW")


    const user = localStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state)


    const [questionnaire, setQuestionnaire] = useState(null);
    const [questionnaireList, setQuestionnaireList] = useState([])
    const [questionnaireIds, setQuestionnaireIds] = useState([])
    const [workflow, setWorkflow] = useState([])
    const  id  = useParams()
    // const workflowId = location.state.workflowId
    // const fromAssigned = location.state.fromAssigned
    const workflowId = "6423ab06d584603b9785a1de"
    const fromAssigned = "fromAssigned"


    // console.log("from assigned" + fromAssigned)
    // console.log("workflowId" + workflowId)

    const userInfo = JSON.parse(user)

    console.log(userInfo)

    // need to get questionnaire id from workflow id
    // then get from quesrionnaire table 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/${id.id}`);
                setQuestionnaire(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id.id]);


    useEffect(() => {
        getIndividualAssignedWorkflow(workflowId)
            .then(function (response) {
                // console.log(response.data)
                setWorkflow(response.data)
                console.log('HI WORKFLOW HERE')
                console.log(workflow)

                const temp = [];
                for (const index in workflow.questionnaires) {
                    temp.push(workflow.questionnaires[index].id);
                    console.log("HI HELP")
                }
                setQuestionnaireIds(temp);
                console.log(questionnaireIds)
            })
        // eslint-disable-next-line
    }, [])

    useEffect(() =>{
        const getQuestionnaires = async () => {
            console.log('I AM GETTING QUESTIONNNAIRES BY ID FROM WORKFLOW')
            
            const result = [];
            for(const id of workflow.questionnaireList){
                const response = await axios.get(`${baseURL}/${id}`)
                console.log(response.data)
                result.push(response.data)
            }
            setQuestionnaireList(result)
        }
        getQuestionnaires();
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
            const response = await axios.put(`${updateBaseURL}`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAdminRejectClick = async () => {
        console.log("CLICKING")
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "RETURNED"
        };
        // change the id to the id gotten from workflow
        try {
            const response = await axios.put(`${updateBaseURL}`, updatedQuestionnaire);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleEditClick = (questionnaireId) => {
        navigate(`/vendor/questionnaires/edit-questionnaire/${questionnaireId}`, 
        // { state: {   
        //     workflowId: workflowId
        // }
        // }
        );    
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
                    {userInfo.userType == "VENDOR" && (
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
                                        <button className="btn w-full mb-2" onClick={() => {
                                            handleEditClick(questionnaire.id)
                                        }}>
                                        {questionnaire.status == "NOT_STARTED" ? 'Start Questionnaire' : 'Update Questionnaire'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>   
                    )}
 


                </div>
            </div>
        
        
        
        
        
        </>



    );

    // return (
    //     <div>
    //         <h2>{questionnaire.title}</h2>
    //         <p>{questionnaire.status}</p>
    //         <p>{questionnaire.assignedVendorId}</p>
    //         <p>{questionnaire.assignedAdminId}</p>
    //         <p>{questionnaire.createdAt}</p>


    //         {/* <Link to={`/vendor/questionnaires/edit-questionnaire/${questionnaire.id}`}>
    //             <p>edit for vendor test</p>
    //         </Link> */}

    //         {user.userType == "ADMIN" && (
    //             <div>
    //                 <button onClick={handleAdminApproveClick}>APPROVE</button>
    //                 <button onClick={handleAdminRejectClick}>REJECT</button>
    //             </div>
               
    //         )}

    //         {user.userType == "VENDOR" && (
    //             <div>
    //                 <button onClick={() => handleEditClick(questionnaire.id)}>Edit Questionnaire</button>
    //             </div>
                        
    //         )}


            

    //         {/* Display the rest of the questionnaire data */}
    //     </div>
    // );
}
