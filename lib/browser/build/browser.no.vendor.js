
var Dum_Dum_Boom_Boom = (function Scope_Dum_Dum_Boom_Boom(category) {
  "use strict";
  var exports = {};
  var non_exports = {};
  var funcs   = {};

/* jshint browser: true, undef: true */

if (typeof window === 'undefined')
  throw new Error('No window defined.');


funcs.common     = {};

funcs.common.base = {};

funcs.common.base.read_key=read_key;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, is_string, not, is_empty, _ */

exports.read_key = read_key;

function read_key(o, k) {

  if (!o.hasOwnProperty(k))
    throw new Error("Key not defined: " + to_string(k));

  return o[k];
} // === function

funcs.common.base.wait_max=wait_max;
/* jshint strict: true, undef: true */
/* globals to_string, setTimeout */
/* globals exports, spec */

spec(5, function stops_on_return_true(fin) {
  var i = 0;
  wait_max(2, function () {
    i = i + 1;
    if (i === 5) {
      fin(i);
      return true;
    }
    return false;
  });
});

exports.wait_max = wait_max;
function wait_max(seconds, func) {

  var ms       = seconds * 1000;
  var total    = 0;
  var interval = 100;

  function reloop() {
    total = total + interval;
    if (func())
      return true;
    if (total > ms)
      throw new Error('Timeout exceeded: ' + to_string(func) );
    else
      setTimeout(reloop, interval);
  }
  setTimeout(reloop, interval);
}

funcs.common.base.to_arg=to_arg;
/* jshint strict: true, undef: true */
/* globals exports */

exports.to_arg = to_arg;
function to_arg(val) {
  return function (f) { return f(val); };
}

funcs.common.base.do_it=do_it;
/* jshint strict: true, undef: true */
/* globals arguments_are, is_positive, is_function */
/* globals exports */


exports.do_it = do_it;
function do_it(num, func) {

  arguments_are(arguments, is_positive, is_function);
  for (var i = 0; i < num; i++) {
    func();
  }
  return true;
}

funcs.common.base.is_nothing=is_nothing;
/* jshint strict: true, undef: true */
/* globals spec, to_string, or, is_null, is_undefined */
/* globals exports */


spec(is_nothing, [null],      true);
spec(is_nothing, [undefined], true);
spec(is_nothing, [[]],       false);
spec(is_nothing, [{}],       false);
spec(is_nothing, [{a: "c"}], false);

exports.is_nothing = is_nothing;
function is_nothing(v) {

  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));

  return or(is_null, is_undefined)(v);
}

funcs.common.base.is_true=is_true;
/* jshint strict: true, undef: true */
/* globals exports */

exports.is_true = is_true;
function is_true(v) {

  return v === true;
}

funcs.common.base.and=and;
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

funcs.common.base.is_empty=is_empty;
/* jshint strict: true, undef: true */
/* globals spec, return_arguments, _, to_string */
/* globals exports, log */

spec(is_empty, [[]], true);
spec(is_empty, [{}], true);
spec(is_empty, [""], true);
spec(is_empty, [{a: "c"}], false);
spec(is_empty, [[1]],      false);
spec(is_empty, ["a"],      false);
spec(is_empty, [return_arguments()],      true);
spec(is_empty, [return_arguments(1,2,3)], false);
spec(is_empty, [null], new Error('invalid value: null'));
spec(is_empty, [undefined], new Error('invalid value: undefined'));

exports.is_empty = is_empty;
function is_empty(v) {

  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));

  if ( v === null )
    throw new Error("invalid value: null");
  if ( v === undefined)
    throw new Error("invalid value: undefined");

  if (_.isPlainObject(v))
    return _.keys(v).length === 0;

  var l = v.length;
  if (!_.isFinite(l))
    throw new Error("!!! Invalid .length property.");

  return l === 0;
} // === func

funcs.common.base.each_x=each_x;
/* jshint strict: true, undef: true */
/* globals be, is_enumerable, is_function, eachs */
/* globals exports */

/*
  each_x(function (x) { });
 */
exports.each_x = each_x;
function each_x(coll, f) {

  be(is_enumerable, coll);
  be(is_function, f);

  return eachs(coll, function (_i, x) {
    return f(x);
  });

}

funcs.common.base.to_default=to_default;
/* jshint strict: true, undef: true */
/* globals length */
/* globals exports */

spec(to_default, [1,undefined], 1);
spec(to_default, [2,null], 2);
spec(to_default, [3,[]], []);

exports.to_default = to_default;
function to_default(valid) {

  if (length(arguments) === 2) {
    var v = arguments[1];
    if (v === null || v === undefined)
      return valid;
    return v;
  }

  return function (v) { return to_default(valid, v); };
}

funcs.common.base.is_num=is_num;
/* jshint strict: true, undef: true */
/* globals exports */


exports.is_num = is_num;
function is_num(v) {

  return typeof v === 'number' && isFinite(v);
}

funcs.common.base.has_property_of=has_property_of;
/* jshint strict: true, undef: true */
/* globals set_function_string_name */
/* globals exports */


exports.has_property_of = has_property_of;
function has_property_of(name, type) {

  var f = function has_property_of(o) {
    return typeof o[name] === type;
  };

  return set_function_string_name(f, arguments);
}

funcs.common.base.key_to_bool=key_to_bool;
/* jshint strict: true, undef: true */
/* globals _, spec, reduce, be, is_string, not, is_empty */
/* globals exports */

spec(key_to_bool, ['time', {time: 'morning'}], true); // it 'returns true if key is "truthy"'
spec(key_to_bool, ['!time', {time: false}], true); // it 'returns true if: !key , key is !truthy'
spec(key_to_bool, ['!first.second.third', {first: {second: { third: true}}}], true); // it 'handles nested keys'
spec(key_to_bool, ['!!!first', {first: false}], true); // it 'handles multiple exclamation marks'
spec(key_to_bool, ['first', {}], undefined); // it 'returns undefined if one non-nested key is specified, but not found'
spec(key_to_bool, ['is_factor', {is_factor: true}], true);
spec(key_to_bool, ['!is_factor', {is_factor: false}], true);
spec(key_to_bool, ['is_factor', {is_ruby: false}], undefined);
spec(key_to_bool, ['is_happy', {is_happy: true}], true);
spec(key_to_bool, ['!is_happy', {is_happy: true}], false);
spec(key_to_bool, ['is_happy',  {is_happy: false}], false);
spec(key_to_bool, ['!is_happy', {is_happy: false}], true);
spec(key_to_bool, [['is_factor'], {}], new Error("[\"is_factor\"] should be: is_string (function)"));

