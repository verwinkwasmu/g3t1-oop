import { MdEmail } from "react-icons/md";

function FollowUpUser() {
    return (
        <>
            <label htmlFor="FollowUpUser" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <MdEmail className="mr-3"></MdEmail>
                Follow Up
                </label>
            
            <input type="checkbox" id="FollowUpUser" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="FollowUpUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Send Follow Up Email</h1>
                <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="firstname">
                        First Name
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="lastname">
                        Last Name
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="company">
                        Company
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </div>
                <div className="flex justify-center">
                    <label htmlFor="FollowUpUser" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button">
                        Send Follow Up
                    </label>
                </div>
                </form>
            </div>
            </div>
        </>
        
    )
}

export default FollowUpUser;