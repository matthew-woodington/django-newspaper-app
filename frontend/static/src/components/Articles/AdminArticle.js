import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

function AdminArticle({ article }) {
  return (
    <li key={article.id} className="list author-list">
      <div className="article-info">
        <h3 className="aside-title">{article.title}</h3>
        <span>By {article.author_name} | </span>
        <Badge bg="secondary">{article.status}</Badge>
        <div className="view-button">
          {article.status === "PB" && (
            <Link className="view-link" to={`/articles/admin/${article.id}`}>
              Archive Article
            </Link>
          )}
          {article.status === "SM" && (
            <Link className="view-link" to={`/articles/admin/${article.id}`}>
              View Article
            </Link>
          )}
          {article.status === "AR" && (
            <Link className="view-link" to={`/articles/admin/${article.id}`}>
              Re-Publish
            </Link>
          )}
        </div>
      </div>
      <img className="aside-image" src={article.image} />
    </li>
  );
}

export default AdminArticle;
