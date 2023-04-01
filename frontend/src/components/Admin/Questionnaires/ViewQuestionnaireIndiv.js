// VIEW indiv QUESTIONNAIRES FROM FORMDASH
// no need ot distinguish wehther assiged or not


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewQuestionnaireIndiv = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useParams();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/questionnaire/${id.id}`
        );
        setQuestionnaire(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchQuestionnaire();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, there was an error: {error.message}</div>;
  }

  if (!questionnaire) {
    return <div>Questionnaire not found.</div>;
  }

  return (
    <div>
      <h1>Questionnaire Details</h1>
      <p>Title: {questionnaire.title}</p>
      <p>Assigned Vendor ID: {questionnaire.assignedVendorId}</p>
      <p>Assigned Admin ID: {questionnaire.assignedAdminId}</p>
      {Object.entries(questionnaire.questionsAndAnswers).map(
        ([questionId, question]) => (
          <div key={questionId}>
            <p>Prompt: {question.prompt}</p>
            <ul>
              {Object.entries(question.options).map(([optionId, option]) => (
                <li key={optionId}>{option.value}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default ViewQuestionnaireIndiv;
