'use strict';
(function() {
  var pinMain = document.querySelector('.map__pin--main');
  var mapPinBox = document.querySelector('.map__pins');
  var form = document.querySelector('.notice__form');
  var formAdress = form.querySelector('#address');
  var mapPin = document.querySelectorAll('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var sectionMap = document.querySelector('.map');


  window.variables = {
    pinMain: pinMain,
    mapPinBox: mapPinBox,
    form: form,
    formAdress: formAdress,
    mapPin: mapPin,
    mapPinMain: mapPinMain,
    sectionMap: sectionMap,
  };

})();
