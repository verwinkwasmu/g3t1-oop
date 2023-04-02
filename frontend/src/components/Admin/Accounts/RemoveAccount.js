import React, { useState } from 'react';

import { MdDelete } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

import { deleteUser, deleteVendor } from '../../../apiCalls';

function RemoveAccount(props) {

    const navigate = useNavigate();

    const [token] = useState('admin1')
    const [id] = useState(props.accounts[0].id)
    const [userType] = useState(props.accounts[0].userType)
    const [name] = useState(props.accounts[0].name)
    const [companyName] = useState(props.accounts[0].companyName)
    const [accountsToRemove, setAccountsToRemove] = useState(props.accounts);

    const handleDelete = () => {
        console.log("INSIDE HANDLE DELETE");
        console.log(id);

        if (userType == "VENDOR") {
            deleteVendor(id, token)
                .then(function(response){
                    navigate("/accounts")
                    
                })
                .catch(function(error){
                    console.log("DELETE ERROR")})
        } else {
            deleteUser(id)
                .then(function(response){
                    navigate("/accounts")
                    
                })
                .catch(function(error){
                    console.log("DELETE ERROR")})
        }

    }

    return (
        <>
            <label htmlFor="RemoveAccount" className="btn bg-red border-transparent rounded-full ml-2">
                <MdDelete className="mr-3"></MdDelete>
                Remove Account
            </label>

            <input type="checkbox" id="RemoveAccount" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="RemoveAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <div className="mb-3">
                    <h1 className="text-3xl font-semibold text-blue">Remove Account</h1>
                    <p className="font-thin italic">This cannot be undone.</p>
                </div>
                <div className="flex flex-wrap text-left mb-6">
                <table className="flex-auto table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th hidden={(userType.includes("VENDOR")) ? false : true}>Company</th>
                                    <th>User Type</th>
                                </tr>           
                            </thead>
                            <tbody>
                            {(accountsToRemove).map(account => 
                                <tr key={id}>
                                    <td className="p-2">{id}</td>
                                    <td>{name}</td>
                                    <td hidden={(userType.includes("VENDOR")) ? false : true}>{companyName}</td>
                                    <td>{userType}</td>
                                </tr>
                                )}
                                
                            </tbody>
                        </table>
                </div>
                <div className="flex justify-center">
                    <label htmlFor="RemoveAccount" onClick={() => handleDelete()} className="btn btn-md btn-wide bg-red border-transparent outline-none rounded-full" type="button">
                        Yes, Remove
                    </label>
                </div>
            </div>
            </div>
        </>
        
    )
}

export default RemoveAccount;