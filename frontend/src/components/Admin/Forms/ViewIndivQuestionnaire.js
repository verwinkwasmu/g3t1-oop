import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseURL = "http://localhost:8080/api/v1/questionnaire";

export default function ViewIndivQuestionnaire(props) {
    const [questionnaire, setQuestionnaire] = useState(null);
    const  id  = useParams()

    useEffect(() => {

        const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/${id.id}`);
            setQuestionnaire(response.data);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [id.id]);

    if (!questionnaire) return null;

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
