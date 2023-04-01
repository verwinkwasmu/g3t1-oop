import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteQuestionnaire from './DeleteQuestionnaire';


const baseURL = "http://localhost:8080/api/v1/questionnaire";

export default function ViewQuestionnaire() {
  const [post, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      setIsLoading(false)
    });
  }, []);


  // wait for json fields to be standardised 
    if (!isLoading) {
        console.log(post);
        return (
        <div>
            {post.map((p) => (
            <div key={p.id}>
                <Link to={`/questionnaires/view-indiv-questionnaire/${p.id}`}>
                <h2>{p.title}</h2>
                <h2>{p.id}</h2>
                </Link>
                <Link to={`/questionnaires/edit-questionnaire/${p.id}`}>
                <p>edit</p>
                </Link> 
                <DeleteQuestionnaire questionnaireId={p.id} />
            </div>
            ))}
        </div>
        );
    }           
  if (!post) return null;

}

