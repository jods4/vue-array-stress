import { fastArray } from './fast-array';

function sample() {
  return Math.random() * 100 | 0;
}

export default class {

  get last() {
    return this.history[this.history.length - 1];
  }

  constructor(name, length, strategy) {
    this.name = name;
    let array = Array.from({ length }, sample);
    this.history = fastArray(array, strategy);
  }

  tick() {
    this.history.shift();
    this.history.push(sample());
  }
}