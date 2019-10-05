'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Отрисовка волшебников

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getGeneratedWizard(names, surnames, coatColors, eyesColors) {
  return {
    name: names[Math.floor(Math.random() * 8)] + ' ' + surnames[Math.floor(Math.random() * 8)],
    coatColor: coatColors[Math.floor(Math.random() * 6)],
    eyesColor: eyesColors[Math.floor(Math.random() * 5)]
  };
}

var wizards = [];

for (var i = 0; i < 4; i++) {
  var newWizard = getGeneratedWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);
  wizards.push(newWizard);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


// События окна

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameForm = userDialog.querySelector('.setup-user-name');
var isFocused = false;

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && !isFocused) {
    closePopup();
  }
}

function openPopup() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  userDialog.classList.add('hidden');
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
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// События внешнего вида волшебника

var wizardSetup = document.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

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
