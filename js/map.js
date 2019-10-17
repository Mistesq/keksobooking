"use strict";
(function() {


  function initMap() {
    for (var i = 0; i < window.variables.formFieldset.length; i++) {
      window.variables.formFieldset[i].disabled = true;
    }
    console.log(window.variables.formFieldset);
    window.variables.formAdress.value = getAdress();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  function getAdress() {
    return Math.floor(window.variables.mapPinMain.offsetLeft + window.variables.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.variables.mapPinMain.offsetTop + window.variables.mapPinMain.offsetHeight / 2);
  }

  function startMap() {
    var mapPin = document.querySelectorAll('.map__pin');

    for (var i = 0; i < window.variables.formFieldset.length; i++) {
      window.variables.formFieldset[i].disabled = false;
    }
    window.variables.sectionMap.classList.remove('map--faded');
    window.variables.mapPinMain.removeEventListener('mouseup', startMap);

    window.variables.form.classList.remove('ad-form--disabled');

    var advertisements = window.backend.load(window.pin.renderPins, errorHandler);
    console.log(advertisements);
  }

  initMap();

  window.variables.mapPinMain.addEventListener('mouseup', startMap);

  function addAdsClickHandler(icon, advertisement) {
    icon.addEventListener('click', function () {
      if (window.variables.sectionMap.querySelector('.map__card') !== null) {
          window.utils.removeDomElement('.map__card');
        }
      window.card.getAds(advertisement);
    });
  };

  window.map = {
    addAdsClickHandler: addAdsClickHandler,
    getAdress: getAdress
  }
})();
