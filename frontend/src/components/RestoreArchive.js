import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


import { MdRestoreFromTrash } from 'react-icons/md';

import { restoreFromArchive } from '../apiCalls';


function RestoreArchived(props) {

    const navigate = useNavigate();

    const [item, setItem] = useState(props.item);
    const [itemType, setItemType] = useState(props.itemType);
    
    const handleRestore = () =>  {
        console.log("inside handlerestore")
        console.log(item)

        restoreFromArchive(item.id)
        .then(function(response){
            navigate(`/archive`);
        })
        .catch(function(error) {
            console.log(error)
        })


    }

    return (
        <>
        <label htmlFor="RestoreArchived" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
            <MdRestoreFromTrash></MdRestoreFromTrash>            
        </label>
            
            <input type="checkbox" id="RestoreArchived" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="RestoreArchived" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <div className="mb-3">
                    <h1 className="text-3xl font-semibold text-blue">Restore {itemType.charAt(0) + itemType.substr(1).toLowerCase()}?</h1>
                    <table hidden={itemType == "Account" ? false : true } className="flex-auto w-full divide-y-2 divide-slate-700">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th hidden={itemType != null && itemType == "VENDOR" ? false : true}>Company</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            <tr key={item.id}>
                                <td className="name">{item.name}</td>
                                <td className="email">{item.email}</td>
                                <td className="company" hidden={item != null && itemType == "VENDOR" ? false : true}>{item.companyName}</td>
                                <td className="type"><span className={itemType == "VENDOR" ? "badge bg-blue-500" : "badge"}>{item.userType}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>                
                <form>                 
                    <div className="mt-6 flex justify-center">
                        <label onClick={() => {handleRestore()}} htmlFor="RestoreArchived" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" >
                            Yes, Restore
                        </label>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default RestoreArchived;