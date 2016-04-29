'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringHelper = exports.StringHelper = function () {
  function StringHelper() {
    _classCallCheck(this, StringHelper);
  }

  StringHelper.compare = function compare(string1, string2) {
    return string1.toUpperCase() === string2.toUpperCase();
  };

  StringHelper.replaceAll = function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  };

  StringHelper.hashCode = function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  StringHelper.getEditDistance = function getEditDistance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }

    return matrix[b.length][a.length];
  };

  StringHelper.getPreviousWord = function getPreviousWord(str, position, separators) {
    var str = str.substring(0, position);
    var lastSeparatorIndex = 0;
    for (var i = 0; i < separators.length; i++) {
      if (str.lastIndexOf(separators[i]) > lastSeparatorIndex) lastSeparatorIndex = str.lastIndexOf(separators[i]);
    }
    if (lastSeparatorIndex == str.length) lastSeparatorIndex = 0;
    if (lastSeparatorIndex > 0 && lastSeparatorIndex < str.length) lastSeparatorIndex++;

    return str.substring(lastSeparatorIndex, str.length);
  };

  StringHelper.getNextWord = function getNextWord(str, position, separators) {
    var str = str.substring(position, str.length);
    var firstSeparatorIndex = str.length;
    for (var i = 0; i < separators.length; i++) {
      if (str.indexOf(separators[i]) < firstSeparatorIndex && str.indexOf(separators[i]) >= 0) firstSeparatorIndex = str.indexOf(separators[i]);
    }
    return str.substring(0, firstSeparatorIndex);
  };

  return StringHelper;
}();