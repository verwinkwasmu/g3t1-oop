import { IoGitPullRequestOutline } from 'react-icons/io5';
import Multiselect from 'multiselect-react-dropdown';
import React, { Component } from 'react'

function CreateWorkflow() {


    // this.setState(
    //     {options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}]}
    // );

    return (
        <>
            <label htmlFor="CreateWorkflow" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <IoGitPullRequestOutline size={20} className="mr-3"></IoGitPullRequestOutline>
                Create New Workflow
            </label>

            <input type="checkbox" id="CreateWorkflow" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-2xl relative py-12 px-20">
                    <label htmlFor="CreateWorkflow" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                    <h1 className="text-3xl mb-3 font-semibold text-blue">Create New Workflow</h1>
                    <form>
                        <div className="mb-4">
                            {/* <Multiselect options={this.state.options}/> */}
                            <label className="block text-gray-700 text-md font-thin" htmlFor="userid">
                                User ID
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userid" type="text" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="workflowname">
                                Workflow Name
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workflowname" type="text" />
                        </div>
                        <div className="mb-4">
                            {/* <Multiselect options={this.state.options}/> */}
                            <label className="block text-gray-700 text-md font-thin" htmlFor="forms">
                                Forms
                            </label>
                            <label className="block text-gray-700 text-xs font-thin mb-2" htmlFor="description">
                                Separate forms with a comma (,)
                            </label>
                            <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="forms" type="text" />
                        </div>
                        <div className="flex justify-center">
                            <label htmlFor="CreateWorkflow" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
                                Create New Workflow
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CreateWorkflow;