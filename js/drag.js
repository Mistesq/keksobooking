'use strict';
(function() {

  var MapPin = {
    X_MIN: 35,
    X_MAX: 1175,
    Y_MIN: 130,
    Y_MAX: 630
  }


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

      if (mapPinMainY >= MapPin.Y_MIN && mapPinMainY <= MapPin.Y_MAX) {
      window.variables.mapPinMain.style.top = mapPinMainY + 'px';
      }

      if (mapPinMainX >= MapPin.X_MIN && mapPinMainX <= MapPin.X_MAX) {
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
