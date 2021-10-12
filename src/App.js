import React, { Component } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray";

const URL =
  "https://raw.githubusercontent.com/yoscheherazade/the-office-quotes-json/master/quotes.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotesArray: [],
      quote:
        "Don't ever, for any reason, do anything for anyone, for any reason, ever, no matter what. No matter where. Or who, or who you are with, or where you are going or... or where you've been... ever. For any reason, whatsoever.",
      author: "Michael Scott",
      colors: null,
      error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            quotesArray: [result][0],
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  handleClick = () => {
    const listOfQuotes = this.state.quotesArray;
    const accentColor = Math.floor(COLORS_ARRAY.length * Math.random());
    const index = Math.floor(listOfQuotes.length * Math.random());
    this.setState({
      quote: listOfQuotes[index].quote,
      author: listOfQuotes[index].character,
      colors: COLORS_ARRAY[accentColor],
    });
  };
  render() {
    return (
      <div id="wrapper" style={{ color: this.state.colors }}>
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"></i>
            <span id="text"></span>
            <p>{this.state.quote}</p>
          </div>
          <div className="quote-author">
            <p id="author">~ {this.state.author}</p>
          </div>
          <div className="buttons">
            <a
              className="button"
              title="Tweet this quote!"
              target="#"
              href={encodeURI(
                `https://twitter.com/intent/tweet?hashtags=quotes&text=${this.state.quote} ~${this.state.author}`
              )}
              id="tweet-quote"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <button
              className="button"
              id="new-quote"
              onClick={this.handleClick}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
