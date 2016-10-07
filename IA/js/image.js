/**
  * image.js
  * @author Gabriel Dewes
  * @description handle all proccess with images
  * @since 4/09/2016
  */
(function() {
   var imageLoader = $('#imageLoader')[0];
   imageLoader.addEventListener('change', handleImage, false);
 })();

/**
  * @description handle the change by DOM element of input images,
  *   will draw the image into a canvas,
  *   create a new canvas with the blank edges cutted,
  *   convert him to a binary array and
  *   run this on pre-trained neuro with weights adjusted.
  */
function handleImage(e) {
  var $canvas = $('<canvas>'),
      canvas = $canvas[0];
  var ctx = canvas.getContext('2d');
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
      var croppedCanvas = cutBlanks(img);
      var arr = toBinaryArray(croppedCanvas, 50, 50);
      var f = doRun(arr.a);
      var $div = $('<div>').attr({class: 'col-6 box', id: 'content'});

      var $h1 = $('<h2>').text(f == 1?"Isto parece um A":"Isto parece um B");

      var $ok = $('<button>').attr({class: 'btn btn-ok'}).text("Correto!");
      $ok[0].onclick = function() {
        doTrain({input: arr.a, output: [f]});
        $('#content').fadeOut(400);
        putInTrained(img.src, "");
      }
      var $err = $('<button>').attr({class: 'btn btn-err'}).text("Errado :(");
      $err[0].onclick = function() {
        f = f == 1 ? 0 : 1;
        doTrain({input: arr.a, output: [f]});
        $('#content').fadeOut(400);
        putInTrained(img.src, "");
      }
      var $btns = $('<div>').append($ok).append($err);
      var $a = $('<a>').attr({href: '#', class: 'close'}).html('&#10006;');
      $a[0].onclick = function() {
          this.parentNode.parentNode.removeChild(this.parentNode);
      };
      $div
        .append($a)
        .append($h1)
        .append($btns)
        .append(canvas)
        .append(croppedCanvas)
    		.append(stringify(arr.a));
      $('#uploaded').empty();
      $('#uploaded').append($div);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

/**
  * @description convert an image into a array of binary data
  * @param {element} canvas a canvas will be extracted the image data.
  * @param {number} width the sizes of the output array
  * @param {number} height
  * @return {Object} a containing 3 bidimensional arrays
  */
function toBinaryArray(canvas, width, height) {
  var context = canvas.getContext('2d');
  if (context) {
    var canvasW = canvas.width,
        canvasH = canvas.height,
        balanceW = canvasW/width,
        balanceH = canvasH/height;
    var imageData = context.getImageData(0,0,canvasW,canvasH),
        data = imageData.data,
        arr = bidimensionalArray(width, height),
        arr0 = bidimensionalArray(width, height),
        arr1 = bidimensionalArray(width, height),
        auxW, auxH, cont, total;
    console.log("To Binary Array from ",canvasW,"x",canvasH," to ",width,"x",height);
    for (let y=0; y<height; y++) {
      for (let x=0; x<width; x++) {
        for (let h=(Math.ceil(y*balanceH)); h<(Math.ceil(balanceH*(y+1))); h++) {
          for (let w=(Math.ceil(x*balanceW)); w<(Math.ceil(balanceW*(x+1)));  w++) {
            // Canvas Normal
            var red   = data[((canvasW * h) + w) * 4];
            var green = data[((canvasW * h) + w) * 4 + 1];
            var blue  = data[((canvasW * h) + w) * 4 + 2];
            var alpha = data[((canvasW * h) + w) * 4 + 3];
            // GrayScale 1 - para imagens coloridas
            var grayScale0 = (red*0.3) + (green*0.59) + (blue*0.11);
            // GrayScale 2
            var pixel = getPixelXY(imageData, h, w);
            var grayScale1 = (pixel.r*0.3) + (pixel.g*0.59) + (pixel.b*0.11);
          }
        }
        // Canvas Normal
        arr[x][y] = red > 200 ? 0 : 1;
        // GrayScale 1
        arr0[x][y] = grayScale0 > 200 ? 0 : 1;
        // GrayScale 2
        arr1[x][y] = grayScale1 > 200 ? 0 : 1;
      }
    }
    return {a: arr, b: arr0, c: arr1};
  }
  else {
    alert('Use um navegador de verdade!');
  }
}

/**
  * @description get pixel from index coordinate
  * @param {imageData} imgData the image data of a canvas 2d context
  * @return {Object} rgba RGBA object
  */
function getPixel(imgData, index) {
  var i = index*4, d = imgData.data;
  return {r: d[i], g: d[i+1], b: d[i+2], a: d[i+3]} //[R,G,B,A]
}

/**
  * @description get pixel from X Y cooridinates
  * @param {imageData} imgData: the image data of a canvas 2d context
  * @param {number} x y: the coordinates
  * @return {function} getPixel() invocation, will return a RGBA object
  */
function getPixelXY(imgData, x, y) {
  return getPixel(imgData, x*imgData.width+y);
}

/**
  * @description check whether an image has been loaded
  */
function imgLoaded(image) {
  return image.complete && image.naturalHeight != 0;
}

/**
  * @param canvas: A canvas will be cropped
  * @param {number} imgWidth imgHeight: the original image sizes
  * @return {element} canvas with cropped blank edges
  */
var removeBlanks = function(canvas, imgWidth, imgHeight) {
  'use strict';
  var context = canvas.getContext('2d');
  var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
      data = imageData.data,
      getRBG = function(x, y) {
        var offset = imgWidth * y + x;
        return {
          red:     data[offset * 4],
          green:   data[offset * 4 + 1],
          blue:    data[offset * 4 + 2],
          opacity: data[offset * 4 + 3]
        };
      },
      isWhite = function (rgb) {
          return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
      },
      scanY = function (fromTop) {
        var offset = fromTop ? 1 : -1;
        for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
          for(var x = 0; x < imgWidth; x++) {
            var rgb = getRBG(x, y);
            if (!isWhite(rgb)) {
              return y;
            }
          }
        }
        return null;
      },
      scanX = function (fromLeft) {
        var offset = fromLeft? 1 : -1;
        for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
          for(var y = 0; y < imgHeight; y++) {
            var rgb = getRBG(x, y);
            if (!isWhite(rgb)) {
              return x;
            }
          }
        }
        return null;
      };
  var cropTop = scanY(true),
    cropBottom = scanY(false),
    cropLeft = scanX(true),
    cropRight = scanX(false),
    cropWidth = cropRight - cropLeft,
    cropHeight = cropBottom - cropTop;

  var $croppedCanvas = $("<canvas>").attr({
    width: cropWidth, height: cropHeight, id: 'cropped'
  });
    $croppedCanvas[0].getContext("2d").drawImage(canvas,
        cropLeft, cropTop, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight);
    return $croppedCanvas;
};

