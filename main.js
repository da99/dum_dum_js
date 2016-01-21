"use strict";
/* jshint undef: true */
/* global Mustache, promise  */

var WHITESPACE = /\s+/g;
function identity() { return _.identity.call(_, arguments); }


spec(is_localhost, [], window.location.href.indexOf('/dum_dum_boom_boom/example.html') > 0);
function is_localhost() {
  var addr = window.location.href;
  return window.console && (addr.indexOf("localhost") > -1 ||
    addr.indexOf("file:///") > -1 ||
    addr.indexOf("127.0.0.1") > -1)
  ;
} // === func

function log(_args) {
  if (is_localhost && window.console)
    return console.log.apply(console, arguments);

  return false;
} // === func

spec(is_arguments, [(function () {return arguments;})()], true);
spec(is_arguments, [[]], false);
function is_arguments(v) {
  return is_something(v) && or(is(0), is_positive)(v.length) && v.hasOwnProperty('callee');
}

spec(to_string, [null], 'null');
spec(to_string, [undefined], 'undefined');
spec(to_string, [[1]], '[1]');
spec(to_string, ['yo yo'], '"yo yo"');
spec(to_string, [{a:'b', c:'d'}], '{a="b",c="d"}');
function to_string(val) {
  if (val === null)
    return "null";

  if (val === undefined)
    return "undefined";

  if (_.isArray(val))
    return  '['+_.map(val, to_string).join(", ") + ']';

  if (_.isString(val))
    return '"' + val + '"';


  if ( is_arguments(val) )
    return to_string(_.toArray(val));

  if (is_plain_object(val)) {
    return '{' + _.reduce(_.keys(val), function (acc, k) {
      acc.push(k + '=' + to_string(val[k]));
      return acc;
    }, []).join(",") + '}';
  }

  if (is_function(val) && val.hasOwnProperty('to_string_name'))
    return val.to_string_name;

  return val.toString();
} // === func


spec(is_array_of_functions, [[function () {}]], true);
spec(is_array_of_functions, [[]], false);
spec(is_array_of_functions, [[1]], false);
spec(is_array_of_functions, [1], false);
function is_array_of_functions(a) {
  return _.isArray(a) && l(a) > 0 && _.all(a, _.isFunction);
} // === func

returns(true,  function () { return is(5)(5); });
returns(false, function () { return is("a")("b"); });
function is(target) { return function (v) { return v === target; }; }

function is_positive(v) { return typeof v === 'number' && isFinite(v) && v > 0; }


function is_$(v) {
  return v && typeof v.html === 'function' && typeof v.attr === 'function';
}

function to_arg(val) { return function (f) { return f(val); }; }

spec(should_be, [1, is_num], 1);
throws(
  should_be, ['1', is_num],
  'Value: "1" !== is_num'
);
function should_be(val, func) {
  if (func(val))
    return val;
  throw new Error('Value: ' + to_string(val) + ' !== ' + function_to_name(func));
}


throws(
  arguments_are, [[1], is_num, is_num],
  'Wrong # of arguments: expected: 2 actual: 1'
);
function arguments_are(args_o, _funcs) {
  var funcs = _.toArray(arguments);
  var args  = funcs.shift();

  if (args.length !== funcs.length) {
    throw new Error('Wrong # of arguments: expected: ' + funcs.length + ' actual: ' + args.length);
  }

  for (var i = 0; i < funcs.length; i++) {
    if (!funcs[i](args[i]))
      throw new Error('Invalid arguments: ' + to_string(args[i]) + ' !' + to_string(funcs[i]));
  }

  return _.toArray(args);
}

// === Helpers ===================================================================

function apply_function(f, args) {
  if (arguments.length !== 2)
    throw new Error('Wrong # of argumments: expected: ' + 2 + ' actual: ' + arguments.length);
  if (!is_array(args))
    throw new Error('Not an array: ' + to_string(args));
  if (f.length !== args.length)
    throw new Error('function.length (' + function_to_name(f) + ' ' + f.length + ') !== ' + args.length);
  return f.apply(null, args);
}


