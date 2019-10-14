'use strict';
(function() {
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

})();
