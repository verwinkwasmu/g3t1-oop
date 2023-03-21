import React, { useState } from 'react';

import { MdEdit } from "react-icons/md";

function EditAccount(props) {

    const [name, setName] = useState(props.account.name);
    const [company, setCompany] = useState(props.account.companyName);
    const [email, setEmail] = useState(props.account.email);

    const validateForm = () => {
        if (name.length == 0 || company.length == 0 || email.length == 0) {
            return false;
        }

        return true;
    }
    return (
        <>
            <label htmlFor="EditAccount" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
                <MdEdit></MdEdit>
            </label>
            {/* <button className="text-blue hover:opacity-75" htmlFor="EditAccount"><MdEdit></MdEdit></button> */}

            
            <input type="checkbox" id="EditAccount" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="EditAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Edit Account</h1>
                <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="firstname">
                        Name
                    </label>
                    <input defaultValue={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text"/>
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="lastname">
                        Last Name
                    </label>
                    <input defaultValue={lastName} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text"/>
                </div> */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="company">
                        Company
                    </label>
                    <input defaultValue={company} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                        Email
                    </label>
                    <input defaultValue={email} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text"/>
                </div>
                <div className="mt-6 flex justify-center">
                    {validateForm()}
                    <label htmlFor="EditAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                        Save Changes
                    </label>
                </div>
                </form>
            </div>
            </div>
        </>
        
    )
}

export default EditAccount;