spec(merge, [{a: [1]}, {a: [2,3]}], {a: [1,2,3]});
spec(merge, [[1], [2,3]], [1,2,3]);
spec(merge, [{a: 1}, {b: 2}, {c: 3}], {a: 1, b: 2, c: 3});
function merge(_args) {
  if (arguments.length === 0)
    throw new Error('Arguments misisng.');
  var type = is_array(arguments[0]) ? 'array' : 'plain object';
  var fin  = (type === 'array') ? [] : {};
  eachs(arguments, function (kx,x) {
    if (type === 'array' && !is_array(x))
      throw new Error('Value needs to be an array: ' + to_string(x));
    if (type === 'plain object'  && !is_plain_object(x))
      throw new Error('Value needs to be a plain object: ' + to_string(x));

    eachs(x, function (key, val) {
      if ( type === 'array' ) {
        fin.push(val);
        return;
      }

      if (fin[key] === val || !fin.hasOwnProperty(key)) {
        fin[key] = val;
        return;
      }

      if (is_array(fin[key]) && is_array(val)) {
        fin[key] = [].concat(fin[key]).concat(val);
        return;
      }

      if (is_plain_object(fin[key]) && is_plain_object(val))  {
        fin[key] = merge(fin[key], val);
        return;
      }

      throw new Error('Could not merge key: [' + to_string(key) +  '] ' + to_string(fin[key]) + ' -> ' + to_string(val) );

    }); // === eachs
  });

  return fin;
}


returns({a:{b:"c"}, b:true}, function () { // Does not alter orig.
  var orig = {a:{b:"c"}, b:true};
  var copy = copy_value(orig);
  copy.a.b = "1";
  return orig;
});
function copy_value(v) {
  arguments_are(arguments, is_something);
  var type = typeof v;
  if (type === 'string' || type === 'number' || is_bool(v))
    return v;

  if (is_array(v))
    return _.map(v, copy_value);

  if (is_plain_object(v))
    return reduce_eachs({}, v, function (acc, kx, x) {
      acc[kx] = copy_value(x);
      return acc;
    });

  throw new Error('Value can\'t be copied: ' + to_string(v));
}

spec(standard_name, ['n   aME'], 'n ame');
function standard_name(str) {
  return _.trim(str).replace(WHITESPACE, ' ').toLowerCase();
}

returns(
  {"class": 'is_happy'},
  function () {
    spec_dom().html('<div class="is_happy"></div>');
    return dom_attrs(spec_dom().find('div')[0]);
  }
);
function dom_attrs(dom) {
  arguments_are(arguments, has_property_of('attributes', 'object'));

  return _.reduce(
    dom.attributes,
    function (kv, o) {
      kv[o.name] = o.value;
      return kv;
    },
    {}
  );
} // === attrs

// Returns id.
// Sets id of element if no id is set.
//
// .dom_id(raw_or_jquery)
// .dom_id('prefix', raw_or_jquer)
//
function dom_id() {
  var args   = _.toArray(arguments);
  var o      = _.find(args, _.negate(_.isString));
  var prefix = _.find(args, _.isString);
  var old    = o.attr('id');

  if (old && !is_empty(old))
    return old;

  var str = new_id(prefix || 'default_id_');
  o.attr('id', str);
  return str;
} // === id

// Examples:
//
//   .new_id()           ->  Integer
//   .new_id('prefix_')  ->  String
//
function new_id(prefix) {
  if (!new_id.hasOwnProperty('_id'))
    new_id._id = -1;
  new_id._id = new_id._id + 1;
  return (prefix) ? prefix + new_id._id : new_id._id;
} // === func

function is_anything(v) {
  if (arguments.length !== 1)
    throw new Error("Invalid: arguments.length must === 1");
  if (v === null)
    throw new Error("'null' found.");
  if (v === undefined)
    throw new Error("'undefined' found.");

  return true;
}

function is_function(v) {
  if (arguments.length !== 1)
    throw new Error("Invalid: arguments.length must === 1");
  return typeof v === 'function';
}

function conditional(name, funcs) {
  if (funcs.length < 2)
    throw new Error("Called with too few arguments: " + arguments.length);

  if (!_[name])
    throw new Error("_." + name + " does not exist.");

  return function (v) {
    return _[name](funcs, function (f) { return f(v); });
  };
}

