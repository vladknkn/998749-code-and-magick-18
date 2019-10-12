'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  window.userDialog = document.querySelector('.setup');

  // Отрисовка волшебников

  var similarListElement = window.userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    document.querySelector('.setup-fireball-wrap').style.backgroundColor = wizard.colorFireball;

    return wizardElement;
  }

  function loadHandler(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(loadHandler, errorHandler);

  // Кастомизация волшебников

  var wizardSetup = document.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var form = window.userDialog.querySelector('.setup-wizard-form');

  function getRandomItem(itemsArr, isDeleted) {
    var arrIndex = Math.floor(Math.random() * itemsArr.length);
    var randomValue = itemsArr[arrIndex];
    if (isDeleted) {
      itemsArr.splice(arrIndex, 1);
    }
    return randomValue;
  }

  function changeColor(attr, colorsArray) {
    if (attr === wizardFireball) {
      attr.style.backgroundColor = getRandomItem(colorsArray);
    } else {
      attr.style.fill = getRandomItem(colorsArray);
    }
  }

  wizardCoat.addEventListener('click', function () {
    changeColor(wizardCoat, COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function () {
    changeColor(wizardEyes, EYES_COLORS);
  });

  wizardFireball.addEventListener('click', function () {
    changeColor(wizardFireball, FIREBALL_COLORS);
  });

  function saveHandler() {
    window.userDialog.classList.add('hidden');
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), saveHandler, errorHandler);
  });

})();
