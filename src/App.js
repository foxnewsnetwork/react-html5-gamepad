import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HTML5GamepadDS4 from './components/html5-gamepad-ds4';
import gamepads from 'html5-gamepad';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { button: 'nothing' };
  }
  render() {
    const gamepad = gamepads[0];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="debug-output">
          {this.state.button}
        </div>
        <HTML5GamepadDS4
          gamepad={gamepad}
          onUpPressed={() => this.setState({ button: 'up' })}
          onDownPressed={() => this.setState({ button: 'down' })}
          onLeftPressed={() => this.setState({ button: 'left' })}
          onRightPressed={() => this.setState({ button: 'right' })} />
      </div>
    );
  }
}

export default App;
