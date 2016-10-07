/**
  * neuro.js
	* @author Gabriel Dewes
	* @description train a neural network to differentiate 'A' to 'B'
	* @since 4/09/2016
	*/

/**
	* @description Train a set of binary image arrays
	* @param {Array} data: A set of bi-dimensional arrays
	* @return {Object} weight resulting weights
	*/
function train(data, weights) {
	var y, d, aux, sp, cont=0, w = weights || [[]];
	if(!weights) {
		w = bidimensionalArray(data[0].input.length, data[0].input[0].length),
		w = initWeigths(w);
	}

	while (cont != data.length) {
		aux = data[cont].input;
		d = data[cont].output[0];
		sp = weightedSum(aux, w);
		y = fr(sp);
		if(y != d){
			for (var i = 0; i < aux.length; i++) {
				for (var j = 0; j < aux[0].length; j++) {
				  w[i][j] = w[i][j] + 1 * (d - y) * aux[i][j];
				}
			}
		}
		else {
			cont++;
		}
		console.log("Loops");
	}
	return {weight: w};
}

/**
	* @description Show me the result by weights and new array
	* @param {Array} data: bidimensional binary array of an image
	* @param {Array} weight: previous trained weights
	* @return the transfer ramp function by the weighted sum
	*/
function run(data, weight) {
	var sp = weightedSum(data, weight);
	return fr(sp);
}

/**
  * @description The transfer ramp function
	*/
var fr = function(s) {
	if (s < 0)
		return 0;
	if ( (0 <= s) && (s <= 1) )
		return s;
	if (s > 1)
	  return 1;
}

var weightedSum = function(x, w) {
	var sp=0;
	for (let i=0; i<x.length; i++) {
		for (let j=0; j<x[0].length; j++) {
			sp += x[i][j]*w[i][j];
		}
	}
	return sp;
}

var initWeigths = function(a) {
  for (let i=0; i<a.length; i++) {
		for (let j=0; j<a[0].length; j++) {
			a[i][j] = 0;
		}
	}
	return a;
}

var bidimensionalArray = function(x, y) {
  var a = new Array(x);
  for (var i=0; i<a.length; i++) {
    a[i] = new Array(y);
  }
  return a;
}
