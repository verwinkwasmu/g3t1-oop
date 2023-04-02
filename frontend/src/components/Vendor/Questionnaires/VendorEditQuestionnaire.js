import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { MdHomeFilled, MdChecklist, MdDescription, MdGroup } from "react-icons/md";




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
    <>
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

      <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
        <div className="bg-white">
          <div className="flex flex-wrap mt-10 mb-6"> 
            <div className="mr-3">
                    <MdDescription size={50} color="3278AE" />
                </div>
                <div className="flex-auto">
                    {/* <p className="font-thin mt-1">ID: {workflowId}</p> */}
                    <h2 className="text-3xl font-semibold text-blue">{title}</h2>
                </div>


          <form onSubmit={handleSubmit}>
          {Object.values(questionsAndAnswers).map((question) => {
            const { id, type, prompt, options, answer } = question;
            return (
              <div key={id} className='p-4'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor={id} className="text-xl text-blue mr-4">{prompt}</label>
                  {type === 'text' && (
                    <input type="text" className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id={id} value={answer} onChange={(e) => handleChange(e, id)} />
                    
                  )}

                  {type === 'radio' && (
                   <>
                     {options.map((option) => (
                       <label className='p-5' key={option.id}>
                         <input
                           type="radio"
                           name={id}
                           value={option.value}
                           defaultChecked={option.value == answer}
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
                       <label className='p-10' key={option.id}>
                         <input
                           type="checkbox"
                           name={id}
                           value={option.value}
                           onChange={(e) => handleChange(e, id)}
                           defaultChecked={option.value == answer}
                         />
                         {option.value}
                       </label>
                     ))}
                   </>
                 )}
                </div>
                
              </div>
            );
          })}
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
          </div>
      

        </div>
      </div>
      
      

    </>
   
  );
};

