import "../../styles/Article.css";
import { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";

function AuthorArticleList({ setActiveID }) {
  const [userArticles, setUserArticles] = useState([]);
  const [filter, setFilter] = useState("PB");

  //   const navigate = useNavigate();

  const handleError = (err) => {
    console.warn(err);
  };

  const getUserArticles = useCallback(async () => {
    const response = await fetch("/api/v1/articles/user/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setUserArticles(data);
    }
  }, []);

  useEffect(() => {
    getUserArticles();
  }, [getUserArticles]);

  const viewArticle = (id) => {
    setActiveID(id);
    // navigate("/edit");
  };

  const filteredArticles = userArticles
    .filter((article) => (filter ? article.status == filter : article))
    .map((article) => (
      <li key={article.id} className="list">
        <div className="article-info">
          <h3 className="aside-title">{article.title}</h3>
          <span>By {article.author_name}</span>
          <Button variant="dark" type="button" onClick={() => viewArticle(article.id)}>
            View
          </Button>
        </div>
        <img className="aside-image" src={article.image} />
      </li>
    ));

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="display">
        <section className="sort-buttons">
          <Button
            className="sort-button"
            variant="outline-dark"
            value="PB"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Published
          </Button>
          <Button
            className="sort-button"
            variant="outline-dark"
            value="SM"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Submitted
          </Button>
          <Button
            className="sort-button"
            variant="outline-dark"
            value="DR"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Draft
          </Button>
          <Button
            className="sort-button"
            variant="outline-dark"
            value="RJ"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Rejected
          </Button>
        </section>
        <section>
          <ul>{filteredArticles}</ul>
        </section>
      </div>
    </>
  );
}

export default AuthorArticleList;
