function ArticleList({articles, updateDisplay}) {
    const articleList = articles.map(article => (
        <li key={article.id} onClick={() => updateDisplay(article.id)}>
            <h3>{article.title}</h3>
        </li>
      ))
    return (
        <ul>{articleList}</ul>
    )
}

export default ArticleList