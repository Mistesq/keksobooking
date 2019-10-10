"use strict";

var COUNT_ADS = 8;
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



function renderPins (pins) {
  var mapPin = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var mapPinElement = template.cloneNode(true);
    var author = pins[i].author;
    mapPinElement.querySelector('img').src = author.avatar;
    mapPinElement.style.left = pins[i].location.x + 'px';
    mapPinElement.style.top = pins[i].location.y + 'px';
    addAdsClickHandler(mapPinElement, pins[i]);
    fragment.appendChild(mapPinElement);

  }

  mapPin.appendChild(fragment);
}

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

  var mapCardPlace = document.querySelector('.map');
  console.log(mapCardPlace);
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

    mapCardPlace.appendChild(mapCardElement);
}

function initMap() {
  var advertisements = generateAds();
  var randomNumberArray = getRandomNumber(0, advertisements.length - 1);


  console.log(advertisements);
  renderPins(advertisements);
  getAdress();

  var mapPin = document.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].classList.add('hidden');
  }

  var mapButton = document.querySelector('.map__pin--main');
  mapButton.classList.remove('hidden');
}


function getAdress() {
  var form = document.querySelector('.notice__form');
  var formAdress = form.querySelector('#address');

  console.log(formAdress);
  formAdress.value = DEFAULT_X  + ', ' + DEFAULT_Y;
}

function startMap() {
  var sectionMap = document.querySelector('.map');
  sectionMap.classList.remove('map--faded');
  mapButton.removeEventListener('mouseup', startMap);

  var form = document.querySelector('.notice__form');
  form.classList.remove('notice__form--disabled');

  var mapPin = document.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].classList.remove('hidden');
  }
}

initMap();

var mapButton = document.querySelector('.map__pin--main');
mapButton.addEventListener('mouseup', startMap);

function addAdsClickHandler(icon, advertisement) {
  icon.addEventListener('click', function () {
    getAds(advertisement);
  });
};


//работа с формой

var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var timeinInput = document.querySelector('#timein');
var timeoutInput = document.querySelector('#timeout');
var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var submitButton = document.querySelector('.form__submit');

function changeMinPrice() {
  var price;

  if (typeInput.value === "bungalo") {
    price = 0;
  }
  else if (typeInput.value === "flat") {
    price = 1000;
  }
  else if (typeInput.value === "house") {
    price = 5000;
  }
  else if (typeInput.value === "palace") {
    price = 10000;
  }

  if (priceInput.value < price) {
    priceInput.setCustomValidity('минимальная стоимость для выбранного типа жилья ' + price);
  }
  else {
    priceInput.setCustomValidity('');
  }

  priceInput.min = priceInput.placeholder = price;
}

typeInput.addEventListener('change', function() {
  changeMinPrice();
})

function checkTimeSyncHandler(evt) {

  var time = evt.target.value;

  if (timeinInput.value === time) {
    timeoutInput.value = time;
  } else if (timeoutInput.value === time) {
    timeinInput.value = time;
  }
};

timeinInput.addEventListener('change', checkTimeSyncHandler);
timeoutInput.addEventListener('change', checkTimeSyncHandler);


roomNumberInput.addEventListener('change', validateRoom)

capacityInput.addEventListener('change', validateRoom)

submitButton.addEventListener('click', validateRoom)

function validateRoom() {
    if (roomNumberInput.value !== '100') {
      if (capacityInput.value > roomNumberInput.value) {
        capacityInput.setCustomValidity('Комнат не может быть меньше, чем гостей.')
      }
      else {
        capacityInput.setCustomValidity('');
      }
  } else {
      capacityInput.setCustomValidity('Этот вариант не для гостей.')
    }
}