exports.key_to_bool = key_to_bool;
function key_to_bool(raw_key, data) {

  var FRONT_BANGS = /^\!+/;

  var key = reduce(
    raw_key,
    be(is_string),
    _.trim,
    be(not(is_empty))
  );

  var bang_match = key.match(FRONT_BANGS);
  var dots       = ( bang_match ? key.replace(bang_match[0], '') : key ).split('.');
  var keys       = _.map( dots, _.trim );

  var current = data;
  var ans  = false;

  _.find(keys, function (key) {
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

funcs.common.base.map_x=map_x;
/* jshint strict: true, undef: true */
/* globals be, is_enumerable, is_function, _ */
/* globals exports */


exports.map_x = map_x;
function map_x(coll, f) {

  be(is_enumerable, coll);
  be(is_function,   f);
  return _.map(coll, function (x) { return f(x); });
}

funcs.common.base.is_whitespace=is_whitespace;
/* jshint strict: true, undef: true */
/* globals is_string, length, _  */
/* globals exports */

exports.is_whitespace = is_whitespace;
function is_whitespace(v) {

  return is_string(v) && length(_.trim(v)) === 0;
}

funcs.common.base.is_null_or_undefined=is_null_or_undefined;
/* jshint strict: true, undef: true */
/* globals exports */

exports.is_null_or_undefined = is_null_or_undefined;
function is_null_or_undefined(v) {

  return v === null || v === undefined;
}

funcs.common.base.all=all;
/* jshint strict: true, undef: true */
/* globals and, length */
/* globals exports */

exports.all = all;
function all(_funcs) {
  var _and = and.apply(null, arguments);
  return function (arr) {
    for(var i = 0; i < length(arr); i++){
      if (!_and(arr[i]))
        return false;
    }
    return true;
  };
}

funcs.common.base.function_sig=function_sig;
/* jshint strict: true, undef: true */
/* globals _, to_string, function_to_name */
/* globals exports */


exports.function_sig = function_sig;
function function_sig(f, args) {

  return function_to_name(f) + '(' + _.map(args, to_string).join(',')  + ')';
}

funcs.common.base.is_something=is_something;
/* jshint strict: true, undef: true */
/* globals spec, to_string */
/* globals exports */

spec(is_something, [null],      false);
spec(is_something, [undefined], false);
spec(is_something, [[]],       true);
spec(is_something, [{}],       true);
spec(is_something, [{a: "c"}], true);

exports.is_something = is_something;
function is_something(v) {

  if (arguments.length !== 1)
    throw new Error("arguments.length !== 1: " + to_string(v));
  return v !== null && v !== undefined;
}

funcs.common.base.is_function=is_function;
/* jshint strict: true, undef: true */
/* globals exports */


exports.is_function = is_function;
function is_function(v) {
  if (arguments.length !== 1)
    throw new Error("Invalid: arguments.length must === 1");
  return typeof v === 'function';
}

funcs.common.base.own_property=own_property;
/* jshint strict: true, undef: true */
/* globals spec, to_string */
/* globals exports */

spec(3, function own_property_returns_own_property() {

  return own_property('num')({num: 3});
});
spec(own_property('num'), [{n:4}], new Error('Key not found: "num" in {"n":4}'));

exports.own_property = own_property;
function own_property(name) {

  return function _own_property_(o) {
    if (!o.hasOwnProperty(name))
      throw new Error('Key not found: ' + to_string(name) + ' in ' + to_string(o));
    return o[name];
  };
} // === func own_property

funcs.common.base.to_function_string=to_function_string;
/* jshint strict: true, undef: true */
/* globals function_to_name, _, to_string */
/* globals exports */


exports.to_function_string = to_function_string;
function to_function_string(f, args) {

  return function_to_name(f) + '(' + _.map(args, to_string).join(', ') + ')';
}

funcs.common.base.msg_match=msg_match;
/* jshint strict: true, undef: true */
/* globals spec, is_string, _, is_plain_object, is_empty, is_function, be, is_boolean */
/* globals exports */


spec(msg_match, [1,1], true);
spec(msg_match, ["a", "a"], true);
spec(msg_match, [[1],[1]], true);
spec(msg_match, [[1,[2]],[1,[2]]], true);
spec(msg_match, [{a:"b"}, {a:"b",c:"d"}], true);
spec(msg_match, [{a:is_string}, {a:"b"}], true);
spec(msg_match, [{}, {a:"b"}], false);
spec(msg_match, [{}, {}], true);
spec(msg_match, [[], []], true);

exports.msg_match = msg_match;
function msg_match(pattern, msg) {

  if (_.isEqual(pattern, msg))
    return true;

  if (is_plain_object(pattern) && is_plain_object(msg)) {
    if (is_empty(pattern) !== is_empty(msg))
      return false;

    return !_.find(_.keys(pattern), function (key) {
      var target = pattern[key];
      if (msg[key] === target)
        return !true;
      if (is_function(target))
        return !be(is_boolean, target(msg[key]));
      return !false;
    });
  }

  return false;
}

funcs.common.base.reduce=reduce;
/* jshint strict: true, undef: true */
/* globals _ */
/* globals exports */


exports.reduce = reduce;
function reduce(value, _functions) {

  var funcs = _.toArray(arguments);
  var v     = funcs.shift();
  return _.reduce(funcs, function (acc, f) { return f(acc); }, v);
}

funcs.common.base.to_arguments=to_arguments;
/* jshint strict: true, undef: true */
/* globals exports */

exports.to_arg = to_arg;

/*
 * Returns the arguments passed to it as an arguments object:
 * to_arguments(1,2,3) -> non-array, arguments: [1,2,3]
 * to_arguments("a", "b", "c") -> non-array, arguments: ["a", "b", "c"]
 */
function to_arguments() {
  return arguments;
}

funcs.common.base.copy_value=copy_value;
/* jshint strict: true, undef: true */
/* globals spec, arguments_are, is_something, is_boolean, is_array, _, is_plain_object, reduce_eachs, to_string */
/* globals exports, is_arguments, is_function, length, log */


spec({a:{b:"c"}, b:true}, function () { // Does not alter orig.

  var orig = {a:{b:"c"}, b:true};
  var copy = copy_value(orig);
  copy.a.b = "1";
  return orig;
});

spec(copy_value, [[1, copy_value], is_function], [1, copy_value]);

exports.copy_value = copy_value;
function copy_value(v) {

  var allow_these = [];

  if (length(arguments) < 2) {
    arguments_are(arguments, is_something);
  } else {
    allow_these = _.toArray(arguments).slice(1);
  }

  var type = typeof v;
  if (type === 'string' || type === 'number' || is_boolean(v))
    return v;

  if (is_array(v))
    return _.map(v, function (new_v) { return copy_value.apply(null, [new_v].concat(allow_these)); });

  if (is_plain_object(v))
    return reduce_eachs({}, v, function (acc, kx, x) {
      acc[kx] = copy_value.apply(null, [x].concat(allow_these));
      return acc;
    });

  var return_val = _.find(allow_these, function (f) { return f(v); });
  if (return_val)
    return v;

  return v;
  // throw new Error('Value can\'t be copied: ' + to_string(v));
}

funcs.common.base.has_length=has_length;
/* jshint strict: true, undef: true */
/* globals spec, spec, is_function, arguments_are, is_something, to_string */
/* globals exports */


spec(true, function has_length_returns_function() {
  return is_function(has_length(1));
});

spec(true, function has_length_returns_function_comparing_length() {
  return has_length(1)([1]);
});

spec(true, function has_length_returns_function_comparing_length_of_function() {
  return has_length(2)(function (a,b) {});
});

spec(
  function () { // returns function that returns false on length mismatch
    return has_length(3)([1,2]);
  },
  [],
  new Error("[1, 2].length !== 3")
);

exports.has_length = has_length;
function has_length(num) {

  return function _has_length_(val) {
    arguments_are(arguments, is_something);
    if (val.length === num)
      return true;
    throw new Error(to_string(val) + '.length !== ' + to_string(num));
  };
}

funcs.common.base.is=is;
/* jshint strict: true, undef: true */
/* globals spec */
/* globals exports */

spec(true,  function () { return is(5)(5); });
spec(false, function () { return is("a")("b"); });
exports.is = is;
function is(target) {

  return function (val) { return val === target; };
}

funcs.common.base.keys_or_indexes=keys_or_indexes;
/* jshint strict: true, undef: true */
/* globals is_plain_object, _ */
/* globals exports */


exports.keys_or_indexes = keys_or_indexes;
function keys_or_indexes(v) {
  
  if (is_plain_object(v))
    return _.keys(v);

  var a = [];
  for(var i = 0; i < v.length; i++) {
    a[i] = i;
  }
  return a;
}

funcs.common.base.to_value=to_value;
/* jshint strict: true, undef: true */
/* globals spec, be, is_something, to_string, not, is_empty */
/* globals exports */


spec('"4"', function to_value_returns_a_value() {
  
  return to_value(4, to_string, to_string);
});

spec(5, function to_value_returns_first_value_if_no_funcs() {

  return to_value(5);
});

exports.to_value = to_value;
function to_value(val, _funcs) {

  be(is_something, val);
  be(not(is_empty), arguments);

  var i = 1, l = arguments.length;
  while (i < l) {
    val = arguments[i](val);
    i = i + 1;
  }
  return val;
}

funcs.common.base.create_key=create_key;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, is_string, not, is_empty, _ */

exports.create_key = create_key;

function create_key(o, k, v) {

  if (o.hasOwnProperty(k))
    throw new Error("Key already defined: " + to_string(k) + " value: " + to_string(v));

  return create_or_update_key.apply(null, arguments);
} // === function

funcs.common.base.to_array=to_array;
/* jshint strict: true, undef: true */
/* globals spec, _, is_arguments, is_plain_object, is_function */
/* globals exports, log */



spec(to_array, [[1,2,3]], [1,2,3]);
spec(to_array, [to_arguments(1,2,3)], [1,2,3]);
spec(to_array, [1,2,3], /Invalid value for /);

exports.to_array = to_array;

function to_array(val) {
  if (!_.isArray(val) && val.constructor != arguments.constructor)
    throw new Error("Invalid value for to_array: " + to_string(val));

  return _.toArray(val);
} // === func


funcs.common.base.is_array=is_array;
/* jshint strict: true, undef: true */
/* globals _ */
/* globals exports */

exports.is_array = is_array;
function is_array(v) {

  return _.isArray(v);
}

funcs.common.base.is_null=is_null;
/* jshint strict: true, undef: true */
/* globals spec */
/* globals exports */


spec(is_null, [null], true);
spec(is_null, [undefined], false);
exports.is_null = is_null;
function is_null(v) {
  return v === null;
}

funcs.common.base.to_string=to_string;
/* jshint strict: true, undef: true */
/* globals spec, _, is_arguments, is_plain_object, is_function */
/* globals exports, log */



spec(to_string, [null], 'null');
spec(to_string, [undefined], 'undefined');
spec(to_string, [[1]], '[1]');
spec(to_string, ['yo yo'], '"yo yo"');
spec(to_string, [{a:'b', c:'d'}], '{"a":"b","c":"d"}');

exports.to_string = to_string;
function to_string(val) {

  if (val === null)      return 'null';
  if (val === undefined) return 'undefined';
  if (val === false)     return 'false';
  if (val === true)      return 'true';

  if (_.isArray(val))
    return  '['+_.map(val, to_string).join(", ") + ']';

  if (_.isString(val))
    return '"' + val + '"';

  if ( is_arguments(val) )
    return to_string(_.toArray(val));

  if (is_plain_object(val)) {

    return '{' + _.reduce(_.keys(val), function (acc, k) {
      acc.push(to_string(k) + ':' + to_string(val[k]));
      return acc;
    }, []).join(",") + '}';
  }

  if (is_function(val) && val.hasOwnProperty('to_string_name'))
    return val.to_string_name;

  if (_.isFunction(val))
    return (val.name) ? val.name + ' (function)' : val.toString();

  if (_.isString(val))
    return '"' + val + '"';

  if (_.isArray(val))
    return '[' + _.map(_.toArray(val), to_string).join(', ') + '] (Array)';

  if (val.constructor === arguments.constructor)
    return '[' + _.map(_.toArray(val), to_string).join(', ') + '] (arguments)';

  if (is_error(val))
    return '[Error] ' + to_string(val.message);
  return val.toString();

} // === func


funcs.common.base.set_function_string_name=set_function_string_name;
/* jshint strict: true, undef: true */
/* globals to_string, function_sig */
/* globals exports */


exports.set_function_string_name = set_function_string_name;
function set_function_string_name(f, args) {

  if (f.to_string_name)
    throw new Error('.to_string_name alread set: ' + to_string(f.to_string_name));
  f.to_string_name = function_sig(f, args);
  return f;
}

funcs.common.base.is_string=is_string;
/* jshint strict: true, undef: true */
/* globals exports */

exports.is_string = is_string;
function is_string(v) {

  return typeof v === "string";
}

funcs.common.base.or=or;
/* jshint strict: true, undef: true */
/* globals exports, _ */

exports.or = or;

function or(_funcs) {

  var funcs = _.toArray(arguments);

  return function (v) {
    return !!_.find(funcs, function (f) { return f(v) === true; });
  };
}

funcs.common.base.sort_by_length=sort_by_length;
/* jshint strict: true, undef: true */
/* globals length */
/* globals exports */




exports.sort_by_length = sort_by_length;
function sort_by_length(arr) {
  

  return arr.sort(function (a,b) {
    return length(a) - length(b);
  });
}

funcs.common.base.return_arguments=return_arguments;
/* jshint strict: true, undef: true */
/* globals exports */



exports.return_arguments = return_arguments;
function return_arguments() { return arguments; }

funcs.common.base.combine=combine;
/* jshint strict: true, undef: true */
/* globals _, all, is_plain_object, is_array, to_string */
/* globals exports */

exports.combine = combine;
function combine(_vals) {

  var vals = _.toArray(arguments);

  if (all(is_plain_object)(vals)) {
    return _.extend.apply(null, [{}].concat(vals));
  }

  if (all(is_array)(vals))
    return [].concat(vals);

  throw new Error("Only Array of Arrays or Plain Objects allowed: " + to_string(arguments));
}

funcs.common.base.not=not;
/* jshint strict: true, undef: true */
/* globals spec, is_something, reduce, length, length_gt, is_something, to_string, is_function, is_null */
/* globals be, is_boolean, is */
/* globals exports */

spec(true, function () {  return not(is_something)(null); });
spec(true, function () {  return not(length_gt(2))([1]); });
spec(false, function () {  return not(is_something)(1); });
spec(false, function () {  return not(is(1))(1); });
spec(not, [is_something, is_null], /should be/);

exports.not = not;
function not(func) {


  reduce(arguments, length, be(is(1)));
  var l = arguments.length;
  if (!is_function(func))
    throw new Error('Not a function: ' + to_string(func));

  return function _not_(val) {
    if (arguments.length !== 1)
      throw new Error('arguments.length !== 1');
    var result = func(val);
    if (!is_boolean(result))
      throw new Error('Function did not return boolean: ' + to_string(func) + ' -> ' + to_string(result));
    return !result;
  };
}

funcs.common.base.is_plain_object=is_plain_object;
/* jshint strict: true, undef: true */
/* globals _ */
/* globals exports */

exports.is_plain_object = is_plain_object;
function is_plain_object(v) {

  return _.isPlainObject(v);
}

funcs.common.base.to_slot=to_slot;
/* jshint strict: true, undef: true */
/* globals spec, identity, to_string, is_function, _, apply_function */
/* globals exports */


exports.to_slot = to_slot;

function to_slot(func, _args) {

  var ARGS = to_array(arguments).slice(1);

  return function _to_slot_() {

    var MIDDLE_ARGS = to_array(arguments);
    var FIN_ARGS = reduce_eachs([], ARGS, function (array, _i, x) {
      if (x !== '{{_}}') {
        array.push(x);
        return array;
      }

      if (is_empty(MIDDLE_ARGS))
        throw new Error("Not enough arguments for: " + to_string(func) + " args: " + length(MIDDLE_ARGS) + " != " + length(ARGS));

      array.push(MIDDLE_ARGS.shift());

      return array;
    });

    if (!is_empty(MIDDLE_ARGS))
      throw new Error("Extra args for : " + to_string(func) + " extra: " + length(MIDDLE_ARGS));

    return func.apply(null, FIN_ARGS);
  }; // === return

} // === function to_slot

funcs.common.base.replace=replace;
/* jshint strict: true, undef: true */
/* globals length */
/* globals exports */



exports.replace = replace;
function replace(pattern, new_value) {

  if (length(arguments) === 3) {
    return arguments[2].replace(arguments[0], arguments[1]);
  }

  return function (v) {
    return v.replace(pattern, new_value);
  };
}

funcs.common.base.length_of=length_of;
/* jshint strict: true, undef: true */
/* globals is_something, has_property_of, to_string */
/* globals exports */


exports.length_of = length_of;
function length_of(num) {

  return function (v) {
    if (!is_something(v) && has_property_of('length', 'number')(v))
      throw new Error('invalid value for length_of: ' + to_string(num));
    return v.length === num;
  };
}

funcs.common.base.length=length;
/* jshint strict: true, undef: true */
/* globals spec, _, to_string */
/* globals exports */

spec(length,        [[1]], 1);
spec(length,        [function () {}], 0);
spec(length,        [function (a) { return a;}], 1);
spec(length,        [{length: 3}], 3);
spec(length, [3],  new Error('Invalid value for length: 3'));

exports.length = length;
function length(raw_v) {

  if (raw_v === null || raw_v === undefined || !_.isFinite(raw_v.length))
    throw new Error("Invalid value for length: " + to_string(raw_v));
  return raw_v.length;
}

funcs.common.base.to_key=to_key;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, is_string, not, is_empty, _ */

exports.to_key = to_key;

function to_key(str) {
  return reduce(str, be(is_string), be(not(is_empty)), _.trim);
}

funcs.common.base.is_undefined=is_undefined;
/* jshint strict: true, undef: true */
/* globals spec */
/* globals exports */


spec(is_undefined, [undefined], true);
spec(is_undefined, [null], false);

exports.is_undefined = is_undefined;
function is_undefined(v) {

  return v === undefined;
}

funcs.common.base.conditional=conditional;
/* jshint strict: true, undef: true */
/* globals _ */
/* globals exports */

exports.conditional = conditional;
function conditional(name, funcs) {

  if (funcs.length < 2)
    throw new Error("Called with too few arguments: " + arguments.length);

  if (!_[name])
    throw new Error("_." + name + " does not exist.");

  return function (v) {
    return _[name](funcs, function (f) { return f(v); });
  };
}

funcs.common.base.to_var_name=to_var_name;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, to_key, is_string, not, is_empty, _ */

exports.to_var_name = to_var_name;

// Removes begining slash, if any.
function to_var_name(val, delim) {

  if (length(arguments) == 1)
    delim = "_";

  return val
  .replace(/^[\/]+/, "")
  .replace(/[^a-zA-Z-0-9\_\-]+/g, delim);
}


funcs.common.base.all_funcs=all_funcs;
/* jshint strict: true, undef: true */
/* globals _ */
/* globals exports */

exports.all_funcs = all_funcs;
function all_funcs(arr) {
  var l = arr.length;
  return _.isFinite(l) && l > 0 && _.all(arr, _.isFunction);
}

funcs.common.base.has_own_property=has_own_property;
/* jshint strict: true, undef: true */
/* globals set_function_string_name */
/* globals exports */


exports.has_own_property = has_own_property;
function has_own_property(name) {

  var f = function __has_own_property(o) {
    return o.hasOwnProperty(name);
  };

  return set_function_string_name(f, arguments);
}

funcs.common.base.update_key=update_key;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, is_string, not, is_empty, _ */

exports.update_key = update_key;

function update_key(o, k, v) {

  if (!o.hasOwnProperty(k))
    throw new Error("Key not defined: " + to_string(k) + " in: " + to_string(o));

  var new_o = copy_value(o);
  new_o[k] = be(is_something, v);

  return new_o;
} // === function


funcs.common.base.is_anything=is_anything;
/* jshint strict: true, undef: true */
/* globals spec */
/* globals exports */




spec(is_anything, [false], true);
spec(is_anything, [true], true);
spec(is_anything, [null], new Error('null found.'));
spec(is_anything, [undefined], new Error('undefined found.'));

exports.is_anything = is_anything;
function is_anything(v) {

  if (arguments.length !== 1)
    throw new Error("Invalid: arguments.length must === 1");
  if (v === null)
    throw new Error("null found.");
  if (v === undefined)
    throw new Error("undefined found.");

  return true;
}

funcs.common.base.log=log;
/* jshint strict: true, undef: true */
/* globals console */
/* globals exports */

exports.log = log;
function log(_args) {

  if (typeof console !== 'undefined' && console.log)
    return console.log.apply(console, arguments);

  return false;
} // === func

funcs.common.base.find_key=find_key;
/* jshint strict: true, undef: true */
/* globals _, to_string */
/* globals exports */


exports.find_key = find_key;
function find_key(k, _args) {

  var args = _.toArray(arguments);
  args.shift();
  var o = _.detect(args, function (x) { return x.hasOwnProperty(k); });

  if (!o)
    throw new Error('Key, ' + to_string(k) + ', not found in any: ' + to_string(args));

  return o[k];
}

funcs.common.base.describe_reduce=describe_reduce;
/* jshint strict: true, undef: true */

exports.describe_reduce = describe_reduce;

function describe_reduce(INFO, val, _args) {

  var funcs = to_array(arguments).slice(2);
  try {
    return reduce.apply(null, [val].concat(funcs));
  } catch (e) {
    e.message = INFO + ': ' + e.message;
    throw e;
  }
} // === function

funcs.common.base.dot=dot;
/* jshint strict: true, undef: true */
/* globals spec, identity, _, is_undefined, to_string, be, is_function */
/* globals exports, log, to_function */


spec(dot('num'),    [{num: 3}],         3);
spec(dot('html()'), [{html: to_function('hyper')}], 'hyper');
spec(dot('num'),    [{n:4}],            new Error('Property not found: "num" in {"n":4}'));

exports.dot = dot;
function dot(raw_name) {

  var name = _.trimEnd(raw_name, '()');

  return function _dot_(o) {
    if (is_undefined(o[name]))
      throw new Error('Property not found: ' + to_string(name) + ' in ' + to_string(o));

    if (name !== raw_name) {
      log(name, raw_name, o);
      be(is_function, o[name]);
      return o[name]();
    } else
      return o[name];
  };
} // === func dot

funcs.common.base.length_gt=length_gt;
/* jshint strict: true, undef: true */
/* globals exports */


exports.length_gt = length_gt;
function length_gt(num) {

  return function (v) { return v.length > num;};
}

funcs.common.base.is_regexp=is_regexp;
/* jshint strict: true, undef: true */
/* globals exports, _ */

exports.is_regexp = is_regexp;
function is_regexp(val) {
  return _.isRegExp(val);
}

funcs.common.base.is_blank_string=is_blank_string;
/* jshint strict: true, undef: true */
/* globals spec, be, is_string, length, _ */
/* globals exports */

spec(is_blank_string, [""],     true);
spec(is_blank_string, ["   "],  true);
spec(is_blank_string, [" a  "], false);

exports.is_blank_string = is_blank_string;
function is_blank_string(v) {

  be(is_string, v);
  return length(_.trim(v)) < 1;
}

funcs.common.base.merge=merge;
/* jshint strict: true, undef: true */
/* globals spec, is_array, eachs, to_string, is_plain_object */
/* globals exports */


spec(merge, [{a: [1]}, {a: [2,3]}], {a: [1,2,3]});
spec(merge, [[1], [2,3]], [1,2,3]);
spec(merge, [{a: 1}, {b: 2}, {c: 3}], {a: 1, b: 2, c: 3});

exports.merge = merge;
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

funcs.common.base.is_length_zero=is_length_zero;
/* jshint strict: true, undef: true */
/* globals length */
/* globals exports */

exports.is_length_zero = is_length_zero;
function is_length_zero(v) {
  return length(v) === 0;
}

funcs.common.base.is_boolean=is_boolean;
/* jshint strict: true, undef: true */
/* globals exports */

exports.is_boolean = is_boolean;
function is_boolean(v) {

  return typeof v === 'boolean';
}

funcs.common.base.is_error=is_error;
/* jshint strict: true, undef: true */
/* globals spec, to_string, is_something */
/* globals exports, is_plain_object, is_string */

spec(is_error, [new Error('anything')], true);
spec(is_error, ['anything'],            false);

exports.is_error = is_error;
spec(is_error, [new Error('meh')], true);
spec(is_error, [new TypeError('meow')], true);
spec(is_error, [{stack: "", message: ""}], false);
function is_error(v) {

  return is_something(v) &&
    (
      v.constructor === Error ||
     (!is_plain_object(v) && is_string(v.stack) && is_string(v.message))
    )
    ;
}

funcs.common.base.reduce_eachs=reduce_eachs;
/* jshint strict: true, undef: true */
/* globals spec, to_string, _, is_enumerable, is_undefined, length, keys_or_indexes */
/* globals exports */


// TODO: spec: does not modify arr
spec(reduce_eachs, [
  [], [1,2], function (v, kx, x) { v.push("" + kx + x); return v; }
], ["01", "12"]);

spec(reduce_eachs, [
  [], [1,2], ["a", "b"], function (v, kx, x, ky, y) {  v.push("" + x + y); return v; }
], ["1a", "1b", "2a", "2b"]);

spec(reduce_eachs, [
  [], {one: 1, two: 2}, ["a"], function (v, kx, x, ky, y) {  v.push("" + kx + y); return v; }
], ["onea", "twoa"]);

spec(reduce_eachs, [
  [], {one: 1, two: 2}, [], ["a"], function (v, kx, x, ky, y, kz, z) {  v.push("" + kx + y); return v; }
], []);

exports.reduce_eachs = reduce_eachs;
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
  var cols_length = length(args);

  return reduce_eachs_row_maker([init], 0, _.map(args, keys_or_indexes));

  function reduce_eachs_row_maker(row, col_i, key_cols) {
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

      reduce_eachs_row_maker(row, col_i, key_cols);

      row.pop();
      row.pop();
    }

    return row[0];
  }
} // === function: reduce_eachs

funcs.common.base.function_to_name=function_to_name;
/* jshint strict: true, undef: true */
/* globals spec */
/* globals exports */


spec(function_to_name, ["function my_name() {}"], "my_name");

exports.function_to_name = function_to_name;
function function_to_name(f) {

  var WHITESPACE = /\s+/g;
  return f.to_string_name || f.toString().split('(')[0].split(WHITESPACE)[1] || f.toString();
}

funcs.common.base.is_enumerable=is_enumerable;
/* jshint strict: true, undef: true */
/* globals spec, is_array, is_string, is_plain_object, _, is_arguments */
/* globals exports */


spec(is_enumerable, [[]], true);
spec(is_enumerable, [{}], true);
spec(is_enumerable, [{}], true);

exports.is_enumerable = is_enumerable;
function is_enumerable(v) {

  return is_string(v) ||
  is_array(v)         ||
  is_plain_object(v)  ||
  _.isFinite(v.length) ||
    is_arguments(v);
}

funcs.common.base.standard_name=standard_name;
/* jshint strict: true, undef: true */
/* globals spec, _ */
/* globals exports */


spec(standard_name, ['NAME NAME'], "name name");     // it 'lowercases names'
spec(standard_name, ['  name  '],  'name');          // it 'trims string'
spec(standard_name, ['n   aME'],   'n ame');         // it 'squeezes whitespace'

exports.standard_name = standard_name;
function standard_name(str) {

  var WHITESPACE = /\s+/g;
  return _.trim(str).replace(WHITESPACE, ' ').toLowerCase();
}

funcs.common.base.arguments_are=arguments_are;
/* jshint strict: true, undef: true */
/* globals spec, is_arguments, to_arguments, is_num, _, to_string */
/* globals exports */

spec(
  arguments_are,
  [to_arguments(1), is_num, is_num],
  new Error('Wrong # of arguments: expected: 2 actual: 1')
);

exports.arguments_are = arguments_are;

function arguments_are(args_o, _funcs) {

  if (!is_arguments(args_o))
    throw new Error('not arguments: ' + to_string(args_o));

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

funcs.common.base.to_match_string=to_match_string;
/* jshint strict: true, undef: true */
/* globals _, to_string */
/* globals exports */


exports.to_match_string = to_match_string;
function to_match_string(actual, expect) {

  if (_.isEqual(actual, expect))
    return to_string(actual) + ' === ' + to_string(expect);
  else
    return to_string(actual) + ' !== ' + to_string(expect);
}

funcs.common.base.split_on=split_on;
/* jshint strict: true, undef: true */
/* globals spec, arguments_are, is_something, is_string, _, is_empty, map_x, is_blank_string */
/* globals exports */



spec(split_on, [/;/, "a;b;c"], ['a', 'b', 'c']);
spec(split_on, [/;/, "a;b;c"], ['a', 'b', 'c']);
spec(split_on, [/;/, "a; ;c"], ['a', 'c']);
spec(split_on('.'), ['form.id'], ['form', 'id']);

exports.split_on = split_on;
function split_on(pattern, str) {

  function _split_on_(str) {
    return split_on(pattern, str);
  }

  if (length(arguments) === 1)
    return _split_on_;

  arguments_are(arguments, is_something, is_string);
  var trim = _.trim(str);
  if (is_empty(trim))
    return [];
  return _.compact( map_x(trim.split(pattern), function (x) {
    return !is_blank_string(x) && _.trim(x);
  }));
}

funcs.common.base.create_or_update_key=create_or_update_key;
/* jshint strict: true, undef: true */
/* globals exports */
/* globals be, reduce, is_string, not, is_empty, _ */

exports.create_or_update_key = create_or_update_key;

function create_or_update_key(orig_o, name, val) {
  var o = copy_value(orig_o);
  var k = reduce(
    name,
    be(is_string),
    _.trim,
    to_var_name
  );

  o[k] = be(is_something, val);
  return o;
}

funcs.common.base.apply_function=apply_function;
/* jshint strict: true, undef: true */
/* globals is_array, is_arguments, to_string, function_to_name */
/* globals exports */

exports.apply_function = apply_function;
function apply_function(f, args) {

  if (arguments.length !== 2)
    throw new Error('Wrong # of argumments: expected: ' + 2 + ' actual: ' + arguments.length);

  if (!is_array(args) && !is_arguments(args))
    throw new Error('Not an array/arguments: ' + to_string(args));

  if (f.length !== args.length)
    throw new Error('function.length (' + function_to_name(f) + ' ' + f.length + ') !== ' + args.length);

  return f.apply(null, args);
}

funcs.common.base.identity=identity;
/* jshint strict: true, undef: true */
/* globals exports */

exports.identity = identity;
function identity(x) {

  if (arguments.length !== 1)
    throw new Error("arguments.length !== 0");
  return x;
}

funcs.common.base.eachs=eachs;
/* jshint strict: true, undef: true */
/* globals spec, _, to_string, is_enumerable, length, keys_or_indexes */
/* globals exports */


// TODO: spec :eachs does not alter inputs
spec(
  ["01", "12"],
  function eachs_passes_key_and_val() {

    var v = [];
    eachs( [1,2], function (kx, x) { v.push("" + kx + x); });
    return v;
  }
);

spec(
  ["1a", "1b", "2a", "2b"],
  function eachs_passes_vals_of_multiple_colls() {

    var v = [];
    eachs( [1,2], ["a", "b"], function (kx, x, ky, y) { v.push("" + x + y); });
    return v;
  }
);

spec(
  ["onea", "twoa"],
  function eachs_passes_keys_and_vals_of_arrays_and_plain_objects() {

    var v = [];
    eachs({one: 1, two: 2}, ["a"], function (kx, x, ky, y) { v.push("" + kx + y); });
    return v;
  }
);

spec(
  ["1a", "1b", "2a", "2b"],
  function eachs_passes_vals_of_plain_object_and_array() {

    var v = [];
    eachs({one: 1, two: 2}, ["a", "b"], function (kx, x, ky, y) { v.push("" + x + y); });
    return v;
  }
);

spec( [],
  function eachs_returns_empty_array_if_one_array_is_empty() {

    var v = [];
    eachs({one: 1, two: 2}, [], ["a"], function (kx, x, ky, y, kz, z) {
      v.push("" + kx + y);
    });
    return v;
  }
);

exports.eachs = eachs;
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
  var cols_length = length(args);

  return eachs_row_maker([], 0, _.map(args, keys_or_indexes));

  function eachs_row_maker(row, col_i, key_cols) {
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

      eachs_row_maker(row, col_i, key_cols);

      row.pop();
      row.pop();
    }

    return;
  }
}

