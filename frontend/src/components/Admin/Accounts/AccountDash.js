import { React, useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';

import { useNavigate, useLocation } from "react-router-dom";

import CreateAccount from './CreateAccount';
import RemoveAccount from './RemoveAccount';
import EditAccount from './EditAccount';

import { getAccounts } from '../../../apiCalls';


function AccountDash() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Accounts Dashboard'
    
        setAccountsData(getAccounts());
        // getAccounts()
        // .then(function(response){
        //     console.log(response.data)
        // //   if (response.data.length > 0) {
        // //     setAccountsData(response.data)
        // //   } else {
        // //     setAccountsData([])
        // //   }
        // })
    
        // eslint-disable-next-line
      }, [])
      

    const [accountsData, setAccountsData] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleSelect = (account) => {
        console.log("inside select")
        console.log("selected: ", selected)
        if (!selected.includes(account)) {
            console.log("INSIDE IF")
            setSelected(selected.push(account))
        } else {
            console.log("INSIDE ELSE")
            // console.log(selected.filter(id => id !== parseInt(account.id)))
            // setSelected(selected.filter(id => id !== parseInt(account.id)));
        }
    }

    const toAccountView = (account) => {
        navigate(`/accounts/${account.id}`, {state: {account: account}});
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1 className="text-3xl font-semibold text-blue">Registered Accounts</h1>
                        </div>
                        <div className="flex ">
                            <CreateAccount></CreateAccount>
                            <RemoveAccount accounts={selected}></RemoveAccount>  
                    </div>
                    <div className="flex ">
                        <CreateUser></CreateUser>
                        <RemoveUser></RemoveUser>
                    </div>
                    <div className="flex flex-wrap text-left">
                        <table className="flex-auto table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">[]</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th></th>
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
                                    <EditAccount account={account}></EditAccount>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                        
                    </div>

            </div>
        </>

    )
}

export default AccountDash;