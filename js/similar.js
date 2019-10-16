'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var coatColor = getRandomItem(COAT_COLORS);
  var eyesColor = getRandomItem(EYES_COLORS);
  var wizards = [];

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function sortWizards(left, right) {
    var rightWizardRank = getRank(right);
    var leftWizardRank = getRank(left);
    var rankDiff = rightWizardRank - leftWizardRank;
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }

  function updateWizards() {
    var newWizardsArray = wizards.slice();
    var sortedWizardsArray = newWizardsArray.sort(sortWizards);
    window.render(sortedWizardsArray);
  }

  window.wizard = {
    onEyesChange: function (color) {
      eyesColor = color;
      window.debounce(updateWizards);
    },
    onCoatChange: function (color) {
      coatColor = color;
      window.debounce(updateWizards);
    }
  };

  function successHandler(data) {
    wizards = data;
    updateWizards();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(successHandler, errorHandler);

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
    var newRandomColor = getRandomItem(colorsArray);
    if (attr === wizardFireball) {
      attr.style.backgroundColor = newRandomColor;
    } else {
      attr.style.fill = newRandomColor;
    }
    return newRandomColor;
  }

  wizardCoat.addEventListener('click', function () {
    coatColor = changeColor(wizardCoat, COAT_COLORS);
    updateWizards();
  });

  wizardEyes.addEventListener('click', function () {
    eyesColor = changeColor(wizardEyes, EYES_COLORS);
    updateWizards();
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
