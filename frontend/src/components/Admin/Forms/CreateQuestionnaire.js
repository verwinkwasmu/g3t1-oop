import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from 'react-bulma-components';
import jsPDF from 'jspdf';


const CreateQuestionnaire = () => {
  const [questions, setQuestions] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("DEFAULT");
  const [admin, setAdmin] = useState("DEFAULT");
  const [status, setStatus] = useState("NOT_STARTED");

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);


  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions') || '{}');
    setQuestions(storedQuestions);
  }, []);

  useEffect(() => {
    localStorage.setItem('title', JSON.stringify(title));
  }, [title]);

  useEffect(()=>{
    const storedTitle = JSON.parse(localStorage.getItem('title') || '[]');
    setTitle(storedTitle);
  },[])

  useEffect(() => {
    localStorage.setItem('vendor', JSON.stringify(vendor));
  }, [vendor]);

  useEffect(()=>{
    const storedVendor = JSON.parse(localStorage.getItem('vendor') || '[]');
    setVendor(storedVendor);
  },[])

  useEffect(() => {
    localStorage.setItem('admin', JSON.stringify(admin));
  }, [admin]);

  useEffect(()=>{
    const storedAdmin = JSON.parse(localStorage.getItem('admin') || '[]');
    setAdmin(storedAdmin);
  },[])

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
  }, [status]);

  useEffect(()=>{
    const storedStatus = JSON.parse(localStorage.getItem('status') || '[]');
    setStatus(storedStatus);
  },[])



  const saveQuestionnaire = () => {
    // Send the questions data to a server or save it to a file
    console.log(questions);
    const questionnaireData = {
      title: title,
      assignedVendor: vendor,
      assignedAdmin: admin, 
      status: status,
      questionsAndAnswers: questions
    }
    console.log(questionnaireData);
    axios.post('http://localhost:8080/api/v1/questionnaire/create', questionnaireData)
      .then(response => {
        console.log('Questions saved successfully', response.data);
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setQuestions({});
          setTitle("");
          setVendor("");
          setAdmin("");
          setStatus("NOT_STARTED");

        }, 2000);
      })
      .catch(error => {
        console.error('Error saving questions', error);
      });
  };

  
  const addQuestion = (type) => {
    console.log("adding")
    const newQuestion = {
      id: uuid(),
      type: type,
      prompt: '',
      options: [],
    };
    setQuestions((prevQuestions) => {
      const newQuestionKey = newQuestion.id;
      return {
        ...prevQuestions,
        [newQuestionKey]: newQuestion,
      };
    });
  };



  const deleteQuestion = (questionKey) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = { ...prevQuestions };
      delete updatedQuestions[questionKey];
      return updatedQuestions;
    });
  };

  const updatePrompt = (questionKey, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestion = {
        ...prevQuestions[questionKey],
        prompt: value,
      };
      return {
        ...prevQuestions,
        [questionKey]: updatedQuestion,
      };
    });
  };


  const addOption = (questionKey) => {
    console.log("hello adding option")
    console.log(questionKey)
    setQuestions((prevQuestions) => {
      const updatedQuestion = {
        ...prevQuestions[questionKey],
        options: [
          ...prevQuestions[questionKey].options,
          {
            id: uuid(),
            value: '',
          },
        ],
      };
      return {
        ...prevQuestions,
        [questionKey]: updatedQuestion,
      };
    });
  };

  const updateOptionValue = (questionKey, optionId, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestion = {
        ...prevQuestions[questionKey],
        options: prevQuestions[questionKey].options.map((o) =>
          o.id === optionId ? { ...o, value } : o
        ),
      };
      return {
        ...prevQuestions,
        [questionKey]: updatedQuestion,
      };
    });
  };



const onDragEnd = (result) => {
  console.log("DRAGGING");
  if (!result.destination) {
    return;
  }
  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;

  const questionIds = Object.keys(questions);
  const updatedQuestions = questionIds.reduce((accumulator, questionId, currentIndex) => {
    if (currentIndex === sourceIndex) {
      return accumulator;
    }
    if (currentIndex === destinationIndex) {
      return {
        ...accumulator,
        [result.draggableId]: questions[result.draggableId],
        [questionId]: questions[questionId],
      };
    }
    return {
      ...accumulator,
      [questionId]: questions[questionId],
    };
  }, {});

  setQuestions(updatedQuestions);
  console.log(updatedQuestions);
};


  // just handle the styling for the pdf
  const handleSaveAsPDF = () => {
    console.log("saving pdf fuck")
    const doc = new jsPDF();
  
    // Define the x and y coordinates for the first question
    let x = 10;
    let y = 10;
  
    Object.values(questions).forEach((question, index) => {
      doc.text(`${index + 1}. ${question.prompt}`, x, y);
  
      y += 10;
  
      if (question.options.length > 0) {
        question.options.forEach((option) => {
          doc.text(`- ${option.value}`, x + 10, y);
          y += 10;
        });
      }
  
      y += 10;
    });
  
    doc.save('questionnaire.pdf');
  };
  
  const updateQuestionType = (questionKey, type) => {
    setQuestions(prevQuestionsState => {
      const updatedQuestions = {};
      for (const [key, value] of Object.entries(prevQuestionsState)) {
        if (value.id === questionKey) {
          console.log("yes")
          updatedQuestions[key] = { ...value, type };
          console.log(updatedQuestions)
        } else {
          console.log("no")
          console.log(key)
          console.log(value)
          updatedQuestions[key] = value;
        }
      }
      return updatedQuestions;
    });
  };
  
