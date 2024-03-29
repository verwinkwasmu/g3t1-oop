import { useState } from 'react';

import { MdAdd } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

import { createUser } from "../../../apiCalls";

function CreateApproverAccount() {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("APPROVER");
    const [password, setPassword] = useState("");


    const validateForm = () => {
        if (id.length == 0 || name.length == 0 || email.length == 0 || userType.length == 0 || password.length == 0) {
            return false;
        }

        return true;
    }

    const handleSave = () => {
        console.log("INSIDE HANDLE SAVE");
        createUser({id: id, name: name, email: email, userType: userType, password: password})
            .then(function(response){
                window.location.reload();
            })
            .catch(function(error){
                console.log("CREATEACCOUNT ERROR")
            })
    }

    return (
        <>
            <label htmlFor="CreateApproverAccount" className="btn bg-cyan border-transparent outline-none rounded-full mr-2" >
                <MdAdd className="mr-3"></MdAdd>
                Add New { userType == "ADMIN" ? "Admin" : "Approver" }</label>
            
            <input type="checkbox" id="CreateApproverAccount" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-5xl relative py-12 px-20">
                <label htmlFor="CreateApproverAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Add New { userType == "ADMIN" ? "Admin" : "Approver" }</h1>
                    <form>
                        <div id="userDetails">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="id">
                                    ID
                                </label>
                                <input onChange={e => setId(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="id" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="firstname">
                                    Name
                                </label>
                                <input onChange={e => setName(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="firstname" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input onChange={e => setEmail(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="email" type="text"/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input onChange={e => setPassword(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>                    
                        </div>
                    <div className="mt-3 flex justify-center">
                        {validateForm()}
                        <label onClick={() => {handleSave()}} htmlFor="CreateApproverAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                            Add New User
                        </label>
                    </div>
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default CreateApproverAccount;