'use strict';
(function() {

  var MAP_PIN_X_MIN = 35;
  var MAP_PIN_X_MAX = 1175;
  var MAP_PIN_Y_MIN = 130;
  var MAP_PIN_Y_MAX = 630;

  window.variables.mapPinMain.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainY = window.variables.mapPinMain.offsetTop - shift.y;
      var mapPinMainX = window.variables.mapPinMain.offsetLeft - shift.x;

      if (mapPinMainY >= MAP_PIN_Y_MIN && mapPinMainY <= MAP_PIN_Y_MAX) {
      window.variables.mapPinMain.style.top = mapPinMainY + 'px';
      }

      if (mapPinMainX >= MAP_PIN_X_MIN && mapPinMainX <= MAP_PIN_X_MAX) {
        window.variables.mapPinMain.style.left = mapPinMainX + 'px';
      }
    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      window.variables.formAdress.value = window.map.getAdress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
