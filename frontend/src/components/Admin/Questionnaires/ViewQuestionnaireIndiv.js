// VIEW indiv QUESTIONNAIRES FROM FORMDASH
// no need ot distinguish wehther assiged or not


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import VendorEditQuestionnaire from "../../Vendor/Questionnaires/VendorEditQuestionnaire";
import useToken from "../../../useToken";
import { MdHomeFilled, MdChecklist, MdDescription, MdGroup } from "react-icons/md";
 

const ViewQuestionnaireIndiv = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useParams();
  const user = useToken().token
  const navigate = useNavigate();


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

  const handleEditClick = (questionnaireId) => {
    navigate(`/vendor/questionnaires/vendor-edit-questionnaire/${questionnaireId}`, 
    { state: {   
        questionnaireId: questionnaireId
    }});    
}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, there was an error: {error.message}</div>;
  }

  if (!questionnaire) {
    return <div>Questionnaire not found.</div>;
  }

  const checkStatusBadge = (status) => {
    if (status=="SUBMITTED") {
        return "badge badge-primary"
    }
    else if (status=="ADMIN_APPROVED") {
        return "badge badge-secondary"
    }
    else if (status=="RETURNED") {
        return "badge badge-error"
    }
    else if (status=="APPROVER_APPROVED") {
        return "badge badge-accent"
    }
    else {
        return "badge"
    }
}

// if assigned show admin id and vendor id and edit button
// if not then just show questions 

  return (
    <>
        <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
            <div className="bg-white">
            <div className="flex flex-wrap mt-10 mb-6">
            <div className="mr-3">
                <MdDescription size={50} color="3278AE" />
            </div>
            <div className="flex-auto">
                {/* <p className="font-thin mt-1">ID: {workflowId}</p> */}
                <h2 className="text-3xl font-semibold text-blue">{questionnaire.title}</h2>
                <span className={checkStatusBadge(questionnaire.status)}>{questionnaire.status}</span>

            </div>

            <div className="card w-[35rem] bg-base-100 ml-3">
                <div className="card w-150 px-10">
                    <div className="text-left">
                        <ul>
                            {Object.keys(questionnaire.questionsAndAnswers).map((questionId) => {
                            const question = questionnaire.questionsAndAnswers[questionId];
                            const hasAnswers = question.answers && question.answers.length > 0;
                            return (
                                <li key={questionId}>
                                <h2 className="text-2xl text-blue" style={{ lineHeight: '1.5' }}>{question.prompt}</h2>
                                {question.options.length > 0 && (
                                    <ul>
                                    {question.options.map((option, index) => (
                                        <li key={index}>{option.label}</li>
                                    ))}
                                    </ul>
                                )}
                                <p>Answer: {question.answer}</p>
                                </li>
                            );
                            })}
                        </ul>
                    </div>
                </div>
                {(user[1] == "VENDOR") && ( 
                    <button className="btn btn-info w-full mb-2" onClick={() => {
                        handleEditClick(questionnaire.id)
                        }}>
                        Start Questionnaire
                    </button>
                )}

            </div>

            </div>


            </div>

        </div>
    
    
    </>

  );

//   return (
//     <div>
//       <h1>Questionnaire Details</h1>
//       <p>Title: {questionnaire.title}</p>
//       <p>Assigned Vendor ID: {questionnaire.assignedVendorId}</p>
//       <p>Assigned Admin ID: {questionnaire.assignedAdminId}</p>
//       {Object.entries(questionnaire.questionsAndAnswers).map(
//         ([questionId, question]) => (
//           <div key={questionId}>
//             <p>Prompt: {question.prompt}</p>
//             <ul>
//               {Object.entries(question.options).map(([optionId, option]) => (
//                 <li key={optionId}>{option.value}</li>
//               ))}
//             </ul>
//           </div>
//         )
//       )}

    //   {(user[1] == "VENDOR") && ( 
    //    <button className="btn btn-info w-full mb-2" onClick={() => {
    //     handleEditClick(questionnaire.id)
    //     }}>
    //     Start Questionnaire
    // </button>
    //   )}
//     </div>
//   );
};

export default ViewQuestionnaireIndiv;
