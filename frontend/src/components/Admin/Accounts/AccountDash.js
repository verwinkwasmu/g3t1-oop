import { React, useState, useEffect } from "react";
import { MdRemoveRedEye, MdEdit } from "react-icons/md";

import { useNavigate, useLocation } from "react-router-dom";

import CreateVendorAccount from "./CreateVendorAccount";
import CreateAdminAccount from "./CreateAdminAccount";
import CreateApproverAccount from "./CreateApproverAccount";
import RemoveAccount from "./RemoveAccount";
import EditVendorAccount from "./EditVendorAccount";
import EditUserAccount from "./EditUserAccount";

import {
  getUsersByType,
  getVendors,
  getAssignedWorkflowsByVendorId,
  getAssignedWorkflowsByAdminId,
  updateVendor,
  updateUser,
} from "../../../apiCalls";
import AssignNewUser from "../Workflows/AssignNewUser";

function AccountDash() {
    const [accountActiveStatus, setAccountActiveStatus] = useState({})
  const navigate = useNavigate();


  useEffect(() => {
    getAllAccounts()
    document.title = "Accounts Dashboard";

    // setAccountsData(getUsers());

    // getVendors().then(function (response) {
    //   if (response.data.length > 0) {
    //     setVendorsData(response.data);
    //   } else {
    //     setVendorsData([]);
    //   }
    // });

    // getUsersByType("ADMIN").then(function (response) {
    //   if (response.data.length > 0) {
    //     // console.log(response.data);
    //     setAdminsData(response.data);
    //   } else {
    //     setAdminsData([]);
    //   }
    // });

    // getUsersByType("APPROVER").then(function (response) {
    //   if (response.data.length > 0) {
    //     // console.log(response.data);
    //     setApproversData(response.data);
    //   } else {
    //     setApproversData([]);
    //   }
    // }
    
    // );



    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    console.log(accountActiveStatus)
  }, [accountActiveStatus])



  async function getAllAccounts(){
    return new Promise(async (resolve, reject)=>{
        try{
            const responseVendor = await getVendors()
            const responseAdmin = await getUsersByType("ADMIN")
            const responseApprover = await getUsersByType("APPROVER")
            const vendorData = responseVendor.data
            const adminData = responseAdmin.data
            const approverData = responseApprover.data
            setVendorsData(vendorData)
            setAdminsData(adminData)
            setApproversData(approverData)
    
            let promise 
            vendorData.map(async (vendor, idx)=>{
                promise = await cAW(vendor.id, "VENDOR")
                console.log("vendor response data", promise)
    
                let checker = "INACTIVE"
                promise.map((assignedWorkflow, idx)=>{
                    if(assignedWorkflow.approverReviewStatus != "COMPLETED"){
                        checker = "ACTIVE"
                    }
                })
                const id = vendor.id
                console.log("VENDOR ID", id)
                const newStatus = accountActiveStatus
                newStatus[id] = checker
                setAccountActiveStatus(oldStatus => ({...oldStatus, ...newStatus}))
            })
    
            adminData.map(async (admin, idx)=>{
                promise = await cAW(admin.id, "ADMIN")
                console.log("admin response data", promise)
    
                let checker = "INACTIVE"
                promise.map((assignedWorkflow, idx)=>{
                    if(assignedWorkflow.approverReviewStatus != "COMPLETED"){
                        checker = "ACTIVE"
                    }
                })
                const id = admin.id
                const newStatus = accountActiveStatus
                newStatus[id] = checker
                setAccountActiveStatus(oldStatus => ({...oldStatus, ...newStatus}))
            })        
        } catch(e){
            alert("Error occured")
        }
    })
}

  async function cAW(id, userType){
    let response
    let responseData = []
    return new Promise(async (resolve,rejcet)=>{
        try{
        if(userType ==="VENDOR"){
            response = await getAssignedWorkflowsByVendorId(id)
        }else if(userType == "ADMIN"){
            response = await getAssignedWorkflowsByAdminId(id)   
        }
        responseData = response.data
        }catch(e){
        }
    resolve(responseData)
    })
  }

  const [vendorsData, setVendorsData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);
  const [approversData, setApproversData] = useState([]);
  const [currentView, setCurrentView] = useState("VENDOR");
  const [selected, setSelected] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({ data: "default" });

  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorContactNum, setVendorContactNum] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");

  const [vendorCompanyName, setVendorCompanyName] = useState("");
  const [vendorCountry, setVendorCountry] = useState("");
  const [vendorRegNumber, setVendorRegNumber] = useState("");
  const [vendorBizNature, setVendorBizNature] = useState("");
  const [vendorGstNumber, setVendorGstNumber] = useState("");

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // const [formStatus, setFormStatus] = useState(true);

  const validateForm = () => {
    if (currentView == "VENDOR") {
      if (
        vendorId.length == 0 ||
        vendorName.length == 0 ||
        vendorEmail.length == 0 ||
        vendorContactNum.length == 0 ||
        vendorPassword.length == 0 ||
        vendorCompanyName.length == 0 ||
        vendorRegNumber.length == 0 ||
        vendorBizNature.length == 0 ||
        vendorGstNumber.length == 0
      ) {
        return false;
      }
    }

    return true;
  };
  useEffect(() => {
    // console.log("workflowStatus: ", workflowStatus);
  }, [workflowStatus]);

  const handleSave = () => {
    // console.log("INSIDE HANDLE SAVE");
    if (currentView == "VENDOR") {
      updateVendor({
        id: vendorId,
        name: vendorName,
        email: vendorEmail,
        password: vendorPassword,
        userType: currentView,
        companyName: vendorCompanyName,
        regNumber: vendorRegNumber,
        bizNature: vendorBizNature,
        contactNum: vendorContactNum,
        gstnumber: vendorGstNumber,
        country: vendorCountry,
      })
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {});
    }

    if (currentView == "ADMIN" || currentView == "APPROVER") {
      updateUser({
        id: userId,
        name: userName,
        email: userEmail,
        password: userPassword,
        userType: currentView,
      })
        .then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
        //   console.log("HELLO");
          // setVendorId(itemToEdit.id)
          // setCompanyName(props.account.companyName)
          // setEmail(props.account.email)
        });
    }
  };

  const toggleView = (userGroup) => {
    setCurrentView(userGroup);
  };

  const handleSelect = (account) => {
    if (!selected.includes(account)) {
      var updatedAccounts = selected;
      updatedAccounts.push(account);
    } else {
      var updatedAccounts = selected.filter(
        (acc) => acc.id !== parseInt(account.id)
      );
    }
    setSelected(updatedAccounts);
  };

  async function checkActiveWorkflows(id) {
    var indivStatus = "INACTIVE";
    // console.log("checking new id: ", id);
    // console.log("initial status: ", indivStatus);

    try{
        const response1 = await getAssignedWorkflowsByVendorId(id);
        // console.log(id)
        for (var workflow in response1.data) {
            if (workflow.approvalRequestDate == null) {
              // setWorkflowStatus("ACTIVE");
              indivStatus = "ACTIVE";
              return indivStatus
              console.log("prelim status: ", indivStatus);
              break;
            }
          }
    }catch(e){
        // console.log("YOYOYOYO")
        return "INACTIVE"
    }
    try{
        const response2 = await getAssignedWorkflowsByAdminId(id);
        for (var workflow in response2.data) {
            if (workflow.approvalRequestDate == null) {
              //   setWorkflowStatus("ACTIVE");
              indivStatus = "ACTIVE";
              return indivStatus

              console.log("prelim2 status: ", indivStatus);
              break;
            }
          }
    }catch(e){
        // console.log("YOYOYOYO")
        return "INACTIVE"
    }
      
    }

    // setWorkflowStatus(currentWorkflowStatus => [...currentWorkflowStatus, indivStatus])

  const toAccountView = (account) => {
    navigate(`/accounts/${account.id}`, {
      state: { account: account, origin: "ACCOUNTDASH" },
    });
  };

  return (
    <>
      <div className="rounded-3xl mx-10 my-10 py-12 px-20 shadow-2xl">
        <div className="flex justify-between mb-5">
          <div className="flex">
            <h1 className="text-3xl font-semibold text-blue mr-5">
              Registered
              <span hidden={currentView == "VENDOR" ? false : true}>
                {" "}
                Vendors
              </span>
              <span hidden={currentView == "ADMIN" ? false : true}>
                {" "}
                Admins
              </span>
              <span hidden={currentView == "APPROVER" ? false : true}>
                {" "}
                Approvers
              </span>
            </h1>
            <div className="pb-2 inline-flex">
              <button
                onClick={() => toggleView("VENDOR")}
                hidden={currentView == "VENDOR" ? true : false}
                className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded"
              >
                Go to Vendors
              </button>
              <button
                onClick={() => toggleView("ADMIN")}
                hidden={currentView == "ADMIN" ? true : false}
                className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded"
              >
                Go to Admins
              </button>
              <button
                onClick={() => toggleView("APPROVER")}
                hidden={currentView == "APPROVER" ? true : false}
                className="bg-gray-300 bg-opacity-0 hover:bg-opacity-50 italic text-xs uppercase font-bold leading-snug text-blue py-2 px-4 rounded"
              >
                Go to Approvers
              </button>
            </div>
          </div>
          <div className="flex">
            <div hidden={currentView == "VENDOR" ? false : true}>
              <CreateVendorAccount></CreateVendorAccount>
            </div>
            <div hidden={currentView == "ADMIN" ? false : true}>
              <CreateAdminAccount></CreateAdminAccount>
            </div>
            <div hidden={currentView == "APPROVER" ? false : true}>
              <CreateApproverAccount></CreateApproverAccount>
            </div>
            {/* <RemoveAccount accounts={selected}></RemoveAccount>   */}
          </div>
        </div>
        <div></div>
        <div className="flex flex-wrap text-left">
          <table
            className="flex-auto table-fixed divide-y-2 divide-slate-700"
            hidden={
              currentView == "VENDOR" || currentView == "ADMIN" ? false : true
            }
          >
            <thead>
              <tr>
                {/* <th className="p-2">[]</th> */}
                <th className="p-2">ID</th>
                <th>Name</th>
                <th hidden={currentView == "VENDOR" ? false : true}>Company</th>
                <th>Workflow Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {(currentView == "VENDOR" ? vendorsData : adminsData).map(
                (account, idx) => (
                  <tr key={account.id}>
                    {/* <td className="p-2">
                                    <input id={account.id} type="checkbox" onChange={() => {handleSelect(account)}} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                </td> */}
                    <td className="id p-2">{account.id}</td>
                    <td className="name">{account.name}</td>
                    <td
                      className="company"
                      hidden={currentView == "VENDOR" ? false : true}
                    >
                      {account.companyName}
                    </td>
                    
                    <td className="status">
                      <span
                        className={
                        accountActiveStatus[account.id] == 'ACTIVE'
                            ? "badge bg-blue-500"
                            : "badge"
                        }
                      >
                        {accountActiveStatus[account.id]}
                      </span>
                    </td>
                    <td className="actions text-right">
                      <button
                        className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"
                        onClick={() => {
                          toAccountView(account);
                        }}
                      >
                        <MdRemoveRedEye></MdRemoveRedEye>
                      </button>
                      <span hidden={currentView == "VENDOR" ? false : true}>
                        {/* <EditVendorAccount account={account}></EditVendorAccount> */}
                        <label
                          onClick={() => {
                            setItemToEdit(account);
                            setVendorId(account.id);
                            setVendorName(account.name);
                            setVendorEmail(account.email);
                            setVendorContactNum(account.contactNum);
                            setVendorPassword(account.password);
                            setVendorCompanyName(account.companyName);
                            setVendorCountry(account.country);
                            setVendorRegNumber(account.regNumber);
                            setVendorBizNature(account.bizNature);
                            setVendorGstNumber(account.gstnumber);
                          }}
                          htmlFor="EditVendorAccount"
                          className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"
                        >
                          <MdEdit></MdEdit>
                        </label>
                      </span>
                      <span hidden={currentView == "ADMIN" ? false : true}>
                        <label
                          onClick={() => {
                            setItemToEdit(account);
                            setUserId(account.id);
                            setUserName(account.name);
                            setUserEmail(account.email);
                            setUserPassword(account.password);
                          }}
                          htmlFor="EditUserAccount"
                          className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"
                        >
                          <MdEdit></MdEdit>
                        </label>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap text-left">
          <table
            className="flex-auto table-fixed divide-y-2 divide-slate-700"
            hidden={currentView == "APPROVER" ? false : true}
          >
            <thead>
              <tr>
                <th className="p-2">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {approversData.map((account) => (
                <tr key={account.id}>
                  <td className="id p-2">{account.id}</td>
                  <td className="name">{account.name}</td>
                  <td className="company">{account.email}</td>
                  <td className="actions text-right">
                    <button
                      className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"
                      onClick={() => {
                        toAccountView(account);
                      }}
                    >
                      <MdRemoveRedEye></MdRemoveRedEye>
                    </button>
                    <label
                      onClick={() => {
                        setItemToEdit(account);
                        setUserId(account.id);
                        setUserName(account.name);
                        setUserEmail(account.email);
                        setUserPassword(account.password);
                      }}
                      htmlFor="EditUserAccount"
                      className="btn btn-xs btn-link text-lg text-blue hover:opacity-75"
                    >
                      <MdEdit></MdEdit>
                    </label>
                    {/* <EditUserAccount account={account} type="APPROVER"></EditUserAccount> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <input type="checkbox" id="EditVendorAccount" className="modal-toggle" />
      <div className="modal text-left">
        <div className="modal-box max-w-5xl relative py-12 px-20">
          <label
            htmlFor="EditVendorAccount"
            className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12"
          >
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            Edit Vendor Account
          </h1>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="userDetails">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="id"
                  >
                    ID
                  </label>
                  <input
                    disabled
                    defaultValue={vendorId}
                    onChange={(e) => setVendorId(e.target.value)}
                    className="bg-gray-50 shadow appearance-none border border-gray-300 rounded-full w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    id="id"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="firstname"
                  >
                    Name
                  </label>
                  <input
                    defaultValue={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstname"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    defaultValue={vendorEmail}
                    onChange={(e) => setVendorEmail(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="contactNum"
                  >
                    Contact Number
                  </label>
                  <input
                    defaultValue={vendorContactNum}
                    onChange={(e) => setVendorContactNum(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contactNum"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    defaultValue={itemToEdit.password}
                    onChange={(e) => setVendorPassword(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
              <div id="companyDetails">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <input
                    defaultValue={vendorCompanyName}
                    onChange={(e) => setVendorCompanyName(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="companyName"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="companyName"
                  >
                    Country of Operation
                  </label>
                  <select
                    onChange={(e) => setVendorCountry(e.target.value)}
                    className="select select-bordered shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option
                      selected={vendorCountry == "Singapore" ? true : false}
                    >
                      Singapore
                    </option>
                    <option selected={vendorCountry == "USA" ? true : false}>
                      USA
                    </option>
                    <option selected={vendorCountry == "China" ? true : false}>
                      China
                    </option>
                    <option selected={vendorCountry == "Russia" ? true : false}>
                      Russia
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="regNumber"
                  >
                    Company Registration Number
                  </label>
                  <input
                    defaultValue={vendorRegNumber}
                    onChange={(e) => setVendorRegNumber(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="regNumber"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="bizNature"
                  >
                    Nature of Business
                  </label>
                  <input
                    defaultValue={vendorBizNature}
                    onChange={(e) => setVendorBizNature(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bizNature"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-thin mb-2"
                    htmlFor="gstNumber"
                  >
                    GST Number
                  </label>
                  <input
                    defaultValue={vendorGstNumber}
                    onChange={(e) => setVendorGstNumber(e.target.value)}
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="gstNumber"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              {/* {validateForm()} */}
              <label
                onClick={() => {
                  handleSave();
                }}
                htmlFor="EditVendorAccount"
                className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full"
                type="button"
                disabled={validateForm() == false ? true : false}
              >
                Save Changes
              </label>
            </div>
          </form>
        </div>
      </div>

      <input type="checkbox" id="EditUserAccount" className="modal-toggle" />
      <div className="modal text-left">
        <div className="modal-box max-w-5xl relative py-12 px-20">
          <label
            htmlFor="EditUserAccount"
            className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12"
          >
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            Edit {currentView == "ADMIN" ? "Admin" : "Approver"} Account
          </h1>
          <form>
            <div id="userDetails">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-thin mb-2"
                  htmlFor="id"
                >
                  ID
                </label>
                <input
                  disabled
                  defaultValue={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-gray-50 shadow appearance-none border border-gray-300 rounded-full w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  id="id"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-thin mb-2"
                  htmlFor="firstname"
                >
                  Name
                </label>
                <input
                  defaultValue={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-thin mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  defaultValue={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-md font-thin mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  defaultValue={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {() => {
                validateForm();
              }}
              <label
                onClick={() => {
                  handleSave();
                }}
                htmlFor="EditUserAccount"
                className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full"
                type="button"
                disabled={validateForm() == false ? true : false}
              >
                Save Changes
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountDash;