const updateTextInput = (questionId, value) => {
  console.log("hello what the fuck")
  setQuestions(prevQuestionsState => {
    console.log(prevQuestionsState)
    console.log(questionId)
    const question = prevQuestionsState[questionId];
    console.log("this is question" + question)
    if (question) {
      const updatedQuestion = {...question, value};
      return {...prevQuestionsState, [questionId]: updatedQuestion};
    }
    return prevQuestionsState;
  });
};



  const deleteOption = (questionId, optionId) => {
    setQuestions(prevQuestionsState => {
      const question = prevQuestionsState[questionId];
      if (question && question.options) {
        const updatedOptions = question.options.filter(option => option.id !== optionId);
        return {...prevQuestionsState, [questionId]: {...question, options: updatedOptions}};
      }
      return prevQuestionsState;
    });
  };

  return (
    <div className="flex flex-col w-full" > 

      <div className="grid h-500 card bg-base-300 rounded-box place-items-center">
        <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
          <button onClick={() => addQuestion('text')} className="btn" >Add Question</button>
          <button onClick={handleSaveAsPDF} className="btn" >Save as PDF</button>
          <Button onClick={saveQuestionnaire} className="btn" >Submit</Button>
        </div>
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

        <div className="form-control">
          <label htmlFor='questionnaire-title' className="label"  >Questionnaire TItle: </label>
          <input type ="text" value={title} id='questionnaire-title' name='questionnaire-title' onChange={(event) => setTitle(event.target.value)} className="input-group" ></input>

          <label htmlFor='assigned-vendor' className="label" >Assigned Vendor: </label>
          <input type ="text" id='assigned-vendor' name='assigned-vendor' defaultValue="DEFAULT" className="input-group"  ></input>
        
          <div>
            <label htmlFor='assigned-admin'className="label" >Assigned Admin: </label>
            <input type ="text"id='assigned-admin' name='assigned-admin' defaultValue="DEFAULT" ></input>


            <label htmlFor='status' className="label" >Status </label>
            <input type ="text" defaultValue="NOT_STARTED" id='status' name='status' ></input>
          </div>
          
        </div>
      </div>

      <div className="divider"></div> 

      <div className="grid h-500 card bg-base-300 rounded-box place-items-center" >
        <DragDropContext onDragEnd={onDragEnd}>
              {console.log(questions)}
              {Object.values(questions).map((question, index) => (
                      <Droppable key={question.id} droppableId={question.id}>
                        {(provided) => (
                          <ul {...provided.droppableProps} ref={provided.innerRef}>
                          {/* {Object.values(questions).map((question, index) => ( */}
                              <Draggable key={question.id} draggableId={question.id} index={index}>
                              {(provided) => (
                                  <li
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  >
                                    <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
                                    {console.log(question)}
                                    <div>
                                        <label>
                                        Question Prompt:
                                            <input
                                                type="text"
                                                value={question.prompt}
                                                onChange={(e) => updatePrompt(question.id, e.target.value)}
                                            />
                                            </label>
                                            <label>
                                            Type of Input:
                                            <select
                                                value={question.type}
                                                onChange={(e) => updateQuestionType(question.id, e.target.value)}
                                            >
                                                <option value="text">Text</option>
                                                <option value="radio">Radio</option>
                                                <option value="checkbox">Checkbox</option>
                                            </select>
                                          </label>
                                      </div>
                                      {question.type === 'text' && (
                                      <div>
                                        <label>
                                            Text Input:
                                            <input
                                            type="text"
                                            name ='text-input'
                                            id='text-input'
                                            defaultValue='FOR VENDOR'
                                            />
                                        </label>
                                      </div>
                                      )}
                                      {question.type === 'radio' && (
                                          <div>
                                            
                                            <button onClick={() => addOption(question.id)}>Add Option</button>
              
                                            {question.options.map((option, index) => (
                                                <div key={option.id}>

                                                  <label>
                                                      Option {index + 1}:
                                                      <input
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) =>
                                                            updateOptionValue(question.id, option.id, e.target.value)
                                                        }
                                                      />
                                                  </label>
                                  
                                                  <button onClick={() => deleteOption(question.id, option.id)}>
                                                        Delete Option
                                                  </button>
                                                </div>
                                            ))}
                                          </div>
                                      )}
                                      {question.type === 'checkbox' && (
                                        <div>
                                            <button onClick={() => addOption(question.id)}>Add Option</button>
                                            {question.options.map((option, index) => (
                                              <div key={option.id}>
                                                  <label>
                                                    Option {index + 1}:
                                                    <input
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) =>
                                                        updateOptionValue(question.id, option.id, e.target.value)
                                                        }
                                                    />
                                                  </label>
                                                  <button onClick={() => deleteOption(question.id, option.id)}>
                                                  Delete Option
                                                  </button>
                                              </div>
                                            ))}
                                        </div>
                                      )}
                                  </li>

                              )}
                              </Draggable>
                          {/* ))} */}
                          {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                ))}
        </DragDropContext>
      </div>

  
    </div>
  );

};
export default CreateQuestionnaire;