function and(_funcs) {
  return conditional('all', arguments);
}

function or(_funcs) {
  return conditional('any', arguments);
}

function length_of(num) {
  return function (v) {
    if (!is_something(v) && has_property_of('length', 'number')(v))
      throw new Error('invalid value for length_of: ' + to_string(num));
    return v.length === num;
  };
}

function length_gt(num) {
  return function (v) { return v.length > num;};
}

function is_string(v) { return typeof v === "string"; }
function is_array(v) { return  _.isArray(v); }
function is_bool(v) { return _.isBoolean(v); }


function is_empty(v) {
  var l = v.length;
  if (!_.isFinite(l))
    throw new Error("!!! Invalid .length property.");

  return l === 0;
} // === func


function all_funcs(arr) {
  var l = arr.length;
  return _.isFinite(l) && l > 0 && _.all(arr, _.isFunction);
}

function is_num(v) {
  return typeof v === 'number' && isFinite(v);
}

function is_null(v) {
  return v === undefined;
}

function is_undefined(v) {
  return v === null;
}

function is_plain_object(v) {
  return _.isPlainObject(v);
}

function return_arguments() { return arguments; }

spec(is_empty, [[]], true);
spec(is_empty, [{}], true);
spec(is_empty, [""], true);
spec(is_empty, [{a: "c"}], false);
spec(is_empty, [[1]],      false);
spec(is_empty, ["a"],      false);
spec(is_empty, [return_arguments()],      true);
spec(is_empty, [return_arguments(1,2,3)], false);
throws(is_empty, [null],   'invalid value for is_empty: null');
function is_empty(v) {
  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));

  if (!is_nothing(v) && v.hasOwnProperty('length'))
    return v.length === 0;

  if (_.isPlainObject(v))
    return _.keys(v).length === 0;

  throw new Error("invalid value for is_empty: " + to_string(v));
}

spec(is_something, [null],      false);
spec(is_something, [undefined], false);
spec(is_something, [[]],       true);
spec(is_something, [{}],       true);
spec(is_something, [{a: "c"}], true);
function is_something(v) {
  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));
  return !is_null(v) && !is_undefined(v);
}

spec(is_nothing, [null],      true);
spec(is_nothing, [undefined], true);
spec(is_nothing, [[]],       false);
spec(is_nothing, [{}],       false);
spec(is_nothing, [{a: "c"}], false);
function is_nothing(v) {
  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));
  return or(is_null, is_undefined)(v);
}

function to_match_string(actual, expect) {
  if (_.isEqual(actual, expect))
    return to_string(actual) + ' === ' + to_string(expect);
  else
    return to_string(actual) + ' !== ' + to_string(expect);
}

function to_function_string(f, args) {
  return function_to_name(f) + '(' + _.map(args, to_string).join(', ') + ')';
}


function throws(f, args, expect) {
  if (!new_spec(f))
    return false;

  if (!_.isFunction(f))
    throw new Error('Invalid value for func: ' + to_string(f));
  if (!_.isArray(args))
    throw new Error('Invalid value for args: ' + to_string(args));
  if (!_.isString(expect))
    throw new Error('Invalid valie for expect: ' + to_string(expect));

  var actual, err;
  var sig = to_function_string(f, args);

  try {
    f.apply(null, args);
  } catch (e) {
    err = e;
    actual = e.message;
  }

  var msg = to_match_string(actual, expect);

  if (!actual)
    throw new Error('!!! Failed to throw error: ' + sig + ' -> ' + expect);

  if (_.isEqual(actual, expect)) {
    log('=== Passed: ' + sig + ' -> ' + expect);
    return true;
  }

  log('!!! Unexpected error for: ' + sig + ' -> ' + msg);
  throw err;
}

function returns(expect, f) {
  if (!new_spec(f))
    return false;

  if (!_.isFunction(f))
    throw new Error('Invalid value for func: ' + to_string(f));

  var sig = f.toString();
  var actual = f();
  var msg = to_match_string(actual, expect);
  if (!_.isEqual(actual,expect))
    throw new Error("!!! Failed: " + sig + ' -> ' + msg);
  log('=== Passed: ' + sig + ' -> ' + msg);
  return true;
}



