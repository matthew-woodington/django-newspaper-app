import { useState, useCallback, useEffect } from "react";
import ArticleDisplay from "./ArticleDisplay";
import ArticleList from "./ArticleList";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState()

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
      setActiveArticle(data[0])
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const updateDisplay = (id) => {
    const index = articles.findIndex((article) => article.id === id)
    const articleAtIndex = articles[index]
    setActiveArticle(articleAtIndex)
  }


  return (
    <div>
      <aside>
        <ArticleList articles={articles} updateDisplay={updateDisplay} />
      </aside>
      {activeArticle && <ArticleDisplay activeArticle={activeArticle} />}
    </div>
  );
}

export default Articles;
