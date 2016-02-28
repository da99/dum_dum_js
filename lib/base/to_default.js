/* jshint strict: true, undef: true */
/* globals length */

function to_default(valid) {
  "use strict";

  if (length(arguments) === 2) {
    var v = arguments[1];
    if (v === null || v === undefined)
      return valid;
    return v;
  }

  return function (v) { return to_default(valid, v); };
}