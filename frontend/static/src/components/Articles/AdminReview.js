import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";

function AdminReview() {
  const [state, setState] = useState(null);

  const handleError = (err) => {
    console.warn(err);
  };

  const navigate = useNavigate();

  const { id } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("status", e.target.value);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api/v1/articles/${state.id}/`, options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      navigate("/articles/admin");
    }
  };

  return (
    <article className="detail-view">
      {state && (
        <div className="article-view">
          <img className="highlight-img" src={state.image} alt="news article image" />
          <h2 className="highlight-title">{state.title}</h2>
          <p className="highlight-body">{state.body}</p>
          {state.status === "SM" && (
            <>
              <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="PB"
                onClick={(e) => handleSubmit(e)}
              >
                Publish
              </Button>
              <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="RJ"
                onClick={(e) => handleSubmit(e)}
              >
                Reject
              </Button>
            </>
          )}
          {state.status === "PB" && (
            <>
              <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="AR"
                onClick={(e) => handleSubmit(e)}
              >
                Archive
              </Button>
            </>
          )}
          {state.status === "AR" && (
            <>
              <Button
                className="form-button-pairs"
                variant="dark"
                type="submit"
                value="PB"
                onClick={(e) => handleSubmit(e)}
              >
                Re-Publish
              </Button>
            </>
          )}
        </div>
      )}
    </article>
  );
}

export default AdminReview;
