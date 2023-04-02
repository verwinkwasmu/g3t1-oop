import { React, useState, useEffect } from 'react';

import { MdAdd } from "react-icons/md";

import { getWorkflows } from '../../apiCalls';


function AssignWorkflowsToUser() {

    useEffect(() => {
        document.title = 'Accounts Dashboard'
    
        setWorkflowsData(getWorkflows());
        // getWorkflows()
        // .then(function(response){
        //     console.log(response.data)
        // //   if (response.data.length > 0) {
        // //     setWorkflowsData(response.data)
        // //   } else {
        // //     setWorkflowsData([])
        // //   }
        // })
    
        // eslint-disable-next-line
      }, [])

    const [workflowsData, setWorkflowsData] = useState([]);
    console.log(workflowsData)


    return (
        <>
            <label htmlFor="AssignWorkflowsToUser" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <MdAdd className="mr-3"></MdAdd>
                Assign New Workflow</label>
            
            <input type="checkbox" id="AssignWorkflowsToUser" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="AssignWorkflowsToUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Assign New Workflow</h1>
                <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="firstname">
                        Workflow
                    </label>
                    <select id="workflowSelection" className="select select-bordered w-full rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option disabled selected>Select</option>
                        {(workflowsData).map(workflow =>
                                <option key={workflow.id}>{workflow.name}</option>)}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="lastname">
                        Deadline
                    </label>
                    {/* <input className="input input-bordered w-full rounded-full shadow focus:outline-none focus:shadow-outline" id="lastname" type="datetime"/> */}
                    <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                    </div>
                    <input datepicker="true" datepicker-autohide="true" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <label htmlFor="AssignWorkflowsToUser" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button">
                        Assign New Workflow
                    </label>
                </div>
                </form>
            </div>
            </div>
        
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/datepicker.min.js"></script>


        </>
        
    )
}

export default AssignWorkflowsToUser;