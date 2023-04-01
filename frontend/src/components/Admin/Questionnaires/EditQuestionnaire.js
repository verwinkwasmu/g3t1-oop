import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuestionnaire = ({ questionnaireId }) => {

  const navigate = useNavigate();

  const [questionnaire, setQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const id = useParams();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/questionnaire/${id.id}`
        );
        setQuestionnaire(response.data);
        setFormData(response.data); // Initialize formData with current questionnaire
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchQuestionnaire();
  }, [id.id]);

  const handleFormChange = (event) => {
    setFormData({ ...questionnaire, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("TRYIN TO SUBBMIT")
    console.log(formData)
    try {
      await axios.put(
        `http://localhost:8080/api/v1/questionnaire/update`,
        formData
      );
      setIsLoading(false);
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate("/forms");
      }, 3000);
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
    <>
      {updateSuccess && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <div>
              <span>Save Successful.</span>
              <button className="btn btn-square btn-outline" onClick={() => setUpdateSuccess(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
            Assigned Vendor ID:
            <input
              type="text"
              name="assignedVendorId"
              value={
                formData?.assignedVendorId ?? questionnaire.assignedVendorId
              }
              onChange={handleFormChange}
            />
          </label>
          <label>
            Assigned Admin ID:
            <input
              type="text"
              name="assignedAdminId"
              value={formData?.assignedAdminId ?? questionnaire.assignedAdminId}
              onChange={handleFormChange}
            />
          </label>
          {Object.entries(questionnaire.questionsAndAnswers).map(
            ([questionId, question]) => (
              <div key={questionId}>
                <label>
                  Prompt:
                  <input
                    type="text"
                    name={`questionsAndAnswers.${questionId}.prompt`}
                    value={formData?.questionsAndAnswers?.[questionId]?.prompt ?? question.prompt}
                    onChange={handleFormChange}
                  />
                </label>
                {console.log(question.options)}
                {Object.entries(question.options).map(([optionId, option]) => (
                  <div key={optionId}>
                    {console.log("HI IM HERE")}
                    {console.log(optionId)}
                    {console.log(option)}
                    <label>Option</label>
                    {/* {console.log(formData.questionsAndAnswers.options[optionId])} */}
                    <input
                        type="text"
                        name={`options[${optionId}]`}
                        value={formData?.questionsAndAnswers?.[questionId]?.options?.[optionId].value ?? option.value}
                        onChange={handleFormChange}
                    />
                  </div>
                ))}
              </div>
            )
          )}
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default EditQuestionnaire;
