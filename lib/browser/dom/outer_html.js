/* jshint strict: true, undef: true */
/* globals $ */


function outer_html(raw) {

  return raw.map(function () {
    return $(this).prop('outerHTML');
  }).toArray().join('');
}
