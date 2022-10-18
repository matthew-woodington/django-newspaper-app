import { useState, useCallback, useEffect } from "react";

function Articles() {
  const [articles, setArticles] = useState(null);

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
      console.log(data)
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return (
    <div>
      <p>Articles</p>
    </div>
  );
}

export default Articles;
