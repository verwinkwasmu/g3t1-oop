import React, { useState } from 'react';
import axios from 'axios';


const DeleteQuestionnaire = ({ questionnaireId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    console.log("DELETING")
    setIsDeleting(true);
    setError(null);

    // need to change to take in user id
    try {
      await axios.delete(`http://localhost:8080/api/v1/questionnaire/delete/${questionnaireId}`);
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