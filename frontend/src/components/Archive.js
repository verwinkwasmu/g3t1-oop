import { React, useState, useEffect } from 'react';
import { MdRemoveRedEye, MdRestoreFromTrash } from 'react-icons/md';

import { useNavigate, useLocation } from "react-router-dom";

import { getArchiveByCollection } from '../apiCalls';

import RestoreArchived from './RestoreArchive';

function Archive() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'VMS Activity Log'
    
        // getArchiveByCollection('workflows')
        // .then(function(response){
        //   if (response.data.length > 0) {
        //     setArchivedWorkflowsData(response.data)
        //   } else {
        //     setArchivedWorkflowsData([])
        //   }
        // })

        // getArchiveByCollection('assigned workflows')
        // .then(function(response){
        //   if (response.data.length > 0) {
        //     setArchivedAssignedWorkflowsData(response.data)
        //   } else {
        //     setArchivedAssignedWorkflowsData([])
        //   }
        // })

        getArchiveByCollection('questionnaires')
        .then(function(response){
          if (response.data.length > 0) {
            setArchivedQuestionnairesData(response.data)
          } else {
            setArchivedQuestionnairesData([])
          }
        })

        getArchiveByCollection('users')
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
        navigate(`/accounts/${account.id}`, { state: { account: account, origin: 'ARCHIVE' } });
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

                    <div id="questionnairesView" className="grid">
                        <table hidden={currentView == "QUESTIONNAIRES" && archivedQuestionnairesData.length != 0 ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700 text-left">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Title</th>
                                    <th>Assigned Vendor</th>
                                    <th>Assigned Admin</th>
                                    <th>Deleted At</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedQuestionnairesData).map(qnnaire =>
                                <tr key={qnnaire.id}>
                                {/* <td className="p-2">
                                    <input id={qnnaire.id} type="checkbox" onChange={() => {handleSelect(qnnaire)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{qnnaire.data.id}</td>
                                <td className="title">{qnnaire.data.title}</td>
                                <td className="assignedVendor">{qnnaire.data.assignedVendorId}</td>
                                <td className="assignedAdmin">{qnnaire.data.assignedVendorId}</td>
                                <td className="deletedOn">{qnnaire.deletedAt}</td>
                                <td className="deletedBy">{qnnaire.deletedBy}</td>
                                <td className="actions text-right">
                                    <button onClick={() => {toQuestionnaireView(qnnaire)}} className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <label onClick={() => {restoreArchived(qnnaire, "Questionnaire")}} htmlFor="RestoreArchived" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
                                        <MdRestoreFromTrash></MdRestoreFromTrash>            
                                    </label>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                            <h2 hidden={currentView == "QUESTIONNAIRES" && archivedQuestionnairesData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No archived questionnaires.</h2>
                    </div>

                    <div id="assignedWorkflowsView" className="grid text-left">
                        <table hidden={currentView == "WORKFLOWS" && archivedWorkflowsData.length != 0 ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Assigned Vendor</th>
                                    <th>Deleted At</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedAssignedWorkflowsData).map(workflow =>
                                <tr key={workflow.id}>
                                {/* <td className="p-2">
                                    <input id={workflow.id} type="checkbox" onChange={() => {handleSelect(workflow)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{workflow.data.id}</td>
                                <td className="title">{workflow.data.workflowName}</td>
                                <td className="assignedVendor">{workflow.data.assignedVendorId}</td>
                                <td className="deletedOn">{workflow.deletedAt}</td>
                                <td className="deletedBy">{workflow.deletedBy}</td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toWorkflowView(workflow)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <RestoreArchived item={workflow} itemType="Assigned Workflow"></RestoreArchived>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                        <h2 hidden={currentView == "WORKFLOWS" && archivedWorkflowsData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No archived workflows.</h2>
                    </div>

                    <div id="accountsView" className="grid text-left">
                        <table hidden={currentView == "ACCOUNTS" && archivedAccountsData.length != 0 ? false : true} className="flex-auto table-fixed divide-y-2 divide-slate-700">
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Deleted At</th>
                                    <th>Deleted By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(archivedAccountsData).map(account =>
                                <tr key={account.id}>
                                {/* <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{account.data.id}</td>
                                <td className="name">{account.data.name}</td>
                                <td className="company">{account.data.email}</td>
                                <td className="type"><span className={account.data.userType == "VENDOR" ? "badge bg-blue-500" : "badge"}>{account.data.userType}</span></td>
                                <td className="deletedOn">{account.deletedAt}</td>
                                <td className="deletedBy">{account.deletedBy}</td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toAccountView(account.data)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <RestoreArchived item={account} itemType="Account"></RestoreArchived>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                        <h2 hidden={currentView == "ACCOUNTS" && archivedAccountsData.length == 0 ? false : true} className="text-center mt-5 text-gray-300 text-base font-semibold italic text-blue mr-5">No archived accounts.</h2>
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