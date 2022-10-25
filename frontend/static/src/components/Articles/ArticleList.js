import "../../styles/Article.css";

function ArticleList({ updateDisplay, filteredArticles }) {
  const articleList = filteredArticles
    // .filter((article) => (filter ? article.category == filter : article))
    .map((article) => (
      <li className="list aside-article" key={article.id} onClick={() => updateDisplay(article.id)}>
        <div className="article-info">
          <h3 className="aside-title">{article.title}</h3>
          <span>By {article.author_name}</span>
        </div>
        <img className="main-aside-image" src={article.image} />
      </li>
    ));
  return <ul className="article-list">{articleList}</ul>;
}

export default ArticleList;
