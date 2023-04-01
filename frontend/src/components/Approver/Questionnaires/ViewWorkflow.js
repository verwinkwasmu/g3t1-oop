import React, { useEffect } from "react";
import { getIndividualAssignedWorkflow } from "../../../apiCalls";

export default function ViewWorkflow() {
  useEffect(() => {
    async function x() {
      const response = await getIndividualAssignedWorkflow(
        "6426b5c0bbcd5e69bfd7a5b9"
      );
      console.log(response.data);
    }
    x();
  }, []);
  return (
    <>
      <div>ViewWorkflow</div>
    </>
  );
}
