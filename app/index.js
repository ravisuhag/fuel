'use strict';

const Gmap = require('./components/gmap');
const Marker = require('./components/marker');
const Lessons = require('./data/lessons');


google.maps.event.addDomListener(window, 'load', function() {

    var map = Gmap('map');
    var infowindow = new google.maps.InfoWindow();



    Lessons.forEach(function(lesson, index) {

        var r = 1000 / 111300, // = 100 meters
            y0 = 50.970287,
            x0 = 1.9032203,
            u = Math.random(),
            v = Math.random(),
            w = r * Math.sqrt(u),
            t = 2 * Math.PI * v,
            x = w * Math.cos(t),
            y1 = w * Math.sin(t),
            x1 = x / Math.cos(y0);

        var newY = y0 + y1;
        var newX = x0 + x1;

        // Add Marker
        var marker = new Marker(
            new google.maps.LatLng(newY, newX),
            map, {
                marker_id: '1',
                text: lesson['Age']
            }
        );

        marker.addListener('click', function() {

            document.getElementById('lesson-title').textContent= lesson['Life Lesson'];
            document.getElementById('lesson-author').textContent= '- ' + lesson['Name'];
            document.getElementById('lesson-story').textContent= lesson['Story Behind the lesson']; 

            var img = Math.floor(Math.random() * 23) + 1;

            document.getElementById('lesson-banner').style.backgroundImage= 'url(build/images/pictures/'+ img +'.jpg)'; 


        });
    });

});
