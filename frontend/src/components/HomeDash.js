import { React, useState, useEffect } from 'react';

import AdminDash from './Admin/AdminDash';
import ApproverDash from './Approver/ApproverDash';
import VendorDash from './Vendor/VendorDash';

import useToken from '../useToken';

function HomeDash() {

    useEffect(() => {
        document.title = 'VMS Home'
      }, [])

    const [userType, setUserType] = useState(useToken().token[1]); 

    if (userType == "ADMIN") {
        return (<AdminDash></AdminDash>)
    }

    if (userType == "APPROVER") {
        return (<ApproverDash></ApproverDash>)
    }

    if (userType == "VENDOR") {
        return (<VendorDash></VendorDash>)
    } 
    
}

export default HomeDash;