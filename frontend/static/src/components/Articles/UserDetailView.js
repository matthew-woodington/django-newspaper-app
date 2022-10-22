import { useState, useCallback, useEffect } from "react";

function UserDetailView(activeID) {
  const [article, setArticle] = useState();

  const handleError = (err) => {
    console.warn(err);
  };

  const getArticle = useCallback(async () => {
    const response = await fetch(`/api/v1/articles/${activeID}`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setArticle(data);
    }
  }, []);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <article className="highlight-article">
      {/* <img className="highlight-img" src={article.image} alt="news article image" />
      <h2 className="highlight-title">{article.title}</h2>
      <p className="highlight-body">{article.body}</p> */}
    </article>
  );
}

export default UserDetailView;
