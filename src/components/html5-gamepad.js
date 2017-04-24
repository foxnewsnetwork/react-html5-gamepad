import React, { Component } from 'react';
import gamepads from 'html5-gamepads';

const MS_PER_FRAME = 1000 / 60;

function pollGamepads(comp) {
  return () =>
}


class HTML5Gamepad extends Component {
  componentDidMount() {
    const interval = window.setInterval(pollGamepads(this), MS_PER_FRAME);
    this.setState({ interval });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  }
  render() {
    return this.children();
  }
}

export default App;
