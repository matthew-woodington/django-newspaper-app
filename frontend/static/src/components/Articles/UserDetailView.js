import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditArticle from "./EditArticle";

function UserDetailView() {
  const [state, setState] = useState();

  const { id } = useParams();

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const getArticle = async (id) => {
      const response = await fetch(`/api/v1/articles/${id}`).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setState(data);
    };

    getArticle(id);
  }, []);

  return <article className="highlight-article">{state && <EditArticle state={state} />}</article>;
}

export default UserDetailView;
