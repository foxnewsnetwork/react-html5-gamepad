import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HTML5GamepadDS4 from './components/html5-gamepad-ds4';
import GamepadInput from './services/gamepad-input';

const mergeWith = (nextState) => (prevState) => Object.assign({}, prevState, nextState);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({ button: 'nothing' });
  }
  componentDidMount() {
    const gamepadInput = new GamepadInput(0);
    gamepadInput.onConnect((gamepad) => this.setState(mergeWith({ gamepad })));
  }
  render() {
    const { gamepad, button } = this.state;

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
          {button}
        </div>
        {gamepad &&
          <HTML5GamepadDS4
            gamepad={gamepad}
            onUpPressed={() => this.setState({ button: 'up' })}
            onDownPressed={() => this.setState({ button: 'down' })}
            onLeftPressed={() => this.setState({ button: 'left' })}
            onRightPressed={() => this.setState({ button: 'right' })} />
        }
      </div>
    );
  }
}

export default App;
