import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useToken from "../../useToken";

import DeleteQuestionnaire from "./Questionnaires/DeleteQuestionnaire";
import EditQuestionnaire from "./Questionnaires/EditQuestionnaire";


const baseURL = "http://localhost:8080/api/v1/questionnaire";

function FormDash() {


    const [questionnaires, setQuestionnaireData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [viewMode, setViewMode] = useState("Assigned");
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [questionToEdit, setQuestionToEdit] = useState(null);
    const user = useToken().token    
    console.log(user[1])


    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setQuestionnaireData(response.data);
          setIsLoading(false)
        });
      }, []);

      const filteredQuestionnaires = questionnaires.filter(q => {
        console.log("KAKAKAKAKKA")
        console.log(q.assignedAdminId)
        if (viewMode == "Templates") {
          return q.assignedVendorId == null && q.assignedAdminId == null;
        } else if (viewMode == "Assigned") {
            return (q.assignedVendorId != null &&  q.assignedAdminId != null && q.assignedVendorId == user[0]) || (q.assignedVendorId != null &&q.assignedAdminId != null);
        //   return q.assignedVendorId != null && q.assignedVendorId == user[0] && q.assignedAdminId != null;
        }
        return false;
      });
      
    //   const handleEditClick 


      if(! filteredQuestionnaires || !questionnaires){
        return(
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white h-full overflow-y-auto">
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                        <p className="text-3xl font-semibold text-blue">Questionnaires</p>
                        </div>
                        <div className="flex ">
                            <Link to="/questionnaires/create-questionnaire">
                                <button className="btn btn-primary">Create Questionnaire</button>
                            </Link>
                         </div>
                    </div>
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1>You have no questionnaires! Create one by clicking on "Create Questionnaire"!</h1>
                        </div>

                    </div>

                </div>
                
            </div>
        )
      }


    // get all created questionnaire templates 
    if (!isLoading) {
        console.log(questionnaires)
        return (
            <>
                <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                    <div className="bg-white h-full overflow-y-auto">
                        <div className="flex flex-wrap mb-5">
                            {(user[1] == "ADMIN" || user[1] == "APPROVER") && (
                                <div>
                                     <div className="flex-auto">
                                        <p className="text-3xl font-semibold text-blue">Questionnaires</p>
                                        <button onClick={() => setViewMode("Templates")} hidden={viewMode == "Templates" ? true : false}>View Template Questionnaires</button>
                                        <button onClick={() => setViewMode("Assigned")} hidden={viewMode != "Templates" ? true : false}>View Assigned Questionnaires</button>
                                    </div>
                                    <div className="flex ">
                                        <Link to="/questionnaires/create-questionnaire">
                                            <button className="btn btn-primary">Create Questionnaire</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {(user[1] == "VENDOR") && (
                                <div>
                                     <div className="flex-auto">
                                        <p className="text-3xl font-semibold text-blue"> Your Assigned Questionnaires</p>
                                        {console.log(viewMode)}
                
                                    </div>
                            
                                    {filteredQuestionnaires.length == 0 &&
                                        <p>There are no questionnaires assigned to you at this time.</p>
                                    }
                                </div>
                            )}
                        </div>
                        <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {console.log("BRUH")}
                            {console.log(filteredQuestionnaires)}
                            {filteredQuestionnaires.map(q => (
                            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={q.id}>
                                <figure>
                                <img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" />
                                </figure>
                                <div className="card-body m-1.5">
                                <h2 className="card-title">{q.title}</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/questionnaires/view-questionnaire-indiv/${q.id}`}>
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent">View</button>
                                    </Link>
                                    {(user[1] == "ADMIN" || user[1] == "APPROVER") && (
                                        <>
                                        {console.log("PASSING ID"  + q.id)}
                                        <DeleteQuestionnaire
                                        questionnaireId={q.id}
                                        onClose={() => setQuestionToDelete(null)}
                                        onDeleted={() => {
                                        setQuestionToDelete(null);
                                        axios.get(baseURL).then((response) => {
                                            setQuestionnaireData(response.data);
                                        });
                                        }}
                                        />

                                        <Link to={`/questionnaires/edit-questionnaire/${q.id}`}>
                                                <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent">Edit</button>                                 
                                        </Link>
                                        </>
                                        

                                    )}
                                    {/* {(userInfo.userType == "ADMIN" || userInfo.userType == "APPROVER") && (
                                        <button className="btn bg-red hover:bg-cyan border-transparent hover:border-transparent" onClick={() => setQuestionToEdit(q.id)}>Edit</button>
                                    )} */}
                                                            
                                        
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>

            
        )
    }
    
}

export default FormDash;




