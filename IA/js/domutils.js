/**
  * @description load all images in a dir and add them to the document.
  * @param {function} callback a callback to return the data
  */
function loadImages(callback) {
  var dir = "img/";
  var fileExtension = ".png";
  var trained = [];
  $.ajax({
    url: dir,
    success: function (data) {
      // Parse da tabela do response data, pego todos href's das tags a's
      // que são os caminhos para todas imagens do diretório.
      $(data).find("a:contains("+ fileExtension +")").each(function () {
        // Replace 'localhost/ia/img/a.png' to 'a.png';
        var fileName = dir+this.href.replace(window.location, "");
        var imageName = fileName.replace(".png", "");
        var $div = $('<div>').attr({class: 'col-6 box', id: 'div'+imageName});
        var $img = $('<img>').attr({src: fileName, id: imageName});
        // CutBlanks is a image.js function, gambi detected
        var canvas = cutBlanks($img[0]);
        $div.append($img).append(canvas);
        $("#trained").append($div);
        trained.push($div);
      });
      callback(trained);
    },
    error: function(data) {
      alert("Não foi possível carregar as imagens do diretório: "+ dir+fileExtension);
    }
  });
}

/**
  * @description takes the canvas of each div of the array,
  *   convert them to a binary array and push to a set
  *   of arrays.
  */
function toBinaryArraySet(trained) {
  'use strict';
  var arrs = [];
  for (let i=0; i<trained.length; i++) {
    var canvas = trained[i].find('canvas')[0];
    // If contains 'a' on the id, set 1, else 0.
    var isA = trained[i].find('img')[0].id.indexOf('a') > -1 ? 1 : 0;
    // toBinaryArray is a image.js function
    var arr = toBinaryArray(canvas, 50, 50);
    $(trained[i]).append(stringify(arr.b));
    arrs.push({input: arr.a, output: [isA]});
  }
  // Embaralho o array para evitar de treinar todos A's, dps todos B's,
  // e assim a rede não funciona direito.
  shuffle(arrs);
  return arrs;
}

/**
  * @description prepend a div into a trained div on the document
  */
function putInTrained(imageSrc, imageId) {
  var $div = $('<div>').attr({class: 'col-6 box', id: 'div'+imageId});
  var $img = $('<img>').attr({id: imageId});
  $img[0].onload = function() {
    var canvas = cutBlanks($img[0]);
    var arr = toBinaryArray(canvas, 50, 50);
    $div.append($img).append(canvas).append(stringify(arr.b));
    $('#trained').prepend($div);
  }
  $img[0].src = imageSrc;
}

function stringify(data, log) {
  var str='';
  for (let y=0; y<data.length; y++) {
    for (let x=0; x<data[0].length; x++) {
      str+=data[x][y];
    }
    str+='\n';
  }
  if (log) console.log(str);
  return $('<div>').attr({class: 'stringify'}).text(str);
}

/**
 * Shuffles array in place.
 * @param {Array} a The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
