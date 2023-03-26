import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
                <Link to={`/forms/view-indiv-questionnaire/${p.id}`}>
                <h2>{p.title}</h2>
                <h2>{p.id}</h2>
                </Link>
                <Link to={`/forms/edit-questionnaire/${p.id}`}>
                <p>edit</p>
                </Link> 
            </div>
            ))}
        </div>
        );
    }           
  if (!post) return null;

}

