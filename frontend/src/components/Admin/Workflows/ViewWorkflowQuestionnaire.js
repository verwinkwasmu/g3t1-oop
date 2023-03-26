import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const questionnaireBaseURL = "http://localhost:8080/api/v1/questionnaire";
const workflowBaseURL = "http://localhost:8080/api/v1/workflow";

export default function ViewWorkflowQuestionnaire(questionnaireId) {
    const [questionnaire, setQuestionnaire] = useState(null);
    const[workflow, setWorkflow] = useState(null);
    const id = useParams();

    useEffect(() => {
        console.log("view workflow")

        const fetchData = async () => {
        try {
            const response = await axios.get(`${workflowBaseURL}/${id.id}`);
            console.log(response.data)
            setWorkflow(response.data);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [id.id]);

    // get list of all questionnaire ids in workflow 
    // loop thru as input to axios get 

    useEffect(() => {
        console.log("view workflow questionnaire")
        console.log(workflow.questionnaireList)


        workflow.questionnaireList.forEach(async (id) => {
        try {
            const response = await axios.get(`${questionnaireBaseURL}/${id}`);
            console.log(response.data)
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
        });
    });

    if (!questionnaire) return null;
    if (!workflow) return null;

    return (
        <div>
            <h2>{questionnaire.title}</h2>
            <p>{questionnaire.status}</p>
            <p>{questionnaire.assignedVendor}</p>
            <p>{questionnaire.assignedAdmin}</p>
            <p>{questionnaire.createdAt}</p>


            {/* Display the rest of the questionnaire data */}
        </div>
    );
}