spec(name_to_function, ["name_to_function"], name_to_function);
function name_to_function(raw) {
  if (!is_string(raw))
    throw new Error('Not a string: ' + to_string(raw));
  var str = _.trim(raw);
  if (!window[str])
    throw new Error('Function not found: ' + to_string(raw));
  return window[str];
}


function App() {
  var is_reset = arguments.length === 1 && arguments[0] === 'reset for specs';
  if (!App.hasOwnProperty('_state') || is_reset) {
    var c = App._state = new Computer();
    c('push', 'dom', dum_dom); // push dom func
  } // === if !_state

  if (!is_reset)
    App._state.apply(null, arguments);

  return App;
}


function new_spec(str_or_func) {
  if (!(is_localhost() && $('#Spec_Stage').length === 1))
    return false;

  // === Is there a specific spec to run?
  var href = window.location.href;
  var target = _.trim(href.split('?').pop() || '');
  if (!is_empty(target) && target !== href  && target !== function_to_name(str_or_func))
    return false;

  // === Reset DOM:
  spec_dom('reset');

  // === Reset App state:
  App('reset for specs');

  return true;
}


function spec_dom(cmd) {

  switch (cmd) {
    case 'reset':
      var stage = $('#Spec_Stage');
      if (stage.length === 0)
        $('body').prepend('<div id="Spec_Stage"></div>');
      else
        stage.empty();
      break;

    default:
      if (arguments.length !== 0)
      throw new Error("Unknown value: " + to_string(arguments));
  } // === switch cmd

  return $('#Spec_Stage');
}

function function_sig(f, args) {
  return function_to_name(f) + '(' + _.map(args, to_string).join(',')  + ')';
}

function set_function_string_name(f, args) {
  if (f.to_string_name)
    throw new Error('.to_string_name alread set: ' + to_string(f.to_string_name));
  f.to_string_name = function_sig(f, args);
  return f;
}

function has_property_of(name, type) {
  var f = function has_property_of(o) {
    return typeof o[name] === type;
  };

  return set_function_string_name(f, arguments);
}

function has_own_property(name) {
  var f = function has_own_property(o) {
    return o.hasOwnProperty(name);
  };

  return set_function_string_name(f, arguments);
}

function spec(f, args, expect) {
  if (!new_spec(f))
    return false;

  if (!_.isFunction(f))
    throw new Error('Invalid value for func: ' + to_string(f));

  if (arguments.length !== 3)
    throw new Error("arguments.length invalid for spec: " + to_string(arguments.length));

  var sig    = to_function_string(f, args);
  var actual = f.apply(null, args);
  var msg    = to_match_string(actual, expect);

  if (actual !== expect && !_.isEqual(actual, expect))
    throw new Error("!!! Failed: " + sig + ' -> ' + msg );

  log('=== Passed: ' + sig + ' -> ' + msg);
  return true;
}

spec(function_to_name, ["function my_name() {}"], "my_name");
function function_to_name(f) {
  return f.to_string_name || f.toString().split('(')[0].split(WHITESPACE)[1] || f.toString();
}

spec(is_enumerable, [$('<p></p>')], true);
function is_enumerable(v) {
  return is_string(v) || is_array(v) || is_plain_object(v) || (v.hasOwnProperty('length') && v.constructor === $ || is_arguments(v));
}

spec(l, [[1]], 1);
throws(l, [{}], '.length is {}.undefined');
function l(v) {
  if (!is_enumerable(v))
    throw new Error('invalid value for l(): ' + to_string(v));

  var num = v.length;
  if (!or(is(0), is_positive)(num))
    throw new Error('.length is ' + to_string(v) + '.' + to_string(num));
  return num;
}

spec(is_length, [[1,2,3], 3], true);
function is_length(v, num) {
  return l(v) === num;
}

spec(is_anything, [false], true);
spec(is_anything, [true], true);
throws(is_anything, [null], 'null found');
throws(is_anything, [undefined], 'undefined found');
function is_anything(v) {
  if (v === null)
    throw new Error('null found');
  if (typeof v === 'undefined')
    throw new Error('undefined found');
  return true;
}

