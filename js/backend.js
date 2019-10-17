'use strict';
(function() {
  var uploadURL = 'https://js.dump.academy/keksobooking/';
  var loadURL = 'https://js.dump.academy/keksobooking/data';

  function xhrRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    return xhr;
  };

  function upload(data, onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('POST', uploadURL);
    xhr.send(data);
  };

  function load (onLoad, onError) {

    var xhr = xhrRequest(onLoad, onError);

    xhr.open('GET', loadURL);
    xhr.send();
  };

  window.backend = {
   upload: upload,
   load: load
 };
})();