funcs.common.base.is_positive=is_positive;
/* jshint strict: true, undef: true */
/* globals exports */

exports.is_positive = is_positive;
function is_positive(v) {

  return typeof v === 'number' && isFinite(v) && v > 0;
}

funcs.common.base.is_array_of_functions=is_array_of_functions;
/* jshint strict: true, undef: true */
/* globals spec, _, length_gt */
/* globals exports, log */


spec(is_array_of_functions, [[function () {}]], true);
spec(is_array_of_functions, [[]], false);
spec(is_array_of_functions, [[1]], false);
spec(is_array_of_functions, [1], false);

exports.is_array_of_functions = is_array_of_functions;
function is_array_of_functions(a) {

  return _.isArray(a) && length_gt(0)(a) > 0 && _.every(a, _.isFunction);
} // === func

funcs.common.base.to_function=to_function;
/* jshint strict: true, undef: true */
/* globals spec, identity, to_string, is_function, _, apply_function */
/* globals exports */

spec(true, function to_function_returns_sole_function() {

  var f = function () {};
  return to_function(f) === f;
});

spec(2, function to_function_returns_an_identity_function() {

  return to_function(2)();
});

spec('"3"', function to_function_returns_a_function() {

  return to_function(identity, to_string, to_string)(3);
});

