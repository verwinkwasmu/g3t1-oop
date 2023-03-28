import { React, useState, useEffect } from 'react';
import { MdRemoveRedEye, MdRestoreFromTrash } from 'react-icons/md';

import { useNavigate, useLocation } from "react-router-dom";

import { getWorkflows, getAssignedWorkflows, getQuestionnaires, getUsers } from '../apiCalls';

import RestoreArchived from './RestoreArchive';

function Archive() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'VMS Activity Log'
    
        getWorkflows()
        .then(function(response){
          if (response.data.length > 0) {
            setArchivedWorkflowsData(response.data)
          } else {
            setArchivedWorkflowsData([])
          }
        })

        getAssignedWorkflows()
        .then(function(response){
          if (response.data.length > 0) {
            setArchivedAssignedWorkflowsData(response.data)
          } else {
            setArchivedAssignedWorkflowsData([])
          }
        })

        getQuestionnaires()
        .then(function(response){
          if (response.data.length > 0) {
            setArchivedQuestionnairesData(response.data)
          } else {
            setArchivedQuestionnairesData([])
          }
        })

        getUsers()
        .then(function(response){
          if (response.data.length > 0) {
            setArchivedAccountsData(response.data)
          } else {
            setArchivedAccountsData([])
          }
        })
    
        // eslint-disable-next-line
    }, [])


    const [archivedWorkflowsData, setArchivedWorkflowsData] = useState([]);
    const [archivedAssignedWorkflowsData, setArchivedAssignedWorkflowsData] = useState([]);
    const [archivedAccountsData, setArchivedAccountsData] = useState([]);
    const [archivedQuestionnairesData, setArchivedQuestionnairesData] = useState([]);

    const [currentView, setCurrentView] = useState("WORKFLOWS");
    const [selected, setSelected] = useState();
    const [itemToRestore, setItemToRestore] = useState();
    const [itemTypeToRestore, setItemTypeToRestore] = useState();


    const toggleView = (userGroup) => {
        setCurrentView(userGroup);
    }

    const handleSelect = (account) =>  {
        if (!selected.includes(account)) {
            var updatedAccounts = selected
            updatedAccounts.push(account)
        } else {
            var updatedAccounts = selected.filter(acc => acc.id !== parseInt(account.id));
        }
        setSelected(updatedAccounts);
        // console.log("selected: ", selected)


    }
    const toWorkflowView = (workflow) => {
        console.log("===== INSIDE toWorkflowView =====")
        navigate(`/workflows/${workflow.id}`, { state: { workflow: workflow } });
    }

    const toQuestionnaireView = (qnnaire) => {
        console.log("===== INSIDE toQuestionnaireView =====")
        // navigate(`/workflows/${workflow.id}`, { state: { workflow: workflow } });
    }

    const toAccountView = (account) => {
        navigate(`/accounts/${account.id}`, { state: { account: account } });
    }

    const restoreArchived = (item, itemType) => {
        console.log(item)
    }

    return (
        <>
            <div className="rounded-3xl mx-10 my-10 py-12 px-20 shadow-2xl">    
                    <div className="flex justify-between mb-5">
                        <div className="flex">
                            <h1 className="text-3xl font-semibold text-blue mr-5">Archived
                                <span hidden={currentView == "WORKFLOWS" ? false : true}> Workflows</span>
                                <span hidden={currentView == "QUESTIONNAIRES" ? false : true}> Questionnaires</span>
                                <span hidden={currentView == "ACCOUNTS" ? false : true}> Accounts</span>
                            </h1>
                            <div className="pb-2 inline-flex">
                                <button onClick={() => toggleView("WORKFLOWS")} hidden={currentView == "WORKFLOWS" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    Go to Workflows
                                </button>
                                <button onClick={() => toggleView("QUESTIONNAIRES")} hidden={currentView == "QUESTIONNAIRES" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    Go to Questionnaires
                                </button>
                                <button onClick={() => toggleView("ACCOUNTS")} hidden={currentView == "ACCOUNTS" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    Go to Accounts
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <div hidden={currentView == "VENDOR" ? false : true}>
                                {/* <CreateVendorAccount></CreateVendorAccount> */}
                            </div>
                            <div hidden={currentView == "USER" ? false : true}>
                                {/* <CreateUserAccount></CreateUserAccount> */}
                            </div>
                            {/* <RemoveAccount accounts={selected}></RemoveAccount>   */}
                        </div>
                    </div>
                    <div>

                    </div>

                    <div id="questionnairesView" className="flex flex-wrap text-left">
                        <table hidden={currentView == "QUESTIONNAIRES" ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Title</th>
                                    <th>Assigned Vendor</th>
                                    <th>Assigned Admin</th>
                                    <th>Deleted On</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedQuestionnairesData).map(qnnaire =>
                                <tr key={qnnaire.id}>
                                {/* <td className="p-2">
                                    <input id={qnnaire.id} type="checkbox" onChange={() => {handleSelect(qnnaire)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{qnnaire.id}</td>
                                <td className="title">{qnnaire.title}</td>
                                <td className="assignedVendor">{qnnaire.assignedVendorId}</td>
                                <td className="assignedAdmin">{qnnaire.assignedVendorId}</td>
                                <td></td>
                                <td></td>
                                <td className="actions text-right">
                                    <button onClick={() => {toQuestionnaireView(qnnaire)}} className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <label onClick={() => {restoreArchived(qnnaire, "Questionnaire")}} htmlFor="RestoreArchived" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
                                        <MdRestoreFromTrash></MdRestoreFromTrash>            
                                    </label>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>

                    <div id="assignedWorkflowsView" className="flex flex-wrap text-left">
                        <table hidden={currentView == "WORKFLOWS" ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Assigned Vendor</th>
                                    <th>Deleted On</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedAssignedWorkflowsData).map(workflow =>
                                <tr key={workflow.id}>
                                {/* <td className="p-2">
                                    <input id={workflow.id} type="checkbox" onChange={() => {handleSelect(workflow)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{workflow.id}</td>
                                <td className="title">{workflow.workflowName}</td>
                                <td className="assignedVendor">{workflow.assignedVendorId}</td>
                                <td></td>
                                <td></td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toWorkflowView(workflow)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <RestoreArchived item={workflow} itemType="Assigned Workflow"></RestoreArchived>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>

                    <div id="accountsView" className="flex flex-wrap text-left">
                        <table hidden={currentView == "ACCOUNTS" ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Deleted On</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedAccountsData).map(account =>
                                <tr key={account.id}>
                                {/* <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{account.id}</td>
                                <td className="name">{account.name}</td>
                                <td className="company">{account.email}</td>
                                <td className="type"><span className={account.userType == "VENDOR" ? "badge bg-blue-500" : "badge"}>{account.userType}</span></td>
                                <td></td>
                                <td></td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toAccountView(account)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <RestoreArchived item={account} itemType="Account"></RestoreArchived>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    
            </div>
            <input type="checkbox" id="RestoreArchived" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="RestoreArchived" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <div className="mb-3">
                    <h1 className="text-3xl font-semibold text-blue">Restore {itemTypeToRestore}?</h1>
                </div>                
                <form>                 
                    <div className="mt-6 flex justify-center">
                        <label htmlFor="RestoreArchived" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" >
                            Yes, Restore
                        </label>
                    </div>
                </form>
            </div>
            </div>
        </>

    )
}

export default Archive;