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
          if (response.data.length > 0) {
            setVendorsData(response.data)
          } else {
            setVendorsData([])
          }
        })

        getUsers()
        .then(function(response){
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

    const toAccountView = (account) => {
        navigate(`/accounts/${account.id}`, { state: { account: account } });
    }

    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                    <div className="flex justify-between mb-5">
                        <div className="flex">
                            <h1 className="text-3xl font-semibold text-blue mr-5">Registered Accounts
                                <span hidden={currentView == "VENDOR" ? false : true}>: Vendors</span>
                                <span hidden={currentView != "VENDOR" ? false : true}>: Staff</span>
                            </h1>
                            <div className="pb-2 inline-flex">
                                <button onClick={() => toggleView("VENDOR")} hidden={currentView == "VENDOR" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    Go to Vendors
                                </button>
                                <button onClick={() => toggleView("USER")} hidden={currentView != "VENDOR" ? true : false} className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded">
                                    Go to Staff
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <div hidden={currentView == "VENDOR" ? false : true}>
                                <CreateVendorAccount></CreateVendorAccount>
                            </div>
                            <div hidden={currentView == "USER" ? false : true}>
                                <CreateUserAccount></CreateUserAccount>
                            </div>
                            {/* <RemoveAccount accounts={selected}></RemoveAccount>   */}
                        </div>
                    </div>
                    <div>

            {/* <form>
                <div class="flex">
                    <select onChange={null} className="select select-bordered shadow appearance-none border rounded-l-full w-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option>Company</option>
                        <option>Contact Name</option>
                        <option>Contact ID</option>
                    </select>                       
                    <div class="relative w-full">
                        <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-full h-12 border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-full h-12 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form> */}

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
                                <td className="status"><span className="badge">Active</span></td>
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