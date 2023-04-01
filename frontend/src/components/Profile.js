import { MdKeyboardArrowLeft } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import RemoveAccount  from './Admin/Accounts/RemoveAccount';
import EditVendorAccount from './Admin/Accounts/EditVendorAccount';
import EditUserAccount from './Admin/Accounts/EditUserAccount';

import { getAssignedWorkflowsByVendorId, getAssignedWorkflowsByAdminId, getUserById, getVendorById } from '../apiCalls';

import useToken from '../useToken';

function Profile() {

    const navigate = useNavigate();
    const location = useLocation();

    const accountId = useToken().token[0];
    const accountType = useToken().token[1];

    const toAccountDash = () => {
        console.log("===== INSIDE TOACCOUNTDASH =====")
        navigate(`/accounts/#`);
    }

    useEffect(() => {
        document.title = 'Profile'
    
        // setAccountsData(getUsers());

        if (accountType == "VENDOR") {
            console.log("HI")
            getAssignedWorkflowsByVendorId(accountId)
            .then(function(response){
                console.log(response.data)
              if (response.data.length > 0) {
                setAssignedWorkflowsData(response.data)
              } else {
                setAssignedWorkflowsData([])
              }
            })

            getVendorById(accountId)
            .then(function(response) {
                // setAccount(response.data)
                setId(response.data.id)
                setName(response.data.name)
                setEmail(response.data.email)
                setUserType(accountType)
                setContactNum(response.data.contactNum)
                setPassword(response.data.password)
                setCompanyName(response.data.companyName)
                setCountry(response.data.country)
                setRegNumber(response.data.regNumber)
                setBizNature(response.data.bizNature)
                setGstNumber(response.data.gstnumber)
            })
        } else {
            getAssignedWorkflowsByAdminId(accountId)
            .then(function(response){
              if (response.data.length > 0) {
                setAssignedWorkflowsData(response.data)
              } else {
                setAssignedWorkflowsData([])
              }
            })

            getUserById(accountId)
            .then(function(response) {
                // setAccount(response.data)
                setId(response.data.id)
                setName(response.data.name)
                setEmail(response.data.email)
                setUserType(accountType)
                setPassword(response.data.password)

            })
        }

        

      }, [])

        // const [account, setAccount] = useState();
        const [id, setId] = useState();
        const [name, setName] = useState();
        const [email, setEmail] = useState();
        const [userType, setUserType] = useState();
        const [contactNum, setContactNum] = useState();
        const [password, setPassword] = useState();

        const [companyName, setCompanyName] = useState();
        const [country, setCountry] = useState();
        const [regNumber, setRegNumber] = useState();
        const [bizNature, setBizNature] = useState();
        const [gstNumber, setGstNumber] = useState();
    
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
                <div id="header" className="flex flex-wrap my-10">
                    <div className="mr-12">
                        <img className="rounded-full w-32 h-32" src="https://img.freepik.com/free-photo/headshot-charismatic-pleasant-friendly-european-woman-short-chestnut-haircut-smiling-positive-feeling-happy-upbeat-enjoying-lifes-casually-talking-friends-amused-cheerful-standing-white-background_176420-34680.jpg?w=2000" alt="image description"/>
                    </div>
                    <div className="flex-auto font-thin">
                        <p >ID: {id}</p>
                        <h1 className="text-3xl font-semibold text-blue">{name}</h1>
                        <p className="font-thin mb-2 italic">{email}</p>
                        <p><span className={userType == "VENDOR" ? "font-normal badge bg-blue-500" : "font-normal badge"}>{userType}</span></p>
                    </div>
                    <div className="flex grid grid-rows-2 justify-items-end">
                        <div>
                            {/* <span hidden={userType == "VENDOR" ? false : true}>
                                <EditVendorAccount account={account}></EditVendorAccount>
                            </span> */}
                            {/* <span hidden={userType != "VENDOR" ? false : true}>
                                <EditUserAccount account={account}></EditUserAccount>
                            </span> */}

                        </div>                      
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

export default Profile;