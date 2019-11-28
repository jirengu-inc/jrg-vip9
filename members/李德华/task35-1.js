function Car(name, color) {
    this.name = name || 'Default';
    this.color = color || 'blue';
    this.status = 'stop';
}
Car.prototype.run = function () {
  this.status = 'run';
  console.log(this.name + 'is running');
};
Car.prototype.stop = function () {
  this.status = 'stop';
  console.log(this.name + 'stop');
};
Car.prototype.getStatus = function () {
  return this.status;
};