exports.to_function = to_function;
function to_function() {

  if (arguments.length === 1) {
    if (is_function(arguments[0])) {
      return arguments[0];
    } else{
      var x = arguments[0];
      return function () { return x; };
    }
  }

  var i = 0, f;
  var l = arguments.length;
  while (i < l) {
    f = arguments[i];
    if (!_.isFunction(f))
      throw new Error('Not a function: ' + to_string(f));
    i = i + 1;
  }

  var funcs = arguments;
  return function () {
    var i = 0, f, val;
    while (i < l) {
      f = funcs[i];
      if (i === 0) {
        if (f.length !== arguments.length)
          throw new Error('Function.length ' + f.length + ' ' + to_string(f) + ' !=== arguments.length ' +  arguments.length + ' ' + to_string(arguments));
        val = apply_function(f, arguments);
      } else {
        if (f.length !== 1)
          throw new Error('Function.length ' + f.length + ' !=== 1');
        val = apply_function(f, [val]);
      }
      i = i + 1;
    }
    return val;
  }; // return
}

funcs.common.base.is_arguments=is_arguments;
/* jshint strict: true, undef: true */
/* globals spec, return_arguments, is_something, or, is, is_positive */
/* globals exports, _, log */

spec(is_arguments, [return_arguments()], true);
spec(is_arguments, [[]], false);
spec(is_arguments, [{}], false);

