'use strict';

const Gmap = require('./components/gmap');
const Marker = require('./components/marker');
const Lessons = require('./data/lessons');
const $ = require('jquery');

require('./components/modal');

var prev_marker = null;

google.maps.event.addDomListener(window, 'load', function() {

    var map = Gmap('map');
    var infowindow = new google.maps.InfoWindow();

    Lessons.forEach(function(lesson, index) {

        var r = 1000 / 111300, // = x meters
            y0 = 50.9683611,
            x0 = 1.9059048,
            w = r * Math.sqrt(Math.random()),
            t = 2 * Math.PI * Math.random(),
            x = w * Math.cos(t),
            y1 = w * Math.sin(t),
            x1 = x / Math.cos(y0);

        var newY = y0 + y1;
        var newX = x0 + x1;

        var icon = {
            url: 'build/images/marker_blue.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(20, 30)
        };

        if (lesson['Type'] === 'volunteer') {
            icon.url = 'build/images/marker_yellow.png';
        }

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(newY, newX),
            map: map,
            icon: icon,
            id: index
        });

        marker.addListener('click', function() {

            if (prev_marker) {
                if (prev_marker.getAnimation() !== null) {
                    prev_marker.setAnimation(null);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    prev_marker = marker;
                }
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                prev_marker = marker;
            }


            var duration = 700;
            var img = Math.floor(Math.random() * 41) + 1;
            $('#lesson-title').text(lesson['Life Lesson']).hide().fadeIn(duration);
            $('#lesson-author').text('- ' + lesson['Name'] + ', ' + lesson['Age'] + ' (' + lesson['Country of Origin'] + ')').hide().fadeIn(duration);
            $('#lesson-story').text(lesson['Story Behind the lesson']).hide().fadeIn(duration);
            $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
        });

    });
});
