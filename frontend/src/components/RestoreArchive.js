import React, { useState } from 'react';

import { MdRestoreFromTrash } from 'react-icons/md';

function RestoreArchived(props) {

    const [item, setItem] = useState(props.item);
    const [itemType, setItemType] = useState(props.itemType);
    
    const handleRestore = () =>  {
        console.log("inside handlerestore")


    }

    return (
        <>
        <label htmlFor="RestoreArchived" className="btn btn-xs btn-link text-lg text-blue hover:opacity-75">
            <MdRestoreFromTrash></MdRestoreFromTrash>            
        </label>
            
            <input type="checkbox" id="RestoreArchived" className="modal-toggle" />
            <div className="modal text-left">
            <div className="modal-box max-w-2xl relative py-12 px-20">
                <label htmlFor="RestoreArchived" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">✕</label>
                <div className="mb-3">
                    <h1 className="text-3xl font-semibold text-blue">Restore {itemType}?</h1>
                </div>                
                <form>                 
                    <div className="mt-6 flex justify-center">
                        <label onClick={() => {handleRestore()}} htmlFor="RestoreArchived" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" >
                            Yes, Restore
                        </label>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default RestoreArchived;