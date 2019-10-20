'use strict';
(function() {
  var form = document.querySelector('.ad-form');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var submitButton = document.querySelector('.ad-form__submit');

  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  function changeMinPrice() {
    var price;

      if (typeInput.value === 'bungalo') {
        price = Price.BUNGALO;
      } else if (typeInput.value === 'flat') {
        price = Price.FLAT;
      } else if (typeInput.value === 'house') {
        price = Price.HOUSE;
      } else if (typeInput.value === 'palace') {
        price = Price.PALACE;
      }

      if (priceInput.value <= price) {
        priceInput.setCustomValidity('минимальная стоимость для выбранного типа жилья ' + price);
      } else {
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

  function uploadSuccess() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    window.variables.main.appendChild(successMessage);

    document.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.variables.ESC_BUTTON) {
        closeSuccessMessage();
      }
    });
  };

  function closeSuccessMessage() {
  var successMessage = document.querySelector('.success');

  if (successMessage) {
    window.variables.main.removeChild(successMessage);

    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', closeSuccessMessage);

    form.reset();
  }
};

  function uploadError() {
   var errorTemplate = document.querySelector('#error').content.querySelector('.error');
   var errorMessage = errorTemplate.cloneNode(true);
   var errorButton = errorMessage.querySelector('.error__button');

   window.variables.main.appendChild(errorMessage);

   errorButton.addEventListener('click', closeErrorMessage);
   document.addEventListener('keydown', function (evt) {
     if (evt.keyCode === window.variables.ESC_BUTTON) {
       closeErrorMessage();
     }
   });
 };

 var closeErrorMessage = function () {
   var ErrorMessage = document.querySelector('.error');
   var errorButton = document.querySelector('.error__button');

   if (ErrorMessage) {
     window.variables.main.removeChild(ErrorMessage);

     errorButton.removeEventListener('click', closeErrorMessage);
     document.removeEventListener('keydown', closeErrorMessage);

     form.reset();
   }
 };

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), uploadSuccess, uploadError);
  });

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

  roomNumberInput.addEventListener('change', validateRoom);
  capacityInput.addEventListener('change', validateRoom);
  submitButton.addEventListener('click', validateRoom);
})();
