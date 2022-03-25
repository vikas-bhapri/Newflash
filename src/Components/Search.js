import React, { useState,useEffect } from 'react'
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchText, setSearchText] = useState("")

  const handleChange = (event) => {
    setSearchText(event.target.value)
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  useEffect(() => {
    document.title = `NewFlash - Search`;
  }, [])
  

  const search = async () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let url = `https://newsapi.org/v2/everything?q=${searchText}&sortBy=popularity&apiKey=${props.apiKey}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    let url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(false)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false)
  };


    return (
      <>
        <div className="container" style={{marginTop:"80px"}}>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={search}
            >
              Search
            </button>
          </form>
        </div>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner width="100px" />}
        >
          <div className="container">
            <div className="row">
              {articles.map((ele) => {
                return (
                  <div className="col-md-4" key={ele.url}>
                    <Newsitem
                      title={ele.title}
                      description={ele.description}
                      imageUrl={ele.urlToImage}
                      newsUrl={ele.url}
                      date={ele.publishedAt}
                      author={ele.author}
                      source={ele.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );

}

export default Search;
