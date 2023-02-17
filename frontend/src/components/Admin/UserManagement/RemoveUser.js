function RemoveUser() {
    return (
        <>
            <label htmlFor="RemoveUser" className="btn bg-red border-transparent rounded-full ml-2">Remove Account</label>

            <input type="checkbox" id="RemoveUser" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="RemoveUser" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <div className="mb-3">
                    <h1 className="text-3xl font-semibold text-blue">Remove Account(s)</h1>
                    <p className="font-thin italic">This cannot be undone.</p>
                </div>
                <div className="flex flex-wrap text-left mb-6">
                <table className="flex-auto table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th>Name</th>
                                    <th>Company</th>
                                </tr>           
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                </tr>
                                <tr>
                                    <td className="p-2">1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                </tr>
                                <tr>
                                    <td className="p-2">1</td>
                                    <td>Jane Smith</td>
                                    <td>ABC Corporation</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div className="flex justify-center">
                    <label htmlFor="RemoveUser" className="btn btn-md btn-wide bg-red border-transparent outline-none rounded-full" type="button">
                        Yes, Remove
                    </label>
                </div>
            </div>
            </div>
        </>
        
    )
}

export default RemoveUser;