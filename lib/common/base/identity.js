/* jshint strict: true, undef: true */
/* globals exports */

exports.identity = identity;
function identity(x) {

  if (arguments.length !== 1)
    throw new Error("arguments.length !== 0");
  return x;
}
