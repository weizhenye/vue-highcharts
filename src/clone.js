/* istanbul ignore next */
export default function clone(obj) {
  var copy;
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Array) {
    copy = [];
    for (var i = obj.length - 1; i >= 0; i--) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (var key in obj) {
      copy[key] = clone(obj[key]);
    }
    return copy;
  }
}
