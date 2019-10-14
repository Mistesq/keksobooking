'use strict';
(function() {

  var getFeatures = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + arr[i];
      fragment.appendChild(li);
    }
    return fragment;
  };

  var getPhotos = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var img = document.createElement('img');
      img.className = 'popup__photo';
      img.src = arr[i];
      img.alt = 'Фотография жилья';
      img.width = 45;
      img.height = 40;
      fragment.appendChild(img);
    }
    return fragment;
  };

  function getAds(advertisement) {
    var offer = advertisement.offer;
    var author = advertisement.author;

    // var sectionMap = document.querySelector('.map');
    var templateCard = document.querySelector('#card').content.querySelector('article');
    console.log(templateCard);

      var mapCardElement = templateCard.cloneNode(true);
      mapCardElement.querySelector('.popup__title').textContent = offer.title;
      mapCardElement.querySelector('.popup__text--address').textContent = offer.address;
      mapCardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
      mapCardElement.querySelector('.popup__type').textContent = offer.type;
      mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

      var featuresElement = mapCardElement.querySelector('.popup__features');
      featuresElement.innerHTML = '';
      featuresElement.appendChild(getFeatures(offer.features));

      mapCardElement.querySelector('.popup__description').textContent = offer.description;

      var photosElement = mapCardElement.querySelector('.popup__photos');
      photosElement.innerHTML = '';
      photosElement.appendChild(getPhotos(offer.photos));

      mapCardElement.querySelector('.popup__avatar').src = author.avatar;

      window.variables.sectionMap.appendChild(mapCardElement);
  }

  window.card = {
    getAds: getAds
  }
  
})();