// === When actual value is: true
spec(key_to_bool, ['is_happy',  'is_happy', {is_happy: true}], true);
spec(key_to_bool, ['!is_happy', 'is_happy', {is_happy: true}], false);
// === When actual value is: false
spec(key_to_bool, ['is_happy',  'is_happy', {is_happy: false}], false);
spec(key_to_bool, ['!is_happy', 'is_happy', {is_happy: false}], true);
function key_to_bool(target, key, data) {
  if (!data.hasOwnProperty(key))
    return false;
  var actual = data[key];
  if (!is_bool(actual))
    return false;

  if (target === key)
    return actual;

  var not_key = '!' + key;
  if (target === not_key)
    return !actual;

  return false;
}

function find_key(k, _args) {
  var args = _.toArray(arguments);
  args.shift();
  var o = _.detect(args, function (x) { return x.hasOwnProperty(k); });
  if (!o)
    throw new Error('Key, ' + to_string(k) + ', not found in any: ' + to_string(args));
  return o[k];
}

function keys_or_indexes(v) {
  if (is_plain_object(v))
    return _.keys(v);

  var a = [];
  for(var i = 0; i < v.length; i++) {
    a[i] = i;
  }
  return a;
}

function node_array(unknown) {
  var arr = [];
  _.each($(unknown), function (dom) {
    if (dom.nodeType !== 1)
      return arr.push(dom);

    arr.push({
      tag    : dom.nodeName,
      attrs  : dom_attrs(dom),
      custom : {},
      childs : node_array($(dom).contents())
    });
  });

  return arr;
}


function top_descendents(dom, selector) {
  var arr = [];
  _.each($(dom), function (node) {
    var o = $(node);
    if (o.is(selector))
      return arr.push(o);
    arr = arr.concat(top_descendents(o.children(), selector));
  }); // === func

  return arr;
}

function remove_attr(node, name) {
  var val = $(node).attr(name);
  $(node).removeAttr(name);
  return val;
}

// it 'returns true if key is "truthy"'
spec(key_map_to_bool, [{time: 'morning'}, 'time'], true);

// it 'returns true if: !key , key is !truthy'
spec(key_map_to_bool, [{time: false}, '!time'], true);

// it 'handles nested keys'
spec( key_map_to_bool, [{first: {second: { third: true}}}, '!first.second.third'], true);

// it 'handles multiple exclamation marks'
spec( key_map_to_bool, [{first: false}, '!!!first'], true);

// it 'returns undefined if one non-nested key is specified, but not found'
spec( key_map_to_bool, [{}, 'first'], undefined);

function key_map_to_bool(data, raw_key) {
  var FRONT_BANGS = /^\!+/;

  var key        = _.trim(raw_key);
  var bang_match = key.match(FRONT_BANGS);
  var dots       = ( bang_match ? key.replace(bang_match[0], '') : key ).split('.');
  var keys       = _.map( dots, _.trim );

  var current = data;
  var ans  = false;

  _.detect(keys, function (key) {
    if (_.has(current, key)) {
      current = data[key];
      ans = !!current;
    } else {
      ans = undefined;
    }

    return !ans;
  });

  if (ans === undefined)
    return ans;

  if (bang_match) {
    _.times(bang_match[0].length, function () {
      ans = !ans;
    });
  }

  return ans;
} // === func



// TODO: spec: does not modify arr
spec(reduce_eachs, [
  [], [1,2], function (v, kx, x) { v.push("" + kx + x); return v; }
], ["01", "12"]);

spec(reduce_eachs, [
  [], [1,2], ["a", "b"], function (v, kx, x, ky, y) { v.push("" + x + y); return v; }
], ["1a", "1b", "2a", "2b"]);

spec(reduce_eachs, [
  [], {one: 1, two: 2}, ["a"], function (v, kx, x, ky, y) { v.push("" + kx + y); return v; }
], ["onea", "twoa"]);

