'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.userDialog.querySelector('.setup-close');
  var userNameForm = window.userDialog.querySelector('.setup-user-name');
  var isFocused = false;

  function onPopupEscPress(evt) {
    if (!isFocused) {
      window.util.isEscEvent(evt, closePopup);
    }
  }

  function openPopup() {
    window.userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    window.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  userNameForm.addEventListener('focus', function () {
    isFocused = true;
  });

  userNameForm.addEventListener('blur', function () {
    isFocused = false;
  });

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Перетаскивание окна

  var dialogHandler = window.userDialog.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
      window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
