import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RandomUser = function RandomUser(props) {
  var handleClick = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLiked(!liked);
              fetch('https://www.randomuser.me/api').then(function (res) {
                return res.json();
              }).then(function (data) {
                setUser(data.results[0]);
              }).catch(console.log);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function handleClick() {
      return _ref.apply(this, arguments);
    };
  }();

  // only run after mounting


  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      liked = _React$useState2[0],
      setLiked = _React$useState2[1];

  var _React$useState3 = React.useState({
    name: { first: '', last: '', title: '' },
    email: '',
    picture: ''
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      user = _React$useState4[0],
      setUser = _React$useState4[1];

  React.useEffect(function () {
    handleClick();
  }, []);

  // only run after unmounting
  React.useEffect(function () {
    return function () {
      console.log('Bye!');
    };
  }, []);

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleClick },
      'Get Data'
    ),
    React.createElement('br', null),
    React.createElement('img', { src: user.picture.large, alt: '{user.name.first} {user.name.last}' }),
    React.createElement(
      'h1',
      null,
      user.name.title,
      ' ',
      user.name.first,
      ' ',
      user.name.last
    ),
    React.createElement(
      'h3',
      null,
      'Email: ',
      user.email
    )
  );
};
ReactDOM.render(React.createElement(RandomUser, null), document.querySelector('#random-user'));