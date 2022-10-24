import "../../styles/Article.css";
import { useState, useCallback, useEffect } from "react";
import AdminArticle from "./AdminArticle";

function AdminArticleList() {
  const [adminArticles, setAdminArticles] = useState([]);

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

  const articleList = adminArticles.map((article) => (
    <AdminArticle key={article.id} article={article} />
  ));

  return (
    <>
      <section>
        <ul>{articleList}</ul>
      </section>
    </>
  );
}

export default AdminArticleList;