exports.is_arguments = is_arguments;
function is_arguments(v) {

  return is_something(v) &&
    v.constructor === arguments.constructor &&
      _.isFinite(v.length) &&
        !_.isPlainObject(v);
}

funcs.common.base.be=be;
/* jshint strict: true, undef: true */
/* globals spec, is_string, is_function, is_num, is_something, is_null, _, length, to_string */
/* globals exports */


spec(be, [is_num, 1],    1);
spec(be, [is_num, '1'],  /"1" should be: is_num/);
spec(be, [is_string, 2], /2 should be: is_string/);

exports.be = be;
function be(func, val) {

  switch(length(arguments)) {
    case 2:
      if (!func(val))
        throw new Error(to_string(val) + ' should be: ' + to_string(func));
      return val;

    case 1:
      be(is_function, func);
      return function (v) {
        return be(func, v);
      };
  }

  throw new Error("Invalid arguments.");
}


funcs.common.base.find=find;
/* jshint strict: true, undef: true */
/* globals _, and */
/* globals exports */

exports.find = find;
function find(_funcs) {

  var funcs = _.toArray(arguments);

  return function (v) {
    return _.find(v, and.apply(null, funcs));
  };
}

funcs.common.spec = {};

funcs.common.spec.spec_next=spec_next;
/* jshint strict: true, undef: true */
/* globals to_string, length, setTimeout, be, is_specs */
/* globals exports */


exports.spec_next = spec_next;
function spec_next(specs) {

  be(is_specs, specs);

  if (specs.i === 'init') {
      specs.i = 0;
  } else {
    if (specs.dones[specs.i] !== true)
      throw new Error("Spec did not finish: " + to_string(specs.list[specs.i]));
    specs.i = specs.i + 1;
  }

  var i    = specs.i;
  var list = specs.list;
  var func = list[i];

  // === Are all specs finished?
  if (!func && i >= length(specs.list)) {
    specs.total = i;
    if (specs.total !== specs.list.length)
      throw new Error('Not all specs finished: ' + to_string(specs.total) + ' !== ' + to_string(specs.list.length));
    specs.on_finish(specs);
    return length(specs.list);
  }

  // === Function was found?
  if (!func) {
    throw new Error('Spec not found: ' + to_string(i));
  }

  // === Async?
  if (length(func) === 1 ) {
    setTimeout(function () {
      if (!specs.dones[i])
        throw new Error("Spec did not finish in time: " + to_string(func));
    }, 2500);
    func(function () {
      specs.dones[i] = true;
      spec_next(specs);
    });
    return false;
  }

  // === Regular spec, non-asyc?
  if (length(func) === 0) {
    func();
    specs.dones[i] = true;
    return spec_next(specs);
  }

  throw new Error('Function has invalid arguments: ' + to_string(func));
}

funcs.common.spec.is_specs=is_specs;
/* jshint strict: true, undef: true */
/* globals be, is, not, is_empty, or, is_plain_object, is_positive */
/* globals exports */


exports.is_specs = is_specs;
function is_specs(specs) {
  var is_valid_specs_i = or(is('init'), is(0), is_positive);

  be(is_plain_object,  specs);
  be(not(is_empty),    specs.list);
  be(is_valid_specs_i, specs.i);
  be(is_plain_object,  specs.dones);
  return true;
}

funcs.common.spec.spec_dom=spec_dom;
/* jshint strict: true, undef: true */
/* globals $, to_string */
/* globals exports */


// Specification function:
// Accepts:
//   string : 'reset'  => Reset dom for next test.
exports.spec_dom = spec_dom;
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

funcs.common.spec.spec=spec;
/* jshint strict: true, undef: true */
/* globals _, App, to_match_string, log, to_string, to_function_string */
/* globals exports, is_empty, length, is_function, is_plain_object */
/* globals $, process */
/* globals window, _, is_empty, function_to_name, spec_dom */
/* globals _, is_array, to_string, to_function_string, to_match_string, log */
/* globals exports, wait_max, is_error, is_string, is_regexp, spec */


// === Expect:
// spec(my_func,             ["my args"],           "my expected value");
// spec("my expected value", function my_custom_spec() {
//   return "a value";
// });
//
// === Throws:
// spec(my_func, ["my args"], new Error("my expected thrown error"));
// spec(
//   new Error("my expected thrown error"),
//   function my_custom_spec() {
//     throw new Error("something");
//   }
// );
//
// === Run specs:
// spec('send message');
// spec(function (msg) {
//  log('Finished specs: ' + msg.total);
// });
//
// === Used by other functions to continue running specs:
// spec({
//    list: [],
//    i:"init"|0|positive,
//    on_finish: my_callback
// });
//

exports.spec = spec;

// === Is there a specific spec to run?
(function () {
  if (typeof window === 'undefined')
    return;
  var href = window.location.href;
  var target = _.trim(href.split('?').pop() || '');
  if (!is_empty(target) && target !== href  && target !== function_to_name("str_or_func"))
    return false;

  // === Reset DOM:
  spec_dom('reset');
  spec.target = target;
})();

