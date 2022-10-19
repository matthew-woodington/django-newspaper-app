function ArticleList({ articles, updateDisplay, filter }) {
  const articleList = articles
    .filter((article) => (filter ? article.category == filter : article))
    .map((article) => (
      <li key={article.id} onClick={() => updateDisplay(article.id)}>
        <h3>{article.title}</h3>
      </li>
    ));
  return <ul>{articleList}</ul>;
}

export default ArticleList;
