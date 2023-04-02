import React, { useState } from 'react';

import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

import { updateUser } from '../../../apiCalls';

function EditUserAccount(props) {

    const navigate = useNavigate();

    const [id, setId] = useState(props.account.id);
    const [name, setName] = useState(props.account.name);
    const [email, setEmail] = useState(props.account.email);
    const [userType, setUserType] = useState(props.account.userType);
    const [password, setPassword] = useState(props.account.email);


    const validateForm = () => {
        if (id.length == 0 || name.length == 0 || email.length == 0 || userType.length == 0 || password.length == 0) {
            return false;
        }

        return true;
    }

    const handleSave = () => {
        console.log("INSIDE HANDLE SAVE");
        updateUser({id: id, name: name, email: email, userType: userType, password: password})
            .then(function(response){
                navigate(`/accounts/${id}`, {state: {account: {id: id, name: name, email: email, userType: userType, password: password}}});
            })
            .catch(function(error){
                setId(props.account.id)
                setName(props.account.name)
                setEmail(props.account.email)
                setUserType(props.account.userType)
                setPassword(props.account.password)
            })
    }

    return (
        <>
            <label htmlFor="EditUserAccount" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
                <MdEdit></MdEdit>
            </label>
            
            <input type="checkbox" id="EditUserAccount" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-5xl relative py-12 px-20">
                <label htmlFor="EditUserAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Edit Account</h1>
                <form>
                <div id="userDetails">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="id">
                                    ID
                                </label>
                                <input disabled defaultValue={id} onChange={e => setId(e.target.value)} className="bg-gray-50 shadow appearance-none border border-gray-300 rounded-full w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" id="id" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="firstname">
                                    Name
                                </label>
                                <input defaultValue={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input defaultValue={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="userType">
                                    User Type
                                </label>
                                <select defaultValue={userType} onChange={e => setUserType(e.target.value)} className="select select-bordered shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="ADMIN">Administrator</option>
                                    <option value="APPROVER">Approver</option>
                                </select>     
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input defaultValue={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>                    
                        </div>
                                        
                    <div className="mt-6 flex justify-center">
                        {validateForm()}
                        <label onClick={() => {handleSave()}} htmlFor="EditUserAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                            Save Changes
                        </label>
                    </div>
                    </form>
            </div>
            </div>
        </>
        
    )
}

export default EditUserAccount;