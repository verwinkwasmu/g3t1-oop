import { AiOutlineUser } from "react-icons/ai";

function AssignNewUser() {
    return (
        <>
            <label htmlFor="AssignNewUser" className="btn bg-cyan border-transparent outline-none rounded-full mr-2">
                <AiOutlineUser size={20} className="mr-3"></AiOutlineUser>
                    Assign New User
                </label>
            
            <input type="checkbox" id="AssignNewUser" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="AssignNewUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <h1 className="text-3xl mb-3 font-semibold text-blue">Assign New User</h1>
                <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="userid">
                        User ID
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userid" type="text"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text"/>
                </div>
                <div className="flex justify-center">
                    <label htmlFor="AssignNewUser" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" type="button">
                        Assign New User
                    </label>
                </div>
                </form>
            </div>
            </div>
        </>
        
    )
}

export default AssignNewUser;