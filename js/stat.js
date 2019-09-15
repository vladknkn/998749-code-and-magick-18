// 'use strict';

// var CLOUD_WIDTH = 420;
// var CLOUD_HEIGHT = 270;
// var CLOUD_X = 100;
// var CLOUD_Y = 10;
// var GAP = 10;
// var BAR_WIDTH = 40;
// var BAR_X_GAP = 50;
// var BAR_Y_GAP = 90;
// var maxBarHeight = 150;


// var renderCloud = function (ctx, x, y, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
// };

// var getMaxElement = function (arr) {
//   var maxElement = arr[0];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > maxElement) {
//       maxElement = arr[i];
//     }
//   }
//   return maxElement;
// };

// window.renderStatistics = function (ctx, names, times) {
//   renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
//   renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

//   ctx.fillStyle = '#000';
//   ctx.font = '16px PT Mono';
//   ctx.fillText('Ура, Вы победили!', 210, 30);
//   ctx.fillText('Список результатов:', 210, 50);

//   var maxTime = getMaxElement(times);

//   for (var i = 0; i < names.length; i++) {
//     ctx.fillStyle = 'hsl(255, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
//     ctx.fillRect(CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i, BAR_Y_GAP, BAR_WIDTH, (maxBarHeight * times[i]) / maxTime);
//   }

//   for (i = 0; i < names.length; i++) {
//     ctx.fillStyle = '#000';
//     ctx.fillText(names[i], CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i, CLOUD_HEIGHT - GAP);
//     ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_X_GAP + (BAR_WIDTH + BAR_X_GAP) * i, BAR_Y_GAP - GAP);
//   }
// };
