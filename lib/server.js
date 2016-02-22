var Queue = require('firebase-queue'),
    Firebase = require('firebase');

// The location of the Queue - can be any Firebase Location
var ref = new Firebase('https://foobarfootball.firebaseio.com/queue');

// Creates the Queue
var options = {
};

var queue = new Queue(ref, options, function(data, progress, resolve, reject) {
    // Read and process task data
    console.log(data);

    // Do some work
    var percentageComplete = 0;
    var interval = setInterval(function() {
        percentageComplete += 25;
        if (percentageComplete >= 100) {
            clearInterval(interval);
        } else {
            progress(percentageComplete);
        }
    }, 1000);

    // Finish the task
    setTimeout(function() {
        resolve();
    }, 5000);
});

firebase 