import { React, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineFlag } from "react-icons/ai";
import { useNavigate  } from "react-router-dom";

import { updateIndividualAssignedWorkflow } from "../../../apiCalls";

export default function FlagApproval(props) {

  const navigate = useNavigate();

  const [checker, setChecker] = useState(false);
  const workflow = props.workflow;
  const approverReviewStatus = workflow.approverReviewStatus;

  useEffect(() => {
    if (workflow["questionnaires"] != null) {
      console.log("TRUE");
      setChecker(true);
      workflow.questionnaires.map((questionnaire, index) => {
        if (questionnaire.status != "ADMIN_APPROVED") {
          setChecker(false);
        }
      });
    }
  }, [workflow]);

  const handleUpdate = async () => {
    workflow["approverReviewStatus"] = "FLAGGED";
    const response = await updateIndividualAssignedWorkflow(workflow);
    if (response.status == 200) {
      console.log("FLAGGED");
      navigate(`/workflow-assigned/${workflow.id}`, { state: { workflowId: workflow.id } });
    }
  };

  return (
    <>
      {approverReviewStatus != "FLAGGED" ?
        <label htmlFor="flagApproval" className="btn bg-red border-transparent rounded-full mr-2">
          <AiOutlineFlag size={20} className="mr-3"></AiOutlineFlag>
          Flag Approval
        </label>
        :
        <label htmlFor="flagApproval" className="btn bg-red border-transparent rounded-full mr-2" disabled={true}>
          <AiOutlineFlag size={20} className="mr-3"></AiOutlineFlag>
          PENDING APPROVAL
        </label>
      }

      <input type="checkbox" id="flagApproval" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl relative py-12 px-20">
          <label htmlFor="flagApproval" className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12">
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            Flag Confirmation
          </h1>
          <form>
            {checker ? (
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-thin my-7 text-center" htmlFor="userid">
                  Are you sure you want to flag this workflow for approval?
                </label>
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-thin my-7 text-center" htmlFor="userid">
                  All questionnaires must be admin approved to be flagged!
                </label>
              </div>
            )}

            <div className="flex justify-center">
              <label htmlFor="flagApproval" onClick={handleUpdate} className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4" disabled={!checker} type="button">
                Confirm
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
