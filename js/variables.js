'use strict';
(function() {
  var ESC_BUTTON = 27;
  var pinMain = document.querySelector('.map__pin--main');
  var mapPinBox = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var formAdress = document.querySelector('#address');
  var mapPin = document.querySelectorAll('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var sectionMap = document.querySelector('.map');
  var formFieldset = form.querySelectorAll('fieldset');
  var main = document.querySelector('main');

  window.variables = {
    pinMain: pinMain,
    mapPinBox: mapPinBox,
    form: form,
    formAdress: formAdress,
    mapPin: mapPin,
    mapPinMain: mapPinMain,
    sectionMap: sectionMap,
    formFieldset: formFieldset,
    ESC_BUTTON: ESC_BUTTON,
    main: main
  };

})();