function _cutBlanks(image) {
  var img = new Image(),
      $canvas = $("<canvas>"),
      canvas = $canvas[0],
      context;
  img.onload = function () {
    $canvas.attr({ width: this.width, height: this.height, class: 'box' });
    context = canvas.getContext("2d");
    if (context) {
      context.drawImage(this, 0, 0);
      $("body")
      .append("<p>Imagem Original:</p>")
      .append($canvas);
      var $croppedCanvas = removeBlanks($canvas[0], this.width, this.height);
      $croppedCanvas.attr({id: 'cropcanvas'});
      $("body")
      .append("<p>Mesma imagem com espaços em branco recortados:</p>")
      .append($croppedCanvas);
      console.log($croppedCanvas[0]);
    }
    else {
      alert('Use um navegador de verdade!');
    }
  };
  img.src = image.src;
}

/**
  * @description receive an image and invoke the removeBlanks()
  * @return {canvas} cropped canvas returned by function
  */
function cutBlanks(image) {
  var $canvas = $("<canvas>"),
      canvas = $canvas[0],
      context;
  if (imgLoaded(image)) {
    $canvas.attr({ width: image.width, height: image.height });
    context = canvas.getContext("2d");
    if (context) {
      image.crossOrigin = 'anonymous';
      context.drawImage(image, 0, 0);
      var $croppedCanvas = removeBlanks(canvas, image.width, image.height);
      console.log("_>",image.getAttribute('src'),"cutted from ",image.width,"x",image.height," to ",$croppedCanvas[0].width,"x",$croppedCanvas[0].height);
      return $croppedCanvas[0];
    }
    else {
      alert('Use um navegador de verdade!');
    }
  }
}

var bidimensionalArray = function(x, y) {
  var a = new Array(x);
  for (var i=0; i<a.length; i++) {
    a[i] = new Array(y);
  }
  return a;
}