function spec() {

  var is_allowed = (
    ( typeof(window) !== 'undefined' && $('#Spec_Stage').length === 1) ||
      ( typeof(process) !== 'undefined' && process.argv[2] === 'test')
  );

  if (!is_allowed)
    return;

  var args = _.toArray(arguments);

  if (length(args) !== 1) {
    return App('push into or create', 'specs', args);
  } // === switch

  if (args[0] !== 'run' && !is_function(args[0]))
    throw new Error('Unknown value: ' + to_string(args[0]));

  App('create or ignore', 'spec on finishs', []);
  App('create or ignore', 'specs done', []);
  var specs = App('read or create', 'specs', []);
  var i     = App('read or create', 'spec.index', 0);

  if (is_empty(specs))
    throw new Error('No specs found.');

  if (is_function(arguments[0]))
    App('push into', 'spec on finishs', arguments[0]);

  while (i < specs.length) {
    if (run_spec(i, specs[i]) === 'wait')
      return 'wait';
    i = App('read', 'spec.index');
  }

  var passed = App('read', 'spec.index');
  if (specs.length < passed)
    throw new Error("Total specs: " + specs.length + " != Passed specs: " + passed);

  var on_fins = App('read', 'spec on finishs');
  if (is_empty(on_fins)) {
    on_fins.push(spec.default_msg);
  }

  var msg = {total: specs.length};
  for (var func_i = 0; func_i < on_fins.length; func_i++)
    on_fins[func_i](msg);

  return 'finish';

  function actual_equals_expect(actual, expect) {
    if (_.isEqual(actual, expect))
      return true;

    if (_.isString(actual) && _.isRegExp(expect) && actual.match(expect))
      return true;

    if (actual && actual.constructor === Error && expect && expect.constructor && actual.message === expect.message)
      return true;

    if (actual && actual.constructor === Error && _.isRegExp(expect) && actual.message.match(expect))
      return true;

    return false;
  }

  function run_spec(index, raw_spec) {

    var f, args, expect, actual;

    if (raw_spec.length === 2 && _.isFunction(raw_spec[1])) {
        f      = raw_spec[1];
        args   = (length(f) > 0) ? [compare_actual] : [];
        expect = raw_spec[0];
    } else {
      if (raw_spec.length === 3 && _.isFunction(raw_spec[0])) {
        f      = raw_spec[0];
        args   = raw_spec[1];
        expect = raw_spec[2];
      } else {
        throw new Error("Invalid spec: " + to_string(raw_spec));
      }
    }

    // === Handle async specs:
    if (args[0] === compare_actual) {
      f.apply(null, args);
      wait_max(3, function () {
        if (!_.includes(App('read', 'specs done'), index))
          return false;
        spec('run');
        return true;
      });
      return "wait";
    } // === if =======================

    try {
      actual = f.apply(null, args);
    } catch (e) {
      actual = e;
    }
    compare_actual(actual);
    return true;

    function compare_actual(actual) {

      var sig = to_function_string(f, args);
      var msg = to_match_string(actual, expect);

      if (!actual_equals_expect(actual, expect)) {

        if (is_error(actual)) {
          console.error("!!! Failed w/ unexpected error: " + sig);
          throw actual;
        }

        log(f, args, expect, actual);
        throw new Error("!!! Failed: " + sig + ' -> ' + msg );
      }

      log('=== Passed: ' + sig + ' -> ' + msg);

      App('+1', 'spec.index');
      App('push into', 'specs done', index);
    } // === compare_actual
  } // === function regular_spec

} // === function spec

spec.default_msg = function default_msg(msg) {
  log('      ======================================');
  log('      Specs Finish: ' + to_string(msg.total) + ' tests');
  log('      ======================================');
};



funcs.common.state = {};

funcs.common.state.App=App;
/* jshint node: true, strict: true, undef: true */
/* globals Computer, is_empty */


// === Examples:
// App()
// App(..args for underlying Computer)

function App() {

  if (!App._computer) {
    App._computer = new Computer();
  }

  return App._computer.apply(null, arguments);
}

funcs.App = App;

funcs.common.state.Computer=Computer;
/* jshint strict: true, undef: true */
/* globals is_array, spec, arguments_are, reduce_eachs, copy_value, do_it, and, is, is_plain_object */
/* globals is_string, be, not, to_string, apply_function, has_length, is_function, msg_match, function_to_name */
/* globals reduce, log, exports, is_something, is_empty, _ */
/* globals or, is_num, is_array_of_functions, to_key, is_null, is_undefined, is_regexp, is_error, is_arguments */

spec(function throws_on_invalid() {
  var comp = new Computer();
  comp('create', 'a number', 1, function (msg) { return be(is_num, msg.value); });
  comp('update', 'a number', '2');
}, [], /2. should be: is_num /);

spec(2, function increments_counter() {
  var comp = new Computer();
  comp('create', 'counter', 0);
  comp('+1', 'counter');
  comp('+1', 'counter');
  return comp('read', 'counter');
});

spec(-4, function decrements_counter() {
  var comp = new Computer();
  comp('create', 'counter', -2);
  comp('-1', 'counter');
  comp('-1', 'counter');
  return comp('read', 'counter');
});

spec(3, function runs_message_function() {

  var counter = 0;
  var data = {my_name: 'happy'};
  var state = new Computer();
  state('create message function', function (msg) {
    if (!msg_match({my_name: 'happy'}, msg))
      return;
    ++counter;
  });
  do_it(3, function () { state('send message', data); });
  return counter;
});

exports.Computer = Computer;
function Computer() {

  ME.values     = {};
  ME.msg_funcs  = [];
  ME.abouts     = {};
  return ME;

  function _save_(action, name, val) {
    var fin = reduce_eachs(val, ME.abouts[name], function (val, _i, cleaner) {
      return cleaner({action: action, name: name, value: val});
    });
    ME.values[name] = fin;
    return _read_and_copy_key_(name);
  }

  function _read_and_copy_key_(k) {
    var key = _require_key_(k);
    return _copy_value_(ME.values[key]);
  }

  function _copy_value_(v) {
    return copy_value(v, is_function, is_null, is_undefined, is_error, is_arguments, is_regexp);
  }

  function _replace_with_copy_(raw) {
    var key = _require_key_(raw);
    ME.values[key] = _copy_value_(ME.values[key]);
    return ME.values[key];
  }

  function _has_key_(k) {
    return ME.values.hasOwnProperty(to_key(k));
  }

  function _update_(k, func) {
  }

  function _key_must_not_exist_(k) {
    var key = to_key(k);
    if (_has_key_(key))
      throw new Error("Value already created: " + to_string(key));
    return key;
  }

  function _require_key_(k) {
    var key = to_key(k);
    if (!_has_key_(key))
      throw new Error("Value has not been created: " + to_string(k));
    return key;
  }

  function ME(action, args) {
    if (action === 'invalid') {
      ME.is_invalid = true;
      return;
    }

    if (ME.is_invalid === true)
      throw new Error("state is invalid.");

    var name, new_abouts, new_args, key, func, funcs, tail, new_val, old_vals, default_val, old;

    var msg_funcs = ME.msg_funcs.slice(0);

    switch (action) {
      case 'create message function':
         func = be(and(is_function, has_length(1)), arguments[1]);

        ME.msg_funcs = msg_funcs.slice(0).concat([func]);
        return true;

      case 'push into or create':
        name = to_key(arguments[1]);
        if (!_has_key_(name))
          ME('create', name, []);
        new_args = ['push into'].concat(_.toArray(arguments).slice(1));
        return ME.apply(null, new_args);

      case 'push into':
        name    = _require_key_(arguments[1]);
        new_val = reduce(arguments[2], be(is_something));
        return _replace_with_copy_(name).push(new_val);

      case 'read':
        name = reduce(arguments[1], be(is_string), _.trim, be(not(is_empty)));

        var val_has_been_set = is_something(ME.values[name]);
        var has_default_val  = arguments.length > 2;
        default_val      = has_default_val && be(is_something, arguments[2]);

        if (!val_has_been_set && !has_default_val)
          throw new Error('Not set: ' + to_string(name));

        if (val_has_been_set)
          return _copy_value_(ME.values[name]);
        return default_val;

      case 'create':
        name = _key_must_not_exist_(arguments[1]);
        new_abouts = _.toArray(arguments).slice(3);
        if (is_empty(new_abouts))
          ME.abouts[name] = [];
        else
          ME.abouts[name] = be( is_array_of_functions, new_abouts );

        return _save_('create', name, reduce(arguments[2], be(is_something)));

      case 'create or ignore':
        return ME.apply(null, ["read or create"].concat(_.toArray(arguments).slice(1)));

      case 'read or create':
        name = to_key(arguments[1]);
        tail = _.toArray(arguments).slice(2);
        if (_has_key_(name))
          return ME('read', name);
        return ME.apply(null, ['create', name].concat(tail));

      case 'read and update':
        key  = _require_key_(arguments[1]);
        func = be(is_function, arguments[2]);
        old  = ME('read', key);
        return ME('update', key, func(old));

      case 'update':
        if (arguments.length !== 3)
          throw new Error('Wrong # of arguments: ' + to_string(arguments));
        return _save_('update', _require_key_(arguments[1]), arguments[2]);

      case '+1':
        return ME('read and update', arguments[1], function (old) {
          return be(is_num, old) + 1;
        });

      case '-1':
        return ME('read and update', arguments[1], function (old) {
          return be(is_num, old) - 1;
        });

      case 'send message':
        arguments_are(arguments, is('send message'), is_plain_object);
        var msg = arguments[1];

        return reduce_eachs([], msg_funcs, function (acc, _ky, func) {
          try {
            var msg_copy = _copy_value_(msg);
            acc.push( apply_function(func, [msg_copy]));
          } catch (e) {
            ME('invalid');
            throw e;
          }

          return acc;
        });

      default:
        ME('invalid');
        throw new Error("Unknown action for state: " + to_string(action));
    } // === switch action
  } // === return function State;

} // === function Computer =====================================================

funcs.browser     = {};

funcs.browser.dom = {};

funcs.browser.dom.is_function_name=is_function_name;
/* jshint strict: true, undef: true */
/* globals spec, is_string, window, is_function */
/* globals exports */

exports.is_function_name = is_function_name;

spec(is_function_name, ['is_function'], true);
spec(is_function_name, ['none none'], false);
spec(is_function_name, [is_function_name], false);

function is_function_name(v) {

  if (!is_string(v))
    return false;

  return is_function(exports[v]);
}

funcs.browser.dom.show=show;
/* jshint strict: true, undef: true */
/* globals App, be, is_string, key_to_bool, is_boolean, $, spec_dom, spec */



