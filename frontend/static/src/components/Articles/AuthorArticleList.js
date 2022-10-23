// import "../../styles/Article.css";
// import { useState, useCallback, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import UserDetailView from "./UserDetailView";

// function AuthorArticleList() {
//   const [userArticles, setUserArticles] = useState([]);
//   const [activeArticle, setActiveArticle] = useState();
//   const [filter, setFilter] = useState("DR");

//   const handleError = (err) => {
//     console.warn(err);
//   };

//   const getUserArticles = useCallback(async () => {
//     const response = await fetch("/api/v1/articles/user/").catch(handleError);
//     if (!response.ok) {
//       throw new Error("Network response was not OK");
//     } else {
//       const data = await response.json();
//       setUserArticles(data);
//       setActiveArticle(data[0]);
//     }
//   }, []);

//   useEffect(() => {
//     getUserArticles();
//   }, [getUserArticles]);

//   const filteredArticles = userArticles
//     .filter((article) => (filter ? article.status == filter : article))
//     .map((article) => (
//       <li key={article.id} className="list">
//         <div className="article-info">
//           <h3 className="aside-title">{article.title}</h3>
//           <span>By {article.author_name}</span>
//           <Button variant="dark" type="button" onClick={() => viewArticle(article.id)}>
//             View
//           </Button>
//         </div>
//         <img className="aside-image" src={article.image} />
//       </li>
//     ));

//   const changeCategory = (value) => {
//     setFilter(value);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const viewArticle = (id) => {
//     const index = userArticles.findIndex((article) => article.id === id);
//     const articleAtIndex = userArticles[index];
//     setActiveArticle(articleAtIndex);
//   };

//   return (
//     <>
//       <div className="display">
//         <section className="sort-buttons">
//           <Button
//             className="sort-button"
//             variant="outline-dark"
//             value="DR"
//             onClick={(e) => changeCategory(e.target.value)}
//           >
//             Draft
//           </Button>
//           <Button
//             className="sort-button"
//             variant="outline-dark"
//             value="SM"
//             onClick={(e) => changeCategory(e.target.value)}
//           >
//             Submitted
//           </Button>
//         </section>
//         <section>
//           <article>{activeArticle && <UserDetailView activeArticle={activeArticle} />}</article>
//           <aside>
//             <ul>{filteredArticles}</ul>
//           </aside>
//         </section>
//       </div>
//     </>
//   );
// }

// export default AuthorArticleList;

import "../../styles/Article.css";
import { useState, useCallback, useEffect } from "react";
import Button from "react-bootstrap/Button";
import AuthorArticle from "./AuthorArticle";

function AuthorArticleList() {
  const [userArticles, setUserArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState();
  const [filter, setFilter] = useState("DR");

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
      setActiveArticle(data[0]);
    }
  }, []);

  useEffect(() => {
    getUserArticles();
  }, [getUserArticles]);

  const filteredArticles = userArticles
    .filter((article) => (filter ? article.status == filter : article))
    .map((article) => <AuthorArticle key={article.id} article={article} />);

  const changeCategory = (value) => {
    setFilter(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewArticle = (id) => {
    const index = userArticles.findIndex((article) => article.id === id);
    const articleAtIndex = userArticles[index];
    setActiveArticle(articleAtIndex);
  };

  return (
    <>
      <div className="display">
        <section className="sort-buttons">
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
            value="SM"
            onClick={(e) => changeCategory(e.target.value)}
          >
            Submitted
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
