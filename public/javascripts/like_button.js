'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      liked: !state.liked
    }));
  }

  render() {
    return (
      <button onClick={() => this.setState({ liked: !this.state.liked })}>
        {String(this.state.liked)}
      </button>
    );
  }
}

const domContainers = document.querySelectorAll('#react-thingy');
domContainers.forEach(domContainer => {
  ReactDOM.render(
    <LikeButton />,
    domContainer
  );
})

