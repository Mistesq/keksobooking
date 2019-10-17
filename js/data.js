'use strict';
(function() {

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_GUEST = 1;
  var MAX_GUEST = 15;

  var DEFAULT_Y = 375;
  var DEFAULT_X = 600;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = 1200;

  var TITLE_ADS = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPE_OF_ROOMS = [
    'Дворец',
    'Квартира',
    'Дом',
    'Бунгало'
  ];

  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var ADVANTAGES = [
    'wifi',
    'dishwasher',
    'parking',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  function generateAds() {
    var ads = [];
    var titleAds = shuffleArray(TITLE_ADS);

    for (var i = 0; i < COUNT_ADS; i++) {
      var locationX = getRandomNumber(MIN_X, MAX_X);
      var locationY = getRandomNumber(MIN_Y, MAX_Y);

      ads.push({
          'author': {
            'avatar': 'img/avatars/user' + ('0' + (i + 1)) + '.png',
          },
          'offer': {
            'title': titleAds[i],
            'address': (locationX + ', ' + locationY),
            'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
            'type': getRandomElement(TYPE_OF_ROOMS),
            'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
            'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
            'checkin': getRandomElement(TIMES),
            'checkout': getRandomElement(TIMES),
            'features': getArrayLength(ADVANTAGES),
            'description': '',
            'photos': shuffleArray(PHOTOS) // один и тот же порядок получается в каждом объявлении
          },
          'location': {
            'x': locationX,
            'y': locationY
          }
        });
      }
    return ads;
  };

  window.data = {
    generateAds: generateAds
  };

})();
