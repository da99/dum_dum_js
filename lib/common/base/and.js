/* jshint strict: true, undef: true */
/* globals _, length */
/* globals exports */


exports.and = and;
function and(_funcs) {

  var funcs = _.toArray(arguments);
  return function (v) {
    for (var i = 0; i < length(funcs); i++) {
      if (!funcs[i](v))
        return false;
    }
    return true;
  };
}
