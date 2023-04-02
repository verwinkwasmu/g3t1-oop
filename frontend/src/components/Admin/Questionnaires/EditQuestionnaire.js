import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { MdHomeFilled, MdChecklist, MdDescription, MdGroup } from "react-icons/md";


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

    <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
            <div className="bg-white">
              <div className="flex flex-wrap mt-10 mb-6"> 
                <div className="mr-3">
                        <MdDescription size={50} color="3278AE" />
                  </div>
                  <div className="flex-auto">
                        {/* <p className="font-thin mt-1">ID: {workflowId}</p> */}
                        <h2 className="text-3xl font-semibold text-blue">{questionnaire.title}</h2>
                  </div>
              </div>
            </div>
        <div className="overflow-y-auto max-h-96">
        <form onSubmit={handleFormSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData?.title ?? questionnaire.title}
              onChange={handleFormChange}
              className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"
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
              className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"

            />
          </label>
          <label>
            Assigned Admin ID:
            <input
              type="text"
              name="assignedAdminId"
              value={formData?.assignedAdminId ?? questionnaire.assignedAdminId}
              onChange={handleFormChange}
              className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"

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
                    className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"

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
                        className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline"

                    />
                  </div>
                ))}
              </div>
            )
          )}
          <div className="p-2">
            <button className="btn btn" type="submit">Save</button>


          </div>
        </form>
      </div>
    </div>


     
    </>
  );
};

export default EditQuestionnaire;
