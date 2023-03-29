import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuestionnaireEditor = ({ questionnaireId }) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const  id  = useParams()


  useEffect(() => {
    console.log(id.id)
    const fetchQuestionnaire = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/questionnaire/${id.id}`);
        console.log(response.data)
        setQuestionnaire(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchQuestionnaire();
  }, [questionnaireId]);

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/questionnaires/${questionnaireId}`, formData);
      setIsLoading(false);
      alert("Questionnaire updated successfully!");
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

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
      <h1>Edit Questionnaire</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData?.title ?? questionnaire.title}
            onChange={handleFormChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData?.description ?? questionnaire.description}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default QuestionnaireEditor;