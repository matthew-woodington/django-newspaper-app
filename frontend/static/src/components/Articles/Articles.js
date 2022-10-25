import "../../styles/Article.css";
import { useState, useCallback, useEffect } from "react";
import ArticleDisplay from "./ArticleDisplay";
import ArticleList from "./ArticleList";
import Button from "react-bootstrap/Button";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState();
  const [filter, setFilter] = useState("GR");

  const handleError = (err) => {
    console.warn(err);
  };

  const getArticles = useCallback(async () => {
    const response = await fetch("/api/v1/articles/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setArticles(data);
      setActiveArticle(data[0]);
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const updateDisplay = (id) => {
    const index = articles.findIndex((article) => article.id === id);
    const articleAtIndex = articles[index];
    setActiveArticle(articleAtIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredArticles = articles.filter((article) =>
    filter ? article.category == filter : article
  );

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setActiveArticle(filteredArticles[0]);
  }, [filter]);

  return (
    <div className="display">
      <section className="sort-buttons">
        <Button
          className="sort-button"
          variant="outline-dark"
          value="GR"
          onClick={(e) => changeCategory(e.target.value)}
        >
          General
        </Button>
        <Button
          className="sort-button"
          variant="outline-dark"
          value="SP"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Sports
        </Button>
        <Button
          className="sort-button"
          variant="outline-dark"
          value="GM"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Gaming
        </Button>
        <Button
          className="sort-button"
          variant="outline-dark"
          value="FD"
          onClick={(e) => changeCategory(e.target.value)}
        >
          Food
        </Button>
      </section>
      <section className="main-display">
        {activeArticle && <ArticleDisplay activeArticle={activeArticle} />}
        <aside className="sidebar">
          <ArticleList
            articles={articles}
            updateDisplay={updateDisplay}
            filteredArticles={filteredArticles}
          />
        </aside>
      </section>
    </div>
  );
}

export default Articles;
