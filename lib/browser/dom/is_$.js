/* jshint strict: true, undef: true */

function is_$(v) {
  return v && typeof v.html === 'function' && typeof v.attr === 'function';
}
