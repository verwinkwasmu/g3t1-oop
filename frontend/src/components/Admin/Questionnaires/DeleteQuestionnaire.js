import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DeleteQuestionnaire = ({ questionnaireId, setQuestionnaires }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const user = localStorage.getItem('token');    
  const userInfo = JSON.parse(user)
  console.log(questionnaireId)


  const handleDelete = async () => {
    console.log("DELETING")
    setIsDeleting(true);
    setError(null);

    // need to change to take in user id
    try {
      await axios.delete(`http://localhost:8080/api/v1/questionnaire/delete/${questionnaireId}/${userInfo.id}`);
      setDeleteSuccess(true)
    } catch (err) {
      setError(err.message);
    }

    setIsDeleting(false);
  };

  useEffect(() => {
    if (deleteSuccess) {
      // make a GET request to fetch the updated list of questionnaires
      const fetchQuestionnaires = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/questionnaire');
          setQuestionnaires(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchQuestionnaires();
    }
  }, [deleteSuccess, setQuestionnaires]);


  if (error) {
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 5000);
    return <div>
        <div className="toast toast-top toast-start">
            <div className="alert alert-warning">
              <div>
                <span>Error Deleting.</span>
                <button className="btn btn-square btn-outline" onClick={() => setError(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          </div>


          <button className='btn' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
      </div>
  }

  return (
    <>
    {deleteSuccess && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <div>
              <span>Delete Successful.</span>
              <button className="btn btn-square btn-outline" onClick={() => setDeleteSuccess(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

    {deleteSuccess && setTimeout(() => {
      setDeleteSuccess(false);
    }, 5000)}

    <button className='btn' onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
    
    
    </>
    
  );
};

export default DeleteQuestionnaire;