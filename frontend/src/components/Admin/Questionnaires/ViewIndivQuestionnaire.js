import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, withRouter} from "react-router-dom";


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
    const  id  = useParams()
    const workflowId = location.state.workflowId


    // console.log("from assigned" + fromAssigned)
    // console.log("workflowId" + workflowId)


    console.log(user)

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

    if (!questionnaire) return null;

    const handleAdminApproveClick = async () => {
        console.log("CLICKING")
        const updatedQuestionnaire = {
            ...questionnaire,
            status: "ADMIN_APPROVED"
        };

        // change the id to the id gotten from workflow
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
        { state: {   
            workflowId: workflowId
        }});    
    }

    return (
        <div>
            <h2>{questionnaire.title}</h2>
            <p>{questionnaire.status}</p>
            <p>{questionnaire.assignedVendorId}</p>
            <p>{questionnaire.assignedAdminId}</p>
            <p>{questionnaire.createdAt}</p>


            {/* <Link to={`/vendor/questionnaires/edit-questionnaire/${questionnaire.id}`}>
                <p>edit for vendor test</p>
            </Link> */}

            {user.userType == "ADMIN" && (
                <div>
                    <button onClick={handleAdminApproveClick}>APPROVE</button>
                    <button onClick={handleAdminRejectClick}>REJECT</button>
                </div>
               
            )}

            {user.userType == "VENDOR" && (
                <div>
                    <button onClick={() => handleEditClick(questionnaire.id)}>Edit Questionnaire</button>
                </div>
                        
            )}


            

            {/* Display the rest of the questionnaire data */}
        </div>
    );
}
