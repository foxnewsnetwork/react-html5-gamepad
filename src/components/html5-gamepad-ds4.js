import React, { Component } from 'react';
import DS4_KEYS from '../constants/ds4-keys';

const MS_PER_FRAME = 1000 / 60;

const toPressAction = (key) => `on${key}Pressed`;
const toAxisHandler = (key) => `axis${key}`;
const NOTHING = () => {};
const NEVER = NOTHING;

function forEach(pojo, fn) {
  for(const key in pojo) {
    const value = pojo[key];
    fn(value, key);
  }
}

function getFn(object, fname) {
  const f = object[fname];
  if (typeof f === 'function') {
    return f;
  } else {
    return NOTHING;
  }
}

const isBlank = (x) => !(typeof x !== "undefined" && x !== null)

function getAxisHandler(obj, hname) {
  const handler = obj[hname];
  if (typeof handler === 'function') {
    return { threshold: MORE_THAN_HALF, do: handler };
  } else if (isBlank(handler)) {
    return { threshold: NEVER, do: NOTHING }
  } else {
    return Object.assign({ threshold: MORE_THAN_HALF }, handler);
  }
}

function pollGamepad(comp, gamepad) {
  return () => {
    forEach(DS4_KEYS, (gamepadKey, ds4Key) => {
      if (gamepad.button(gamepadKey)) {
        getFn(comp, toPressAction(ds4Key)).call(comp)
      }
    });
    forEach(DS4_AXIS, (axisKey, ds4Key) => {
      const { threshold, do: handler } = getAxisHandler(comp, toAxisHandler(ds4Key));
      const x = gamepad.axis(axisKey);
      if (threshold(x)) {
        handler.call(comp, x);
      }
    });
  };
}

/**
Desired usage

<HTML5GamepadDS4 />

HTML5Gamepad.propTypes = {
  pollDuration: number
  gamepad: gamepad
  onLeftPressed: fn
  onRightPressed: fn
  onUpPressed: fn
  onDownPressed: fn
  onL1Pressed: fn
  onL2Pressed: fn
  onL3Pressed: fn
  onR1Pressed: fn
  onR2Pressed: fn
  onR3Pressed: fn
  onTrianglePressed: fn
  onSquarePressed: fn
  onCrossPressed: fn
  onCirclePressed: fn
  onOptionsPressed: fn
  onSharePressed: fn
  onPsPressed: fn
  onTouchpadPressed: fn

  axisLeftPad: { threshold: fn, do: fn }
  axisRightPad: { threshold: fn, do: fn }
  axisLeftStick: { threshold: fn, do: fn }
  axisRightStick: { threshold: fn, do: fn }
  axisLeftTrigger: { threshold: fn, do: fn }
  axisRightTrigger: { threshold: fn, do: fn }
}
*/


class HTML5GamepadDS4 extends Component {
  componentDidMount() {
    const { gamepad, pollDuration=MS_PER_FRAME } = this.props;
    const interval = window.setInterval(pollGamepad(this, gamepad), pollDuration);
    this.setState({ interval });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  }
  render() {
    return this.props.children();
  }
}

export default HTML5GamepadDS4;
