webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Gmap = __webpack_require__(1);
	var Marker = __webpack_require__(2);
	var Lessons = __webpack_require__(3);
	var $ = __webpack_require__(4);
	
	__webpack_require__(5);
	
	var prev_marker = null;
	
	var oldqs = window.location.href.slice(window.location.href.indexOf('?'));
	oldqs = parseQuery(oldqs);
	var lesso = Lessons[oldqs.lesson_id];
	if (oldqs.lesson_id) {
	    var img = Math.floor(Math.random() * 41) + 1;
	    var duration = 700;
	    $('#lesson-title').text(lesso['Life Lesson']).hide().fadeIn(duration);
	    $('#lesson-author').text('- ' + lesso['Name'] + ', ' + lesso['Age'] + ' (' + lesso['Country of Origin'] + ')').hide().fadeIn(duration);
	    $('#lesson-story').text(lesso['Story Behind the lesson']).hide().fadeIn(duration);
	    $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
	}
	
	google.maps.event.addDomListener(window, 'load', function () {
	
	    var map = Gmap('map');
	    var infowindow = new google.maps.InfoWindow();
	
	    Lessons.forEach(function (lesson, index) {
	
	        var r = 1000 / 111300,
	            // = x meters
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
	
	        marker.addListener('click', function () {
	
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
	
	            var query = buildQuery({ lesson_id: index });
	            window.history.pushState('lesson', window.document.title, query);
	
	            var duration = 700;
	            var img = Math.floor(Math.random() * 41) + 1;
	            $('#lesson-title').text(lesson['Life Lesson']).hide().fadeIn(duration);
	            $('#lesson-author').text('- ' + lesson['Name'] + ', ' + lesson['Age'] + ' (' + lesson['Country of Origin'] + ')').hide().fadeIn(duration);
	            $('#lesson-story').text(lesson['Story Behind the lesson']).hide().fadeIn(duration);
	            $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
	        });
	    });
	});
	
	function parseQuery(qs) {
	    qs = qs.replace('?', '');
	    qs = qs.split('&');
	    return qs.reduce(function (data, segment) {
	        segment = segment.split('=');
	        var k = decodeURIComponent(segment[0]);
	        var v = decodeURIComponent(segment[1]);
	        data[k] = v;
	        return data;
	    }, {});
	}
	
	function buildQuery(data) {
	    var qs = '?';
	    var tokens = [];
	    for (var key in data) {
	        var k = encodeURIComponent(key);
	        var v = encodeURIComponent(data[key]);
	        tokens.push(k + '=' + v);
	    }
	    qs += tokens.join('&');
	    return qs;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (target, options) {
	
	    var defaults = {
	        zoom: 16,
	        center: new google.maps.LatLng(50.9683611, 1.9129048),
	        mapTypeControl: true,
	        zoomControl: true,
	        zoomControlOptions: {
	            position: google.maps.ControlPosition.LEFT_BOTTOM
	        },
	        mapTypeControlOptions: {
	            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	            position: google.maps.ControlPosition.BOTTOM_LEFT
	        },
	        styles: [{ "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "color": "#f5f5f2" }, { "visibility": "on" }] }, { "featureType": "administrative", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "stylers": [{ "visibility": "simplified" }, { "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#71c8d4" }] }, { "featureType": "landscape", "stylers": [{ "color": "#e5e8e7" }] }, { "featureType": "poi.park", "stylers": [{ "color": "#8ba129" }] }, { "featureType": "road", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [{ "color": "#c7c7c7" }, { "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#a0d3d3" }] }, { "featureType": "poi.park", "stylers": [{ "color": "#91b65d" }] }, { "featureType": "poi.park", "stylers": [{ "gamma": 1.51 }] }, { "featureType": "road.local", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.government", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road" }, { "featureType": "road" }, {}, { "featureType": "road.highway" }]
	    };
	    if (!options) {
	        options = {};
	    }
	    for (var key in defaults) {
	        if (!options.hasOwnProperty(key)) {
	            options[key] = defaults[key];
	        }
	    }
	
	    return new google.maps.Map(document.getElementById(target), options);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	function CustomMarker(latlng, map, args) {
	    this.latlng = latlng;
	    this.args = args;
	    this.setMap(map);
	}
	
	CustomMarker.prototype = new google.maps.OverlayView();
	
	CustomMarker.prototype.draw = function () {
	
	    var self = this;
	    var div = this.div;
	
	    if (!div) {
	
	        div = this.div = document.createElement('div');
	        div.className = 'marker';
	        div.textContent = self.args.text;
	
	        if (typeof self.args.marker_id !== 'undefined') {
	            div.dataset.marker_id = self.args.marker_id;
	        }
	
	        google.maps.event.addDomListener(div, 'click', function (event) {
	            google.maps.event.trigger(self, 'click');
	        });
	
	        var panes = this.getPanes();
	        panes.overlayImage.appendChild(div);
	    }
	
	    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	
	    if (point) {
	        div.style.left = point.x - 40 + 'px';
	        div.style.top = point.y - 0 + 'px';
	    }
	};
	
	CustomMarker.prototype.remove = function () {
	    if (this.div) {
	        this.div.parentNode.removeChild(this.div);
	        this.div = null;
	    }
	};
	
	CustomMarker.prototype.getPosition = function () {
	    return this.latlng;
	};
	
	module.exports = CustomMarker;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = [{
	    "Name": "Khaled",
	    "Life Lesson": "Never leave your family",
	    "Story Behind the lesson": "I have learnt how to miss my mother. I have learnt how to joke with my father. I have learnt how to miss the hugs of my brother. No one should ever learn how to miss something. I left Sudan to come to France and the waiting process here is slow. My wife and I reached an agreement that we should separate because I don't know how long it will take me to get the status. And she shouldn't wait. I have left my two young kids behind and have learnt to cry everytime I miss them.",
	    "Age": 44,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Great guy. Leader of the Sudanese part of the camp. Referred to his hut as a villa. Funny but has a lot of pain inside him. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Muriel",
	    "Life Lesson": "Learn to empathise",
	    "Story Behind the lesson": "I was married twice and I got separated both the times. I know how it feels to be all alone when you are starting a new life. That is why I help the refugees in these hard days of their life. I used to give breads to two young boys from Afghanistan who were brothers. One evening, one of them in his attempt to get into the lorry came under it and died. I never forgot that. I never saw something like this before in my life. But I can choose to care and understand their situation. ",
	    "Age": 64,
	    "Country of Origin": "France",
	    "Status": "Volunteer",
	    "Remarks": "She was distributing bread all by herself. Her read car was stacked with bread loafs from a local bakery. She called out to the refugees and handed them generously a lot of bread. She seemed to genuinely care. ",
	    "Photo": "Available",
	    "Audio": "Not Available",
	    "Area of the camp": "Highway (outside of the camp)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ali Shaanhan Mohamand",
	    "Life Lesson": "Live in reality",
	    "Story Behind the lesson": "I had this romantic picture of Europe in my head. The very first day I arrived here, I was shattered with what I saw. Life for a newcomer here wasn't as rosy as everybody said it was. I have my Masters in Economics and an MBA degree from Peshwar, Pakistan. But look, I am here in the jungle running my own restaurant. I hope to open a restaurant in Italy. I have a place in mind. Inshallah someday.",
	    "Age": 24,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "He is a resident of the jungle and runs a restaurant named '3 idiots' which is very popular amongst the volunteers and foreigners. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Inside 3 idiots the restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Farouq ",
	    "Life Lesson": "Respect is crucial",
	    "Story Behind the lesson": "My religion has taught me that 'adab' (respect) is the key. I teach the same at the mosque. I feel it is the foundation of everything one does in life. ",
	    "Age": 34,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He is the Imam of the mosque in the jungle near the bakery",
	    "Photo": "Available",
	    "Audio": "Not Available",
	    "Area of the camp": "In front of the new bakery",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Sahil Samar",
	    "Life Lesson": "Seek advice from elders",
	    "Story Behind the lesson": "My parents used to guide me in everything in life. Now that I have been in the camp for 6 months, I miss their guidance. Hence, I feel seeking advice from elders is my life lesson.",
	    "Age": 18,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Was shy for pictures",
	    "Photo": "Available (Picture of only legs is there)",
	    "Audio": "Not Available",
	    "Area of the camp": "In front of the new bakery",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Khaibar",
	    "Life Lesson": "Serve your country",
	    "Story Behind the lesson": "I spent two to three months just getting to Europe and have been here for nearly 4 months. I want to join the police force as soon as I return to Afghanistan.  One must give as much as possible to one's own country. I am learning this now. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Spoke a lot. Very active and clear in thoughts. ",
	    "Photo": "Available",
	    "Audio": "On video",
	    "Area of the camp": "In their house in Afghan section of the jungle",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Aryin",
	    "Life Lesson": "To find yourself is crucial",
	    "Story Behind the lesson": "People can say a lot of things about you. They will have opinions and judgements. It took me time but I eventually found out that I like to protect myself and yet respect others. As a person, that is what I have found for myself and everyone should try to find for themselves.",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Showed us the belongings he got from his country. Contained a scarf, a mirror and prayer beads. ",
	    "Photo": "Available",
	    "Audio": "On video",
	    "Area of the camp": "In their house in Afghan section of the jungle",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mohamed Noor",
	    "Life Lesson": "Respect your elders, parents and school",
	    "Story Behind the lesson": "My teacher in Aghanistan taught me that you have to show people you value them. Therefore, I try to solve everything by giving people respect.",
	    "Age": 21,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Was little reserved. We have a picture of his big red ring for the belonging section of the book. It was given to him by his very good friend. ",
	    "Photo": "Available",
	    "Audio": "On video",
	    "Area of the camp": "In their house in Afghan section of the jungle",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hamid",
	    "Life Lesson": "Know the value of homeland",
	    "Story Behind the lesson": "Living in the jungle for over one year is not easy. There is enough to do but never really enough. I have dreams of having a family, home and business someday. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available (Shoes)",
	    "Audio": "On video",
	    "Area of the camp": "In their house in Afghan section of the jungle",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Moahmed Ismael ",
	    "Life Lesson": "You have to believe in your own power",
	    "Story Behind the lesson": "My mother told me that nothing will be easy. She said believe in yourself completely. I have learnt from her that you will face many challenges but ultimately, if you are willing, all is possible. ",
	    "Age": 17,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available",
	    "Audio": "On video",
	    "Area of the camp": "In their house in Afghan section of the jungle",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Moahmad Raham",
	    "Life Lesson": "Care for children",
	    "Story Behind the lesson": "I have one girl child and I have realized that if you take care of the children, they will grow up to be good people.  I didn't have a job in Pakistan, just couldn't find one. ",
	    "Age": 30,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "We met him during the renovation of his tent by the volunteers. They we putting platforms in his tent. He was extremely new to the camp just 20 days old. ",
	    "Photo": "Available (Shoes)",
	    "Audio": "",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Bashir",
	    "Life Lesson": "Guide your next generation to have good habits",
	    "Story Behind the lesson": "I wasted my entire life on trying to please those who didn't matter. ",
	    "Age": 27,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "We met his in his tent which is at the very entrance of the jungle as there was hindi song playing in his tent.",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Amran",
	    "Life Lesson": "Choose a good life",
	    "Story Behind the lesson": "I left Afghanistan in 2010 but found no work since then. I run behind the truck every night.  I have  a dream of making it to England one day, hopefully soon.",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "We met his in his tent which is at the very entrance of the jungle as there was hindi song playing in his tent.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Sharif ",
	    "Life Lesson": "Behave well",
	    "Story Behind the lesson": "I went to school till class 8th. My school taught me that behaving well is a great quality to have.",
	    "Age": 28,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "We met his in his tent which is at the very entrance of the jungle as there was hindi song playing in his tent.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Amid ",
	    "Life Lesson": "Respect your elders",
	    "Story Behind the lesson": "My favourite teacher's name in school was Mr. Sikander Shah. He taught us English and also, how to react to people and places. ",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He said If more people in Afghanistan we educated the situation of the country would have been good",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ajmal ",
	    "Life Lesson": "Find contentment",
	    "Story Behind the lesson": "I have a four years old son and a wife back home. But I try to find contenment here in the camp because it is very difficult to go meet them. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "We met his in his tent which is at the very entrance of the jungle as there was hindi song playing in his tent.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Imran ",
	    "Life Lesson": "School is the best thing in life",
	    "Story Behind the lesson": "I went to school till class 12th and after that I couldn't continue. Looking back, I have relaized how handy education is. School teaches you so many things. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "We met his in his tent which is at the very entrance of the jungle as there was hindi song playing in his tent.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Khaanwali",
	    "Life Lesson": "Dignity is supreme",
	    "Story Behind the lesson": "I have been in the jungle for one and a half months now. There is no respect here. People are living in unimaginable situations and therefore aren't in the best mood. Back home there was respect and dignity for everyone. ",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Made tea for us. His brother is Zabi.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Zabi",
	    "Life Lesson": "Become something",
	    "Story Behind the lesson": "I went to school till class 6th and I have this passion to become someone. But I also want to see other people become something. This will help their kids live a good life. When you become something it helps solve problems of many people. ",
	    "Age": 14,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Brother of Khaanwali. His hand was broken when he met us. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Bahadur",
	    "Life Lesson": "Do good deeds",
	    "Story Behind the lesson": "My father taught me this. He is in Aghanistan now but I remember his words. He used to tell me that if you do good deeds it helps you earn respect of others. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "The Last person who entered the tent before we were leaving.",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Entrance of the jungle from the bridge area",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Johannes ",
	    "Life Lesson": "Trust in God and accept his love",
	    "Story Behind the lesson": "I hated my brother till I was 15 years old. Once, we were together on a holiday and I saw it as an opportunity to pray for each other. We saw how similar we were and we just hugged each other and wept uncontrollably. Things changed after that hug. I was a completely dfferent person.",
	    "Age": 22,
	    "Country of Origin": "Germany",
	    "Status": "Volunteer",
	    "Remarks": "He cycled to Sweden and from their to Germany. One of his friend told him about Calais jungle and he wanted to come. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "He was a volunteer with SOS chai. It was his last day when we met him. Interview took place in Tyesson's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Habeeb",
	    "Life Lesson": "Love to serve and help others",
	    "Story Behind the lesson": "When I have a visitor in the camp I feel good but when I am by myself, all I think about is my country and my people. I can't forget the laughter of my friends and the comfort of my family. War does no good to anyone. I want my friend, my mother, my brother back in my life. I see them in everyone and that is why I try to help others.",
	    "Age": 25,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Came to Tyesson's tent. Very passionate guy. Has been in the camp for two months.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Tyesson's tent. ",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mohamed ",
	    "Life Lesson": "Live a peaceful life",
	    "Story Behind the lesson": "I paid 1000 dinars to the smuggler. My life depended on a small plastic boat. Can you imagine?",
	    "Age": 26,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Has been in the camp for 6 weeks. Loves bollywood songs. Repeatedly said- Zindagi. Tanhayi. Humesha.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Tyesson's tent. ",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ibrahim",
	    "Life Lesson": "We all need a good life ",
	    "Story Behind the lesson": "When you look around and try to learn from other cultures you will find so many similarities in them. Back in Africa, I wanted to be a computer science engineer. It's hard because you don't have a computer so how will you learn? In the jungle, there are different cultures. For people living here life is not easy but one can learn so much. Learning from others shows you how to live and communicate. ",
	    "Age": 27,
	    "Country of Origin": "Gambia",
	    "Status": "Refugee",
	    "Remarks": "Very well read man. Friendly. He is from Gambia but spends most of his time with Sudanese people. He learnt from them that they are like one big family and live like brothers. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Near Khaled's new house.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Salh",
	    "Life Lesson": "War forces you to go out of your safe zone",
	    "Story Behind the lesson": "I miss my family a lot. Away from home, I am searching for my future. But this is not out of choice but rather out of compulsion. War left me no choice but to leave. ",
	    "Age": 30,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "He was wearing a bright orange t-shirt and was very nice to speak to. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Near Khaled's new house.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Adil ",
	    "Life Lesson": "It is important for children to learn",
	    "Story Behind the lesson": "When children learn they discover new skills. They polish their talents. Also, find out things about themselves that they never knew existed before. ",
	    "Age": 46,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Was wearing a Nike-tshirt. Very nice and composed person.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Near Khaled's new house.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hamadi",
	    "Life Lesson": "To leave one's family is to leave one's life",
	    "Story Behind the lesson": "I have 9 people in my family. One brother and eight sisters. My father also was like my friend. When you would see us together you would think two friends are having fun and there is no age difference. ",
	    "Age": 25,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Had curly hair was concious of camera. Has been in the camp for 6 months.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Near Khaled's new house.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Musab",
	    "Life Lesson": "If you want protection stay in your own country",
	    "Story Behind the lesson": "When I reached Italy after a difficult journey, the police did not take us to a hotel; rather they took us to the prison. They forced us into giving our fingerprints. They tortured me. Used fire and electrocution to get me to give my fingerprints. Now, I try to get to UK but even here the French police doesn't let us go. I don't want to be a loser. Life in the jungle is all about waiting in line. Waiting in line for the food, for the clothes, for the soap. Just waiting. I want to do more in life. Perhaps, become a rap artist. ",
	    "Age": 21,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very passionate young man. He performed a rap for me that he wrote. Shared insightful details about the smuggling to UK. For eg. 'GB' sign on a truck indicates it is going to the UK.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In '3 Idiots' restaurant during his english class",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Shafiq",
	    "Life Lesson": "Living with your parents is a privilige",
	    "Story Behind the lesson": "I learnt in the jungle how comfortable it was to live at home with my parents. Life here is a non-stop struggle that too under horribe circumstances.",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He was playing cards in the shop I passed.",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Main area shop.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Salim",
	    "Life Lesson": "To live in your own country is life",
	    "Story Behind the lesson": "I want to return to my homeland and live with my three kids. I don't want to chase trucks and risk life. Roaming from city to city is not living.",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He was standing outside the shop in which people were playing cards",
	    "Photo": "Available (Shoes)",
	    "Audio": "Available",
	    "Area of the camp": "Main area shop.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mustafa",
	    "Life Lesson": "Don't leave your country",
	    "Story Behind the lesson": "It's been seven years since I have been roaming in France and Italy with no purpose. I have found and learnt nothing new. At least, back home I was growing as a person. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He was sitting on a single seater sofa in the shop where people were playing cards",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Main area shop.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ajmal ",
	    "Life Lesson": "Find happiness wherever you are",
	    "Story Behind the lesson": "I am grateful for this life in the camp. People might complaint but I don't have any thing to complaint about. My life back home was not safe. The war made everything worse. Atleast I am alive here. Why do I stay unsafe? I am glad I came here. ",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He was playing cards in the shop but came over the counter to speak to me. He also had an eyesore. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Main area shop.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Sayed Arman",
	    "Life Lesson": "Fight for your country",
	    "Story Behind the lesson": "When I left my country, I realized the value it has. I did not get educated as I lived in the hills and there was no school up there. The life in the jungle is full of danger. There is no house, we all live in tents. I have tried smuggling myself more than 500 times. Sunday is the only day we don't try because no trucks pass from here. Otherwise, I work in the restaurant during the day and try to smuggle myself at night. I wish I could live and die for my own country and not this foreign life in a foreign land. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He works as a breadmaker in 'Peace restaurant'. Its been 8 months in the camp for him.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Anthony",
	    "Life Lesson": "Education is a bright light",
	    "Story Behind the lesson": "I want to stay to all the children in the world- Study as much as you can. Learn new things whenever possible. Getting yourself educated is the only thing that can open doors for you. You don't have to depend on a single person to ask the address, check your documents and fill your plate. You can do it all by yourself. People who are educated know how to solve problems. ",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He works as a breadmaker in 'Peace restaurant'.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Jalal",
	    "Life Lesson": "Please respect others to get respect in return",
	    "Story Behind the lesson": "There are so many racist people in France. When we are walking on the streets or near the highway, people stare at us from their cars. The life of a nomad wants nothing but respect. People make us feel like aliens. That boils my blood. I swear, if any person from any nationality came to my country we could give our life for that person. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He is Atal's roommate. Spoke to him in his tent. A well read guy who knows 5 languages.  ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Atal's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Asadullah Armani",
	    "Life Lesson": "Do something that will leave a legacy",
	    "Story Behind the lesson": "I saw a very close friend in Afghanistan die. I learnt through his death that I will never be able to speak with him again or have a moment of happiness with him again. It struck me really hard that when I leave, so many people will have nothing to cherish, once I am gone. So, I must leave a legacy by doing something impactful. ",
	    "Age": 27,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Nice guy. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Atal's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Jahanzaib",
	    "Life Lesson": "Home is heaven",
	    "Story Behind the lesson": "It is only when I left home I realized the value of my mother, father, siblings, friends and my country. The best part about my home was my Mom. I miss her love. A lot of people here say they miss the food their mom cooked but food can always be recreated but never the love with which it was made, served and fed. ",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Shy guy but friendly",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Atal's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Nisar Ahmed",
	    "Life Lesson": "Stay home. Stay safe.",
	    "Story Behind the lesson": "I have been living in Europe for 3 years now. And the life in the past three has been so undignified. I look back to realize that 20 years that I spent in Afghanistan were the best years of my life. I miss that the most. In my country, after I returned home after a long day at work I could speak to my parents and eat with them. Here in the jungle, I neither achieve my goal of making it to the truck that takes me to England nor do I get the life of dignity. ",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Atal's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Abdul Raziq",
	    "Life Lesson": "Stay true to your dream and stay away from bad habits. ",
	    "Story Behind the lesson": "I used to crush the plastic bottles in a factory in Afghanistan. When I left that, I came to Turkey and sold vegetables. Then I came to Germany and worked in an iron pipe making unit. I also studied German for 3 months. My cousin called me and said, ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Atal's tent.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mohammed Azan",
	    "Life Lesson": "Don't loose focus",
	    "Story Behind the lesson": "The boys who come from Afghanistan, Pakistan or India or the northern region of Asia haven't had so much interaction with girls all their life. Here in the jungle they meet white volunteer girls from the UK and fall in love, head over heels. They start to lie, steal and do voilent things to be able to have money to show to these girls that they have a future. They forget they are not here to find love but freedom. Freedom from this jungle.",
	    "Age": 22,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Outside the Naan shop. Next to Peace restaurant.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mujahid Abdul Basit",
	    "Life Lesson": "You must have the courage to do something to change your life",
	    "Story Behind the lesson": "I have faced many struggles in my life. But I showed most courage when I jumped in the boat for the first time in the middle of the night. You cannot directly get into the boat. First, you have to walk in the water for a few meters. Till the water is around your shoulders. I felt fearful, but then I jumped because I wanted a better life.",
	    "Age": 18,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very nice guy. He was very new to the jungle. It was his 6th day.  In audio I have his full life story.  He didnot tell his parents while leaving that he is going. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In '3 Idiots' restaurant ",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Bilal Hamwi",
	    "Life Lesson": "Dream",
	    "Story Behind the lesson": "In the arab world, if you want to have an ambition or you have a dream then you must be very strong. There are going to be a lot of challenges along the way in protecting that dream. My dream is to be a writer and create more peace in the world. I am hoping to get to England and finish my book. It is titled, ",
	    "Age": 21,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "He is articulate, kind and friendly. He acted as my translator. He has been in the camp for four and a half months.",
	    "Photo": "Available (Hands)",
	    "Audio": "Available",
	    "Area of the camp": "In his Caravan (across Peace restaurant)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Piero",
	    "Life Lesson": "Family is important",
	    "Story Behind the lesson": "Because I want to build one.",
	    "Age": 23,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Very stylish. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In his Caravan (across Peace restaurant)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Khadar ",
	    "Life Lesson": "Just love to create peace ",
	    "Story Behind the lesson": "Because of the war in Syria, I am forced to think about solutions to make people people love to create peace. I can do anything for love.",
	    "Age": 23,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Was watching Fast and Furious on his phone when I met him. ",
	    "Photo": "Available (Shoes)",
	    "Audio": "Available",
	    "Area of the camp": "In his Caravan (across Peace restaurant)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Raed Khadar",
	    "Life Lesson": "Understand the mindset of people",
	    "Story Behind the lesson": "My experiences have taught me that amongst all the differences that exist, ideas can be found that work for everyone. In the Arab world, only two-three religions can be found; but in Europe or India many religions co-exist. We can learn from them. Europe gives you freedom and helps you work for your dream. ",
	    "Age": 32,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Nice quite man.",
	    "Photo": "Available (Shoes)",
	    "Audio": "Available",
	    "Area of the camp": "In his Caravan (across Peace restaurant)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Yassin",
	    "Life Lesson": "Work hard to get whatever you want in life",
	    "Story Behind the lesson": "When you work with yourself and put in the right effort, you know the truth of the work. When you start something by yourself, even if you fail, you can start all over again. I have 15 members in my family and I wanted to see them happy always. Therefore, I left to work in Lebanon and now have come to France. ",
	    "Age": 24,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Has been in the camp for 10 months. His girlfriend died beacuse of the war a year ago. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In a tent in the Syrian region entrance",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hane",
	    "Life Lesson": "Life is very hard but being angry about it solves nothing",
	    "Story Behind the lesson": "I was at the mosque for the prayers. I returned and saw that my family had died because of a bomb attack. I was all alone until my cousin came and rescued me. He brought me to the jungle also. My dream is to go to England. I miss my mother and father the most. The joy of sitting with them, eating, joking was very comforting.  Every person in the jungle ensures that I am happy. I am grateful. ",
	    "Age": 14,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "His dream is to go to England. He said he feels angry about being alone. He misses his mom & dad the most (he hugged himself).",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In a tent in the Syrian region entrance",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Nadir",
	    "Life Lesson": "Speak the truth",
	    "Story Behind the lesson": "If you speak a lie, you have the risk of loosing people. Truth, at least, brings them back even if they get upset when they hear it and leave. Truth gives a chance, even if it is harsh. Lies break hearts. And of course, you want people to love you when you die. Speaking the truth is a good way to ensure that.",
	    "Age": 26,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available (Tattoo on arm)",
	    "Audio": "Available",
	    "Area of the camp": "In a tent in the Syrian region entrance",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Kamran ",
	    "Life Lesson": "Respect your elders",
	    "Story Behind the lesson": "Ustad Illaudin, my teacher, taught me that when you respect others they will respect you too.",
	    "Age": 18,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "I met him briefly near the Syrian tents.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Outside the Syrian region entrance",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Wasim Yasin",
	    "Life Lesson": "If you save your country, you save yourself",
	    "Story Behind the lesson": "I have learnt from the very beginning of life- a lot of things. But I have realized that when one doesn't hate or fight with anyone, and you just keep calm, you are, in a way,  saving your country. The freedom starts from within first and later from external forces. ",
	    "Age": 33,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "He paid 5000 Euros to the smuggler to get his wife to England with a fake passport. He couldn't go as he did not have the money to do so. So now the only way left for him is to smuggle himsef to England and get to be with his wife. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Next to Bilal's Caravan",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ali Ahmad Bunian",
	    "Life Lesson": "Don't discriminate on the basis of religion",
	    "Story Behind the lesson": "During the war, I faced and witnessed a lot of discrimination myself. The Christians are safe in Syria but the Shia and the Sunni have a lot of conflict. ",
	    "Age": 23,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Has been in the camp for one and a half months",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Next to Bilal's Caravan",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Omar",
	    "Life Lesson": "Ensure that all children get the benefit of knowledge",
	    "Story Behind the lesson": "I see our children in Sudan die without knowledge. Ever since they are a small child, they start holding guns and fighting.  I don't want any kid to cross the sea, walk for months and get here in a place like the jungle. They should have opportunities to make a meaningful life.",
	    "Age": 26,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Has been in the camp for one month. When I met him he had broken his leg during a football game. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "On the way to Khaled's tent before the solid road",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Usman Adom",
	    "Life Lesson": "Towards a better tomorrow",
	    "Story Behind the lesson": "We have been suffering all our life. I am trusting God to help us make a better future for our children. Step by step we will get there. Hopefully sooner than we expect. ",
	    "Age": 22,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "He learnt his english on the street by just hearing people.",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "On the way to Khaled's tent before the solid road",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ahmad Mohamad Ahmad",
	    "Life Lesson": "Hope for peace ",
	    "Story Behind the lesson": "Now we all are one community in this jungle. When I came, I was alone. We all witness the cold in the night. Some of us miss the lunch during the afternoon and then, go hungry the whole day. The time of the future, for so many people, is getting wasted. ",
	    "Age": 23,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "On the way to Khaled's tent before the solid road",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Dalgir Khan",
	    "Life Lesson": "Serve your parents",
	    "Story Behind the lesson": "In the journey from Afghanistan to Iran to Turkey to Unan to Greece to Italy to France, I realized the value of my home. It is only when I was out of it, I felt a major part of me missing. The comfort of your own people is precious. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "They were Kamran's friend. Were washing utensils when I saw them. Has been in the camp for 8 months.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "On the way to Khaled's tent before the solid road",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Abdul Rashid",
	    "Life Lesson": "Learn to fight the obstacles",
	    "Story Behind the lesson": "I first had to learn to bear the pain and anger I had inside me. Then to understand, what is this situation teaching me? If you have to do something in life you will have to learn how to take it all in and then fight back the challenges. ",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "They were Kamran's friend. Were washing utensils when I saw them. Has been in the camp for 8 months.",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "On the way to Khaled's tent before the solid road",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Faisaullah",
	    "Life Lesson": "Go to school. Respect elders. Love the children",
	    "Story Behind the lesson": "My father used to teach me these three rules for a good life. I was 8 or 9 at the time and he was a Principal in Momin Model School. When the trouble started at home my friends asked me to go. I was the eldest, so I left the country. I worked in Turkey and Italy for two years. But the expenditure was really high. So I came to the Calais jungle in the hope of making it to England one day. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Met him in Jalal's Tent",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Firoz Khan ",
	    "Life Lesson": "Become an important person in the world.",
	    "Story Behind the lesson": "My eyes opened as a refugee. My father used to teach me to get educated and do well. Now also whenever he calls, he says the same thing about being a changemaker in the world. I should not have dreamt about another land but stayed in my country. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "Met him in Jalal's tent",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Siddiq Khan",
	    "Life Lesson": "Learn so that you can open doors for yourself",
	    "Story Behind the lesson": "I didn't get educated. I regret it now. I could have been an Engineer or a Lawyer in my own country. I studied till class 9th, only then I started to get bored. I didn't enjoy it at the time. But now, even if I want to study, I can't. If I make it to UK, I will have to work doubly hard to make up for the lost time. I have to send money home as I recently got engaged. ",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 5 months",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In the right side tent of Peace restaurant.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Dilawar Singh",
	    "Life Lesson": "Don't ever choose to become a refugee",
	    "Story Behind the lesson": "It has been three years since I left home. Life is very tough as a refugee.  I would suggest to everyone that become everything in your own country. Travel legally but never illegally. Last week, I was beaten by four police men. It stills hurts. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 4 months",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In the right side tent of Peace restaurant.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Rustam Khan",
	    "Life Lesson": "Education is a must",
	    "Story Behind the lesson": "There was only war & violence in my village. All my life has gone watching people fight. I walked from Turkey to France for two months. The most difficult day for me was in the jungle of Bulgaria. I had nothing to eat or drink. The wind was harsh and I could not give up. I was thinking that I only studied till class 5th and now I often think how much education can contribute in making people become better, in spite the terrible situations there are in.",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 1 month. ",
	    "Photo": "Available ",
	    "Audio": "Available",
	    "Area of the camp": "In the right side tent of Peace restaurant.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Abdul Hamid Dugar",
	    "Life Lesson": "Wise men go to school; others go to war",
	    "Story Behind the lesson": "The war between the government and the Taliban started two years ago, in my region. Education can save the world. If I ever make it to the UK, I would love to study Political Science; as I used to study it in Afghanistan. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 2 months. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In the right side tent of Peace restaurant.",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Daud Khan",
	    "Life Lesson": "Travel the world",
	    "Story Behind the lesson": "In a village you can know only as much. One can be very narrow minded. Travelling opens your eyes and mind. I learnt a good habit to observe people and interact with them because of my travel.",
	    "Age": 32,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 3 months. He says, ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent on the right next to Kamran and Dalgir",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Salman Khan",
	    "Life Lesson": "Parents should never misguide their children or send them to an unsafe land",
	    "Story Behind the lesson": "I wanted to come to Europe and I did. I followed my heart. So I accept the difficulties that come my way. But I see a lot of young children here in the camp and it bothers me. Because their parents have chosen this life for them. Those kids get into wrong habits when they are exposed to this life. ",
	    "Age": 32,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He said, ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent on the right next to Kamran and Dalgir",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Zain Zaman",
	    "Life Lesson": "The worldly problems will always be there. You have to learn to solve them",
	    "Story Behind the lesson": "I have learnt that money will come and go. Situations will change with time. The important thing is to remember to believe in something bigger than yourself. Education helps in accepting and yet, solving a lot of things. ",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 3 months. He came to Calais in 2008 and says things ahve changed since then. Police has become more strict. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent on the right next to Kamran and Dalgir",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Faisal Abdullah",
	    "Life Lesson": "Work for only things that create peace",
	    "Story Behind the lesson": "I have been in the camp for one year now. I really like when I see people around me or anywhere in the world are living a peaceful life. I came via the big plastic tube through the sea route- risking everything. Yet, I get very happy and hopeful whenever I see people feeling the same emotions as me. ",
	    "Age": 35,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very humble guy and good at heart. Translated for me as well. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent right next to Ashram Kitchen",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Ahmad",
	    "Life Lesson": "Be kind",
	    "Story Behind the lesson": "I was the lone survivor of a boat in the Mediterrean sea. Rest of the 16 people drowned and died in front of my eyes. I swam for seven hours to save my life. The police did nothing but the Italian people helped me when I got to the shore. I miss my mother a lot. ",
	    "Age": 25,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for about 1 and a half years. Under severe mental trauma.",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent right next to Ashram Kitchen",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hamza",
	    "Life Lesson": "Send good wishes to the children of Sudan as they need them",
	    "Story Behind the lesson": "I hope all the children in Sudan grow up well with good learning and in a good place. Majority of the children in the world, have either privilige or protection. But the children of Sudan have nothing. Children who come out of a war have the power to change the world. They learn to live together because they know the price of separation. ",
	    "Age": 28,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very passionate guy. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent right next to Ashram Kitchen",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hassan Adam",
	    "Life Lesson": "Listen to your parents and pray everyday. Keep learning.",
	    "Story Behind the lesson": "People who live in Sudan say life in Europe is very good and it is better than Sudan. And it is true. There is freedom here. People are not living in fear. ",
	    "Age": 22,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Came through Egypt. In the camp for 1 month.",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent right next to Ashram Kitchen",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Abdullah Mohamad",
	    "Life Lesson": "Find joy in other's happiness. ",
	    "Story Behind the lesson": "I am not happy with myself in the jungle; so I keep searching for others who are happy. ",
	    "Age": 20,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent right next to Ashram Kitchen",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Fahim Naimi",
	    "Life Lesson": "Do good work",
	    "Story Behind the lesson": "I was in the Army for ten years and, I only learnt to fight. In my village, when Taliban threatened to destroy my family I had to leave both the Army and the country. I was intimated ten times. I was in Italy for almost one year but there is no work there. They pay you 200 Euros which is nothing. ",
	    "Age": 35,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 7 months",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent where Rajma chawal was being made",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Hassan Esakheil",
	    "Life Lesson": "Pray for all refugees.",
	    "Story Behind the lesson": "I learnt as a refugee that bread, tea and sleep, even the most basic things are not provided for. Police is very strict. There is no chance of going to England or to another better place. When the plastic bullet hit me while chasing a lorry, I couldn't move for a week. I have no money and I am helpless. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Very active guy.",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Shaid Khan",
	    "Life Lesson": "Don't do drugs",
	    "Story Behind the lesson": "I have left home to get rid of drugs. I have become an addict because I saw others doing it. People don't trust me but I haven't left home for money or job or anything; just to be free of drugs. And I know, I won't be able to leave drugs till I make it to England. I don't want to be provided for. I want to earn my own money and save it for better things. ",
	    "Age": 19,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "He said he is 19 but when he gets to England he will say he is 16. In camp 42 days. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Mohamad Wali",
	    "Life Lesson": "Live a good life if you can and keep yourself informed",
	    "Story Behind the lesson": "I studied for 8 years. There was no money to buy books or for school fees, so I had to drop out. In Europe, I am facing a bigger problem. But the crux is the same of me not having any money. ",
	    "Age": 19,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 4 months",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Tarake",
	    "Life Lesson": "Serve your nation and take pride in it",
	    "Story Behind the lesson": "What is the life of a refugee? Your food and shoes are on the same floor. I have been running and trying to escape this every night for past two months. I am not keeping well. I get to bathe once in one or two weeks. The struggles never end here. It would have been better to be tortured and tired in my homeland; then in a foreign land. ",
	    "Age": 19,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 2 months",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Laal Mohamed",
	    "Life Lesson": "Stop the war",
	    "Story Behind the lesson": "I studied for fourteen years of my life. I wanted to be something but I couldn't. I now hope to see an accompolished person emerging in my own village. I wish there was no war. I had amazing classmates who could be changemakers. I miss them. If I would have had the opportunity to study I would study agriculture and bring development. I have chosen to be a refugee, to sacrifice my life, so that my younger brothers and my children can fulfil my dream.",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "In the camp for 1 month",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Aminullah",
	    "Life Lesson": "Don't come to Europe",
	    "Story Behind the lesson": "I walked for nearly seven months to get to Europe. Sometimes, we would get a train or a bus, but mostly it was on foot. I came from Afghanistan to Iran to Turkey to Bulgaria to Serbia to Hungary to Austira to Italy to France. We slept in parks, sidewalks but mostly in the jungles. I am so angry about life as I never thought it would be this hard. Specially, because I came with my own wish. I informed my parents after reaching here. Now, when they call I lie to them saying, ",
	    "Age": 14,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Veyr innocent ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Faizullah ",
	    "Life Lesson": "Become educated",
	    "Story Behind the lesson": "I live in the jungle and it is not a place for humans. Monsters woud also refuse to stay here, if given a choice. It is important for everyone to create a good life. I am illiterate, so whenever I go to a new city, I can't understand the sign boards or the instructions. I feel helpless over and over again. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Dowran Khan",
	    "Life Lesson": "Peace, contentment and forgiveness are the most important qualities that a person should have",
	    "Story Behind the lesson": "Peace - I am trying attain peace as much as I can and that helps me to calm myself down. Contentment - Trying to make a living out of what I have here. Forgiveness - I try not to be angry which helps me forgive someone easily.",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Clear thoughts. Good Listener. ",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tent no 14 - Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mohammad",
	    "Life Lesson": "No matter what the situation is, enjoy your life to the fullest and listen to your heart",
	    "Story Behind the lesson": "",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Good English, Quick Learner, Dreams big. Loves Aamir Khan movies",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tent no 14 - Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Fayaz",
	    "Life Lesson": "World should be filled with peace and harmony",
	    "Story Behind the lesson": "Europe has made me realise this. Everything is so peaceful in Europe. The people, the vibe and everything.",
	    "Age": 22,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Great cook. Makes the best chana dal. Quiet",
	    "Photo": "Chana Dal image",
	    "Audio": "Phone",
	    "Area of the camp": "Tent no 14",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Iqbal",
	    "Life Lesson": "Understading one another is the key",
	    "Story Behind the lesson": "I have learnt it with the amount of people I have met in my life.",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Happy person. Understanding. Patient",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tent no 14 - Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Saif-ur-rehman",
	    "Life Lesson": "Come what may, keep yourself happy and believe in God",
	    "Story Behind the lesson": "I try to pray as much as I can and it gives me peace which in turn helps me gain confidence.",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Welcoming. Kind. Great cook",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tent no 14 - Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Abdul Sattar",
	    "Life Lesson": "People who do bad things have the easiest life and people who do good things have the most difficult life",
	    "Story Behind the lesson": "I lost my wife when I was eighteen. I have never smoked cigarettes or drank alcohol. I try to keep everyone happy and yet I am here.",
	    "Age": 28,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Happiest person in the camp. Spreads happiness with his presence. very giving in nature. Hides his emotions. Smiling face. ",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Sherkhan ",
	    "Life Lesson": "Serve your parents and respect others",
	    "Story Behind the lesson": "",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Fun loving. happy go lucky. loves to joke around",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Shop",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Omar",
	    "Life Lesson": "Respect your parents and everything else will be alright",
	    "Story Behind the lesson": "I think there is one common thing that every person should do in life and that is to respect the ones who have given you birth. I exist because of them. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Owner of the shop. Wants to act in Bollywood. Shy in nature. Sharp face",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Owner of the shop ^",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Hidayat",
	    "Life Lesson": "Be human to all. Love all",
	    "Story Behind the lesson": "l have learnt this after watching the fights between the police and the efugees. They throw tear gas at us without a moment of thinking that we are doing everything for a reason. We, too, want better lives.  ",
	    "Age": 18,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Shy at first, then opened up. looked tensed. Deep thinker",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Shop",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "",
	    "Life Lesson": "",
	    "Story Behind the lesson": "",
	    "Age": null,
	    "Country of Origin": "",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Aval Gul",
	    "Life Lesson": "Defend yourself and get what you want",
	    "Story Behind the lesson": "This is my imagination. I want to be a person like this. That is how I imagine myself to be.",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Great observer. Good listener. Humble",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Shop",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Niyaz",
	    "Life Lesson": "It is your life, live it the way you want it to be",
	    "Story Behind the lesson": "I shouldn't have listened to my friends and come here. I am sure, I would have been happier in Pakistan.",
	    "Age": 27,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Angry with life. Upset.",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Abdul",
	    "Life Lesson": "It is all about the luck",
	    "Story Behind the lesson": "I learnt this lesson by realising if you have a bad luck, you will end up in this camp. And if you have a stroke of good luck, you will be in some safe place.",
	    "Age": 35,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugeen",
	    "Remarks": "Intellect. Eldest in the tent",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Commuity",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Zubair",
	    "Life Lesson": "Keep showering your love on your close ones each day",
	    "Story Behind the lesson": "I have three beautiful kids and I miss them the most here. ",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Beautiful eyes. Emotional. Sensitive",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Junaid Haq",
	    "Life Lesson": "Be content",
	    "Story Behind the lesson": "I have realised this with the difficulties I face in the Jungle. ",
	    "Age": 29,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Serious Kinds.",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Outside the chemical toilet area",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Qader",
	    "Life Lesson": "Life is about good and bad things",
	    "Story Behind the lesson": "I have realised this lesson as I used to think that my life in Afganistan was bad and then when I came to the Jungle I was proven wrong.",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Funny. loves Indian music. Loves Salman Khan",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Usman",
	    "Life Lesson": "Keep yourself clean. Both in terms of hygiene and your acts.",
	    "Story Behind the lesson": "",
	    "Age": 19,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Clean. Loves smoking hash. Helpful",
	    "Photo": "Available",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Zubair Khan",
	    "Life Lesson": "Surround yourself with good people",
	    "Story Behind the lesson": "I have learnt this lesson as I have spent my life both in Pakistan and Afghanistan. Sitting with my friends used to make me happy and positive. I look back at that time and those people as great positive influence on my days. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Innocent. Good listener. Humble. Took time to open up",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "John",
	    "Life Lesson": "Share your love and help others",
	    "Story Behind the lesson": "I have learnt this life lesson from my mother.",
	    "Age": 24,
	    "Country of Origin": "Eritrea",
	    "Status": "Refugee",
	    "Remarks": "Very friendly. Soft spoken",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Tina",
	    "Life Lesson": "We take risks, not to escape life but to prevent life from escaping us",
	    "Story Behind the lesson": "I read this quote somewhere and since then, it has stayed back with me.",
	    "Age": 46,
	    "Country of Origin": "France",
	    "Status": "Volunteer",
	    "Remarks": "Emotional. Kind",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Dowran",
	    "Life Lesson": "Love people who help others",
	    "Story Behind the lesson": "I believe in this as I love people who help the needy and poor.  ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Clear thoughts. Good Listener. ",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Latif",
	    "Life Lesson": "Always do your best and stay away from the evil",
	    "Story Behind the lesson": "I was deported to Afghanistan by England, as I was caught working illegally in a restaurant and now I am here. I want to get back to England and study Mechanical Engineering. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Good Physique. Was living an ideal life when in England. Hobby is Gymming. Speaks good english",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tiger Shop near Afghani community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mustafa",
	    "Life Lesson": "Respect time",
	    "Story Behind the lesson": "I learnt this life lesson from my struggle. Always respect time. It won't stop for anyone.",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Has a great taste in Hindi Retro music and watches a lot of Indian films. Owns a Shop",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Tiger Shop near Afghani community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Khaled",
	    "Life Lesson": "Always be positive and keep that smile alive",
	    "Story Behind the lesson": "I have always been like this since teenage. No matter what happens, I am always smiling. ",
	    "Age": 40,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Looks like Sir Viv Richards. An Intellect. Very welcoming",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Cash (Nickname)",
	    "Life Lesson": "Learn as much as you can. Education is highly important. Live an easy life",
	    "Story Behind the lesson": "I feel education is most important as it helps you organise your life. ",
	    "Age": 20,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very Kind and humble. Has a smiling face. Trustworthy",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese communtiy",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Zain",
	    "Life Lesson": "Fear God and respect everyone. Always be truthful",
	    "Story Behind the lesson": "My parents always taught me to respect everyone and to speak the truth no matter how hard the situation.",
	    "Age": 27,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Loves India. God fearing.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Abdul Hadi Mohd.",
	    "Life Lesson": "Education is the most important thing. Always be happy",
	    "Story Behind the lesson": "I think happiness is one of the most important qualities which helps spread love. ",
	    "Age": 35,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Had an interesting love life. ",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Hatim",
	    "Life Lesson": "Be patient and everything else will be alright",
	    "Story Behind the lesson": "I am patiently waiting for a good life.",
	    "Age": 47,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very quiet in nature. Loves his tea",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese community",
	    "Name of the Interviewer": "Sait"
	}, {
	    "Name": "Nigel",
	    "Life Lesson": "Always give things a second thought",
	    "Story Behind the lesson": "I think I made a terrible decision of coming to Europe. Should have thought more about it. ",
	    "Age": 31,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Believer in god. loves music",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Sudanese community near the school",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Hakim Jahan",
	    "Life Lesson": "Serve the nation",
	    "Story Behind the lesson": "In my life, I have seen many difficult experiences and I think one should serve the nation so that his future generation don't have to go through this kind of refugee life. ",
	    "Age": 28,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Simple living.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Afghani community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mourtada",
	    "Life Lesson": "Develop yourself",
	    "Story Behind the lesson": "I  think developing oneself is highly important for future growth. One can get stuck and never eveolve if they don't focus on themselves. ",
	    "Age": 21,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very smart. Well dressed. Always smiling",
	    "Photo": "N.A",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese Communtiy",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Siddique",
	    "Life Lesson": "Organise yourself and if you keep complaining, you will get a lesson",
	    "Story Behind the lesson": "Ever since, I have learnt this lesson, it helps me stay focused and keeps me away from doing evil things. ",
	    "Age": 25,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "A Graduate. Sharp looks. Well dressed. Very intelligent.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Omar",
	    "Life Lesson": "Be just",
	    "Story Behind the lesson": "I have learnt this lesson as I feel god doesn't help those who do injustice.",
	    "Age": 48,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Tall. Good English. Good listener",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Karim Gani",
	    "Life Lesson": "Always move forward in life",
	    "Story Behind the lesson": "I know I am here for a reason and I will accomplish it one day. Hopefully, one day all of this will make sense.  ",
	    "Age": 46,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Determined and Passionate. Loves his family",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Liyakat Haque",
	    "Life Lesson": "Live in the  present and think about the future. Try getting over your difficult past",
	    "Story Behind the lesson": "My past was terrible and hence, I am now trying to make something out of my present for the sake of my future.",
	    "Age": 29,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Has a positive approach towards life. ",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani Communtiy",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mohammed",
	    "Life Lesson": "Money is highly essential in life",
	    "Story Behind the lesson": "I learnt this lesson after I turned 18. So many of my decisions depended on money.",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Silent. Always thinking. Caring.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Ahmed",
	    "Life Lesson": "Humanity is most important",
	    "Story Behind the lesson": "After I left Afghanistan and came here, I felt that to treat others as human beings is so important. No matter who, every person deserve love and respect. ",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Has good understanding power",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Hassan",
	    "Life Lesson": "Realise and respect the value of money",
	    "Story Behind the lesson": "I have observed the difference of how people treat the rich and the poor. It hurts me to see the discrimination that exists.",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Quiet. Smiling face. Good lsitener.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Himmat",
	    "Life Lesson": "Don't ever fall in love & don't be too friendly to people. And never have too much animosity",
	    "Story Behind the lesson": "If you fall in love you will lose focus in life and in turn end up being sad. It can ruin you in many ways. ",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Trustworthy. Very Welcoming. Great friend. Open to things. ",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Ali",
	    "Life Lesson": "Don't trust anyone",
	    "Story Behind the lesson": "I have learnt this lesson because of my struggle. I feel it is very difficult to be friends with someone these days. ",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Talkative. Happy guy",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mateen",
	    "Life Lesson": "The most important thing is to have sympathy",
	    "Story Behind the lesson": "-",
	    "Age": 33,
	    "Country of Origin": "Iraq",
	    "Status": "Refugee",
	    "Remarks": "Smiling face,",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Sohail Jaani",
	    "Life Lesson": "Treat people right and spend quality time with your loved ones",
	    "Story Behind the lesson": "My elders taught me this. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Very talkative. Happy guy. Good listener.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Shinwari",
	    "Life Lesson": "Give respect, receive respect",
	    "Story Behind the lesson": "I have learnt this from my elders. They have always told me to treat the others with respect and the young ones with a lot of love.  Happiness won't be far away. ",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Shams",
	    "Life Lesson": "The joy of life is when you escape death.",
	    "Story Behind the lesson": "The Taliban caught me and two of my friends. They slit my friends neck and right when they came to me, they heard the azaan and I ran away.",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "Very daring. Loves salman khan and Sanjay Dutt. A happy person by nature.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Caravan",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Anonymous",
	    "Life Lesson": "Dont ever leave your parents",
	    "Story Behind the lesson": "I have made the biggest mistake of coming to this jungle.",
	    "Age": 40,
	    "Country of Origin": "India",
	    "Status": "Refugee",
	    "Remarks": "Very smart. An Intellect. Used to work at Hitachi, Samsung, Lg back in India",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Peace restaurant",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Honey (Nickname)",
	    "Life Lesson": "India is the best nation",
	    "Story Behind the lesson": "I say this as I have realised the importance of freedom after coming to the jungle. India has really been a free nation. ",
	    "Age": 36,
	    "Country of Origin": "India",
	    "Status": "Refugee",
	    "Remarks": "Cell phone repair guy.",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Peace restaurant",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Ismail",
	    "Life Lesson": "Stay away from the wrong. ",
	    "Story Behind the lesson": "My religion has taught me this life lesson.",
	    "Age": 23,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Good cook.",
	    "Photo": "N.A.",
	    "Audio": "Phone",
	    "Area of the camp": "Sudanese Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Tareq ",
	    "Life Lesson": "Be positive. Don't let the negativity ruin your life",
	    "Story Behind the lesson": "I am trying to be positive even in this state of my life. It gives me some hope that things will get better. Or else, what can be cling on to if not hope and positivity. ",
	    "Age": 27,
	    "Country of Origin": "Iraq",
	    "Status": "Refugee",
	    "Remarks": "Very tall. Humble.",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Afghani Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mohammad",
	    "Life Lesson": "Always help those in need",
	    "Story Behind the lesson": "When I help someone it makes that person happy which in turn makes me happy. Such a beautiful circle it completes. ",
	    "Age": 24,
	    "Country of Origin": "Iraq",
	    "Status": "Refugee",
	    "Remarks": "Soft spoken",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Jungle road",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Adam",
	    "Life Lesson": "Live life in peace and make the right choices in life",
	    "Story Behind the lesson": "I think everyone in this world has the right to live in peace. So many people have given up so much to have it. I hope one day we won't have to fight to have it. It will be a norm. ",
	    "Age": 24,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Tall. Considerate",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Jungle road",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Mohammad",
	    "Life Lesson": "Life is very difficult. Try making the most out of it",
	    "Story Behind the lesson": "I have learnt this in the amount of time I have spent in the jungle. I can crib that we get only a handful of things to do here. The food is bad. The nights are cold. But then,  I am still here. I try to laugh it off. Cheer others up. Small things with small efforts make big difference in the way we deal with life. ",
	    "Age": 21,
	    "Country of Origin": "Sudan",
	    "Status": "Refugee",
	    "Remarks": "Very giving. Loves talking. Humourous",
	    "Photo": "N.A.",
	    "Audio": "N.A.",
	    "Area of the camp": "Sudanese Community",
	    "Name of the Interviewer": "Sabit"
	}, {
	    "Name": "Zargai ",
	    "Life Lesson": "Keep your parents happy ",
	    "Story Behind the lesson": "",
	    "Age": 20,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Asab Khan ",
	    "Life Lesson": "Education is important ",
	    "Story Behind the lesson": "",
	    "Age": 16,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Atal Khan ",
	    "Life Lesson": "Complete your education and then find work. Do not leave your country. ",
	    "Story Behind the lesson": "",
	    "Age": 27,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Gulmat Khan ",
	    "Life Lesson": "I would advice all children to study and serve their country",
	    "Story Behind the lesson": "",
	    "Age": 38,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Farooq",
	    "Life Lesson": "Study. Take care of your parents and spend more time in your country",
	    "Story Behind the lesson": "",
	    "Age": 27,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Akram ",
	    "Life Lesson": "Think before you do. Always think of the results. ",
	    "Story Behind the lesson": "",
	    "Age": 23,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Jumagul ",
	    "Life Lesson": "Be happy and keep learning ",
	    "Story Behind the lesson": "",
	    "Age": 20,
	    "Country of Origin": "Pakistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Javed Khan ",
	    "Life Lesson": "Do good and always tell people the truth. There's a thing called afterlife so do good. ",
	    "Story Behind the lesson": "",
	    "Age": 20,
	    "Country of Origin": "Pakistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Hazrat ",
	    "Life Lesson": "Be happy ",
	    "Story Behind the lesson": "",
	    "Age": 22,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Tajwali ",
	    "Life Lesson": "Respect elders ",
	    "Story Behind the lesson": "",
	    "Age": 25,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Shaqir",
	    "Life Lesson": "Don't take tension. If you worry, you will always have problems",
	    "Story Behind the lesson": "",
	    "Age": 23,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Wahab Khan ",
	    "Life Lesson": "Educate yourself",
	    "Story Behind the lesson": "",
	    "Age": 40,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Liyakat",
	    "Life Lesson": "Respect elders. Stay with them ",
	    "Story Behind the lesson": "",
	    "Age": 19,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Bahadur Hussain",
	    "Life Lesson": "Live well with your neighbours. Life is a struggle so work hard. ",
	    "Story Behind the lesson": "",
	    "Age": 34,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Arshad Khan ",
	    "Life Lesson": "Don't lose hope ",
	    "Story Behind the lesson": "",
	    "Age": 30,
	    "Country of Origin": "Afghanistan ",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Ismail ",
	    "Life Lesson": "Family is important. Take care of them. ",
	    "Story Behind the lesson": "My family lives in Sudan and I have been out of my country for the past five years. I speak to them often but when I am away from them now, I realize how important it is to live with them. ",
	    "Age": 25,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Mohammad ",
	    "Life Lesson": "Live life like an adventure and face difficult situations. ",
	    "Story Behind the lesson": "In the jungle, there's nothing. Life is very difficult here. Different communities in the jungle fight with each other all the time. I have lived in the jungle for four months and have realised it's better to face life and not get scared.",
	    "Age": 27,
	    "Country of Origin": "Western Sudan ",
	    "Status": "Refugee",
	    "Remarks": "He wants to learn French and wants to study further. Speaks to family very rarely. once in three months. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Petera ",
	    "Life Lesson": "When you hate, it is a waste of energy. ",
	    "Story Behind the lesson": "I had a diificult life growing up. I decided that when I grow up, that's not how I want to raise my children. No obuse, No violence. I wanted their childhood to be different from mine",
	    "Age": 51,
	    "Country of Origin": "Belgium",
	    "Status": "Volunteer",
	    "Remarks": "Distributes food, clothes, other items",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Didier",
	    "Life Lesson": "Respect each other. ",
	    "Story Behind the lesson": "I have had a lot of bad relationships. With my successive spouses and with friends. That has made me realise that you need to respect the person",
	    "Age": 42,
	    "Country of Origin": "Belgium",
	    "Status": "Volunteer",
	    "Remarks": "Distributes food, clothes, other items",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Vanessa",
	    "Life Lesson": "Do not make the same mistake of hating people and starting a war. ",
	    "Story Behind the lesson": "I say that because I have been meeting these people in the camp and it makes me so sad to see their life here and the situation that they have escaped from. No one should be forced to leave their country and family",
	    "Age": 41,
	    "Country of Origin": "Belgium",
	    "Status": "Volunteer",
	    "Remarks": "Has two girls. Has been working in the jungle for one year. distributes food, clothes etc.Is motivated to do what she does because she was once poor and knows how it feels to not have anything. ",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Adil ",
	    "Life Lesson": "Take care of your health.",
	    "Story Behind the lesson": "I was very sick sometime back. My family and I had to suffer a lot. I was an alcoholic and had to live in the hospital for a long time. Since then I have learnt that my health is very important. I do not drink anymore and advise others not to.",
	    "Age": 46,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Was very shy. Didnot open up or knew english. Khalid translated. He cooks for all his friends in the tent",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ibrahim ",
	    "Life Lesson": "Be happy. Life is difficult so smile through it. ",
	    "Story Behind the lesson": "Life in the jungle is very difficult but I try to be happy. Spending time with my friends makes me happy. ",
	    "Age": 23,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Kamal",
	    "Life Lesson": "Everyone deserves to be free in life. ",
	    "Story Behind the lesson": "There's no freedom in my country. I left my country six years ago. I have been to Kenya, Uganda, Libya and now I am here. I have stopped speaking to my family because they keep asking me where I am. ",
	    "Age": 29,
	    "Country of Origin": "Ethopia",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for one year. Khalid's friend. Says theres no life in the jungle. Happiest memory is when he tried to get on the truck to leave for England and almost succeeded ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ebrahim ",
	    "Life Lesson": "You will be the happiest with your family. Always be with them .",
	    "Story Behind the lesson": "I miss my mother the most. I do not like living in the jungle. Everyone here fights a lot. My mother always taught me to not fight with anyone.  ",
	    "Age": 20,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Very apprehensive of interviews. Opened up after a lot of convincing. Has not had a single memory in the jungle that makes him happy",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ali ",
	    "Life Lesson": "You don't always win. Sometimes you lose. ",
	    "Story Behind the lesson": "I have lost a lot in my life. i have never stayed in one place, always kept moving.  I am trying to make a new life in the jungle. ",
	    "Age": 35,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for three months. Has a lot of friedns in the jungle. ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Amadi ",
	    "Life Lesson": "Do not live in the jungle. Leave as soon as you can ",
	    "Story Behind the lesson": "I miss my family. Life in the jungle is not worth living and I will tell everyone not to come here. ",
	    "Age": 25,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for seven months ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Amira ",
	    "Life Lesson": "Just help people.Respect them and  Don't treat them like animals ",
	    "Story Behind the lesson": "Learnt it in life and from situations. Respect is the most important feeling towards another human being. ",
	    "Age": 23,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Will live in the jungle three days from now. Doesnt want to but dont have a place to live anywhere else. Visiting a friend in the jungle. Wants to study french and become a doctor",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Abdeen ",
	    "Life Lesson": "Be strong in the jungle. Do not fight and live peacefully. ",
	    "Story Behind the lesson": "Countries are fighting war. They need to stop and spread peace. ",
	    "Age": 33,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Friend of Amira. Living in the jungle for the past five months. ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Abdullah ",
	    "Life Lesson": "To respect the old and the young. Old have wisdom and young are the future. ",
	    "Story Behind the lesson": "Learnt it from life. You can only be happy with people whom you respect. ",
	    "Age": 25,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Jaenne",
	    "Life Lesson": "To open up. Be Accepting of people",
	    "Story Behind the lesson": "The birth of my daughter taught me this. I had a lot of anger inside. But when she was born, I did not want her to bear the brunt of it. I decided to change myself . There's no use in protecting yourself from people. I also went travelling with hippies in the 80's. It was not my scene at all but I decided to try it out. We did strange activities like dancing on weird songs in the middle of nowhere, with no electricity and water. It made me realise that no matter how different, everything is a human experience. ",
	    "Age": 42,
	    "Country of Origin": "France",
	    "Status": "Volunteer ( Masseuse)",
	    "Remarks": "What she likes about masssaging is that it is reciprocative. You give and recieve at the same time. When she feels someone reliveing tension and trusting her, it makes her happy. It teaches me to just respond to touch and listen. ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Issa",
	    "Life Lesson": "Do not live a refugee life. Its better to live in your own country where you are loved. ",
	    "Story Behind the lesson": "I miss everything about home. Theres nothing in the jungle, no happiness. If my country was not at war, I would go back. I want peace",
	    "Age": 22,
	    "Country of Origin": "Ethopia",
	    "Status": "Refugee",
	    "Remarks": "Been living in the jungle for the past four months. Did not agree for a picture or voice recording because hes on criminal records",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ahmed",
	    "Life Lesson": "Education is important. Also stay in your country. It needs you. ",
	    "Story Behind the lesson": "No particular story. learnt it from life",
	    "Age": 47,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Did not speak much because of throat pain. Said he would let me take a picture when hes feeling better",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Hamid ",
	    "Life Lesson": "Money is not important. Health is important",
	    "Story Behind the lesson": "My father was always running after money. He fell ill and passed away. Now I wish I had spent more time with him ",
	    "Age": 21,
	    "Country of Origin": "Ethopia",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Rowen ",
	    "Life Lesson": "Wash your socks regularly. ",
	    "Story Behind the lesson": "I did not have clean socks today so had to borrow my friend's socks and he gave me pink socks. Thats why I say its better to wash your own socks so that you dont have to wear a color you dont want to ",
	    "Age": 27,
	    "Country of Origin": "England",
	    "Status": "Volunteer",
	    "Remarks": "Did not explain much. Works at the refugee infobus. ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Nancy ",
	    "Life Lesson": "Always take a weird object with you on your first date ",
	    "Story Behind the lesson": "I say this because it's a good conversation starter. I have a friend who did this and had a a really good time on his first date",
	    "Age": 24,
	    "Country of Origin": "England",
	    "Status": "Volunteer",
	    "Remarks": "Works at the Refugee Info bus ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Madeleine",
	    "Life Lesson": "You should treat everyone the same. If you will be kind to people, they will be kind to you.",
	    "Story Behind the lesson": "I have learnt that living here.All these refugees who I teach are all my friends, I love spending time with them . if I labelled them like how other people do, then they would not be my friends. ",
	    "Age": 26,
	    "Country of Origin": "England",
	    "Status": "Volunteer (Teacher)",
	    "Remarks": "Working in the jungle on and off for the past six months.Teaches at the Darfour school for refugees.Her message to the world is that regardless of which region people come from, they are humans and they need to be treated with dignity. Teaches french at the school and loves her students. Says these refugeees who have nothing are much kinder than the people who have everything",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Faizal ",
	    "Life Lesson": "Stay in a peaceful world ",
	    "Story Behind the lesson": "Learnt it from my life experiences. My country is at war so now I want to leave somewhere peacefully",
	    "Age": 29,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ibrahim ",
	    "Life Lesson": "Live in peace . That's the most important life lesson",
	    "Story Behind the lesson": "Learnt from life",
	    "Age": 27,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Has been in the jungle for the past three weeks. Likes learning French ",
	    "Photo": "Not available",
	    "Audio": "Available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Asir ",
	    "Life Lesson": "It's important for everyone to enjoy thier life and gain education ",
	    "Story Behind the lesson": "When I realised  my country is at war and things are not going to change, I decided to flee it and come here to Europe for an education.",
	    "Age": 38,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past one year. An electric engineer by profession but wants to study further",
	    "Photo": "Available ",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Abrahim",
	    "Life Lesson": "This life is short. So keep cool with everyone and make peace with everyone ",
	    "Story Behind the lesson": "We are from different cultures, background . We speak different languages and follow different religions. But we are all just human beings. So theres no need for war. We should all live together peacefully. ",
	    "Age": 27,
	    "Country of Origin": "Gambia ",
	    "Status": "Refugee",
	    "Remarks": "Studied Islam. Been in the jungle for the past 3-4 weeks.Was in Paris but wanted to experience the life of the jungle so came here and decided to stay for sometime ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Melody ",
	    "Life Lesson": "To be kind and respectful towards other people. It does not matter where they come from, what matters is who they are.",
	    "Story Behind the lesson": "A lot of things have taught me this life lesson, esp my roots. I am half lebanese so I have gotten to experience different cultures and learnt to respect different religions. Also, I have seen war.  ",
	    "Age": 25,
	    "Country of Origin": "France ",
	    "Status": "Volunteer",
	    "Remarks": "Is a psychologist. Goes around the camp asking people if they need any assistance or someone to just talk to. Can speak Arabic as well. Been in the jungle for the past three months .Works with an NGO (Didnot wish to reveal name). Thinks the govt. is noto doing enough to help the new arrivals. ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Anna ",
	    "Life Lesson": "The biggest lesson is sharing, being a human being and having a lot of respect towards each other",
	    "Story Behind the lesson": "I have learnt this by working here. I respect everyone who lives here. These people have gone through so much and deserve to be treated with love and care. It's extremely important to have human relationships and not just rely on  technology. ",
	    "Age": 25,
	    "Country of Origin": "France ",
	    "Status": "Volunteer",
	    "Remarks": "Psychologist. Been working in the jungle for the past six months. Wanted to put her skills to good use for a good cause. Thinks it should be an obligation for everyone to help those in need. Human rights need to be respected. ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Amir ",
	    "Life Lesson": "The most important thing in life is humanity. You should listen to other people and their opinions and you should be open to their cultures",
	    "Story Behind the lesson": "When you are open to other people, you get to learn about where they are coming from. It helps you in increasing your knowledge and horizons. Its important ",
	    "Age": 28,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past one and a half year ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Asin ",
	    "Life Lesson": "Life means peace and respect and work ",
	    "Story Behind the lesson": "Came from a country of war and terrorism so now looks for peace and love ",
	    "Age": 32,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past one year . Wants to go to the UK. ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Khalil",
	    "Life Lesson": "Life is difficult. Wokr hard ",
	    "Story Behind the lesson": "I wanted to be an engineer and study in my own country but I had to flee. Now I want to have a good life and for that I need to work hard.",
	    "Age": 22,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past four months ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Motas ",
	    "Life Lesson": "Respect everyone you meet. Only then they will respect you. ",
	    "Story Behind the lesson": "Not one particular story. Just life. ",
	    "Age": 26,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for seven months. Regrets not completing his education",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Mehroz ",
	    "Life Lesson": "Respect human rights and do not create any borders ",
	    "Story Behind the lesson": "The world is a small village. Everyone should have a choice about where they want to go and live. It's all a big part of human rights.",
	    "Age": 33,
	    "Country of Origin": "Iran ",
	    "Status": "Refugee",
	    "Remarks": "Have been in the jungle for one year three weeks. Does not like to socialise much outside his community ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Road outside the sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Alex ",
	    "Life Lesson": "Live and let live",
	    "Story Behind the lesson": "Learnt it from life ",
	    "Age": 28,
	    "Country of Origin": "Spain ",
	    "Status": "Volunteer",
	    "Remarks": "Distributes food and clothes. Comes to the jungle every two weeks",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Elizabeth ",
	    "Life Lesson": "Be the best you can ",
	    "Story Behind the lesson": "You should do what you love. Only then you will be good at it. You also get to know and recognise what you love doing. ",
	    "Age": 25,
	    "Country of Origin": "Denmark",
	    "Status": "Volunteer",
	    "Remarks": "Teaches English to the refugees everyday ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ozzman Mohammad ",
	    "Life Lesson": "Be patient ",
	    "Story Behind the lesson": "If you are patient, you get everything in life. If you hurry, you will miss the good stuff ",
	    "Age": 16,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past one month ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Suhaib ",
	    "Life Lesson": "Learn to accept others ",
	    "Story Behind the lesson": "Its important to be open towards new human experiences ",
	    "Age": 17,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Aman Shah",
	    "Life Lesson": "Children are the most important resource of the future. they will shape the world ",
	    "Story Behind the lesson": "Its important to give our children the right education. They will be the future of the world",
	    "Age": 34,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Got one son and daughter back in Sudan. Speaks to them twice a day and promises them he will back home soon ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Wasim ",
	    "Life Lesson": "Do what you love ",
	    "Story Behind the lesson": "Didnot get to complete my education.Syrians have many talents but people barely know about them as the country is categorised by just war and terrorism. ",
	    "Age": 36,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "Says questions like these are very emotional for the refugees as they get reminded about their past. Has had many bad experiences in life.",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ahmed ",
	    "Life Lesson": "War will not solve anything. Love each other",
	    "Story Behind the lesson": "Learnt this from his current circumstances ",
	    "Age": 35,
	    "Country of Origin": "Syria ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past nine months ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Janib",
	    "Life Lesson": "Love your parents and resepct them ",
	    "Story Behind the lesson": "They gave you birth and a good life. ",
	    "Age": 45,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Wasima ",
	    "Life Lesson": "Jungle teaches you how to be strong ",
	    "Story Behind the lesson": "The life in the jungle is so difficult. It teaches you so much. How to live and adjust ",
	    "Age": 24,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Doesnot talk much. Very shy ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "",
	    "Life Lesson": "",
	    "Story Behind the lesson": "",
	    "Age": null,
	    "Country of Origin": "",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Abdullah ",
	    "Life Lesson": "Health is important ",
	    "Story Behind the lesson": "You need to be strong to travel from afghanistan to Europe . The journey is very tough ",
	    "Age": 18,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "Is very scared of speaking his mind. Whenever he would try to speak/ask questions on the way they would hit him ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Baharam ",
	    "Life Lesson": "You will always be unhappy if you are not with your family.",
	    "Story Behind the lesson": "Misses home a lot. Biggest regret was to leave his own country and think Europe would give him a good life ",
	    "Age": 32,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past three months. In Afghanistan, Wokred for an american company in the army.Left his job and the country in 2014 because of war and terror of the Taliban",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Israr Ahmed",
	    "Life Lesson": "Listen to what your elders tell you. They are expereicned and have seen life. They always know better. ",
	    "Story Behind the lesson": "My parents are very old and I miss them. They told me not to leave the country and I didnot listen to them. Now I regret my decision. We had a good life in Afghanistan. My father is a doctor and told me to handle his medicine business. But I had a desire to come to Europe. Now I am here and life is worthless. There's nothing here. I miss my own culture and traditions. I am going to the Pakistan embassy tomorrow in the hope that they will organise my papers and I might go back to Pakistan in a few weeks ",
	    "Age": 30,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past seven months. Has also lived in Dubai. Seen a lot in life ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Akhtar ",
	    "Life Lesson": "Don't come to Europe. Stay in your own country. ",
	    "Story Behind the lesson": "Life is difficult here. I am running behind happiness but you can't find it here. There's no electricity, no food. This is not how human beings should live. ",
	    "Age": 23,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "Been here for the 9 months. Wants to go to England. Tries to get on the trucks every day",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Zahoor Ahmed",
	    "Life Lesson": "Education is important. Also, be grateful for your family",
	    "Story Behind the lesson": "Learnt a lot in life. There's nothing here. It's an insult to yourself if you come here. Don't dream of Europe. Stay in your home country. I miss my wife and mother the most. ",
	    "Age": 23,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Been here for the past two months but want to go back to my own country. Haven't spoken to my wife in a month. When I speak to her,I wil tell her how much I miss her ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Ismail",
	    "Life Lesson": "Life is bad. Don't live in the jungle. ",
	    "Story Behind the lesson": "I miss home. Dont want to live here but I dont have a choice. My friend has gone to England. I hope to follow him soon ",
	    "Age": 18,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "Has gold hair. Lovingly called Don by his friends in the jungle",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Silvi ",
	    "Life Lesson": "Follow your heart. Love what you do. ",
	    "Story Behind the lesson": "It's important to do what you love. Otherwise you will never be happy ",
	    "Age": 50,
	    "Country of Origin": "France",
	    "Status": "Volunteer",
	    "Remarks": "Been working in the jungle for four years. Gives legal advice to the refugees and helps them get their papers in order ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Nazir ",
	    "Life Lesson": "Study hard and take care of your parents ",
	    "Story Behind the lesson": "I have a younger sister,Fatima. I would advise her to be at home and study. She should be with my parents and help mama with the chores. Its also important that she should listen to my parents. I have made this life for myself. I would never want her to live this life.  ",
	    "Age": 21,
	    "Country of Origin": "Sudan ",
	    "Status": "Refugee",
	    "Remarks": "Has a lot of friends in the jungle. ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Mazir",
	    "Life Lesson": "Education is important. ",
	    "Story Behind the lesson": "If you are educated, you will be more aware of your surroundings. It's important because it helps you gain knowledge about the world. ",
	    "Age": 27,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "In the jungle for the past 8 months. Wants to live in England. Brother's in Norway. Keeps trying for the 'Game' ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Asif ",
	    "Life Lesson": "Be patient ",
	    "Story Behind the lesson": "You need to be patient and calm to survive the long and dangerous journey.",
	    "Age": 18,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "Came to the jungle through an agent. Has studied only till std. 8th. Left the country as wants to study and in his country there are no schools. Everyhting is been shut down because of Kabul ",
	    "Photo": "Available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Mohammad ",
	    "Life Lesson": "Live with your parents and serve them ",
	    "Story Behind the lesson": "I lived in Kabul with my family, consisting of my parents and siblings. Now that  I am here, I miss them and wish I had not left my country. ",
	    "Age": 22,
	    "Country of Origin": "Afghanistan ",
	    "Status": "Refugee",
	    "Remarks": "Been in the jungle for the past 6 months. Does not like it here. Wants to go back to Afghanistan ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Baharam ",
	    "Life Lesson": "Its possible to live a good life if you have an education ",
	    "Story Behind the lesson": "Knowledge is important so everyone should study and work hard ",
	    "Age": 32,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Afghan community",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Dalila ",
	    "Life Lesson": "Smile even when it's difficult",
	    "Story Behind the lesson": "We should always hope. Even when things get difificult. Thre's always something positive to take out of the situation ",
	    "Age": 36,
	    "Country of Origin": "France ",
	    "Status": "Volunteer",
	    "Remarks": "Been working in the jungle for the past two months ",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Wilhem ",
	    "Life Lesson": "Happiness is possible in difficult times. ",
	    "Story Behind the lesson": "Realised the same when working in the jungle. Look at these people. They have gone through so much but are still laughing and talking with us in this tent and having coffee and a good time ",
	    "Age": 45,
	    "Country of Origin": "France",
	    "Status": "Volunteer",
	    "Remarks": "Comes to visit and work with his wife in the jungle who is volunteer",
	    "Photo": "Not available",
	    "Audio": "Not available",
	    "Area of the camp": "Sudanese community ",
	    "Name of the Interviewer": "Aprajita"
	}, {
	    "Name": "Tyson",
	    "Life Lesson": "Every person has lost something in life.",
	    "Story Behind the lesson": "I learnt this after seeing others after the war and moving to the camp.",
	    "Age": 26,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "Was first hesitant to share his story, but slowly opened up, translated other life lessons for me along with Jon",
	    "Photo": "Available (Shoes)",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area ",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Jon",
	    "Life Lesson": "Help others, give something back, as god has made us for a reason.",
	    "Story Behind the lesson": "I learnt this since now I need help to start a new life.",
	    "Age": 24,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "Jon is known as the king of the card game 'Fire', he goes to Jungle Books everyday to learn English and he's getting better everyday",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Jamal",
	    "Life Lesson": "War won't get you anywhere.",
	    "Story Behind the lesson": "I learnt this after losing everything after the war, my wife my sister and everything.",
	    "Age": 28,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "Shy guy, hooked to his phone.",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Ibrahim",
	    "Life Lesson": "Have time for yourself, protect yourelf. ",
	    "Story Behind the lesson": "I learnt this after coming to the Jungle.",
	    "Age": 21,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "Was really happy in front of the camera.",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Omar",
	    "Life Lesson": "The reality of Europe is not what he heard and thought of, and that life is hard.",
	    "Story Behind the lesson": "I learnt this after leaving home and being own my own",
	    "Age": 23,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "Was not ready to get in front of the camera, but after much convincing posed happily.",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Adnan",
	    "Life Lesson": "Stand up, work hard, and everything will fall into place.",
	    "Story Behind the lesson": "I learnt this after reaching Calais and being away from the family.",
	    "Age": 33,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "A really nice and humble guy, we talked about Cricket and the problems in Kashmir. He respects India in every way",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Salman",
	    "Life Lesson": "No matter what happens, if the other person abuses you, beats you, just have respect for them, they will come back and apologize.",
	    "Story Behind the lesson": "When I was in 4th class, I lost my father, my mother was everything for me, she raised me like this without any money and thought me that, so that other don't think I am without a father.",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "He told me that he hasn't shared this story with any other journalist or people filming the camp, as the story makes him cry, but he opened up to me being comfortbale to share this story, a really humble and nice guy and only has respect to offer others.",
	    "Photo": "Available",
	    "Audio": "-",
	    "Area of the camp": "Afghani Bread Shop",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Majad Ali Khan",
	    "Life Lesson": "Cooking and Eating (Not a joke, he was really serious)",
	    "Story Behind the lesson": "Life circumstances",
	    "Age": 19,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Had nothing to say, he just kept on saying that he has learnt nothing in life apart from cooking and eating.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Sher Khan",
	    "Life Lesson": "Your country is the best thing possible.",
	    "Story Behind the lesson": "I learnt that growing up in Afghanistan, there is not a place in the world like Afghanistan.",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Really frustrated about the war in Afghanistan, would have never left the country if there was no war.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Jamal Khan",
	    "Life Lesson": "Family is everything, settle down and excel.",
	    "Story Behind the lesson": "I learnt that after wasting all my money to come to Europe",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Was the leader figure in the room, translated for me.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Bakhtiar",
	    "Life Lesson": "Serve others, no matter what the situation is. ",
	    "Story Behind the lesson": "I learnt this after I reached the camp and I saw everyone helping each other in harsh conditions.",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Simple guy. Didn't interact much",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Abid Ali",
	    "Life Lesson": "No matter where you are, create your own space.",
	    "Story Behind the lesson": "I learnt that after being in the Jungle.",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Cracked a lot of jokes, even follows the Kapil Sharma Comedy Show.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Khalid",
	    "Life Lesson": "Work hard and keep trying.",
	    "Story Behind the lesson": "I learnt that after not doing so good in school but after that I worked hardand topped college, studied and worked in the U.K after that.",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Came to visit a friend, had some trouble with Visa documents in the UK, now will try for settling in Ireland, or Italy, whatever works.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Sher Khan",
	    "Life Lesson": "Face your problems, stand up and solve them. ",
	    "Story Behind the lesson": "I learnt that after getting hit by so many problems.",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Thought he knew it all, asked about what I do and what exactly I want to achieve with the map, made comments about the passing volunteers.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Gulmarjan",
	    "Life Lesson": "If you do good, you'll get good in return.",
	    "Story Behind the lesson": "I learnt that after not doing much good for the world, and ending up here.",
	    "Age": 31,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Lovely person, took time to open up but in the end sang songs, did some dialogues from Sholay and peshto movies. His all time fav is Sanjay Dutt, believes in Jab tak hai jaan. Says his nation still smells like explosives.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Mohamed Khan",
	    "Life Lesson": "Learn as you are young, and make your country better.",
	    "Story Behind the lesson": "I learnt that after not being able to do anything for the country.",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Owns a shop in the Jungle, offered me red bull and monster drink. Fav movie is Devdas, wants to go to UK, has a brother there. Been in the jungle for about 4 months now.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Zadran Ahmad",
	    "Life Lesson": "Life moves on, just have respect for every person",
	    "Story Behind the lesson": "Parents",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Met him for 5 minutes in the shop. Looked and sounded very reserved",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Sohabit Khan",
	    "Life Lesson": "Stand in the line, your time will come.",
	    "Story Behind the lesson": "I learnt that after coming to the jungle, after I have to stand in line for every basic necessity in life.",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Again a decent guy, believes Afghanistan is the best country.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Baship Ahmad",
	    "Life Lesson": "Life is not fair, just keep learning and keep trying.",
	    "Story Behind the lesson": "When you have to stand on your own and earn money.",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Aziraz",
	    "Life Lesson": "Follow the Quran, and everything will fall into place.",
	    "Story Behind the lesson": "",
	    "Age": 15,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "A 15 year old trying to find his place in the jungle, sent by his parents to earn money.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Nahim",
	    "Life Lesson": "If I knew something, I wouldn't be here, but still I am learning new things everyday.",
	    "Story Behind the lesson": "Exposure in england, worked as a building masonry worker.",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Worked in england. Now trying to go back",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Abib",
	    "Life Lesson": "The most important thing in the world is to care and respect your parents.",
	    "Story Behind the lesson": "Talim, his parents.",
	    "Age": 26,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Has a stomach problem, can't digest maida, gets the medicine from Afghanistan, since the medicines from France don't work. Belonging from mother, carries it everywhere",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "David",
	    "Life Lesson": "You don't have to worry about every single thing in the World.",
	    "Story Behind the lesson": "Parents",
	    "Age": 26,
	    "Country of Origin": "Spain ( Volunteer) (Care for Calais)",
	    "Status": "",
	    "Remarks": "Was teaching English to the Sudanese people, a really nice hard working guy.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Abdullah",
	    "Life Lesson": "Never stop walking",
	    "Story Behind the lesson": "The whole journey from afghanistan, later, and now the camp.",
	    "Age": 15,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Took me to a place where they get tea, we had tea together.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Abit",
	    "Life Lesson": "Don't trust anyone in your life.",
	    "Story Behind the lesson": "Being left alone and duped by the smuggler in Turkey",
	    "Age": 22,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Wants to work for Project Fuel",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Khalil",
	    "Life Lesson": "Life is filled with tensions, but we still learn to survive",
	    "Story Behind the lesson": "Leaving his family",
	    "Age": 23,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Didn't open up much, but his eyes said everything.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Yousuf",
	    "Life Lesson": "Face your problems, you'll get where you want to.",
	    "Story Behind the lesson": "Being an outsider",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Offered us fried chicken as he was cooking.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Khan Wazir",
	    "Life Lesson": "Study when you are young. ",
	    "Story Behind the lesson": "",
	    "Age": 21,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Loves IPL, Virat kohli the fav player.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Zahid Ullah",
	    "Life Lesson": "Have faith, and it will all be good.",
	    "Story Behind the lesson": "Parents",
	    "Age": 21,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Was wearing a cap, really liked getting clicked, had no facebook and email id, so wanted me to print the pictures and give it to him.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Ayad",
	    "Life Lesson": "Blood relation is the most beautiful bond in the world.",
	    "Story Behind the lesson": "After facing so many problems, and still being supported by the family.",
	    "Age": 17,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Baham Davlaze",
	    "Life Lesson": "",
	    "Story Behind the lesson": "",
	    "Age": null,
	    "Country of Origin": "",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "",
	    "Audio": "",
	    "Area of the camp": "",
	    "Name of the Interviewer": ""
	}, {
	    "Name": "Jamal",
	    "Life Lesson": "People only respect you when you have money.",
	    "Story Behind the lesson": "I Was betrayed by my relatives when his father passed away.",
	    "Age": 23,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "Comes from a really strong and wealthy family, trying to prove himself and earn some money and go back with pride.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Ikrar",
	    "Life Lesson": "Listen to elder people's advice. Always",
	    "Story Behind the lesson": "If I had, I wouldn't be here.",
	    "Age": 26,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "Had a lot to say, really informed about the whole refugee crisis.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Haider ali",
	    "Life Lesson": "Don't be selfish, what you have respect that",
	    "Story Behind the lesson": "I left my job as a bank manager in pakistan, for this. ",
	    "Age": 28,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "Smart and humble, had a respectful life back in Pakistan.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Aashiq",
	    "Life Lesson": "Take care of your family, as it's the most important thing.",
	    "Story Behind the lesson": "Being away from them for so many years.",
	    "Age": 28,
	    "Country of Origin": "Pakistan",
	    "Status": "",
	    "Remarks": "The cook/leader and the most respected guy in the tent, married an indian back in Dubai, left due to some tension, now trying for england.",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Yasin",
	    "Life Lesson": "Money is everything",
	    "Story Behind the lesson": "I have come here, so far away, just to make a lot of money.",
	    "Age": 10,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "Pakistani tent loved him, and make food for him, his other cousin has reached England, now he is alone with another family, and wants to be in England to earn a lot of money for his family.",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Afghan Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Madib",
	    "Life Lesson": "Always fight for your human rights.",
	    "Story Behind the lesson": "I want to work for my future, and be someone.",
	    "Age": 29,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Ismail Darfur",
	    "Life Lesson": "After being in the war, and seeing the dead bodies of my loved ones, that was my awakening call, and I want to work on my future now.",
	    "Story Behind the lesson": "Being in the war",
	    "Age": 25,
	    "Country of Origin": "Sudan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Azi Ahmad",
	    "Life Lesson": "Talim (education), the most essential thing while growing up.",
	    "Story Behind the lesson": "Parents, and exposure to Europe",
	    "Age": 60,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Matteau",
	    "Life Lesson": "Have compasion for each and every person in the world.",
	    "Story Behind the lesson": "I was raised like that.",
	    "Age": 18,
	    "Country of Origin": "France (Volunteer)",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Saar Depuydt",
	    "Life Lesson": "Learn to make time for each  other and listen.",
	    "Story Behind the lesson": "Calais, and working for people in Calais, it changed me as a person",
	    "Age": 35,
	    "Country of Origin": "Belgium (Donates in the camp)",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "Yes",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Mathi Ullah",
	    "Life Lesson": "Family is everything.",
	    "Story Behind the lesson": "Being away from them",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Issad ali Khan",
	    "Life Lesson": "Stay in your country",
	    "Story Behind the lesson": "After suffering here in Calais",
	    "Age": 30,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Khan",
	    "Life Lesson": "Stay in your country",
	    "Story Behind the lesson": "Missing parents",
	    "Age": 24,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Mohammed Walli",
	    "Life Lesson": "Stay with your family",
	    "Story Behind the lesson": "After realizing how everything is so tough without them, and their support",
	    "Age": 25,
	    "Country of Origin": "Afghanistan",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "Sukhjinder Singh",
	    "Life Lesson": "There's no country like India",
	    "Story Behind the lesson": "After leaving a good life from India",
	    "Age": 30,
	    "Country of Origin": "India",
	    "Status": "",
	    "Remarks": "",
	    "Photo": "No",
	    "Audio": "-",
	    "Area of the camp": "Sudanese Area",
	    "Name of the Interviewer": "Vibhor"
	}, {
	    "Name": "",
	    "Life Lesson": "",
	    "Story Behind the lesson": "",
	    "Age": null,
	    "Country of Origin": "",
	    "Department at the warehouse ": "",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Cristina Collado ",
	    "Life Lesson": "Say no to nothing and just do it. If you fail, you can try again. ",
	    "Story Behind the lesson": "Travelled through South East Asia. People told me not to make the motor bikes but I ended up getting on them and it was a lot of fun even though we had a little accident  ",
	    "Age": 24,
	    "Country of Origin": "Spain ",
	    "Department at the warehouse ": "New volunteer",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Rowja Keifer ",
	    "Life Lesson": "Always share. One side of giving and one side of tkaing is very special. ",
	    "Story Behind the lesson": "",
	    "Age": 30,
	    "Country of Origin": "France ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Sally Rylett ",
	    "Life Lesson": "Work with people around you and take from the community. Also, it's better to work in a group rather than worknig individually ",
	    "Story Behind the lesson": "Worked on a lot of projects alone and realised its always better when everyone works together. It's always more gratifying to use everyone's talents. ",
	    "Age": 23,
	    "Country of Origin": "Canada",
	    "Department at the warehouse ": "Kithchen food distribution",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Sarah Sendar ",
	    "Life Lesson": "It's important to be kind and try to be cheerful all the time, even when the chips are down ",
	    "Story Behind the lesson": "Everyone has challenges and it does not cost anything to be kind and it can bring a difference . i was very inspired by my friend who set this kitchen up and I find working here very rewarding. ",
	    "Age": 44,
	    "Country of Origin": "From London, lives in Spain ",
	    "Department at the warehouse ": "Kithchen food distribution",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Sam Robert Jones ",
	    "Life Lesson": "To aspire to help other people and to not get bogged down by always tryign to earn money. Not chasing it liberates  you. ",
	    "Story Behind the lesson": "I set the kitchen up at the warehouse and turned it into a movement. We are all pro-activists here. People get stuck in financial traps. These people need to stop running and realise that its the most important and rewarding to help people.  ",
	    "Age": 42,
	    "Country of Origin": "London",
	    "Department at the warehouse ": "Kithchen food distribution",
	    "Contact details (optional)": "refugeecommunitykitchen.com",
	    "Type": "volunteer"
	}, {
	    "Name": "Paula Gallardo ",
	    "Life Lesson": "You can make a difference with your energy, thoughts and ideas. ",
	    "Story Behind the lesson": "Stepping into my ideas and overcoming the fear by doing things wrong. Everthing I do helps. Every lesson is a stepping stone even if I do it wrong. Manifesting my thoughts into actions is what the goal is. ",
	    "Age": 49,
	    "Country of Origin": "Raised in England, Lives in France ",
	    "Department at the warehouse ": "Kithchen food distribution",
	    "Contact details (optional)": "refugeecommunitykitchen @gmail.com",
	    "Type": "volunteer"
	}, {
	    "Name": "Louise Audoux ",
	    "Life Lesson": "To be tolerant and to live in peace. Trust humanity. ",
	    "Story Behind the lesson": "I love to be involved in associations that are doing great humanitarian work. I am going to UNI next year. It's good to experience other cultures and way of living of other people. ",
	    "Age": 17,
	    "Country of Origin": "France ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "James ",
	    "Life Lesson": "There's always so much to learn.  ",
	    "Story Behind the lesson": "I have learnt humility. It's so great to be welcomed into these communities even thoigh they have so littel to offer.",
	    "Age": 27,
	    "Country of Origin": "East Port ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Morven Lindsay ",
	    "Life Lesson": "To drop the ego and be nice ",
	    "Story Behind the lesson": "I learnt this especially when I became a chef. Working in the kitchen can be very stressful. You have all kinds of people working with you. So you need to not have an ego and be nice even when situations get tricky and stressful.",
	    "Age": 45,
	    "Country of Origin": "Scotland",
	    "Department at the warehouse ": "",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "David Bland ",
	    "Life Lesson": "With faith and prayer, so many amazing things can happen. ",
	    "Story Behind the lesson": "It's not just one incident. It's a lot of differnet small life experiences. ",
	    "Age": 44,
	    "Country of Origin": "England ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Ailsling Collins ",
	    "Life Lesson": "Kindness comes from strange places ",
	    "Story Behind the lesson": "A lot of times when I have been in been in trouble, a lot of unexpected people have helped me. It does not always come from the top. Funnily, whenever I am lost in London and dont know where I am going, a homeless person helps me out. ",
	    "Age": 42,
	    "Country of Origin": "Ireland ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Teresa Silva ",
	    "Life Lesson": "Our problems are so insignificant in front of the life of a new arrival ",
	    "Story Behind the lesson": "I have been working in France with refugee children who are going through hell and there are still generous, smiling and loving ",
	    "Age": 64,
	    "Country of Origin": "Portugal ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Julia Galan",
	    "Life Lesson": "Even when you are sad, you have to keep thinking positively. ",
	    "Story Behind the lesson": "Maya Konforti taught me that even in a difficult situation, we need to be strong as only we can bring the change we want to seee in the world. ",
	    "Age": 17,
	    "Country of Origin": "France ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": "juliagalan92 @gmail.com",
	    "Type": "volunteer"
	}, {
	    "Name": "Hannah louise ",
	    "Life Lesson": "To put yourself into other people's shoes before you judge them. Why they are here, what they are trying to do, that they are trying to make the best of a bad situation. ",
	    "Story Behind the lesson": "British people have a lot of attitude and do not understand what it is like to go through difficult periods of time. It's difficult to be displaced and still try to make the most of it but these people are doing it and thats very inspiring. ",
	    "Age": 21,
	    "Country of Origin": "Bath",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Charlotte Mcfarlan ",
	    "Life Lesson": "You can always do something even if not everything. You can try with the small stuff. ",
	    "Story Behind the lesson": "Learnt it when I was working with the Christian aid",
	    "Age": 24,
	    "Country of Origin": "London ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Lucia Llamas",
	    "Life Lesson": "Feel grateful for what you have ",
	    "Story Behind the lesson": "When you look around you and see the pain on the faces of the refugees, you need to be grateful about your life. There are a lot of people who do not have a life as blessed as you. ",
	    "Age": 25,
	    "Country of Origin": "Spain ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Lisa Oxland ",
	    "Life Lesson": "We should be grateful for what we have ",
	    "Story Behind the lesson": "Travelling around the world and seeing how lucky I am, makes me want to work to make a difference. ",
	    "Age": 30,
	    "Country of Origin": "London",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Patricia Mc.Garry ",
	    "Life Lesson": "Change starts at the bottom and not at the top. We also have an individual responsiblility. If we want change, we need to make it. ",
	    "Story Behind the lesson": "I love it when everything comes together in an instant when you are working towards making a change in the world. Things grow organically when people take the initiative. ",
	    "Age": 47,
	    "Country of Origin": "Ireland ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Anouk Taconet ",
	    "Life Lesson": "Be thankful for everything",
	    "Story Behind the lesson": "You should live and never complain because life could be so much harder. We are all humans after all. We should not think about things like  religion and discriminate.",
	    "Age": 17,
	    "Country of Origin": "France ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Jose Sodres ",
	    "Life Lesson": "Doing something for people suffering from terrorism and war is very essential and is a human responsibility",
	    "Story Behind the lesson": "I have a comfotable life and good economic conditions. My life is too good compared to the people we see here in Calais. It's amazing how people can survive in these incredibly poor conditions. ",
	    "Age": 57,
	    "Country of Origin": "Portugal ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Adam Kriemeia",
	    "Life Lesson": "Be nice to everyone including those you don't know and who aren't nice to you",
	    "Story Behind the lesson": "The quantity of people who have helped me and have been nice to me have helped me learn this lesson ",
	    "Age": 27,
	    "Country of Origin": "England ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Rose Goodhart ",
	    "Life Lesson": "Today matters",
	    "Story Behind the lesson": "I am teacher and my life lesson comes from the vision of my school. How you change something and you must live in the present to do that ",
	    "Age": 25,
	    "Country of Origin": "London ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Leah Goldkorn ",
	    "Life Lesson": "Don't take life too seriously. ",
	    "Story Behind the lesson": "Kind of everything building up , small experiences have taught me that.",
	    "Age": 25,
	    "Country of Origin": "England ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Valerie Rive ",
	    "Life Lesson": "Discover life. Take the opportunity and find out for yourself. ",
	    "Story Behind the lesson": "I went to India for work in Bangalore. It's important to meet people who have a differnet culture than you because only then richness is discovered ",
	    "Age": 68,
	    "Country of Origin": "Brussels ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Pascale De Potter",
	    "Life Lesson": "The important one is the other in a person ",
	    "Story Behind the lesson": "For a long time, I could not find my space in this world.When I became open to other people, that's when I realised who I want to be",
	    "Age": 68,
	    "Country of Origin": "Paris ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Ambeen ",
	    "Life Lesson": "If you are kind and help everyone you can, it will make you happy in return ",
	    "Story Behind the lesson": "A lot of small life experiences",
	    "Age": 25,
	    "Country of Origin": "England ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Sophie Fren ",
	    "Life Lesson": "If you tackle your weaknesses, they can and will become your strength. ",
	    "Story Behind the lesson": "Dont think about your weakness as a weakness. It is a strength that you don't know you have",
	    "Age": 27,
	    "Country of Origin": "Windsor ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Declan Loyne ",
	    "Life Lesson": "Smile and respect others ",
	    "Story Behind the lesson": "These are the values that my parents taught me since I was a small child. I follow these values to this day ",
	    "Age": 32,
	    "Country of Origin": "Ireland ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Giles Drew ",
	    "Life Lesson": "Hard work pays off. we need more wisdom in the world ",
	    "Story Behind the lesson": "Having success tells me that I worked hard. Failure taught me that I need to work harder . Also, big problems in life need to be addressed. ",
	    "Age": 44,
	    "Country of Origin": "London ",
	    "Department at the warehouse ": "Dry food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Sarah Austin ",
	    "Life Lesson": "Public service is very important. Helping others is very important. ",
	    "Story Behind the lesson": "My mother was born in Kolkata. Came to France in 1948. All thorugh her life she worked for public service. Working for others' benefit is always a privilege. ",
	    "Age": 44,
	    "Country of Origin": "South Wales ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Kate ",
	    "Life Lesson": "Love yourself only then you will be able to love others. ",
	    "Story Behind the lesson": "Learnt that in life till now. You need to be a confident person and love who you are, no matter what it is. Only then will the others love and respect you. ",
	    "Age": 24,
	    "Country of Origin": "Wales",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "William Jones ",
	    "Life Lesson": "Respect your elders. They brought you into this world ",
	    "Story Behind the lesson": "it's a fact not a life story ",
	    "Age": 26,
	    "Country of Origin": "London ",
	    "Department at the warehouse ": "Kitchen food distribution ",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Hannah Mary ",
	    "Life Lesson": "It's important to look at the past and know that you have changed for the better.",
	    "Story Behind the lesson": "You should not be guilty that you have changed or have become a better person because that's what life is all about. ",
	    "Age": 29,
	    "Country of Origin": "Canada ",
	    "Department at the warehouse ": "",
	    "Contact details (optional)": null,
	    "Type": "volunteer"
	}, {
	    "Name": "Hannah Mary ",
	    "Life Lesson": "It's important to look at the past and know that you have changed for the better.",
	    "Story Behind the lesson": "You should not be guilty that you have changed or have become a better person because that's what life is all about. ",
	    "Age": 29,
	    "Country of Origin": "Canada ",
	    "Type": "volunteer"
	}, {
	    "Name": "Christy Drummond",
	    "Life Lesson": "Never be stuck on just one thing",
	    "Story Behind the lesson": "You can always move around. Don't be lost in a difficult situation. When my parents got divorced, I was stuck on the separation. Looking back, I could have moved on much earlier.  ",
	    "Age": 23,
	    "Country of Origin": "",
	    "Type": "volunteer"
	}, {
	    "Name": "Claire Dumbill",
	    "Life Lesson": "If you have made a good decision, allow your emotions to adjust to it. ",
	    "Story Behind the lesson": "If a situation is bad just act on it and find happiness. After University, I didn't have a great job. So, I just moved out of parents. i took the first good job and promised myself to find along the way the best job or the one I liked. ",
	    "Age": 23,
	    "Country of Origin": "",
	    "Type": "volunteer"
	}, {
	    "Name": "Louise Fleming",
	    "Life Lesson": "Sometimes don't afraid to be selfish",
	    "Story Behind the lesson": "In the refugee crisis context, you can be willing to help everyone as much as you can but you must take care of yourself first. I was burnt out in the two weeks last time I was here. I forgot to eat or to take small breaks. One must take care of oneself first and then help as much as he/she can. \n",
	    "Age": 23,
	    "Country of Origin": "",
	    "Type": "volunteer"
	}, {
	    "Name": "Milagross Razquin",
	    "Life Lesson": "The help is never enough",
	    "Story Behind the lesson": "I am here in this organisation for one week only, but I feel it's not enough for the amount of work I see. The help is not only monetary but also through time. ",
	    "Age": 27,
	    "Country of Origin": "",
	    "Type": "volunteer"
	}, {
	    "Name": "David Baily",
	    "Life Lesson": "You can't take anything for granted",
	    "Story Behind the lesson": "Working at the warehouse that serves the camp taught me that things you have can disappear any moment. ",
	    "Age": 67,
	    "Country of Origin": "Wales",
	    "Type": "volunteer"
	}, {
	    "Name": "Patricia Lopez",
	    "Life Lesson": "Everyone should contribute to help in the refugee crisis. As human beings we need to support each other. ",
	    "Story Behind the lesson": "I feel a lot of people are just watching the news and doing nothing.",
	    "Age": 20,
	    "Country of Origin": "Spain",
	    "Type": "volunteer"
	}, {
	    "Name": "Thore Reigbper",
	    "Life Lesson": "Be yourself",
	    "Story Behind the lesson": "When you have so much influence from people it can be hard to be yourself.",
	    "Age": 18,
	    "Country of Origin": "Switzerland",
	    "Type": "volunteer"
	}, {
	    "Name": "Andrea Sanchez",
	    "Life Lesson": "If people can help you, then you must help them as well. ",
	    "Story Behind the lesson": "I met an old man who had lived many experiences. He told me that the most important thing was to help others. Everyone is looking for a person. You can be that person. ",
	    "Age": 21,
	    "Country of Origin": "Spain",
	    "Type": "volunteer"
	}, {
	    "Name": "Maximilian",
	    "Life Lesson": "Listen to your inner voice and don't worry be happy",
	    "Story Behind the lesson": "Every time when I don't feel good, I listen to myself. So, you don't have to worry and you can be happy.",
	    "Age": 18,
	    "Country of Origin": "Germany",
	    "Type": "volunteer"
	}, {
	    "Name": "Alice Hodgson",
	    "Life Lesson": "Nobody is perfect and nothing is right all the time. The most important thing is to be compassionate. ",
	    "Story Behind the lesson": "My sister was ill for a long time and I remember feeling that I need to take care of her. And that, in that moment nothing else matters. What I feel or would want the situation to be was irrelevant to the fact that I was needed fully and wholeheartedly.",
	    "Age": 22,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Loz Hennessy",
	    "Life Lesson": "Never take life too seriously",
	    "Story Behind the lesson": "I always knew it. But I reinforced it again and nothing went disastrously wrong so far. ",
	    "Age": 25,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Ciara Cohen",
	    "Life Lesson": "Show everyone respect",
	    "Story Behind the lesson": "My parents uprbringing taught me this lesson. Before you come here to help the refugees, you have your own ideas because of the media but everyone is treated equally when it comes to the work to be done. ",
	    "Age": 23,
	    "Country of Origin": "Wales",
	    "Type": "volunteer"
	}, {
	    "Name": "Ines Del Campo",
	    "Life Lesson": "If you do a good thing for people, life ensures it returns it to you. ",
	    "Story Behind the lesson": "My parents and my life experience taught me this. My father was paralyzed for six months. I worked to provide the money. And now, I can travel as I get to volunteer and help others.",
	    "Age": 21,
	    "Country of Origin": "Spain",
	    "Type": "volunteer"
	}, {
	    "Name": "Marina Vizcarro",
	    "Life Lesson": "All people have the rights",
	    "Story Behind the lesson": "It is not fair that some people don't have the life they deserve. My father had three bad economic years. Where he could pay for nothing. Seeing him struggle made me aware of how others would live in worse situations. ",
	    "Age": 18,
	    "Country of Origin": "Spain",
	    "Type": "volunteer"
	}, {
	    "Name": "Ariadna ",
	    "Life Lesson": "Believe in yourself",
	    "Story Behind the lesson": "Four years ago, when I lived through a good and a bad experience both, I was totally alone at that point. I learnt to love myself the way I wanted. ",
	    "Age": 20,
	    "Country of Origin": "Spain",
	    "Type": "volunteer"
	}, {
	    "Name": "Alida Sangrigoli",
	    "Life Lesson": "Never lose hope ",
	    "Story Behind the lesson": "Family issues and my Mom's health tested me to believe this. You don't have to lose hope because you will overcome it soon.",
	    "Age": 26,
	    "Country of Origin": "Italy",
	    "Type": "volunteer"
	}, {
	    "Name": "Chlue Senechal ",
	    "Life Lesson": "It is always going to be alright",
	    "Story Behind the lesson": "Always look on the bright side because it always becomes better. When I am learning English in school in a special class I had difficulty. But sooner than I expected I was speaking the language and started to get comfortable with it. ",
	    "Age": 24,
	    "Country of Origin": "France",
	    "Type": "volunteer"
	}, {
	    "Name": "Yvette Senechal ",
	    "Life Lesson": "The most important thing is a human being",
	    "Story Behind the lesson": "At some point in life everyone has to realise that material things mean nothing. You cannot value items more than people. For me, this realisation was when my one and a half months old child died.",
	    "Age": 51,
	    "Country of Origin": "France",
	    "Type": "volunteer"
	}, {
	    "Name": "Rachael Cummins",
	    "Life Lesson": "Don't play yourself down",
	    "Story Behind the lesson": "I am very much the person who always thinks that I am wrong. I thought most of the time what I have to offer is not good but that's not true. Everyone can be something good or unique. ",
	    "Age": 26,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Calum Paramor",
	    "Life Lesson": "Have people around you that aren't like you",
	    "Story Behind the lesson": "I am quite left wing and an atheist. I ended up in working in a Catholic school. And I found that you know a lot more about what you think when you surround yourself with people who think differently. ",
	    "Age": 23,
	    "Country of Origin": "U.K.",
	    "Type": "volunteer"
	}, {
	    "Name": "Calum McAlaase",
	    "Life Lesson": "Everybody is a human and they have to right to live the way they want to. ",
	    "Story Behind the lesson": "I haven't learnt it specifically because of any one incident. I have pretty much believed it all my life. ",
	    "Age": 9,
	    "Country of Origin": "England and Scotland",
	    "Type": "volunteer"
	}, {
	    "Name": "Kiera",
	    "Life Lesson": "Be nice to yourself",
	    "Story Behind the lesson": "I was quite a serious student. I worked hard to get into Cambridge. And I see people doing the same. But the thing is when you be strict, seriousness comes out of it. ",
	    "Age": 51,
	    "Country of Origin": "Dorset",
	    "Type": "volunteer"
	}, {
	    "Name": "James Taylor",
	    "Life Lesson": "Never stop being happy in any situation",
	    "Story Behind the lesson": "It is by far the best way to make life easier. Whatever happens if you can smile, you can create good energy around yourself. You are always happy. When I was nine, my mother cracked her head open. I called the ambulance. She had a major fit because I called the ambulance despite her saying no. But I did the right thing. I stayed positive about the whole incident. ",
	    "Age": 21,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Sam Williams",
	    "Life Lesson": "Just make sure if you can help somebody and do so",
	    "Story Behind the lesson": "Meeting people in my hometown, giving them some clothing or buying food taught me this. Now I am here working at the warehouse too. ",
	    "Age": 20,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Sara Louisa",
	    "Life Lesson": "Decide to be happy because it is good for health",
	    "Story Behind the lesson": "When you do a lot of things and focus too much, you forget to take it easy. One must relax and take time to enjoy. Difficult situations taught me this. ",
	    "Age": 24,
	    "Country of Origin": "Denmark",
	    "Type": "volunteer"
	}, {
	    "Name": "Lyndsey",
	    "Life Lesson": "It is always good to give",
	    "Story Behind the lesson": "In good places you can give a lot but even in bad places. My life is difficult right now but I have put it aside to focus on what I can do to help.",
	    "Age": 45,
	    "Country of Origin": "U.K.",
	    "Type": "volunteer"
	}, {
	    "Name": "Sarah Alford-Smith",
	    "Life Lesson": "Most people are kind",
	    "Story Behind the lesson": "People really surprise me all the time. I fundraised in 6 days to be able to come and volunteer in Calais for the refugees. We told people we wanted to really go and they helped us get here.",
	    "Age": 41,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Lizzie Cooper",
	    "Life Lesson": "Every bra is different like human beings",
	    "Story Behind the lesson": "I went back to school and kept reliving things. I even changed from being academic to being practical. I am sorting bra sizes for refugees from the donated pile of bras and realizing that human beings are all different life different bras. ",
	    "Age": 25,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Sophie Tod",
	    "Life Lesson": "Try to relate to everyone with a sense of humor",
	    "Story Behind the lesson": "Meeting people you might not see eye to eye with a certain sense of humour always helps. Specially, at work people are different and you have to work with them to reach to a point of agreement.",
	    "Age": 22,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}, {
	    "Name": "Eloise Crockett",
	    "Life Lesson": "Do what you want to do",
	    "Story Behind the lesson": "I wanted to travel the world before going to University to have some life experineces. My collegemates said to straight go to University. But I followed my heart. ",
	    "Age": 20,
	    "Country of Origin": "England",
	    "Type": "volunteer"
	}];

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(4);
	
	var story = document.getElementById('story');
	var how_to = document.getElementById('how_to');
	var duration = 2000;
	story.addEventListener('click', function () {
	    var img = Math.floor(Math.random() * 23) + 1;
	    $('#lesson-title').text('Story').hide().fadeIn(duration);
	    $('#lesson-story').html("<p>Calais Jungle was, until recently, an illegal refugee and migrant camp in the south of France where nearly 7000 refugees from more than eight nationalities had temporarily settled. These were not just refugees displaced by conflict in their home countries but also economic and political refugees, amongst others. Most residents of the camp who we interacted with had one big goal - to smuggle themselves into the United Kingdom via lorries / ferries /cars / trains travelling to the UK. </p><p>Today, while the camp no longer exists - since all 7000 of its residents were evicted by French authorities on 24th October 2016 - the wisdom of its refugees lives on.</p><p>Using the satellite map of the Calais Jungle we've created a digital map, which is one of the many outcomes of the <a target=\"_blank\" href=\"http://projectfuel.in/themasterpiecetour/3.php\">Masterpiece Tour 2016</a>. </p><p>These life lessons are of men and women who have walked for seven months across the forests of Bulgaria, have drank diesel to hydrate themselves in the Sahara desert, have been imprisoned in Libya for absence of documents and most importantly, have been separated from a sense of home over and over again. Delve into Calais with these life lessons and then, pass on the map so someone else may explore the legacy too.</p><p> A <a target=\"_blank\" href=\"http://www.projectfuel.in/\">Project FUEL</a> initiative<br><br>Photo Credits: <a  target=\"_blank\" href=\"https://vibhoryadav.com/\">Vibhor Yadav</a><br>Map designed and developed by: <a target=\"_blank\" href=\"http://ravisuhag.com/\">Ravi Suhag</a></p>").hide().fadeIn(duration);
	    $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
	    $('#lesson-author').text('').hide().fadeIn(duration);
	});
	
	how_to.addEventListener('click', function () {
	    var img = Math.floor(Math.random() * 23) + 1;
	    $('#lesson-title').text('How to use').hide().fadeIn(duration);
	    $('#lesson-story').html("Click on any of the blue wisdom pins that you see on the map to discover life lessons from Calais refugees who we met during our 10-day-stay at the camp. The yellow pins on the map are life lessons of volunteers from <a href=\"http://www.laubergedesmigrants.fr\">L'auberge des migrants</a>, who generously devoted their time to the camp. <p> A <a target=\"_blank\" href=\"http://www.projectfuel.in/\">Project FUEL</a> initiative<br><br> Photo Credits: <a  target=\"_blank\" href=\"https://vibhoryadav.com/\">Vibhor Yadav</a><br>Map designed and developed by: <a target=\"_blank\" href=\"http://ravisuhag.com/\">Ravi Suhag</a></p>").hide().fadeIn(duration);
	    $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
	    $('#lesson-author').text('').hide().fadeIn(duration);
	});

/***/ }
]);
//# sourceMappingURL=app.bundle.js.map