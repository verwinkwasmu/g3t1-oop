import { React, useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';

import { useNavigate, useLocation } from "react-router-dom";

import CreateAccount from '../Admin/Accounts/CreateVendorAccount';
import RemoveAccount from '../Admin/Accounts/RemoveAccount';
import EditVendorAccount from '../Admin/Accounts/EditVendorAccount';

import { getAccounts } from '../../apiCalls';


function ApprovalDash() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Approval Dashboard'
      }, [])
      

    const [accountsData, setAccountsData] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleSelect = (account) => {
        if (!selected.includes(account)) {
            var updatedAccounts = selected
            updatedAccounts.push(account)
        } else {
            var updatedAccounts = selected.filter(acc => acc.id !== parseInt(account.id));
        }
        setSelected(updatedAccounts);
        // console.log("selected: ", selected)


    }

    const toAccountView = (account) => {
        navigate(`/accounts/${account.id}`, {state: {account: account}});
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1 className="text-3xl font-semibold text-blue">Forms For Approval</h1>
                        </div>
                        <div className="flex ">
                            <CreateAccount></CreateAccount>
                            <RemoveAccount accounts={selected}></RemoveAccount>  
                    </div>
                    </div>
                    <div className="flex flex-wrap text-left">
                        <table className="flex-auto table-fixed border border-1">
                            <thead>
                                <tr>
                                    <th>Submission Date</th>
                                    <th>Due Date</th>
                                    <th>File</th>
                                    <th>Flagged by</th>
                                    <th></th>
                                </tr>           
                            </thead>
                            <tbody>
                            {(accountsData).map(account =>
                                <tr key={account.id}>
                                <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td>
                                <td className="id">{account.id}</td>
                                <td className="name">{account.first_name} {account.last_name}</td>
                                <td className="company">{account.company}</td>
                                <td className="status">{(account.workflows.active.length == 0 ? "Inactive" : "Active")}</td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toAccountView(account)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                        
                    </div>

            </div>
        </>
        
    )
}

export default ApprovalDash;