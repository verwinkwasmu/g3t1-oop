import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { Button } from 'react-bulma-components';
import jsPDF from 'jspdf';
import Logo from '../../../assets/QL-Logo-Full.png'
import { MdWidthFull } from 'react-icons/md';


const CreateQuestionnaire = () => {
  const [questions, setQuestions] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("DEFAULT");
  const [admin, setAdmin] = useState("DEFAULT");
  const [status, setStatus] = useState("NOT_STARTED");
  const [assignedTo, setAssignedTo] = useState("");

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


// 1/04/23 ADD ASSIGNED TO FIELD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const saveQuestionnaire = () => {
    console.log(questions);
    const questionnaireData = {
      title: title,
      assignedVendor: vendor,
      assignedAdmin: admin, 
      status: status,
      questionsAndAnswers: questions,
      assignedTo: assignedTo
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
          setAssignedTo("")

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

    const imgSrc = Logo;
    // doc.setTitle(`${title}`)


  
    // Define the x and y coordinates for the first question
    let x = 10;
    let y = 10;

    doc.addImage(imgSrc, 'PNG', 0, 0, 100, 50)
    console.log(title)

    doc.text(`${title}`,50, 100)
    


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

  const handleAssignedTo = (event) => {
    setAssignedTo(event.target.value);
    console.log("i like barbie~!!!!!")
    console.log(assignedTo)
  };

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
        <div className="bg-white h-full overflow-y-auto">
          <div className="flex flex-wrap mb-5">
              <div className="flex-auto">
                <p className="text-3xl font-semibold text-blue">Create Questionnaire</p>
              </div>
              <div className="flex ">
                  <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                    <button onClick={() => addQuestion('text')} className="btn" >Add Question</button>
                    <button onClick={handleSaveAsPDF} className="btn" >Save as PDF</button>
                    <Button onClick={saveQuestionnaire} className="btn" >Submit</Button>
                  </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Admin</span> 
                  <input  
                  type= "checkbox"
                  id = "admin"
                  name = "assignedTo"
                  value = "ADMIN"
                  checked = {assignedTo == "ADMIN"}
                  onChange={handleAssignedTo}
                  className = "checkbox"
                />
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Vendor</span> 
                  <input  
                  type= "checkbox"
                  id = "vendor"
                  name = "assignedTo"
                  value = "VENDOR"
                  checked = {assignedTo == "VENDOR"}
                  onChange={handleAssignedTo}
                  className = "checkbox"
                />
                </label>
              </div>
             
              <div className='flex'>
                <label htmlFor='questionnaire-title' className="label"  >Questionnaire TItle: </label>
                <input type ="text" value={title} id='questionnaire-title' name='questionnaire-title' onChange={(event) => setTitle(event.target.value)} className="input-group" ></input>

                <label htmlFor='assigned-vendor' className="label" >Assigned Vendor: </label>
                <input type ="text" id='assigned-vendor' name='assigned-vendor' defaultValue="DEFAULT" className="input-group"  ></input>
              </div>

              <div className='flex'>
                  <label htmlFor='assigned-admin'className="label" >Assigned Admin: </label>
                  <input type ="text"id='assigned-admin' name='assigned-admin' defaultValue="DEFAULT" ></input>


                  <label htmlFor='status' className="label" >Status </label>
                  <input type ="text" defaultValue="NOT_STARTED" id='status' name='status' ></input>
              </div>

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
                                                    {/* <option value="range">Linear Scale</option> */}
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

                                          {/* {question.type === 'range' && (
                                            <div>
                                                <button onClick={() => addOption(question.id)}>Add Values</button>
                                                {question.options.map((option, index) => (
                                                  <div key={option.id}>
                                                      <label>
                                                        Minimum Value:
                                                        <input
                                                            type="text"
                                                            value={option.minValue}
                                                            onChange={(e) =>
                                                            updateOptionValue(question.id, option.id,{
                                                              ...option,
                                                              minValue: e.target.value,
                                                            })
                                                            }
                                                        />
                                                      </label>
                                        
                                                      <label>
                                                        Maximum Value:
                                                        <input
                                                            type="text"
                                                            value={option.maxValue}
                                                            onChange={(e) =>
                                                            updateOptionValue(question.id, option.id, {
                                                              ...option,
                                                              maxValue: e.target.value,
                                                            })
                                                            }
                                                        />
                                                      </label>                                       
                                                      <button onClick={() => deleteOption(question.id, option.id)}>
                                                      Delete Option
                                                      </button>
                                                  </div>
                                                ))}
                                            </div>
                                          )} */}
                                      </li>
                                  )}
                                  </Draggable>
                              {provided.placeholder}
                              </ul>
                            )}
                          </Droppable>
                    ))}
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
      
    
    </>
  );

};
export default CreateQuestionnaire;