import React, { useState } from 'react';

import { MdEdit } from "react-icons/md";

import { useNavigate } from 'react-router-dom';

import { updateVendor } from '../../../apiCalls';

function EditVendorAccount(props) {

    const navigate = useNavigate();

    const [id, setId] = useState(props.account.id);
    const [name, setName] = useState(props.account.name);
    const [email, setEmail] = useState(props.account.email);
    const [userType, setUserType] = useState(props.account.userType);
    const [contactNum, setContactNum] = useState(props.account.contactNum);
    const [password, setPassword] = useState(props.account.password);

    const [companyName, setCompanyName] = useState(props.account.companyName);
    const [country, setCountry] = useState(props.account.country);
    const [regNumber, setRegNumber] = useState(props.account.regNumber);
    const [bizNature, setBizNature] = useState(props.account.bizNature);
    const [gstNumber, setGstNumber] = useState(props.account.gstnumber);


    const validateForm = () => {

        if (userType == "VENDOR") {
            if (id.length == 0 || name.length == 0 || email.length == 0 || contactNum.length == 0 || password.length == 0 ||
                companyName.length == 0 || regNumber.length == 0 || bizNature.length == 0 || gstNumber == 0) {
                return false;
            }
    
        }

        
        return true;
    }

    const handleSave = () => {
        console.log("INSIDE HANDLE SAVE");
        updateVendor({id: id, name: name, email: email, password: password, userType: "VENDOR", companyName: companyName, regNumber: regNumber, bizNature: bizNature, contactNum: contactNum, gstnumber: gstNumber})
            .then(function(response){
                // navigate('/accounts');
                navigate(`/accounts/${id}`, {state: {account: {id: id, name: name, email: email, password: password, userType: "VENDOR", companyName: companyName, regNumber: "4567", bizNature: "Love", contactNum: "12345678", gstnumber: "GST456"}}});
            })
            .catch(function(error){
                setName(props.account.name)
                setCompanyName(props.account.companyName)
                setEmail(props.account.email)
            })
    }

    return (
        <>
            <label htmlFor="EditVendorAccount" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
                <MdEdit></MdEdit>
            </label>
            {/* <button className="text-blue hover:opacity-75" htmlFor="EditVendorAccount"><MdEdit></MdEdit></button> */}

            
            <input type="checkbox" id="EditVendorAccount" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-5xl relative py-12 px-20">
                <label htmlFor="EditVendorAccount" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Edit Account</h1>

                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div id="userDetails">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="id">
                                    ID
                                </label>
                                <input defaultValue={id} onChange={e => setId(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" type="text"/>
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
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="contactNum">
                                    Contact Number
                                </label>
                                <input defaultValue={contactNum} onChange={e => setContactNum(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNum" type="text"/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input defaultValue={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            </div>
                        </div>
                        <div id="companyDetails">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="companyName">
                                Company Name
                            </label>
                            <input defaultValue={companyName} onChange={e => setCompanyName(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="companyName">
                                Country of Operation
                            </label>
                            <select onChange={e => setCountry(e.target.value)} className="select select-bordered shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option selected={country == "Singapore" ? true : false}>Singapore</option>
                                <option selected={country == "USA" ? true : false}>USA</option>
                                <option selected={country == "China" ? true : false}>China</option>
                                <option selected={country == "Russia" ? true : false}>Russia</option>
                            </select>     
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="regNumber">
                                Company Registration Number
                            </label>
                            <input defaultValue={regNumber} onChange={e => setRegNumber(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="regNumber" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="bizNature">
                                Nature of Business
                            </label>
                            <input defaultValue={bizNature} onChange={e => setBizNature(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bizNature" type="text"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="gstNumber">
                                GST Number
                            </label>
                            <input defaultValue={gstNumber} onChange={e => setGstNumber(e.target.value)} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gstNumber" type="text"/>
                        </div>
                            
                        </div>
                    </div>                    
                    <div className="mt-6 flex justify-center">
                        {validateForm()}
                        <label onClick={() => {handleSave()}} htmlFor="EditVendorAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                            Save Changes
                        </label>
                    </div>
                    </form>
            </div>
            </div>
        </>
        
    )
}

export default EditVendorAccount;