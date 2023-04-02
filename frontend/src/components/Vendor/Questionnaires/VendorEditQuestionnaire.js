import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router';
import axios from 'axios';



const baseURL = "http://localhost:8080/api/v1/questionnaire";
const updateBaseURL = "http://localhost:8080/api/v1/questionnaire/update"


export default function VendorEditQuestionnaire(){

  const navigate = useNavigate();
  const location = useLocation();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const id = useParams()


  // useEffect(() => {
  //   const fetchQuestionnaire = async () => {
  //     const response = await fetch(`${baseURL}/${id.id}`);
  //     const data = await response.json();
  //     console.log(data)
  //     setQuestionnaire(data);
  //   };
  //   fetchQuestionnaire();
  // }, [id.id]);
  // useEffect(() => {
  //   const fetchQuestionnaire = async () => {
  //     const response = await fetch(`${baseURL}/${id.id}`);
  //     const data = await response.json();
  //     console.log("jdcbfjkbbc ")
  //     console.log(data.questionsAndAnswers)
  //     const updatedQuestionsAndAnswers = Object.values(data.questionsAndAnswers).map((question) => ({
  //       ...question,
  //       answers: ''
  //     }));
  //     const updatedQuestionnaire = {
  //       ...data,
  //       questionsAndAnswers: Object.fromEntries(updatedQuestionsAndAnswers.map((question) => [question.id, question]))
  //     };
  //     setQuestionnaire(updatedQuestionnaire);
  //   };
  //   fetchQuestionnaire();
  // }, [id.id]);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const response = await fetch(`${baseURL}/${id.id}`);
      const data = await response.json();
      console.log(data)
      setQuestionnaire(data)
      // const updatedQuestionsAndAnswers = {};
      // for (const [key, value] of Object.entries(data.questionsAndAnswers)) {
      //   updatedQuestionsAndAnswers[key] = { ...value, answer: '' };
      // }
      // console.log("FUDSNDJNVDSNVBCDONVANB")
      // console.log(updatedQuestionsAndAnswers)
      // setQuestionnaire({ ...data, questionsAndAnswers: updatedQuestionsAndAnswers });
    };
    fetchQuestionnaire();
  }, [id.id]);
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('HELLOHELLOHELLO')
    console.log(answers)
    const updatedQuestionsAndAnswers = {};
      for (const [key, value] of Object.entries(questionnaire.questionsAndAnswers)) {
        console.log(key)
        updatedQuestionsAndAnswers[key] = {
          ...value, 
          answer: answers[key] };
      }
    console.log(updatedQuestionsAndAnswers)
    const updatedQuestionnaire = { ...questionnaire, 
        status: "SUBMITTED",
        questionsAndAnswers: updatedQuestionsAndAnswers 
    };
    console.log(updatedQuestionnaire)

    axios.put(`${updateBaseURL}`, updatedQuestionnaire)
    .then(response => {
      console.log('Answers saved successfully', response.data);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate(`/workflows`);

      }, 2000);
    })
    .catch(error => {
      console.error('Error saving questions', error);
    });
  
    // const response = await fetch(`${updateBaseURL}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedQuestionnaire)
    // });
    // if(response){
    //   setSubmitSuccess(true);
    //   navigate(`/workflows`);

    // }
  };
  
  
  const handleChange = (event, questionId) => {
    const { value } = event.target;
    setAnswers((prevState) => ({ ...prevState, [questionId]: value }));
  };

  if (!questionnaire) {
    return <p>Loading...</p>;
  }

  const { title, questionsAndAnswers } = questionnaire;
  console.log(questionsAndAnswers)

  return (
    <div>

      {submitSuccess && (
                  <div className="toast toast-top toast-start">
                    <div className="alert alert-success">
                      <div>
                        <span>Save Successful.</span>
                        <button className="btn btn-square btn-outline" onClick={() => setSubmitSuccess(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
        )}


      <form onSubmit={handleSubmit}>
          <h1>{title}</h1>
          {Object.values(questionsAndAnswers).map((question) => {
            const { id, type, prompt, options, answer } = question;
            return (
              <div key={id}>
                <label htmlFor={id}>{prompt}</label>
                {type === 'text' && (
                  <input type="text" id={id} value={answer} onChange={(e) => handleChange(e, id)} />
                )}
                {type === 'radio' && (
                  <>
                    {options.map((option) => (
                      <label key={option.id}>
                        <input
                          type="radio"
                          name={id}
                          value={option.value}
                          checked={option.value == answer}
                          onChange={(e) => handleChange(e, id)}
                        />
                        {option.value}
                      </label>
                    ))}
                  </>
                )}
                {type === 'checkbox' && (
                  <>
                    {options.map((option) => (
                      <label key={option.id}>
                        <input
                          type="checkbox"
                          name={id}
                          value={option.value}
                          onChange={(e) => handleChange(e, id)}
                          checked={option.value == answer}
                        />
                        {option.value}
                      </label>
                    ))}
                  </>
                )}
              </div>
            );
          })}
          <button type="submit">Submit</button>
      </form>

    </div>
   
  );
};

