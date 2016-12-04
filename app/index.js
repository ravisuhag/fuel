'use strict';

const Gmap = require('./components/gmap');
const Marker = require('./components/marker');
const Lessons = require('./data/lessons');


google.maps.event.addDomListener(window, 'load', function() {

    var map = Gmap('map');
    var infowindow = new google.maps.InfoWindow();

    Lessons.forEach(function(lesson, index) {
        var r = 300 / 111300, // = 100 meters
            y0 = 50.9683611,
            x0 = 1.9059048,
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
        // var marker = new Marker(
        //     new google.maps.LatLng(newY, newX),
        //     map, {
        //         marker_id: index
        //     }
        // );

        var pinColor = '1581C9';
        if(lesson['Type'] === 'volunteer'){
            pinColor = 'E9D460';
        }
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(newY, newX),
            map: map,
            icon: pinImage,
            shadow: pinShadow
        });

        marker.addListener('click', function() {

            // document.getElementById('lesson-title').textContent = lesson['Life Lesson'];
            // document.getElementById('lesson-author').textContent = '- ' + lesson['Name'];
            // document.getElementById('lesson-story').textContent = lesson['Story Behind the lesson'];
            // var img = Math.floor(Math.random() * 23) + 1;
            // document.getElementById('lesson-banner').style.backgroundImage = 'url(build/images/pictures/' + img + '.jpg)';

            var img = Math.floor(Math.random() * 23) + 1;
            var contentString =
                '<div id="lesson-banner" class="banner" style="background-image: url(build/images/pictures/' + img + '.jpg);"></div>' +
                '<div>' +
                '<div id="lesson-title" class="title">' +
                lesson['Life Lesson'] +
                '</div>' +
                '<p id="lesson-story">' +
                lesson['Story Behind the lesson'] +
                '</p>' +
                '<p id="lesson-author" class="u-text-right lesson-author">' +
                '- ' + lesson['Name'] + ', ' + lesson['Age'] + ' (' + lesson['Country of Origin'] + ')' +
                '</p>' +
                '</div>';

            infowindow.close();
            infowindow.setContent(contentString);
            infowindow.open(map, marker);


        });
    });

});
