import { React, useState, useEffect } from "react";
import { MdSend } from "react-icons/md";

import { updateIndividualAssignedWorkflow } from "../../apiCalls";

export default function SubmitReview(props) {
  const [checker, setChecker] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(false);
  const workflow = props.workflow;

  useEffect(() => {
    if (workflow["questionnaires"] != null) {
      console.log("TRUE");
      setChecker(true);
      setReviewStatus(true);
      workflow.questionnaires.map((questionnaire, index) => {
        console.log("yoyoyo", questionnaire.status);
        if (questionnaire.status != "APPROVER_APPROVED" && questionnaire.status != "RETURNED") {
          setChecker(false);
        }
        if (questionnaire.status == "RETURNED") {
          setReviewStatus(false)
        }
      });
    }
  }, [workflow]);


  const handleUpdate = async () => {
    if (reviewStatus) {
      workflow["approverReviewStatus"] = "APPROVED";
      workflow["approvedAt"] = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))
    } else {
      workflow["approverReviewStatus"] = "REJECTED";
    }
    const response = await updateIndividualAssignedWorkflow(workflow);
    if (response.status == 200) {
      console.log("APPROVER REVIEW STATUS SET TO:", workflow["approverReviewStatus"]);
      window.location.replace("http://localhost:3000/")
    }
  };

  return (
    <>
      <label disabled={!checker}
        htmlFor="submitReview"
        className="btn bg-cyan border-transparent rounded-full mr-2"
      >
        <MdSend size={20} className="mr-3"></MdSend>
        Submit Review
      </label>

      <input type="checkbox" id="submitReview" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl relative py-12 px-20">
          <label
            htmlFor="submitReview"
            className="btn btn-sm btn-circle bg-red border-transparent absolute right-20 top-12"
          >
            ✕
          </label>
          <h1 className="text-3xl mb-3 font-semibold text-blue">
            { reviewStatus ? "Approve Workflow?" : "Return Workflow?"}
          </h1>
          <form>
            <div className="flex justify-center">
              <label
                htmlFor="submitReview"
                onClick={handleUpdate}
                className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full mt-4"
                type="button"
              >
                Confirm
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