spec('', function () { // show: shows element when key is true
  spec_dom().html('<div data-do="show is_factor" style="display: none;">Factor</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_factor: true});

  return spec_dom().find('div').attr('style');
});

spec('display: none;', function () { // does not alter element msg is missing key

  spec_dom().html('<div data-do="show is_pearl" style="display: none;">Pearl</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_factor: true});
  return spec_dom().find('div').attr('style');
});

function show(msg) {

  var dom_id = be(is_string, msg.dom_id);
  var key    = be(is_string, msg.args[0]);

  App('create message function', function _show_(msg) {
    var answer = key_to_bool(key, msg);
    if (is_boolean(answer) !== true)
      return;
    $('#' + dom_id).show();
    return 'show: ' + dom_id;
  });
}

funcs.browser.dom.dom_id=dom_id;
/* jshint strict: true, undef: true */
/* globals spec, spec_dom, $, _, is_empty, new_id */

spec('has id', function dom_id_adds_id_attr_to_element() {

  spec_dom().html('<div>has id</div>');
  var id = dom_id(spec_dom().find('div:first'));
  return $('#' + id).html();
});

spec('dom_id_does_not_override_original_id', function dom_id_does_not_override_original_id() {

  spec_dom().html('<div id="dom_id_does_not_override_original_id">override id</div>');
  return dom_id(spec_dom().find('div:first'));
});

// Returns id.
// Sets id of element if no id is set.
//
// .dom_id(raw_or_jquery)
// .dom_id('prefix', raw_or_jquer)
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

funcs.browser.dom.is_partial=is_partial;
/* jshint strict: true, undef: true */
/* jshint strict: true, undef: true */

function is_partial($) {
  return $('html').length === 0;
}


funcs.browser.dom.next_id=next_id;
/* jshint strict: true, undef: true */
/* globals spec, is_num, is_empty */


spec(false, function () { // next_id returns a different value than previous

  return next_id() === next_id();
});

function next_id() {

  if (!is_num(next_id.count))
    next_id.count = -1;
  next_id.count = next_id.count + 1;
  if (is_empty(arguments))
    return next_id.count;
  return arguments[0] + '_' + next_id.count;
}

funcs.browser.dom.show_hide=show_hide;
/* jshint strict: true, undef: true */
/* globals is_plain_object, be, $, spec_dom, spec, App, is_string, key_to_bool, is_boolean */




spec('', function _show_hide() { // === show_hide shows element if key = true

  spec_dom().html('<div data-do="show_hide is_ruby" style="display: none;">Ruby</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_ruby: true});
  return spec_dom().find('div').attr('style');
});

spec('display: none;', function _show_hide() { // === show_hide hides element if key = false

  spec_dom().html('<div data-do="show_hide is_ruby" style="">Perl</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_ruby: false});
  return spec_dom().find('div').attr('style');
});

function show_hide(msg) {

  var dom_id = be(is_string, msg.dom_id);
  var key    = be(is_string, msg.args[0]);

  App('create message function', function _show_hide_(msg) {
    if (!is_plain_object(msg))
      return;

    var answer = key_to_bool(key, msg);
    if (!is_boolean(answer))
      return;

    if (answer)
      return $('#' + dom_id).show();
    else
      return $('#' + dom_id).hide();
  });
}

funcs.browser.dom.node_array=node_array;
/* jshint strict: true, undef: true */
/* globals spec, _, $, dom_attrs, spec */



// it 'returns an Array when passed a String'
spec(node_array, ['<div id="111" show_if="happy?"><span></span></div>'], [
  {
    tag:   'DIV',
    attrs:  {id: '111', show_if: 'happy?'},
    custom: {},
    childs: [
      {tag: 'SPAN', attrs: {}, custom: {}, childs: []}
    ]
  }
]);

spec(['a', undefined, 'b'], function node_array_returns_raw_text_nodes() {

  var arr = node_array('<div><span>a<span></span>b</span></div>');
  return _.map(arr[0].childs[0].childs, 'nodeValue');
});

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

funcs.browser.dom.dom_attrs=dom_attrs;
/* jshint strict: true, undef: true */
/* globals arguments_are, spec, $, has_property_of, _ */

spec(dom_attrs, [$('<div id="000" img=".png"></div>')[0]], {id: "000", img: ".png"});
spec(dom_attrs, [$('<div class="is_happy"></div>')[0]], {"class": 'is_happy'});

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

funcs.browser.dom.html_escape=html_escape;
/* jshint strict: true, undef: true */
/* globals spec, _ */



spec(html_escape, ['<p>{{a}}</p>'], '&lt;p&gt;&#123;&#123;a&#125;&#125;&lt;/p&gt;');

function html_escape(str) {

  return _.escape(str).replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
}

funcs.browser.dom.is_$=is_$;
/* jshint strict: true, undef: true */

function is_$(v) {
  return v && typeof v.html === 'function' && typeof v.attr === 'function';
}

funcs.browser.dom.new_id=new_id;
/* jshint strict: true, undef: true */



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

funcs.browser.dom.top_descendents=top_descendents;
/* jshint strict: true, undef: true */
/* globals spec, spec_dom, _, next_id, $ */



spec('top_descendents_returns_self_if_selector_matches', function top_descendents_returns_self_if_selector_matches() {

  spec_dom().html('<div id="top_descendents_returns_self_if_selector_matches" template="num"></div>');
  return top_descendents(spec_dom().children(), '*[template]')[0].attr('id');
});

spec(['SPAN', 'SPAN'], function () { // it 'returns first children matching selector'

  spec_dom().html('<div><span class="top"></span><span class="top"></span></div>');
  return _.map(
    top_descendents(spec_dom().children(), '.top'),
    function (n) { return n[0].tagName; }
  );
});


spec([['DIV', 'top_descendents_1']], function () { // does not return nested matching descendants if ancestor matches selector'

  var id = next_id();
  spec_dom().html(
    '<div><div id="top_descendents_1" class="top"><span class="top"></span><span class="top"></span></div><div>'
  );
  return _.map(
    top_descendents(spec_dom().children(), '.top'),
    function (n) { return [n[0].tagName, n.attr('id')]; }
  );
});

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

funcs.browser.dom.remove_attr=remove_attr;
/* jshint strict: true, undef: true */
/* globals spec, spec_dom, _, $ */




// it 'returns value of the attribute'
spec('one', function remove_attr_returns_value_of_the_attribute() {

  spec_dom().html('<div show_if="one"></div>');
  return remove_attr(spec_dom().find('div:first'), 'show_if');
});

// it 'removes attribute from node'
spec({id: 'remove_attr_1'}, function remove_attr_removes_attribute_from_node() {

  spec_dom().html('<div id="remove_attr_1" show_if="one"></div>');
  remove_attr(spec_dom().find('div:first'), 'show_if');
  return _.reduce(
    spec_dom().find('div:first')[0].attributes,
    function (a, v) { a[v.name] = v.value; return a; },
    {}
  );
});

function remove_attr(node, name) {

  var val = $(node).attr(name);
  $(node).removeAttr(name);
  return val;
}

funcs.browser.dom.is_dev=is_dev;
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

funcs.browser.dom.hide=hide;
/* jshint strict: true, undef: true */
/* globals App, is_string, key_to_bool, is_string, $, spec_dom, spec, be */


spec('display: none;', function () { // hide: hides element when key is true

  spec_dom().html('<div data-do="hide is_factor">Factor</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_factor: true});
  return spec_dom().find('div').attr('style');
});

spec('', function () { // does not alter element if msg has missing key

  spec_dom().html('<div data-do="hide is_dog" style="">Dog</div>');
  App('send message', {'dom-change': true});
  App('send message', {is_cat: true});
  return spec_dom().find('div').attr('style');
});

function hide(msg) {

  var dom_id = be(is_string, msg.dom_id);
  var key    = be(is_string, msg.args[0]);
  App('create message function', function _hide_(msg) {
    if (key_to_bool(key, msg) !== true)
      return;
    $('#' + dom_id).hide();
    return 'hide: ' + msg.dom_id;
  });
}

funcs.browser.dom.to_$=to_$;
/* jshint strict: true, undef: true */
/* globals $ */


function to_$(x) {
  return $(x);
}

funcs.browser.dom.outer_html=outer_html;
/* jshint strict: true, undef: true */
/* globals $ */


function outer_html(raw) {

  return raw.map(function () {
    return $(this).prop('outerHTML');
  }).toArray().join('');
}

funcs.browser.dom.html_unescape=html_unescape;
/* jshint strict: true, undef: true */
/* globals spec, spec, to_value, html_escape, DOMParser */


spec(html_unescape, ["&lt;p&gt;&#123;&#123;1&#125;&#125;&lt;/p&gt;"], '<p>{{1}}</p>');

spec('<p>{{1}}</p>', function html_unescape_multiple_times() {

  return to_value(
    '<p>{{1}}</p>',
    html_escape, html_escape, html_escape,
    html_unescape, html_unescape, html_unescape
  );
});

function html_unescape(raw) {

  // From: http://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
  return (new DOMParser().parseFromString(raw, "text/html"))
  .documentElement
  .textContent;
}

funcs.browser.data_do = {};

funcs.browser.data_do.on_click=on_click;
/* jshint strict: true, undef: true */
/* globals msg_match, has_length, is_string, be, is_array, and, window, is_function, $ */

/*
   <button data-do="on_click my_func">Click Me</button>
   --> my_func({dom_id: dom_id});
*/
function on_click(msg) {

  if (!msg_match({dom_id: is_string, args: and(is_array, has_length(1))}, msg))
    return;

  var dom_id = msg.dom_id;
  var func   = describe_reduce(
    "Getting function for on_click",
    window[msg.args[0]],
    be(is_function)
  );

  if (!on_click.processed)
    on_click.processed = {};

  if (on_click.processed[dom_id])
    throw new Error('#' + dom_id + ' already processed by on_click');

  on_click.processed[dom_id] = true;

  $('#' + msg.dom_id).on("click", function (e) {
    e.stopPropagation();
    func({dom_id: dom_id});
  });
} // === function

funcs.browser.data_do.name_to_function=name_to_function;
/* jshint browser: true, strict: true, undef: true */
/* globals spec, is_string, to_string, _ */


spec(name_to_function, ["$"], $);

exports.name_to_function = name_to_function;
function name_to_function(raw) {

  /* globals window, global */
/* globals exports */
  if (!is_string(raw))
    throw new Error('Not a string: ' + to_string(raw));
  var str = _.trim(raw);
  var func = window[str];
  if (typeof func !== 'function')
    throw new Error('Function not found: ' + to_string(raw));
  return (typeof 'window' !== 'undefined') ? window[str] : global[str];
}

funcs.browser.data_do.template=template;
/* jshint strict: true, undef: true */
/* globals App, html_escape, to_function, dot, map_x, to_$, $, msg_match, key_to_bool, be */
/* globals is_string, eachs, html_unescape, Mustache, dom_id */
/* globals spec, spec_dom, _, describe_reduce, is_plain_object, is_array */

spec(['SCRIPT', 'SPAN', 'P'], function template_replaces_elements_by_default() {
  spec_dom().html(
    '<script type="application/template" data-do="template is_text">' +
      html_escape('<span>{{a1}}</span>') +
      html_escape('<p>{{a2}}</p>') +
        '</script>'
  );

  App('send message', {'dom-change': true});
  App('send message', {is_text: true, data: {a1: '1', a2: '2'}});
  App('send message', {is_text: true, data: {a1: '3', a2: '4'}});
  return _.map(spec_dom().children(), dot('tagName'));
});

spec(['SCRIPT','P','DIV'], function template_renders_elements_below_by_default() {
  spec_dom().html(
    '<script type="application/template" data-do="template is_text replace">' +
      html_escape('<p>one</p>') +
      html_escape('<div>two</div>') +
        '</script>'
  );

  App('send message', {'dom-change': true});
  App('send message', {is_text: true});
  return _.map(spec_dom().children(), dot('tagName'));
});

spec('123', function template_renders_nested_vars() {
  spec_dom().html(
    '<script type="application/template" data-do="template is_text replace">'+
      html_escape('<p>{{a}}</p>') +
      html_escape('<p>{{b}}</p>') +

      html_escape('<script type="application/template" data-do="template is_val replace">') +
        html_escape(html_escape('<p>{{c}}</p>')) +
      html_escape('</script>') +
    '</script>'
  );
  App('send message', {'dom-change': true});
  App('send message', {is_text: true, data: {a: 1, b: 2}});
  App('send message', {is_val: true, data: {c:'3'}});

  return map_x(spec_dom().find('p'), to_function(to_$, dot('html()'))).join('');
});

spec(['P', 'P', 'SCRIPT'], function template_renders_above() {
  spec_dom().html(
    '<script type="application/template" data-do="template is_text above">'+
      html_escape('<p>{{a}}</p>') + html_escape('<p>{{b}}</p>') +
    '</script>'
  );
  App('send message', {'dom-change': true});
  App('send message', {is_text: true, data: {a: 4, b: 5}});
  return map_x(spec_dom().children(), dot('tagName'));
});

spec(['SCRIPT', 'SPAN', 'P'], function template_renders_below() {
  spec_dom().html(
    '<script type="application/template" data-do="template is_text bottom">'+
      html_escape('<span>{{a}}</span>') + html_escape('<p>{{b}}</p>') +
    '</script>'
  );
  App('send message', {'dom-change': true});
  App('send message', {is_text: true, data: {a: 6, b: 7}});
  return map_x(spec_dom().children(), dot('tagName'));
});

spec('none', function template_renders_dum_functionality() {
  spec_dom().html(
    '<script type="application/template" data-do="template render_template replace">' +
      html_escape('<div><span id="template_1" data-do="hide is_num">{{num.word}}</span></div>') +
      '</script>'
  );
  App('send message', {'dom-change': true});
  App('send message', {render_template: true});
  App('send message', {is_num: true, data: {num: {word: 'one'}}});
  return $('#template_1').css('display');
});

function template(msg) {
  if (!msg_match({dom_id: is_string}, msg))
    return;

  var key = describe_reduce(
    "Getting first arg for template key: ",
    msg.args[0],
    be(is_string)
  );

  var pos = describe_reduce(
    "Getting position for template: ",
    msg.args[1],
    to_default('replace'),
    be(is_string)
  );

  var t        = $('#' + msg.dom_id);
  var raw_html = t.html();
  var id       = msg.dom_id;

  function _template_(future_msg) {
    if (key_to_bool(key, future_msg) !== true)
      return;

    var me = _template_;

    // === Init state:
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

    var decoded_html = html_unescape(raw_html);
    var compiled = $(Mustache.render(decoded_html, future_msg.data || {}));
    var new_ids = _.map(compiled, function (x) { return dom_id($(x)); });

    if (pos === 'replace' || pos === 'bottom')
      compiled.insertAfter($('#' + id));
    else
      compiled.insertBefore($('#' + id));

    me.elements[id] = ([]).concat(me.elements[id]).concat( new_ids );

    App('send message', {'dom-change': true});
    return new_ids;
  }

  App('create message function', _template_);
} // ==== funcs: template ==========



funcs.browser.data_do.is_localhost=is_localhost;
/* jshint strict: true, undef: true */
/* globals spec, window */


spec(is_localhost, [], window.location.href.indexOf('/specs') > 0);


function is_localhost() {

  var addr = window.location.href;

  return window.console && (addr.indexOf("localhost") > -1 ||
    addr.indexOf("file:///") > -1 ||
    addr.indexOf("127.0.0.1") > -1)
  ;

} // === func

funcs.browser.data_do.submit_form=submit_form;
/* jshint strict: true, undef: true */
/* globals msg_match, is_string, $, dom_id, alite, formToObj, is_plain_object, log, is_blank_string */
/* globals App */

/*
   <button onclick="return false;" data-do="on_click submit_form">
     Submit
   </button>
*/
function submit_form(msg) {

  if (!msg_match({dom_id: is_string}, msg))
    return;

  var form = $('#' + msg.dom_id).closest('form');
  var raw_form = form[0];

  if (!raw_form)
    return;

  var form_dom_id = dom_id(form);

  // the form_id
  // the form as a data structure
  // Create callback for response
  //   -- standardize response
  //   -- send to Computer/App
  // Send to ajax w/callback
  alite({url: form.attr('action'), method: 'POST', data: formToObj(raw_form)}).then(
    function (result) {
      // At this point, we don't know if it's success or err:
      var data = {
        ajax_response : true,
        result: result,
        data: result.data || {}
      };

      // === If err:
      if (!is_plain_object(result) || !result.ok) {
        data.msg = result.msg || "Computer error. Try again later.";
        data['err_' + form_dom_id] = true;
        App('send message', data);
        return;
      }

      // === else success:
      data['ok_' + form_dom_id] = true;
      App('send message', data);
    }
  ).catch(
    function (err) {
      log(err);
      var data = { ajax_err : true };
      if (is_string(err)) {
        if (is_blank_string(err))
          data.msg = "Network error.";
        else
          data.msg = err;
      }
      data['err_' + form_dom_id] = true;
      App('send message', data);
    }
  );
} // === function submit_form
/* jshint strict: true, undef: true */
/* globals spec, spec_dom, html_escape, App, wait_max, $, msg_match, length */
/* globals eachs, split_on, is_empty, to_string, name_to_function, apply_function, dom_id */

// ==== Integration tests =====================================================
// ============================================================================
spec('yo mo', function button_submit(fin) {
  spec_dom().html(
    '<form id="the_form" action="/repeat">' +
      '<script type="application/template" data-do="template ok_the_form replace">' +
        html_escape('<div>{{val1}} {{val2}}</div>') +
          '</script><button onclick="return false;" data-do="on_click submit_form">Submit</button>' +
            '<input type="hidden" name="val1" value="yo" />' +
            '<input type="hidden" name="val2" value="mo" />' +
            '</form>'
  );
  App('send message', {'dom-change': true});
  spec_dom().find('button').click();
  wait_max(1.5, function () {
    var html = spec_dom().find('div').html();
    if (!html)
      return false;
    fin(html);
    return true;
  });
});

// === Adds functionality:
//     <div data-do="my_func arg1 arg2">content</div>
App('create message function', function process_data_dos(msg) {
  var WHITESPACE = /\s+/g;
  // The other functions
  // may alter the DOM. So to prevent unprocessed DOM
  // or infinit loops, we process one element, then call the function
  // over until no other unprocessed elements are found.

  if (!msg_match({'dom-change': true}, msg))
    return;

  var selector = '*[data-do]:not(*[data-do_done~="yes"])';
  var elements = $('*[data-do]:not(*[data-do_done~="yes"]):first');

  if (length(elements) === 0)
    return;

  var raw_e = elements[0];

  $(raw_e).attr('data-do_done', 'yes');
  eachs(split_on(';', $(raw_e).attr('data-do')), function (_i, raw_cmd) {

    var args = split_on(WHITESPACE, raw_cmd);

    if (is_empty(args))
      throw new Error("Invalid command: " + to_string(raw_cmd));

    var func_name   = args.shift();
    var func        = name_to_function(func_name);

    apply_function(
      func, [{
        on_dom : true,
        dom_id : dom_id($(raw_e)),
        args : args.slice(0)
      }]
    );
    return;

  });

  process_data_dos(msg);

  return true;
}); // === App create message function process_data_dos ==========================================







  return funcs;
})(); // Scope_Dum_Dum_Boom_Boom
