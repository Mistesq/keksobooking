'use strict';
(function () {
  function setAvailabilityForm(thatChange, state) {
    thatChange.forEach(function (item) {
      thatChange[item].disabled = state;
    });
  };

  function removeDomElement(element) {
    window.variables.sectionMap.querySelector(element).remove();
  };

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    for (var i = 0; i < array.length; i++) {
      var randomIndex = Math.floor(Math.random() * array.length);
    }
    var randomElement = array[randomIndex];
    return randomElement;
  }

  // массив произвольной длины
  function getArrayLength(array) {
    var clone = array.slice();
    clone.length = getRandomNumber(1, array.length);
    return clone;
  }

  var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var tempValue = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.utils = {
    setAvailabilityForm: setAvailabilityForm,
    removeDomElement: removeDomElement,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getArrayLength: getArrayLength,
    shuffleArray: shuffleArray,
    removePins: removePins
  };

})();
