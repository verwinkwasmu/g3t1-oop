import React, { useState, useEffect } from 'react';

import { MdDelete } from "react-icons/md";
import { handler } from 'daisyui';

function RemoveAccount(props) {
    console.log("removeAccount –> props.accounts: ", props.accounts)
    // even though props.accounts is accurate, it isnt updating in the modal fast enough

    const [accountsToRemove, setAccountsToRemove] = useState(props.accounts);

    const handleDelete = () => {
        console.log("INSIDE HANDLE DELETE");
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
                    <h1 className="text-3xl font-semibold text-blue">Remove Account(s)</h1>
                    <p className="font-thin italic">All forms and workflows will be deleted. This cannot be undone.</p>
                </div>
                <div className="flex flex-wrap text-left mb-6">
                <table className="flex-auto table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                </tr>           
                            </thead>
                            <tbody>
                            {(accountsToRemove).map(account => 
                                <tr key={account.id}>
                                    <td className="p-2">{account.id}</td>
                                    <td>{account.first_name} {account.last_name}</td>
                                    <td>{account.company}</td>
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