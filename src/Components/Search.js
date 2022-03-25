import React, { Component } from 'react'
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      searchText: "",
    };
  }

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  search = async () => {
    console.log(this.state.searchText);
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let url = `https://newsapi.org/v2/everything?q=${this.state.searchText}&from=${year}-${month}-${date}&to=${year}-${month}-${date}&apiKey=${this.props.apiKey}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/everything?q=${this.state.searchText}&from=${year}-${month}-${date}&to=${year}-${month}-${date}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.searchText}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={this.search}
            >
              Search
            </button>
          </form>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner width="100px" />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((ele) => {
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
}
