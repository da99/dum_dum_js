/* jshint strict: true, undef: true */
/* globals spec, window */


spec(is_dev, [], window.location.href.indexOf('/specs') > 0);

function is_dev() {

  var addr = window.location.href;
  return window.console && (addr.indexOf("localhost") > -1 ||
    addr.indexOf("file:///") > -1 ||
    addr.indexOf("127.0.0.1") > -1)
  ;
} // === func
