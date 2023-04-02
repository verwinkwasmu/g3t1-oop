import { AiOutlineUser } from "react-icons/ai";

import { React, useState, useEffect, Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CreationSuccess(props) {

    const workflowName = props.workflowName

  return (
    <>
      {/* <label
        htmlFor="AssignNewUser"
        className="btn bg-cyan border-transparent outline-none rounded-full mr-2"
      >
        <AiOutlineUser size={20} className="mr-3"></AiOutlineUser>
        Assign New User
      </label> */}

      <input type="checkbox" id="AssignNewUser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl relative py-12 px-20">
          <label
            htmlFor="CreationSuccess"
            className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12"
          >
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            Creation of assigned workflow, {workflowName}, successful!
          </h1>
        </div>
      </div>
    </>
  );
}

export default CreationSuccess;