spec(reduce_eachs, [
  [], {one: 1, two: 2}, [], ["a"], function (v, kx, x, ky, y, kz, z) { v.push("" + kx + y); return v; }
], []);
function reduce_eachs() {
  var args = _.toArray(arguments);
  if (args.length < 3)
    throw new Error("Not enough args: " + to_string(args));
  var init = args.shift();
  var f    = args.pop();

  // === Validate inputs before continuing:
  for (var i = 0; i < args.length; i++) {
    if (!is_enumerable(args[i]))
        throw new Error("Invalid value for reduce_eachs: " + to_string(args[i]));
  }

  if (is_undefined(init))
    throw new Error("Invalid value for init: " + to_string(init));


  // === Process inputs:
  var cols_length = l(args);

  return row_maker([init], 0, _.map(args, keys_or_indexes));

  function row_maker(row, col_i, key_cols) {
    if (col_i >= cols_length) {
      if (row.length !== f.length)
        throw new Error("f.length (" + f.length + ") should be " + row.length + " (collection count * 2 + 1 (init))");
      row[0] = f.apply(null, [].concat(row)); // set reduced value
      return row[0];
    }

    var keys = key_cols[col_i].slice(0);
    var vals = args[col_i];
    ++col_i;

    for(var i = 0; i < keys.length; i++) {
      row.push(keys[i]); // key
      row.push(vals[keys[i]]); // actual value

      row_maker(row, col_i, key_cols);

      row.pop();
      row.pop();
    }

    return row[0];
  }
} // === function: reduce_eachs


// TODO: spec :eachs does not alter inputs
returns(
  ["01", "12"],
  function () {
    var v = [];
    eachs( [1,2], function (kx, x) { v.push("" + kx + x); });
    return v;
  }
);

returns(
  ["1a", "1b", "2a", "2b"],
  function () {
    var v = [];
    eachs( [1,2], ["a", "b"], function (kx, x, ky, y) { v.push("" + x + y); });
    return v;
  }
);

returns(
  ["onea", "twoa"],
  function () {
    var v = [];
    eachs({one: 1, two: 2}, ["a"], function (kx, x, ky, y) { v.push("" + kx + y); });
    return v;
  }
);

returns(
  ["1a", "1b", "2a", "2b"],
  function () {
    var v = [];
    eachs({one: 1, two: 2}, ["a", "b"], function (kx, x, ky, y) { v.push("" + x + y); });
    return v;
  }
);


returns(
  [],
  function () {
    var v = [];
    eachs({one: 1, two: 2}, [], ["a"], function (kx, x, ky, y, kz, z) { v.push("" + kx + y); });
    return v;
  }
);
function eachs() {
  var args = _.toArray(arguments);
  if (args.length < 2)
    throw new Error("Not enough args: " + to_string(args));
  var f    = args.pop();

  // === Validate inputs before continuing:
  for (var i = 0; i < args.length; i++) {
    if (!is_enumerable(args[i]))
        throw new Error("Invalid value for eachs: " + to_string(args[i]));
  }

  // === Process inputs:
  var cols_length = l(args);

  return row_maker([], 0, _.map(args, keys_or_indexes));

  function row_maker(row, col_i, key_cols) {
    if (col_i >= cols_length) {
      if (row.length !== f.length)
        throw new Error("f.length (" + f.length + ") should be " + row.length + " (collection count * 2 )");
      f.apply(null, [].concat(row)); // set reduced value
      return;
    }

    var keys = key_cols[col_i].slice(0);
    var vals = args[col_i];
    ++col_i;

    for(var i = 0; i < keys.length; i++) {
      row.push(keys[i]); // key
      row.push(vals[keys[i]]); // actual value

      row_maker(row, col_i, key_cols);

      row.pop();
      row.pop();
    }

    return;
  }
}

function pipe_line() {
  var val, i = 0, f;
  var l = arguments.length;
  while (i < l) {
    f = arguments[i];
    if (i === 0)
      val = f();
    else
      val = f(val);
    i = i + 1;
  }
  return val;
}

function next_id() {
  if (!is_num(next_id.count))
    next_id.count = -1;
  next_id.count = next_id.count + 1;
  if (is_empty(arguments))
    return next_id.count;
  return arguments[0] + '_' + next_id.count;
}

