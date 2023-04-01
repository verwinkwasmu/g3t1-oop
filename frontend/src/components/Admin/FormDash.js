import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useToken from "../../useToken";


const baseURL = "http://localhost:8080/api/v1/questionnaire";

function FormDash() {


    const [questionnaires, setQuestionnaireData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const user = localStorage.getItem('token');

    console.log("USER " + user)


    useEffect(() => {
        axios.get(baseURL).then((response) => {
          setQuestionnaireData(response.data);
          setIsLoading(false)
        });
      }, []);



    // get all created questionnaire templates 
    if (!isLoading) {
        console.log(questionnaires)
        return (
            <>
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

                        <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {questionnaires.map(q => (
                            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={q.id}>
                                <figure>
                                <img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" />
                                </figure>
                                <div className="card-body m-1.5">
                                <h2 className="card-title">{q.title}</h2>
                                <p className="text-base">Lorem Ipsum</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/questionnaires/view-indiv-questionnaire/${q.id}`}>
                                    <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent">See Questionnaire</button>
                                    </Link>
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




// return (
//     <>
//         <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
//             <div className="bg-white">

//                 <div className="flex flex-wrap mb-5">
//                     <div className="flex-auto">
//                         <p className="text-3xl font-semibold text-blue">Workflows</p>
//                         <div onClick={renderTemplates}>Templates </div>
//                         <div onClick={renderAssigned}>Assigned</div>
//                     </div>
//                     <div className="flex ">
//                         <CreateWorkflow></CreateWorkflow>
//                     </div>
//                 </div>

//                 {/* <h1 className="text-3xl font-semibold text-blue pb-6">Workflows</h1> */}

//                 <div className="grid grid-rows-3 grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//                     {(workflowsData).map(workflow =>
//                         <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
//                             <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
//                             <div className="card-body m-1.5">
//                                 <h2 className="card-title">{workflow.workflowName}</h2>
//                                 <p className="text-base">Lorem Ipsum</p>
//                                 <div className="card-actions justify-end">
//                                     <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </div>
//     </>

// )