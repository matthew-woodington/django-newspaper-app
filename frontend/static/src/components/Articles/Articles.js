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
  };

  // const filteredArticles = articles.filter((article) =>
  //   filter ? article.category == filter : article
  // );

  // const changeFilter = (value) => {
  //   setFilter(value);
  //   setActiveArticle(filteredArticles[0]);
  // };

  return (
    <div>
      <Button variant="outline-dark" value="GR" onClick={(e) => setFilter(e.target.value)}>
        General
      </Button>
      <Button variant="outline-dark" value="SP" onClick={(e) => setFilter(e.target.value)}>
        Sports
      </Button>
      <Button variant="outline-dark" value="GM" onClick={(e) => setFilter(e.target.value)}>
        Gaming
      </Button>
      <Button variant="outline-dark" value="FD" onClick={(e) => setFilter(e.target.value)}>
        Food
      </Button>
      <aside>
        <ArticleList articles={articles} updateDisplay={updateDisplay} filter={filter} />
      </aside>
      {activeArticle && <ArticleDisplay activeArticle={activeArticle} />}
    </div>
  );
}

export default Articles;