// ========================= Computer
returns(3, function () {
  var a = 0, id = next_id('is_happy');
  var data = {}; data[id] = true;
  var state = new Computer();
  state('push', id, function (msg) {a=a+1;});
  state('run', data); state('run', data); state('run', data);
  return a;
});
returns(1, function () {
  var a = 0, id = next_id('is_happy');
  var d_false = {rand_key: 1}; d_false[id] = false;
  var d_true  = {rand_key2: 2}; d_true[id]  = true;
  var state = new Computer();
  state('push', '!' + id, function (msg) {a=a+1;});
  state('run', d_false);
  state('run', d_true);
  state('run', d_true);
  return a;
});

function Computer() {
  State.allowed = ['data'];
  return State;

  function allow(raw_name) {
    var name = _.trimLeft(raw_name, '!');
    State.allowed.push(name);
    return name;
  }

  function is_allowed(raw_name) {
    var name = _.trimLeft(raw_name, '!');
    return _.detect(State.allowed, function (x) { return x === name; });
  }

  function State(action, args) {
    if (State.is_invalid === true)
      throw new Error("state is invalid.");

    if (action === 'invalid') {
      State.is_invalid = true;
      return;
    }

    if(!is_array(State.funcs || 'none'))
      State.funcs = [];
    var funcs = State.funcs.slice(0);

    switch (action) {
      case 'allow':
        var new_actions = _.flattenDeep( [_.toArray(arguments)] );
        State.allowed = [].concat(State.allowed).concat(new_actions);
        break;

      case 'push':
        var name=arguments[1], func= arguments[2];

        if (!is_string(name))
          throw new Error("'name' value invalid: " + to_string(name));
        if (!is_function(func))
          throw new Error("invalid value for function: " + to_string(func));
        if (func.length !== 1)
          throw new Error("function.length needs to === 1: " + function_to_name(func));
        if (!is_allowed(name))
          allow(name);

        State.funcs = funcs.slice(0).concat([{name: name, func: func}]);
        return true;

      case 'run':
        arguments_are(arguments, is('run'), is_plain_object).shift();
        var msg = arguments[1];

        var chars = '?!';
        return reduce_eachs([], funcs, function (acc, _ky, meta) {
          var is_question = _.endsWith(meta.name, '?');
          var is_negate   = _.startsWith(meta.name, '!');
          var base_key    = _.trim(meta.name, '?!');
          var msg_copy    = copy_value(msg);
          var answer      = (!is_negate && msg[base_key] === true) ||
                  (is_negate && msg[base_key] === false);
          try {
            if (is_question) {
              if (msg_copy.hasOwnProperty('args'))
                throw new Error('Key, args, already defined on message: ' + to_string(msg));
              msg_copy.args = [answer];
            }

            if ( is_question || answer )
              acc.push([
                meta,
                apply_function(meta.func, [msg_copy])
              ]);
          } catch (e) {
            State('invalid');
            throw e;
          }

          return acc;
        });

      default:
        State('invalid');
        throw new Error("Unknown action for state: " + to_string(action));
    } // === switch action
  } // === return function State;

} // === function Computer

returns('', function () {
  spec_dom().html('<div data-dum="is_ruby? show_hide" style="display: none;">Ruby</div>');
  App('run', {dom: true});
  App('run', {is_ruby: true});
  return spec_dom().find('div').attr('style');
});
returns('', function () {
  spec_dom().html('<div data-dum="!is_ruby? show_hide" style="display: none;">Perl</div>');
  App('run', {dom: true});
  App('run', {is_ruby: false});
  return spec_dom().find('div').attr('style');
});
function dum_show_hide(msg) {
  if (msg.args[0] === true)
    return dum_show(msg);
  else
    return dum_hide(msg);
}


returns('', function () {
  spec_dom().html('<div data-dum="is_factor show" style="display: none;">Factor</div>');
  App('run', {dom: true});
  App('run', {is_factor: true});
  return spec_dom().find('div').attr('style');
});
function dum_show(msg) {
  $('#' + msg.dom_id).show();
  return 'show: ' + msg.dom_id;
}

returns('display: none;', function () {
  spec_dom().html('<div data-dum="is_factor hide">Factor</div>');
  App('run', {dom: true});
  App('run', {is_factor: true});
  return spec_dom().find('div').attr('style');
});
function dum_hide(msg) {
  $('#' + msg.dom_id).hide();
  return 'hide: ' + msg.dom_id;
}

