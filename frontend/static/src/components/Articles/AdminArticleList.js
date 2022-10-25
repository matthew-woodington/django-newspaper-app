import "../../styles/Article.css";
import { useState, useCallback, useEffect } from "react";
import AdminArticle from "./AdminArticle";
import Button from "react-bootstrap/Button";

function AdminArticleList() {
  const [adminArticles, setAdminArticles] = useState([]);
  const [filter, setFilter] = useState("PB");

  const handleError = (err) => {
    console.warn(err);
  };

  const getAdminArticles = useCallback(async () => {
    const response = await fetch("/api/v1/articles/admin/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setAdminArticles(data);
    }
  }, []);

  useEffect(() => {
    getAdminArticles();
  }, [getAdminArticles]);

  const articleList = adminArticles
    .filter((article) => (filter ? article.status == filter : article))
    .map((article) => <AdminArticle key={article.id} article={article} />);

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
            value="AR"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Archived
          </Button>
        </section>
        <section className="author-article-list">
          <ul className="list-container">{articleList}</ul>
        </section>
      </div>
    </>
  );
}

export default AdminArticleList;
