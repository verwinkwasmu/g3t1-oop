import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MdHomeFilled, MdChecklist, MdDescription, MdGroup } from "react-icons/md";
import { IoGitPullRequestOutline } from 'react-icons/io5';
import Logo from "../assets/QL-Logo-Full.png";

import useToken from '../useToken';



function logOut() {
  console.log("logged out");
  localStorage.removeItem('token');
  window.location.reload();

}
export default function Navbar({ fixed }) {  

  const navigate = useNavigate();

  const [userType, setUserType] = useState(useToken().token[1]); 

  const toProfileView = () => {
    navigate(`/profile`);
  
  }
  
  const toArchiveView = () => {
    navigate(`/archive`);
  
  }

  const getClassName = () => {
    return "px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
  }

  return (
    <>
    <div className="navbar bg-base-100">
    <div className="flex-1 ml-5">
      <Link
          className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-blue"
          to="/"
      >
          <div className="flex items-center justify-center">
              <img src={Logo} className="w-40"></img>
              <span className="ml-3 italic text-xs uppercase font-bold leading-snug text-blue">
                  VENDOR MANAGEMENT SYSTEM
              </span>
          </div>
      </Link>
    </div>
    <div className="flex-none gap-2">
      <div id="admin" hidden={userType != "ADMIN" ? true : false}>
        <ul className="menu menu-horizontal px-1">
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/"
              >
                  <MdChecklist /><span>Tasks</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/workflows"
              >
                  <IoGitPullRequestOutline /><span>Workflows</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/questionnaires"
              >
                  <MdDescription /><span>Questionnaires</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/accounts"
              >
                  <MdGroup /><span>Accounts</span>
              </Link>
          </li>
        </ul>
      </div>
      <div id="vendor" hidden={userType != "VENDOR" ? true : false}>
        <ul className="menu menu-horizontal px-1">
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/"
              >
                  <MdHomeFilled /><span>Home</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/workflows"
              >
                  <IoGitPullRequestOutline /><span>Workflows</span>
              </Link>
          </li>
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/questionnaires"
              >
                  <MdDescription /><span>Questionnaires</span>
              </Link>
          </li>
        </ul>
      </div>
      <div id="approver"  hidden={userType != "APPROVER" ? true : false}>
        <ul className="menu menu-horizontal px-1">
          <li className="nav-item">
              <Link
                  className={()=>getClassName()}
                  to="/"
              >
                  <MdChecklist /><span>Tasks</span>
              </Link>
          </li>
        </ul>
      </div>
      
      <div className="dropdown dropdown-end mr-5">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.freepik.com/free-photo/headshot-charismatic-pleasant-friendly-european-woman-short-chestnut-haircut-smiling-positive-feeling-happy-upbeat-enjoying-lifes-casually-talking-friends-amused-cheerful-standing-white-background_176420-34680.jpg?w=2000" />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li><a onClick={toProfileView}>Profile</a></li>
          <li hidden={userType == "VENDOR" ? true : false}><a onClick={toArchiveView}>Archive</a></li>
          <li><a onClick={logOut}>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>

    </>
  );
}