import CreateUser from './CreateUser';
import RemoveUser from './RemoveUser';


function UserDash() {
    return (
        <>
            <div className="rounded-t-3xl mx-10 mt-10 h-screen py-12 px-20 shadow-2xl">    
                    <div className="flex flex-wrap mb-5">
                        <div className="flex-auto">
                            <h1 className="text-3xl font-semibold text-blue">Registered Users</h1>
                        </div>
                        <div className="flex ">
                            <CreateUser></CreateUser>
                            <RemoveUser></RemoveUser>                        
                    </div>
                    </div>
                    <div className="flex flex-wrap text-left">
                        <table className="flex-auto table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">[]</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                </tr>           
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">X</td>
                                    <td>1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td className="p-2">X</td>
                                    <td>1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td className="p-2">X</td>
                                    <td>1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td className="p-2">X</td>
                                    <td>1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td className="p-2">X</td>
                                    <td>1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                    <td>Active</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>

            </div>
        </>
        
    )
}

export default UserDash;