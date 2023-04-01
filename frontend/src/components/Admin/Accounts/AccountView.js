import { MdKeyboardArrowLeft } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import FollowUpUser from './FollowUpAccount';
import RemoveAccount  from './RemoveAccount';
import EditVendorAccount from './EditVendorAccount';
import EditUserAccount from './EditUserAccount';

import AssignWorkflowsToUser from '../AssignWorkflowsToUser';

import { getAssignedWorkflowsByVendorId, getAssignedWorkflowsByAdminId } from '../../../apiCalls';

import RestoreArchived from '../../RestoreArchive';

function AccountView() {

    const navigate = useNavigate();
    const location = useLocation();

    const account = location.state.account;
    const origin = location.state.origin;

    console.log("account: ", account);
    console.log("origin: ", origin);

    const toAccountDash = () => {
        navigate(`/accounts/#`);
    }

    const toArchive = () => {
        navigate(`/archive`);
    }

    useEffect(() => {
        document.title = 'Accounts Dashboard'
    
        // setAccountsData(getUsers());

        if (account.userType == "VENDOR") {
            console.log("HI")
            getAssignedWorkflowsByVendorId(account.id)
            .then(function(response){
                console.log(response.data)
              if (response.data.length > 0) {
                setAssignedWorkflowsData(response.data)
              } else {
                setAssignedWorkflowsData([])
              }
            })
            .catch(function(error) {
                console.log("Not a vendor")
            })
        } else {
            getAssignedWorkflowsByAdminId(account.id)
            .then(function(response){
                console.log(response.data)
              if (response.data.length > 0) {
                setAssignedWorkflowsData(response.data)
              } else {
                setAssignedWorkflowsData([])
              }
            })
            .catch(function(error) {
                console.log("Not an admin")
            })
        }

        

      }, [])

        const [id, setId] = useState(account.id);
        const [name, setName] = useState(account.name);
        const [email, setEmail] = useState(account.email);
        const [userType, setUserType] = useState(account.userType);
        const [contactNum, setContactNum] = useState(account.contactNum);
        const [password, setPassword] = useState(account.password);

        const [companyName, setCompanyName] = useState(account.companyName);
        const [country, setCountry] = useState(account.country);
        const [regNumber, setRegNumber] = useState(account.regNumber);
        const [bizNature, setBizNature] = useState(account.bizNature);
        const [gstNumber, setGstNumber] = useState(account.gstnumber);
    
      const [assignedWorkflowsData, setAssignedWorkflowsData] = useState([]);

      const toWorkflowView = (workflow) => {
        navigate(`/workflows/${workflow.id}`, { state: { workflow: workflow } });
    }

      const getWorkflowCompletion = (questionnaires) => {
        var complete = 0; 

        var total = questionnaires != null ? questionnaires.length : 0;

        for (var qnnaire in questionnaires) {
            if (!(qnnaire.status in ["INITIAL DRAFT", "RETURNED"])) { 
                complete += 1;
            }
        }
        return `${complete} / ${total}`;
    }

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-12 px-20 shadow-2xl">    
                <div id="back">
                    <button className="text-blue flex hover:opacity-75" onClick={
                        origin == "ARCHIVE" ? () => {toArchive()} : () => {toAccountDash()}
                    }>
                        <MdKeyboardArrowLeft className="font-bold"></MdKeyboardArrowLeft>
                        <span className="text-xs font-semibold">BACK TO {origin == "ARCHIVE" ? " ARCHIVE" : " ACCOUNTS"}</span>
                    </button>
                      
                </div>
                <div id="header" className="flex flex-wrap my-10">
                    <div className="mr-12">
                        <img className="rounded-full w-32 h-32" src="https://img.freepik.com/free-photo/headshot-charismatic-pleasant-friendly-european-woman-short-chestnut-haircut-smiling-positive-feeling-happy-upbeat-enjoying-lifes-casually-talking-friends-amused-cheerful-standing-white-background_176420-34680.jpg?w=2000" alt="image description"/>
                    </div>
                    <div className="flex-auto font-thin">
                        <p >ID: {account.id}</p>
                        <h1 className="text-3xl font-semibold text-blue">{account.name}</h1>
                        <p className="font-thin mb-2 italic">{account.email}</p>
                        <p><span className={account.userType == "VENDOR" ? "font-normal badge bg-blue-500" : "font-normal badge"}>{account.userType}</span></p>
                    </div>
                    <div className="flex grid grid-rows-2 justify-items-end">
                        <div hidden={origin == "ARCHIVE" ? true : false}>
                            {/* <FollowUpUser></FollowUpUser> */}
                            <RemoveAccount accounts={[account]}></RemoveAccount> 
                        </div>
                        <div hidden={origin == "ARCHIVE" ? true : false}>
                            <span hidden={userType == "VENDOR" ? false : true}>
                                <EditVendorAccount account={account}></EditVendorAccount>
                            </span>
                            <span hidden={userType != "VENDOR" ? false : true}>
                                <EditUserAccount account={account}></EditUserAccount>
                            </span>

                        </div>                      
                    </div>
                    <div hidden={origin != "ARCHIVE" ? true : false}>
                        <RestoreArchived item={account} itemType={userType}></RestoreArchived>
                    </div>
                </div>
                <div className={userType == "VENDOR" ? "grid grid-cols-3 gap-10" : ""}>
                    <div id="workflows" className="col-span-2">
                    <div className="mb-10">
                        <div className="flex flex-wrap mb-3">
                            <div className="flex flex-auto">
                                <h2 className="text-2xl font-semibold text-blue">Assigned Workflows</h2>
                            </div>
                        </div>
                        <div hidden={assignedWorkflowsData.filter(w => w.approverReviewStatus != "APPROVED").length == 0 ? true : false}>
                        <div className="carousel carousel-center p-4 space-x-4 shadow-2xl rounded-box">
                            {(assignedWorkflowsData.filter(w => w.approverReviewStatus != "APPROVED")).map(workflow =>
                                <div className="carousel-item">
                                    <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                                        <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                                        <div className="card-body m-1.5">
                                            <h2 className="card-title">{workflow.workflowName}</h2>
                                            <div>
                                            <p className="text-base">Vendor: {workflow.assignedVendorId}</p>
                                            <p className="text-base">Admin: {workflow.assignedAdminId}</p>
                                            <p className="text-base">Completion Status: {getWorkflowCompletion(workflow.questionnaires)}</p>
                                            </div>
                                            <p></p> 
                                            <div className="card-actions justify-end">
                                                <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            )}
                            
                            </div>
                            </div>

                            <h2 hidden={assignedWorkflowsData.filter(w => w.approverReviewStatus != "APPROVED").length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No assigned workflows.</h2>
                    </div>

                    <div className="mb-10">
                        <div className="flex flex-wrap mb-3">
                            <div className="flex flex-auto">
                                <h2 className="text-2xl font-semibold text-grey">Completed Workflows</h2>
                            </div>
                        </div>
                        <div hidden={assignedWorkflowsData.filter(w => w.approverReviewStatus == "APPROVED").length == 0 ? true : false}>
                        <div className="carousel carousel-center p-4 space-x-4 shadow-2xl rounded-box">
                            {(assignedWorkflowsData.filter(w => w.approverReviewStatus == "APPROVED")).map(workflow =>
                                <div className="carousel-item">
                                    <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl image-full" key={workflow.id}>
                                        <figure><img src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/17/main/GeiehNbQ1t86Mg5zKnEgucWslfZXTckjj8mSDV2O.png" alt="workflow description" /></figure>
                                        <div className="card-body m-1.5">
                                            <h2 className="card-title">{workflow.workflowName}</h2>
                                            <div>
                                            <p className="text-base">Vendor: {workflow.assignedVendorId}</p>
                                            <p className="text-base">Admin: {workflow.assignedAdminId}</p>
                                            <p className="text-base">Completion Status: {getWorkflowCompletion(workflow.questionnaires)}</p>
                                            </div>
                                            <p></p> 
                                            <div className="card-actions justify-end">
                                                <button className="btn bg-blue hover:bg-cyan border-transparent hover:border-transparent" onClick={() => { toWorkflowView(workflow) }}>See Workflow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            )}
                            
                            </div>
                            </div>

                            <h2 hidden={assignedWorkflowsData.filter(w => w.approverReviewStatus == "APPROVED").length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No completed workflows.</h2>
                    </div>

                    

                    
                    
                        
                </div>
                    <div id="companyDetails" hidden={userType == "VENDOR" ? false : true}>
                        <h1 className="text-2xl font-semibold text-blue mb-3">Company Details</h1>
                        <table className="flex-auto text-left w-full">
                            <tbody className="divide-y divide-slate-700">
                            <tr>
                                <th className="p-2">Company Name:</th> 
                                <td>{companyName}</td>
                            </tr>
                            <tr>
                                <th className="p-2">Country of Operation:</th>
                                <td>{country}</td>
                            </tr>
                            <tr>
                                <th className="p-2">Registration Number:</th>
                                <td>{regNumber}</td>
                            </tr>
                            <tr>
                                <th className="p-2">Nature of Business:</th>
                                <td>{bizNature}</td>
                            </tr>
                            <tr>
                                <th className="p-2">GST Number:</th>
                                <td>{gstNumber}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                

            </div>
        </>
        
    )
}

export default AccountView;