import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';



const baseURL = "http://localhost:8080/api/v1/questionnaire";
const updateBaseURL = "http://localhost:8080/api/v1/questionnaire/update"


export default function VendorEditQuestionnaire(){

  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
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
      const updatedQuestionsAndAnswers = {};
      for (const [key, value] of Object.entries(data.questionsAndAnswers)) {
        updatedQuestionsAndAnswers[key] = { ...value, answer: '' };
      }
      console.log("FUDSNDJNVDSNVBCDONVANB")
      console.log(updatedQuestionsAndAnswers)
      setQuestionnaire({ ...data, questionsAndAnswers: updatedQuestionsAndAnswers });
    };
    fetchQuestionnaire();
  }, [id.id]);
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('HELLOHELLOHELLO')

    // const updatedQuestionsAndAnswers = Object.values(answers).map((answer, index) => {
    //   console.log(answer)
    //   const question = questionnaire.questionsAndAnswers[answer.id];
    //   // console.log(question)
    //   return {
    //     ...question,
    //     answer: answer
    //   };
    // });
    console.log(answers)
    const updatedQuestionsAndAnswers = {};
      for (const [key, value] of Object.entries(questionnaire.questionsAndAnswers)) {
        console.log(key)
        updatedQuestionsAndAnswers[key] = {
          ...value, 
          answer: answers[key] };
      }
    console.log(updatedQuestionsAndAnswers)
    const updatedQuestionnaire = { ...questionnaire, questionsAndAnswers: updatedQuestionsAndAnswers };
    console.log(updatedQuestionnaire)
  
    const response = await fetch(`${updateBaseURL}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedQuestionnaire)
    });
    console.log(response);
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
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {Object.values(questionsAndAnswers).map((question) => {
        const { id, type, prompt, options } = question;
        return (
          <div key={id}>
            <label htmlFor={id}>{prompt}</label>
            {type === 'text' && (
              <input type="text" id={id} onChange={(e) => handleChange(e, id)} />
            )}
            {type === 'radio' && (
              <>
                {options.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={id}
                      value={option.value}
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
  );
};

