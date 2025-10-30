import React, { Component } from 'react';
import NewsItem from './newsitem';
import Spinner from './spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Live News`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  updateNews = async () => {
    const apiKey = "ba3c1b1b703c4078a10af6d05f937e2c"; // ✅ your API key here
    const { country, category, pageSize } = this.props;
    const { page } = this.state;

    this.setState({ loading: true });

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();

      // fallback if no articles
      if (!parsedData.articles || parsedData.articles.length === 0) {
        console.warn("No articles found, loading general news as fallback...");
        const fallbackUrl = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`;
        const fallbackResponse = await fetch(fallbackUrl);
        const fallbackData = await fallbackResponse.json();

        this.setState({
          articles: fallbackData.articles || [],
          totalResults: fallbackData.totalResults || 0,
          loading: false
        });
        return;
      }

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, articles: [] });
    }
  };

  componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px' }}>
          Live News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        {loading && <Spinner />}

        {!loading && articles.length === 0 && (
          <div className="text-center my-5">
            <h5>No news articles available.</h5>
          </div>
        )}

        <div className="row">
          {!loading && articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source?.name || "Unknown"}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
