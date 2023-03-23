import { IoGitPullRequestOutline } from 'react-icons/io5';

import { useNavigate, useLocation } from "react-router-dom";

import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';

function WorkflowView() {

    const navigate = useNavigate();
    const location = useLocation();

    const workflow = location.state.workflow;

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-8 px-20 shadow-2xl">
                <div className="bg-white">

                    <div className="flex flex-wrap mt-10 mb-6">
                        <div className="mr-3">
                            <IoGitPullRequestOutline size={70} color="3278AE" />
                        </div>
                        <div className="flex-auto">
                            <p className="font-thin mt-1">ID: 1</p>
                            <h2 className="text-3xl font-semibold text-blue">{workflow.workflowName}</h2>
                        </div>
                        <div className="flex mt-5">
                            <AssignNewUser></AssignNewUser>
                            <UpdateWorkflow workflow={workflow}></UpdateWorkflow>
                            <DeleteWorkflow workflow={workflow}></DeleteWorkflow>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {(workflow.workflowList).map(form =>
                            <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                                <div className="card-body text-center">
                                    <h2 className="card-title">{form}</h2>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='grid grid-rows-1 grid-cols-2 mt-5'>
                        <div className="card w-[35rem] bg-base-100 ml-3 drop-shadow-xl">
                            <div className="card-body text-left">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue">Included Forms</h2>
                                </div>
                                <div className="card w-80">
                                    <div className="card-body text-left">
                                        <table>
                                            <tbody>
                                                {(workflow.workflowList).map(form =>
                                                    <div>
                                                        <tr className="card-title">{form}</tr>
                                                        <tr className='mb-2'>
                                                            <td>
                                                                Lorem Ipsum
                                                            </td>
                                                        </tr>
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
                                    <div className="card-body text-left text-blue">
                                        <table>
                                            <tbody>
                                                <tr className="card-title mb-2">User 1</tr>
                                                <tr className="card-title mb-2">User 2</tr>
                                                <tr className="card-title mb-2">User 3</tr>
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

export default WorkflowView;