function ArticleDisplay({activeArticle}) {
    return (
        <div>
           <h2>{activeArticle.title}</h2>
            <p>{activeArticle.body}</p>
        </div>
    )
}

export default ArticleDisplay