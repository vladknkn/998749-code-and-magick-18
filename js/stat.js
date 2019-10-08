'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var BAR_WIDTH = 40;
  var BAR_X_GAP = 50;
  var BAR_Y_GAP = 90 + 150;
  var MAX_BAR_HEIGHT = 150;

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function getMaxElement(arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }

  function getHistogrammColor(name) {
    if (name === 'Вы') {
      return 'red';
    }
    return 'hsl(255, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
  }

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, Вы победили!', 210, 30);
    ctx.fillText('Список результатов:', 210, 50);

    var maxTime = getMaxElement(times);

    // Рисуем гистограмму с именами
    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = getHistogrammColor(names[i]);

      var rectWidth = BAR_WIDTH;
      var rectHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

      var contextPositionX = CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i;
      var contextPositionY = BAR_Y_GAP - rectHeight;

      ctx.fillRect(contextPositionX, contextPositionY, rectWidth, rectHeight);
    }

    for (i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000';

      var namesDisplay = names[i];
      var namesPositionX = CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i;
      var namesPositionY = CLOUD_HEIGHT - GAP;

      var timesDisplay = Math.round(times[i]);
      var timesPositionX = CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i;
      var timesPositionY = BAR_Y_GAP - GAP;

      ctx.fillText(namesDisplay, namesPositionX, namesPositionY);
      ctx.fillText(timesDisplay, timesPositionX, timesPositionY);
    }
  };
})();
