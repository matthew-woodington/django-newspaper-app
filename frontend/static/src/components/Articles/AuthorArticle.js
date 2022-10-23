import { Link } from "react-router-dom";

function AuthorArticle({ article }) {
  return (
    <li key={article.id} className="list">
      <div className="article-info">
        <h3 className="aside-title">{article.title}</h3>
        <span>By {article.author_name} </span>
        <Link to={`/article/${article.id}`}>View Article</Link>
      </div>
      <img className="aside-image" src={article.image} />
    </li>
  );
}

export default AuthorArticle;
