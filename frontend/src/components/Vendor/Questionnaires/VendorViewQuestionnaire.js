import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/api/v1/questionnaire";

export default function VendorViewIndivQuestionnaire() {
    const [questionnaire, setQuestionnaire] = useState(null);
    const id = useParams();
    const navigate = useNavigate();

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

    const handleEditClick = (questionnaireId) => {
        navigate(`/vendor/questionnaires/edit-questionnaire/${questionnaireId}`);
    };

    return (
        <div>
            <h2>{questionnaire.title}</h2>
            <p>{questionnaire.status}</p>
            <p>{questionnaire.assignedVendorId}</p>
            <p>{questionnaire.createdAt}</p>

            <button onClick={() => handleEditClick(questionnaire.id)}>Edit Questionnaire</button>
        </div>
    );
}
