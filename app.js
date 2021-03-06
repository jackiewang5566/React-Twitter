import React from 'react';
import ReactDOM from 'react-dom';

const arrOfTweets = [
  {
      "author": "Michael Scott",
      "text": "Would I rather be feared or loved? Easy, both. I want people to be afraid of how much they love me."
  },
  {
      "author": "Jeff Bezos",
      "text": "In the end, we are our choices."
  }
];

class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tweets: ''};
    this.loadTweetsFromServer = this.loadTweetsFromServer.bind(this);
    this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
  }

  loadTweetsFromServer() {
    // GET updated set of tweets from database
    $.get(this.props.url, (tweets) => {
        // Set state in step 6 of the exercise!
        this.setState({ tweets: tweets });
      }
    );
  }

  handleTweetSubmit(author, text) {
    const tweet = { author, text };
  
    // POST to add tweet to database
    $.post(this.props.url, tweet, (tweets) => {
        // Set state in step 10 of the exercise!
        this.setState({ tweets: tweets })
      }
    );
  }

  componentDidMount() {
    // Set this.state.data to most recent set of tweets from database
    this.loadTweetsFromServer();
  }

  render() {
    return (
      <div className="twitter">
        <h1>Tweets</h1>
        {/* Render TweetForm component here */}
        <TweetForm onTweetSubmit={ this.handleTweetSubmit } />
        {/* Render TweetList component here */}
        <TweetList tweets={ this.state.tweets } />
      </div>
    );
  }
}

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.onTweetSubmit(this.refs.author.value, this.refs.text.value);
  }

  render() {
    return (
      <form className="tweetForm" onSubmit={ this.handleSubmit }>
        {/* Render some text here */}
        <input placeholder="Author Name" ref="author" /> 
        <input placeholder="Tweet" ref="text" />
        <button className="btn btn-info">Tweet</button>
      </form>
    );
  }
}

class TweetList extends React.Component {
  render() {
    const tweets = this.props.tweets ? this.props.tweets.map(tweet => <Tweet tweet={tweet} key={tweet.text} />) : null;

    return (
      <div className="tweetList">
        {/* Render some text here */}
        { tweets }   
      </div>
    );
  }
}

class Tweet extends React.Component {
  render() {
    return (
      <div className="tweet">
        {/* Render some text here */}
        <strong>{ this.props.tweet.text }</strong> <br />
        - { this.props.tweet.author } 
      </div>
    );
  }
}

ReactDOM.render(
  <Twitter data={arrOfTweets} url="tweets.json" />,
  document.getElementById('tweets')
);
