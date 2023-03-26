import { React, useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';

import { useNavigate, useLocation } from "react-router-dom";

import CreateVendorAccount from './CreateVendorAccount';
import CreateUserAccount from './CreateUserAccount';
import RemoveAccount from './RemoveAccount';
import EditVendorAccount from './EditVendorAccount';
import EditUserAccount from './EditUserAccount';

import { getUsers, getVendors, getWorkflows } from '../../../apiCalls';


function AccountDash() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Accounts Dashboard'
    
        // setAccountsData(getUsers());

        getVendors()
        .then(function(response){
            console.log(response.data)
          if (response.data.length > 0) {
            setVendorsData(response.data)
          } else {
            setVendorsData([])
          }
        })

        getUsers()
        .then(function(response){
            console.log(response.data)
          if (response.data.length > 0) {
            setUsersData(response.data)
          } else {
            setUsersData([])
          }
        })
    
        // eslint-disable-next-line
    }, [])


    const [vendorsData, setVendorsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [currentView, setCurrentView] = useState("VENDOR");
    const [selected, setSelected] = useState([]);

    const toggleView = (userGroup) => {
        console.log("inside toggle view!");
        setCurrentView(userGroup);
        console.log("new current view ", currentView)
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

    const toAccountView = (account) => {
        navigate(`/accounts/${account.id}`, { state: { account: account } });
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1 className="text-3xl font-semibold text-blue">Registered Accounts</h1>
                            <div className="inline-flex">
                                <button onClick={() => toggleView("VENDOR")} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 text-gray-800 font-bold py-2 px-4 rounded-l">
                                    VENDORS
                                </button>
                                <button onClick={() => toggleView("USER")} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 text-gray-800 font-bold py-2 px-4 rounded-r">
                                    STAFF
                                </button>
                            </div>
                        </div>
                        <div className="flex ">
                            <div hidden={currentView == "VENDOR" ? false : true}>
                                <CreateVendorAccount></CreateVendorAccount>
                            </div>
                            <div hidden={currentView == "USER" ? false : true}>
                                <CreateUserAccount></CreateUserAccount>
                            </div>
                            {/* <RemoveAccount accounts={selected}></RemoveAccount>   */}
                    </div>
                    </div>
                    <div className="flex flex-wrap text-left">
                        <table className="flex-auto table-fixed divide-y-2 divide-slate-700" hidden={currentView == "VENDOR" ? false : true}>
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(vendorsData).map(account =>
                                <tr key={account.id}>
                                {/* <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{account.id}</td>
                                <td className="name">{account.name}</td>
                                <td className="company">{account.companyName}</td>
                                <td className="status">Active</td>
                                {/* <td className="status">{(account.workflows.active.length == 0 ? "Inactive" : "Active")}</td> */}
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toAccountView(account)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <EditVendorAccount account={account}></EditVendorAccount>
                                </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap text-left">
                    <table className="flex-auto table-fixed divide-y-2 divide-slate-700" hidden={currentView == "USER" ? false : true}>
                            <thead>
                                <tr>
                                    {/* <th className="p-2">[]</th> */}
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>User Type</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                            {(usersData).map(account =>
                                <tr key={account.id}>
                                {/* <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                                <td className="id p-2">{account.id}</td>
                                <td className="name">{account.name}</td>
                                <td className="company">{account.email}</td>
                                <td className="status">{account.userType == "ADMIN" ? "Admin" : "Approver"}</td>
                                <td className="actions text-right">
                                    <button className="btn btn-xs btn-link text-lg text-blue hover:opacity-75" onClick={() => {toAccountView(account)}}><MdRemoveRedEye></MdRemoveRedEye></button>
                                    <EditUserAccount account={account}></EditUserAccount>
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