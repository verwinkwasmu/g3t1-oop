import { useState } from 'react';

import { MdAdd } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

import { createVendor } from "../../../apiCalls";

function CreateVendorAccount() {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [password, setPassword] = useState("");

    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("Singapore");
    const [regNumber, setRegNumber] = useState("");
    const [bizNature, setBizNature] = useState("");
    const [gstNumber, setGstNumber] = useState("");


    const validateForm = () => {
        if (id.length == 0 || name.length == 0 || email.length == 0 || contactNum.length == 0 || password.length == 0 ||
            companyName.length == 0 || country.length == 0 || regNumber.length == 0 || bizNature.length == 0 || gstNumber == 0) {
            return false;
        }

        return true;
    }

    const handleSave = () => {
        console.log("INSIDE HANDLE SAVE");
        createVendor({id: id, name: name, email: email, password: password, userType: "VENDOR", companyName: companyName, country: country, regNumber: regNumber, bizNature: bizNature, contactNum: contactNum, gstnumber: gstNumber})
            .then(function(response){
                window.location.reload();
            })
            .catch(function(error){
                console.log("CREATEACCOUNT ERROR")
            })
    }

    return (
        <>
            <label htmlFor="CreateVendorAccount" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <MdAdd className="mr-3"></MdAdd>
                Add New Vendor</label>
            
            <input type="checkbox" id="CreateVendorAccount" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-5xl relative py-12 px-20">
                <label htmlFor="CreateVendorAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Add New Vendor</h1>
                    <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="contactNum">
                                    Contact Number
                                </label>
                                <input onChange={e => setContactNum(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="contactNum" type="text"/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input onChange={e => setPassword(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>
                        </div>
                        <div id="companyDetails">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="companyName">
                                Company Name
                            </label>
                            <input onChange={e => setCompanyName(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="companyName" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="companyName">
                                Country of Operation
                            </label>
                            <select onChange={e => setCountry(e.target.value)} className="select select-bordered shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option>Singapore</option>
                                <option>USA</option>
                                <option>China</option>
                                <option>Russia</option>
                            </select>     
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="regNumber">
                                Company Registration Number
                            </label>
                            <input onChange={e => setRegNumber(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="regNumber" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="bizNature">
                                Nature of Business
                            </label>  
                            <input onChange={e => setBizNature(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="bizNature" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="gstNumber">
                                GST Number
                            </label>
                            <input onChange={e => setGstNumber(e.target.value)} className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="gstNumber" type="text"/>
                        </div>
                            
                        </div>
                    </div>                    
                    <div className="mt-3 flex justify-center">
                        {validateForm()}
                        <label onClick={() => {handleSave()}} htmlFor="CreateVendorAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                            Add New Vendor
                        </label>
                    </div>
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default CreateVendorAccount;