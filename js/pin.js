'use strict';
(function() {
  var COUNT_ADS = 8;

  function renderPins(pins) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COUNT_ADS; i++) {
      var mapPinElement = template.cloneNode(true);
      var author = pins[i].author;
      mapPinElement.querySelector('img').src = author.avatar;
      mapPinElement.style.left = pins[i].location.x + 'px';
      mapPinElement.style.top = pins[i].location.y + 'px';
      window.map.addAdsClickHandler(mapPinElement, pins[i]);
      fragment.appendChild(mapPinElement);

    }

    window.variables.mapPinBox.appendChild(fragment);
  }

  window.pin = {
    renderPins: renderPins
  };
})();
