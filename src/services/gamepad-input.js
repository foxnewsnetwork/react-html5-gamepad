import gamepads from 'html5-gamepad';

const STATUS_CONNECTED = 'CONNECTED';
const STATUS_DISCONNECTED = 'DISCONNECTED';

const isPresent = (x) => typeof x !== 'undefined' && x !== null;

export default class GamepadInput {
  static setState(instance, key, value) {
    instance[key] = value;
  }

  get gamepad() {
    return gamepads[this.index];
  }

  get status() {
    if (isPresent(this.gamepad)) {
      return STATUS_CONNECTED;
    } else {
      return STATUS_DISCONNECTED;
    }
  }

  get isReady() {
    return this.status === STATUS_CONNECTED;
  }
  constructor(index=0) {
    this.constructor.setState(this, 'index', index);
  }
  onConnect(fn) {
    const cb = (e) => {
      if (e.gamepad.index === this.index) {
        fn(this.gamepad, e);
      }
    };
    window.addEventListener('gamepadconnected', cb);
    if (this.isReady) {
      fn(this.gamepad);
    }
  }
  onDisconnect(fn) {
    window.addEventListener('gamepaddisconnected', (e) => {
      if (e.gamepad.index === this.index) {
        fn(e);
      }
    });
  }
}
