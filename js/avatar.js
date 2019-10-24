'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBox = document.querySelector('.ad-form__photo-container');

  var MAX_PHOTO = 11;

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return avatarName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  photoChooser.addEventListener('change', function () {
    var photo = photoChooser.files[0];
    var photoName = photo.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return photoName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        if (photoBox.children.length < MAX_PHOTO) {
          var photoContainer = document.createElement('div');
          photoContainer.classList.add('ad-form__photo');
          var housePhoto = document.createElement('img');
          housePhoto.width = 70;
          housePhoto.height = 70;
          housePhoto.src = reader.result;

          photoBox.appendChild(photoContainer);
          photoContainer.appendChild(housePhoto);
        }
        else {
          photoBox.children[1].remove();
        }

      });

      reader.readAsDataURL(photo);
    }
  });

})();