function dum_dom(data) {
  var selector = '*[data-dum]:not(*[data-dum_fin~="yes"])';
  var elements = $((data && data.target) || $('body')).find(selector).addBack(selector);

  var events = ['on_click', 'on_mousedown', 'on_mouseup', 'on_keypress'];

  eachs(elements, function (i, raw_e) {
    eachs($(raw_e).attr('data-dum').split(';'), function (_i, raw_cmd) {

      raw_cmd = _.trim(raw_cmd);
      if (is_empty(raw_cmd))
        return;

      var args = raw_cmd.split(WHITESPACE);

      // === data-dum="is_name my_func"
      if (l(args) < 1)
        throw new Error("Invalid command: " + to_string(raw_cmd));

      var action_name = args.shift();
      var is_now      = _.endsWith(action_name, '!');

      var func_name   = (is_now) ? _.trimRight(action_name, '!') : args.shift();
      var func        = (window['dum_' + func_name]) ?
        name_to_function( 'dum_' + func_name) :
        name_to_function(func_name);

      // === data-dum="do_something! arg1 arg 2"
      if (is_now) {
        apply_function(
          func, [{
            on_dom : true,
            dom_id : dom_id($(raw_e)),
            args : args.slice(0)
          }]
        );
        return;
      }


      var id       = dom_id($(raw_e));
      var is_event = _.detect(events, is(action_name));
      if (!is_event) {
        return App('push', action_name, function (msg) {
          return apply_function(func, [merge(msg, {dom_id:id, args: args})]);
        });
      }

      // === is event: on_click, etc.
      $('#' + id).on(action_name.replace('on_', ''), function () {
        var msg = {
          is_event: true,
          event_name: action_name,
          dom_id: id,
          args: args
        };
        msg['on_' + action_name] = true;
        msg[action_name]         = true;
        return apply_function(func, [msg]);
      });

    });
    $(raw_e).attr('data-dum_fin', 'yes');
  });

} // === dum_dom

returns(3, function () {
  spec_dom().html(
    '<script type="application/dum_template" data-dum="is_text template">'+
      '&lt;p&gt;1&lt;/p&gt;' +
      '&lt;p&gt;2&lt;/p&gt;' +

      '&lt;script type="application/dum_template" data-dum="is_val template"&gt;' +
        '&amp;lt;p&amp;gt;{{c}}&amp;lt;/p&amp;gt;' +
      '&lt;/script&gt;' +

    '</script>'
  );
  App('run', {dom: true});
  App('run', {is_text: true});
  App('run', {is_val: true, data: {a:'1', b: '2', c:'3'}});
  return spec_dom().find('p').length;
});
function dum_template(msg) {
  var pos = (msg.args || [])[0] || 'replace';

  var t        = $('#' + msg.dom_id);
  var raw_html = t.html();
  var id       = msg.dom_id;
  var me       = dum_template;

  if (!is_plain_object(me.elements))
    me.elements = {};
  if (!is_array(me.elements[id]))
    me.elements[id] = [];

  // === Remove old nodes:
  if (pos === 'replace') {
    eachs(me.elements[id], function (_index, id) {
      $('#' + id).remove();
    });
  }

  // From: http://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
  var decoded_html = (new DOMParser().parseFromString(raw_html, "text/html"))
  .documentElement
  .textContent;

  var compiled = $(Mustache.render(decoded_html, msg.data || {}));
  var new_ids = _.map(compiled, function (x) { return dom_id($(x)); });

  if (pos === 'replace' || pos === 'bottom')
    compiled.insertBefore($('#' + id));
  else
    compiled.insertAfter($('#' + id));

  me.elements[id] = ([]).concat(me.elements[id]).concat( new_ids );

  App('run', {dom: true});

  return new_ids;
} // ==== funcs: template ==========


// ==== Integration tests======================================================
// -- None, so far.
//
// ============================================================================
if (is_localhost())
  log('============ Specs Finished ==========');

// log("THE_FILE_DATE");

// === Spec of specs
// spec - can compare the results when they are two arrays: [1] === [1]
