'use strict';
(function() {

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
