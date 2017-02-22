import React from 'react';
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
class FetchDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }

  }

  componentDidMount() {
    let url = `http://www.reddit.com/r/${this.props.subreddit}.json`
    fetch(url).then(response => response.json())
      .then(res => {
        const posts = res.data.children.map(obj => obj.data);
        this.setState({ posts });
      })
      .catch(e => console.log("Oops, error", e))
  }

  render() {
    return (
      <div>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs" />,
  document.getElementById('_react-content')
);
