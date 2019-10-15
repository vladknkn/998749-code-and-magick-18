'use strict';

(function () {
  window.userDialog = document.querySelector('.setup');

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

  window.render = function (wizardsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizardsArray[i]));
    }
    similarListElement.appendChild(fragment);
    window.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

})();
