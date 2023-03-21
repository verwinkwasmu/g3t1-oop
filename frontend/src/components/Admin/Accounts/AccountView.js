import { MdKeyboardArrowLeft } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import FollowUpUser from './FollowUpAccount';
import RemoveAccount  from './RemoveAccount';
import EditAccount from './EditAccount';
import CreateAccount from './CreateAccount';

import AssignWorkflowsToUser from '../AssignWorkflowsToUser';

import { getWorkflowsByVendor } from '../../../apiCalls';

function UserView() {

    const navigate = useNavigate();
    const location = useLocation();

    const account = location.state.account;
    console.log("account: ", account)

    const toAccountDash = () => {
        console.log("===== INSIDE TOACCOUNTDASH =====")
        navigate(`/accounts`);
    }

    useEffect(() => {
        document.title = 'Accounts Dashboard'
    
        // setAccountsData(getUsers());

        getWorkflowsByVendor(account.id)
        .then(function(response){
            console.log(response.data)
          if (response.data.length > 0) {
            setAssignedWorkflows(response.data)
          } else {
            setAssignedWorkflows([])
          }
        })

      }, [])

      const [assignedWorkflows, setAssignedWorkflows] = useState([]);

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                <div>
                    <button className="text-blue flex hover:opacity-75" onClick={() => {toAccountDash()}}>
                        <MdKeyboardArrowLeft className="font-bold"></MdKeyboardArrowLeft>
                        <span className="text-xs font-semibold">BACK TO ACCOUNTS</span>
                    </button>  
                </div>
                <div className="flex flex-wrap my-10">
                    <div className="mr-12">
                        <img className="rounded-full w-32 h-32" src="https://img.freepik.com/free-photo/headshot-charismatic-pleasant-friendly-european-woman-short-chestnut-haircut-smiling-positive-feeling-happy-upbeat-enjoying-lifes-casually-talking-friends-amused-cheerful-standing-white-background_176420-34680.jpg?w=2000" alt="image description"/>
                    </div>
                    <div className="flex-auto">
                        <p className="font-thin mb-2">ID: {account.id}</p>
                        <h1 className="text-3xl font-semibold text-blue">{account.name}</h1>
                        <p className="mb-2">{account.companyName}</p>
                        <p className="font-thin mb-2 italic">{account.email}</p>

                    </div>
                    <div className="flex grid grid-rows-2 justify-items-end">
                        <div>
                            <FollowUpUser></FollowUpUser>
                            <RemoveAccount accounts={[account]}></RemoveAccount> 
                        </div>
                        <div>
                            <EditAccount account={account}></EditAccount>
                        </div>                      
                    </div>
                </div>
                <div>
                    {/* <div className="flex m-3">
                        <h2 className="text-2xl font-semibold text-blue">Active Workflows</h2>
                        <AssignWorkflowsToUser className="align-right"></AssignWorkflowsToUser>
                    </div> */}

                    <div className="flex flex-wrap m-3">
                        <div className="flex flex-auto">
                            <h2 className="text-2xl font-semibold text-blue">Active Workflows</h2>
                        </div>
                        <div className="flex grid justify-items-end">
                            {/* <AssignWorkflowsToUser></AssignWorkflowsToUser>  */}
                        </div>
                    </div>
                    <div className="flex justify-evenly">
                        {(assignedWorkflows).map(workflow =>
                            <div className="card w-80 bg-base-100 border border-light-blue m-3">
                            <div className="card-body text-left">
                                <h2 className="card-title">{workflow.workflowName}</h2>
                                <table>
                                    <tbody>
                                        {(workflow.workflowList).map(questionnaire =>
                                            <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-success font-semibold text-xs">APPROVED</div>
                                            </td>
                                            <td>{questionnaire}</td>
                                        </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            )}
                    </div>
                </div>
                <div>
                    <div className="m-3">
                        <h2 className="text-2xl font-semibold text-grey">Completed Workflows</h2>
                    </div>
                        <div className="flex justify-evenly">
                        <div className="card w-80 bg-base-100 border border-light-blue m-3">
                            <div className="card-body text-left">
                                <h2 className="card-title">Workflow 1</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-success font-semibold text-xs">APPROVED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-warning font-semibold text-xs">RETURNED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-info font-semibold text-xs">SUBMITTED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 font-semibold text-xs">PENDING</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card w-80 bg-base-100 border border-light-blue m-3">
                            <div className="card-body text-left">
                                <h2 className="card-title">Workflow 1</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-success font-semibold text-xs">APPROVED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-warning font-semibold text-xs">RETURNED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 badge-info font-semibold text-xs">SUBMITTED</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                        <tr>
                                            <td className="w-2/5">
                                                <div className="badge w-24 font-semibold text-xs">PENDING</div>
                                            </td>
                                            <td>Form 1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card w-80 bg-base-100 border border-light-blue m-3">
                        <div className="card-body text-left">
                            <h2 className="card-title">Workflow 1</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="w-2/5">
                                            <div className="badge w-24 badge-success font-semibold text-xs">APPROVED</div>
                                        </td>
                                        <td>Form 1</td>
                                    </tr>
                                    <tr>
                                        <td className="w-2/5">
                                            <div className="badge w-24 badge-warning font-semibold text-xs">RETURNED</div>
                                        </td>
                                        <td>Form 1</td>
                                    </tr>
                                    <tr>
                                        <td className="w-2/5">
                                            <div className="badge w-24 badge-info font-semibold text-xs">SUBMITTED</div>
                                        </td>
                                        <td>Form 1</td>
                                    </tr>
                                    <tr>
                                        <td className="w-2/5">
                                            <div className="badge w-24 font-semibold text-xs">PENDING</div>
                                        </td>
                                        <td>Form 1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
        </>
        
    )
}

export default UserView;