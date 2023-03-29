import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const baseURL = "http://localhost:8080/api/v1/questionnaire";
const updateBaseURL = "http://localhost:8080/api/v1/questionnaire/update"

export default function ViewIndivQuestionnaire(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const [questionnaire, setQuestionnaire] = useState(null);
    const  id  = useParams()
    const fromAssigned = location.state.fromAssigned;
    const workflowId = location.state.workflowId

    console.log(location.state)

    // console.log('RAHRAHRA')
    // console.log(workflowId)
    // console.log(fromAssigned)

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

            <button onClick={() => handleEditClick(questionnaire.id)}>Edit Questionnaire</button>

            {/* <Link to={`/vendor/questionnaires/edit-questionnaire/${questionnaire.id}`}>
                <p>edit for vendor test</p>
            </Link> */}

            {fromAssigned == "fromAssigned" && (
                <div>
                    <button onClick={handleAdminApproveClick}>APPROVE</button>
                    <button onClick={handleAdminRejectClick}>REJECT</button>
                </div>
               
            )}

            

            {/* Display the rest of the questionnaire data */}
        </div>
    );
}
