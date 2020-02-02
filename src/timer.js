export default class {
  get interval() { return this._interval }

  set interval(value) {
    this.stop();
    this._interval = value;
    this.start();
  }

  constructor(interval, callback) {    
    this.callback = callback;
    this.interval = interval;
  }  

  start() {
    this.handle = setInterval(this.callback, this.interval);
  }

  stop() {
    clearInterval(this.handle);
  }
}