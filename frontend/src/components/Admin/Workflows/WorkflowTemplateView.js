import { IoGitPullRequestOutline } from 'react-icons/io5';

import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';
import { getIndividualTemplateWorkflow } from '../../../apiCalls';

function WorkflowTemplateView() {

    const navigate = useNavigate();
    const location = useLocation();

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
                    temp.push([response.data.questionnaires[index].id, response.data.questionnaires[index].title, response.data.questionnaires[index].status]);
                }
                setQuestionnaireTitles(temp);
            })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    <div className="flex flex-wrap mt-10 mb-6">
                        <div className="mr-3">
                            <IoGitPullRequestOutline size={70} color="3278AE" />
                        </div>
                        <div className="flex-auto">
                            <p className="font-thin mt-1">ID: {workflowId}</p>
                            <h2 className="text-3xl font-semibold text-blue">{workflowsData.workflowName}</h2>
                        </div>
                        <div className="flex mt-5">
                            <AssignNewUser workflow={workflowsData}></AssignNewUser>
                            <UpdateWorkflow workflow={workflowsData} render="templates"></UpdateWorkflow>
                            <DeleteWorkflow workflow={workflowsData} render="templates"></DeleteWorkflow>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        <ul className="steps steps-vertical lg:steps-horizontal my-7">
                            {(questionnaireTitles).map(questionnaireTitle =>
                                <li className="step" key={questionnaireTitle[0]}>{questionnaireTitle[1]}</li>
                            )}
                        </ul>
                    </div>
                    <div className='grid grid-rows-1 grid-cols-2 mt-5'>
                        <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Included Forms</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="text-left">
                                        <table>
                                            <tbody>
                                                {(questionnaireTitles).map(questionnaireTitle =>
                                                    <div key={questionnaireTitle[0]}>
                                                        <tr className="card-title mb-2 font-normal">{questionnaireTitle[1]}</tr>
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