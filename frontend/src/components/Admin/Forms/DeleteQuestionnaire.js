import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const DeleteQuestionnaire = ({ questionnaireId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const  id  = useParams()

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8080/api/v1/questionnaire/delete/${id.id}`);
      console.log("deletd")
    } catch (err) {
      setError(err.message);
    }

    setIsDeleting(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteQuestionnaire;
