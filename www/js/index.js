var iframe = frames[0];

var websiteOrigin = 'http://10.0.2.2:5000';
websiteOrigin = 'https://offline-demo.geoportail.lu'; // offline demo
// FIXME: need to find a way to have 1 app for local dev, 1 for demo, 1 for prod.

document.getElementById('website').src = websiteOrigin + '?cordova&debug';

window.addEventListener('message', receiveMessage, false);

// FIXME: check source / origin

function receiveMessage(event) {
  var action = event.data;
  var origin = event.origin;
  if (origin !== websiteOrigin) {
    postError('Unknown origin ' + origin + ', expecting ' + websiteOrigin, action);
    return;
  }
  if (action.plugin === 'localforage') {
    handleLocalForageAction(action);
  } else {
    postError('Unknown action' + action.command, action);
  }
}

/**
 * @param {*} array .
 * @return {Array<*>} array .
 */
function cloneArray(array) {
  return Array.prototype.slice.call(array);
}

var localForagePromise = localforage.defineDriver(window.cordovaSQLiteDriver).then(function() {
  return localforage.setDriver([
    window.cordovaSQLiteDriver._driver,
  ]);
});

var LOCALFORAGE_COMMANDS = ['getItem', 'setItem', 'removeItem', 'clear', 'length', 'key', 'keys', 'iterate', 'config'];
function handleLocalForageAction(action) {
  var command = action.command;
  var args = action.args;
  if (LOCALFORAGE_COMMANDS.indexOf(command) === -1) {
    postError('Unknown localforage command ', action);
    return;
  }
  localForagePromise.then(function() {
    var result = localforage[command].apply(localforage, args);
    if (result.then) {
      result.then(
        function() {
          postResponse(cloneArray(arguments), action);
        },
        function() {
          postError({
            msg: 'Could not execute command ' + command,
            args: cloneArray(arguments)
          },
          action);
        }
      );
    } else {
      postResponse([], action);
    }
  }, function() {
    postError({
      msg: 'Localforage was not ready to do ' + command,
      args: cloneArray(arguments)
    },
    action);
  });
}

function postResponse(args, context) {
  iframe.postMessage({
    id: context.id,
    command: 'response',
    args: args,
    context: context
  }, '*');
}

function postError(error, context) {
  iframe.postMessage({
    id: context.id,
    command: 'error',
    error: error,
    context: context
  }, '*');
}
