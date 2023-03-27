import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdHomeFilled, MdChecklist, MdDescription, MdGroup } from "react-icons/md";
import Logo from "../assets/QL-Logo-Full.png";

function logOut() {
  console.log("logged out");
  localStorage.removeItem('token');
  window.location.reload();

}
export default function Navbar({ fixed }) {  

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  
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
  <ul className="menu menu-horizontal px-1">
    <li className="nav-item">
        <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
            to="/"
        >
            <MdHomeFilled /><span>Home</span>
        </Link>
    </li>
    <li className="nav-item">
        <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
            to="/workflows"
        >
            <MdChecklist /><span>Workflows</span>
        </Link>
    </li>
    <li className="nav-item">
        <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
            to="/forms"
        >
            <MdDescription /><span>Questionnaires</span>
        </Link>
    </li>
    <li className="nav-item">
        <Link
            className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-blue hover:opacity-75"
            to="/accounts"
        >
            <MdGroup /><span>Accounts</span>
        </Link>
    </li>
    </ul>
    <div className="dropdown dropdown-end mr-5">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://img.freepik.com/free-photo/headshot-charismatic-pleasant-friendly-european-woman-short-chestnut-haircut-smiling-positive-feeling-happy-upbeat-enjoying-lifes-casually-talking-friends-amused-cheerful-standing-white-background_176420-34680.jpg?w=2000" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={logOut}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

    </>
  );
}