
function pickerPixel(image) {
  var a = initDom(),
      canvas = a.canvas,
      color = a.color,
      context = canvas.getContext('2d');
  if (imgLoaded(image)) {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    image.style.display = 'none';
  }

  function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = context.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba('+
      data[0] +','+ data[1] +','+
      data[2] +','+ (data[3] / 255) +')';
    color.style.background = rgba;
    color.textContent = rgba;
  }
  canvas.addEventListener('mousemove', pick);
}

function imgLoaded(imgElement) {
  return imgElement.complete && imgElement.naturalHeight != 0;
}

function initDom() {
  var $div = $('<div>').attr({class: 'container'});
  var color = $('<div>')[0];
  color.style.width = '200px';
  color.style.height = '50px';
  color.style.float = 'left';

  var $canvas = $('<canvas>').attr({class: 'visible-canvas'}),
      canvas = $canvas[0];
  var context = canvas.getContext('2d');

  $div.append(canvas).append(color);
  $('body').append($div);

  return {canvas: canvas, color: color};
}
