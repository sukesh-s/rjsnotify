// https://lolahef.medium.com/react-event-emitter-9a3bb0c719
const EventEmitter = {
  _events: {},
  dispatch: function (event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach((callback) => callback(data));
  },
  subscribe: function (event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  }
};
export default EventEmitter;
