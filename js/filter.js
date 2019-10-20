
'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var DEBOUNCE_INTERVAL = 500;

  var mapFilter = document.querySelector('.map__filters-container');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('.map__features input');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var selectType = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  var selectPrice = function (ad) {
    var value = housingPrice.value;
    switch (value) {
      case 'low': return ad.offer.price < LOW_PRICE;
      case 'middle': return ad.offer.price > LOW_PRICE && ad.offer.price < HIGH_PRICE;
      case 'high': return ad.offer.price > HIGH_PRICE;
      default: return true;
    }
  };

  var selectRooms = function (ad) {
    return housingRooms.value === 'any' || ad.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var selectGuests = function (ad) {
    if (housingGuests.value !== 'any') {
      return ad.offer.guests === parseInt(housingGuests.value, 10);
    }

    return true;
  };

  var selectFeatures = function (ad) {

    var checkedFeatures = Array.from(features).filter(function (feature) {
      return feature.checked;
    });

    var isCheckedItem = function (element) {
      return ad.offer.features.indexOf(element.value) === -1;
    };

    return checkedFeatures.every(isCheckedItem);
  };

  var onFilterChange = function () {
    window.utils.removePins();

    var filteredAds = window.map.originalAds.filter(function (ad) {
      return (
        selectType(ad) &&
        selectPrice(ad) &&
        selectRooms(ad) &&
        selectGuests(ad) &&
        selectFeatures(ad)
      );
    });

    window.pin.renderPins(filteredAds);
  };

  mapFilter.addEventListener('change', debounce(onFilterChange));
})();
