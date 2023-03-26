import { Link } from "react-router-dom";



function FormDash() {
    return (
        <div>
            <h1>FormDash</h1>
            <Link to="/forms/create-questionnaire">Create Form</Link>
            <Link to="/forms/view-all-questionnaires">View Form</Link>
            {/* <Link to="/forms/edit-questionnaire">Edit Form</Link> */}
        </div>
        
    )
}

export default FormDash;