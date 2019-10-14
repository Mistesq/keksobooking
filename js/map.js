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
var MAP_PIN_X_MIN = 35;
var MAP_PIN_X_MAX = 1175;
var MAP_PIN_Y_MIN = 130;
var MAP_PIN_Y_MAX = 630;

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


function initMap() {
  var advertisements = window.data.generateAds();
  var randomNumberArray = getRandomNumber(0, advertisements.length - 1);

  console.log(advertisements);
  window.pin.renderPins(advertisements);
  window.variables.formAdress.value = getAdress();

  var mapPin = document.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].classList.add('hidden');
  }

  window.variables.mapPinMain.classList.remove('hidden');
}

function getAdress() {
  return Math.floor(window.variables.mapPinMain.offsetLeft + window.variables.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.variables.mapPinMain.offsetTop + window.variables.mapPinMain.offsetHeight / 2);
}

function startMap() {
  var mapPin = document.querySelectorAll('.map__pin');

  window.variables.sectionMap.classList.remove('map--faded');
  window.variables.mapPinMain.removeEventListener('mouseup', startMap);

  window.variables.form.classList.remove('notice__form--disabled');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].classList.remove('hidden');
  }
}

initMap();

window.variables.mapPinMain.addEventListener('mouseup', startMap);

function addAdsClickHandler(icon, advertisement) {
  icon.addEventListener('click', function () {
    window.card.getAds(advertisement);
  });
};
