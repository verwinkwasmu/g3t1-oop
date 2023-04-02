import { IoGitPullRequestOutline } from 'react-icons/io5';

import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';
import { getIndividualTemplateWorkflow } from '../../../apiCalls';
import useToken from '../../../useToken';

function WorkflowTemplateView() {

    const navigate = useNavigate();
    const location = useLocation();
    const token = useToken().token

    const workflowId = location.state.workflowId;
    const [workflowsData, setWorkflowsData] = useState([]);
    const [questionnaireTitles, setQuestionnaireTitles] = useState([]);
    console.log(workflowId);

    useEffect(() => {
        getIndividualTemplateWorkflow(workflowId)
            .then(function (response) {
                // console.log(response.data)
                setWorkflowsData(response.data)

                const temp = [];
                for (const index in response.data.questionnaires) {
                    temp.push(
                        [response.data.questionnaires[index].id, 
                        response.data.questionnaires[index].title
                        ]
                    );
                }
                setQuestionnaireTitles(temp);
                // console.log(questionnaireTitles[0])
            })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-8 px-20 shadow-2xl">
                <div className="bg-white h-full overflow-y-auto">

                    <div className="flex flex-wrap mt-10 mb-6">
                        <div className="mr-3">
                            <IoGitPullRequestOutline size={70} color="3278AE" />
                        </div>
                        <div className="flex-auto">
                            <p className="font-thin mt-1">ID: {workflowId}</p>
                            <h2 className="text-3xl font-semibold text-blue">{workflowsData.workflowName}</h2>
                        </div>
                        <div className="flex mt-5">
                            <span hidden={token[1] == "ADMIN" ? false : true}>
                                <AssignNewUser workflow={workflowsData}></AssignNewUser>
                                <UpdateWorkflow workflow={workflowsData} render="templates"></UpdateWorkflow>
                                <DeleteWorkflow workflow={workflowsData} render="templates"></DeleteWorkflow>
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 gap-x-2 gap-y-8">
                        <ul className="steps steps-vertical lg:steps-horizontal my-7">
                            {(questionnaireTitles).map(questionnaireTitle =>
                                <li className="step" key={questionnaireTitle[0]}>{questionnaireTitle[1]}</li>
                            )}
                        </ul>
                    </div>
                    <div className='grid grid-rows-1 gap-2 grid-cols-2 my-5'>
                        <div className="card w-full bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Included Questionnaires</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                        <table>
                                            <tbody>
                                                {(questionnaireTitles).map(questionnaireTitle =>
                                                    <div key={questionnaireTitle[0]}>
                                                        <tr className="card-title mb-2 font-normal">{questionnaireTitle[1]}</tr>
                                                        <Link to={`/questionnaires/view-questionnaire-indiv/${questionnaireTitle[0]}`}>
                                                            View Questionnaire
                                                        </Link>
                                                    </div>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Assigned Users</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left text-blue">
                                        <table>
                                            <tbody>
                                                <tr className="card-title mb-2 font-normal">Click on 'Assign User' to make an assigned workflow with this template.</tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default WorkflowTemplateView;