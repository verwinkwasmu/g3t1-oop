import { IoGitPullRequestOutline } from 'react-icons/io5';

import DeleteWorkflow from './DeleteWorkflow';
import AssignNewUser from './AssignNewUser';
import UpdateWorkflow from './UpdateWorkflow';

// import { useNavigate } from "react-router-dom";

function WorkflowView() {

    // const navigate = useNavigate();

    // const toAccountDash = () => {
    //     console.log("===== INSIDE TOACCOUNTDASH =====")
    //     navigate(`/accounts`);
    // }

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
                            <h2 className="text-3xl font-semibold text-blue">Business Process Re-Engineering Workflow</h2>
                        </div>
                        <div className="flex mt-5">
                            <AssignNewUser></AssignNewUser>
                            <UpdateWorkflow></UpdateWorkflow>
                            <DeleteWorkflow></DeleteWorkflow>
                        </div>
                    </div>
                    <div className="grid grid-rows-1 grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                            <div className="card-body text-center">
                                <h2 className="card-title">Form 1</h2>
                            </div>
                        </div>
                        <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                            <div className="card-body text-center">
                                <h2 className="card-title">Form 2</h2>
                            </div>
                        </div>
                        <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                            <div className="card-body text-center">
                                <h2 className="card-title">Form 3</h2>
                            </div>
                        </div>
                        <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                            <div className="card-body text-center">
                                <h2 className="card-title">Form 4</h2>
                            </div>
                        </div>
                        <div className="card w-44 bg-base-100 border border-light-blue m-3 drop-shadow-xl">
                            <div className="card-body text-center">
                                <h2 className="card-title">Form 5</h2>
                            </div>
                        </div>
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
                                                <tr>
                                                    <h2 className="card-title text-blue text-md">Form 1</h2>
                                                </tr>
                                                <tr className='mb-2'>
                                                    <td>
                                                        Lorem Ipsum
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <h className="card-title text-blue">Form 2</h>
                                                </tr>
                                                <tr>
                                                    <td>Lorem Ipsum</td>
                                                </tr>
                                                <tr>
                                                    <h2 className="card-title text-blue">Form 3</h2>
                                                </tr>
                                                <tr>
                                                    <td>Lorem Ipsum</td>
                                                </tr>
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
                                                <tr>
                                                    <h2 className="card-title mb-2">User 1</h2>
                                                </tr>
                                                <tr>
                                                    <h2 className="card-title mb-2">User 2</h2>
                                                </tr>
                                                <tr>
                                                    <h2 className="card-title mb-2">User 3</h2>
                                                </tr>
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