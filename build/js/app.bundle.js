webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Gmap = __webpack_require__(1);
	var Marker = __webpack_require__(2);
	var Lessons = __webpack_require__(3);
	
	google.maps.event.addDomListener(window, 'load', function () {
	
	    var map = Gmap('map');
	    var infowindow = new google.maps.InfoWindow();
	
	    Lessons.forEach(function (lesson, index) {
	
	        var r = 300 / 111300,
	            // = 100 meters
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
	        var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(newY, newX),
	            map: map
	        });
	
	        marker.addListener('click', function () {
	
	            // document.getElementById('lesson-title').textContent = lesson['Life Lesson'];
	            // document.getElementById('lesson-author').textContent = '- ' + lesson['Name'];
	            // document.getElementById('lesson-story').textContent = lesson['Story Behind the lesson'];
	            // var img = Math.floor(Math.random() * 23) + 1;
	            // document.getElementById('lesson-banner').style.backgroundImage = 'url(build/images/pictures/' + img + '.jpg)';
	
	            var img = Math.floor(Math.random() * 23) + 1;
	            var contentString = '<div id="lesson-banner" class="banner" style="background-image: url(build/images/pictures/' + img + '.jpg);"></div>' + '<div>' + '<div id="lesson-title" class="title">' + lesson['Life Lesson'] + '</div>' + '<p id="lesson-story">' + lesson['Story Behind the lesson'] + '</p>' + '<p id="lesson-author" class="u-text-right lesson-author">' + '- ' + lesson['Name'] + ', ' + lesson['Age'] + ' (' + lesson['Country of Origin'] + ')' + '</p>' + '</div>';
	
	            infowindow.close();
	            infowindow.setContent(contentString);
	            infowindow.open(map, marker);
	        });
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (target, options) {
	
	    var defaults = {
	        zoom: 17,
	        center: new google.maps.LatLng(50.9683611, 1.9059048),
	        mapTypeId: 'satellite',
	        styles: [{
	            "featureType": "administrative",
	            "elementType": "labels.text.fill",
	            "stylers": [{
	                "color": "#444444"
	            }]
	        }, {
	            "featureType": "landscape",
	            "elementType": "all",
	            "stylers": [{
	                "color": "#f2f2f2"
	            }]
	        }, {
	            "featureType": "landscape",
	            "elementType": "geometry.fill",
	            "stylers": [{
	                "color": "#f0e3ce"
	            }, {
	                "lightness": "39"
	            }, {
	                "gamma": "1.01"
	            }]
	        }, {
	            "featureType": "poi",
	            "elementType": "all",
	            "stylers": [{
	                "visibility": "off"
	            }]
	        }, {
	            "featureType": "road",
	            "elementType": "all",
	            "stylers": [{
	                "saturation": -100
	            }, {
	                "lightness": 45
	            }]
	        }, {
	            "featureType": "road",
	            "elementType": "geometry",
	            "stylers": [{
	                "color": "#ffffff"
	            }]
	        }, {
	            "featureType": "road.highway",
	            "elementType": "all",
	            "stylers": [{
	                "visibility": "simplified"
	            }]
	        }, {
	            "featureType": "road.arterial",
	            "elementType": "labels.icon",
	            "stylers": [{
	                "visibility": "off"
	            }]
	        }, {
	            "featureType": "transit",
	            "elementType": "all",
	            "stylers": [{
	                "visibility": "off"
	            }]
	        }, {
	            "featureType": "water",
	            "elementType": "all",
	            "stylers": [{
	                "color": "#e7e1d6"
	            }, {
	                "visibility": "on"
	            }]
	        }, {
	            "featureType": "water",
	            "elementType": "geometry",
	            "stylers": [{
	                "color": "#d9d9d9"
	            }]
	        }]
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
	    "Story Behind the lesson": "I have learnt how to miss my mother. I have learnt how to joke with my father. I have learnt how to miss the hugs of my brother. No one should ever learn how to miss something. I left Sudan to come to France and the waiting process here is slow. My wife and I reached an agreement that we should separate because I don't know how long it will take me to get the status. And she shouldn't wait. I have left my two youngs kids behind and have learnt to cry.",
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
	    "Story Behind the lesson": "I was married twice and I got separated both the times. I know how it feels to be all alone when you are starting a new life. That is why I help the refugees in these hard days of their life. I used to give breads to two young boys from Afghanistan who were brothers. One evening, one of them in his attempt to get into the lorry came under it and died. I never forgot that. I never saw something like this before in my life. But I can choose care and understand their situation. ",
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
	    "Story Behind the lesson": "I had this romantic picture of Europe in my head. The very first day I arrived I was shattered with what I saw. Life for a newcomer here wasn't as rosy as everyday said it was. I am have my Masters in Economics and an MBA degree from Peshwar, Pakistan. But look I am here in the jungle running my own restaurant. I hope to open a restaurant in Italy. I have a place in mind. Inshallah someday.",
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
	    "Story Behind the lesson": "My religion has taught me that 'adab'/respect is the key. I teach the same at the mosque. I feel it is the foundation of everything one does in life. ",
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
	    "Story Behind the lesson": "My parents used to guide me in everything in life. Now that I have been in the camp for 6 months, I miss their guidance. Hence, I feel seeking advice from elders is my life lesson",
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
	    "Story Behind the lesson": "I spent 2-3 months just getting to Europe and have been here for nearly 4 months. I want to join the police force as soon as I return to Afghanistan.  One must give as much possible to one's own country. I am learning this now. ",
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
	    "Story Behind the lesson": "My teacher in Aghanistan taught me that you have to show people you value them. Therefore, I try to solve",
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
	    "Story Behind the lesson": "Living in the jungle for over 1 year is not easy. There is enough to do but never really enough. I have dreams of having a family, home and business someday. ",
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
	    "Life Lesson": "You have to beleive in your own power",
	    "Story Behind the lesson": "My mother told me that nothing will be easy. She said believe in yourself completely. I have learnt from her taught you will face many challenges but ultimately if you are willing all is possible. ",
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
	    "Story Behind the lesson": "I have one girl child and realized that if you take care of the children, they will grow up to be good people.  I didn't have a job in Pakistan, just couldn't find one. He was extremely new to the camp just 20 days old. ",
	    "Age": 30,
	    "Country of Origin": "Pakistan",
	    "Status": "Refugee",
	    "Remarks": "We met him during the renovation of his tent by the volunteers. They we putting platforms in his tent.",
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
	    "Story Behind the lesson": "I left Afghanistan in 2010 but found no work since then. I run behind the truck every night.  I have  a dream of making it to England hopefully soon.",
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
	    "Story Behind the lesson": "I have a 4 years old son and a wife back home. But I try to find contenment here in the camp because it is very difficult to go meet them. ",
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
	    "Story Behind the lesson": "I have been in the jungle for one and a half months now. Here there is no respect. People are living in unimaginable situations and therefore aren't in the best mood. Back home there was respect and dignity for everyone. ",
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
	    "Story Behind the lesson": "My father taught me this. He is in Aghanistan now but I remember his words. He used to tell me if you do good deeds it helps you earn respect of others. ",
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
	    "Story Behind the lesson": "When you look around and try to learn from other cultures you will find so many similarities in them. I wanted to be a computer science engineer back in Africa. It's hard because you don't have a computer so how will one learn? In the jungle there are different cultures. For people living here life is not easy but one can learn so much. Leraning from others shows you how to live and communicate. ",
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
	    "Story Behind the lesson": "I miss my family a lot. Away from home I am searching for my future. But this is not out of choice but rather out of compulsion. Warn left me no choice but to leave. ",
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
	    "Story Behind the lesson": "I have 9 people in my family. 1 brother and 8 sisters. My father also was like my friend. When you would see us together you would think two friends are having fun and there is no age difference. ",
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
	    "Story Behind the lesson": "When I reached Italy after a difficult journey, the Police did not take us to a hotel rather they took us to the prison. They made us forcibly give our fingerprints. They tortured me. Used fire and electrocution to get me to give my fingerprints. Now, I try to get to UK but even here the French police doesn't let us go. I don't want to be a loser. Life in the jungle is all about waiting in line. Waiting in line for the food, for the clothes, for the soap. Just waiting. I want to do more in life become a rap artist. ",
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
	    "Story Behind the lesson": "I learnt in the jungle that how comfortable it was to live at home with my parents. Life here is a non-stop struggle under horribe circumstances.",
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
	    "Story Behind the lesson": "It's been 7 years since I have been roaming in France and Italy with no purpose. I have found and learnt nothing new. At least back home I was growing as a person. ",
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
	    "Story Behind the lesson": "When I left my country I realized the value it has. I did not get educated as I lived in the hills and there was no school back there. The life in the jungle is full of danger. There is no house, we all live in tents. I have tried smuggling myself more than 500 times. Sunday is the only day we don't try because no trucks pass from here. Otherwise, I work in the restaurant during the day and try to smuggle myself all night. I wish I could live and die for my own country and not this foreign life in a foreign land. ",
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
	    "Life Lesson": "Education is light",
	    "Story Behind the lesson": "I want to stay to all the children in the world study as much as you can. Learn new things whenever possible. Getting yourself educated is the only thing that can open doors for you. You don't have to depend on a single person to ask the address, check your documents and fill your place. You can do it all by yourself. People who are educated know how to solve problems. ",
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
	    "Story Behind the lesson": "I saw a very close friend in Afghanistan die. I learnt through his death that I will never be able to speak with him again or have a moment of happiness with him again. That struck me really hard that when i leave so many people will have nothing to cherish once I am gone. So I must leave a legacy by doing something impactful. ",
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
	    "Story Behind the lesson": "It is only when I left home I realized the value of mother, father, siblings, friends and my country. The best part about my home was my Mom. I miss her love. A lot of people here say they miss the food their mom cooked but food can always be recreated but never the love with which it was made, served and fed. ",
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
	    "Story Behind the lesson": "I have been living in Europe for 3 years now. And the life in the past three has been so undignified. I look back to realize that 20 years that I spent in Afghanistan were the best years of my life. I miss that the most. In my country, after I returned home after a long day at work I could speak to my parents and eat with them. Here in the jungle, I neither achieve my goal of making it to the truck that takes me to England nor I get the life of dignity. ",
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
	    "Life Lesson": "Stay true to your dream and away from bad habits. ",
	    "Story Behind the lesson": "I used to crush the plastic bottles in a factory in Afghanistan. When I left that, I came to Turkey and sold vegetables. Then I came to Germany and worked in an iron pipe making unit. I also studied German for 3 months. My cousin called me and said come to the jungle as there is hope of going to London. So I left everything and showed up here. I am true to my dream of having a good life and work hard. ",
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
	    "Story Behind the lesson": "The boys who come from Afghanistan, Pakistan or India or the northern Asia region haven't had so much interaction with girls all their life. Here in the jungle they meet white volunteer girls from the UK and fall in love head over heels. They start to lie, steal and don't voilent things to be able to have money to show to these girls that they have a future. They forget they are not here to find love but freedom. Freedom from this jungle.",
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
	    "Story Behind the lesson": "I have faced many struggles in my life. But I showed most courage when I jumped in the boat for the first time in the middle of the night. You cannot directly get into the boat. First, you have to walk in water for few meters. Till the water is around your shoulders. I felt fear but then I jumped because I wanted a better life.",
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
	    "Story Behind the lesson": "In the arab world, if you want to have an ambition or you have a dream then you must be very strong. There is going to be a lot of challenges along the way in protecting that dream. My dream is to be a writer and create more peace in the world.",
	    "Age": 21,
	    "Country of Origin": "Syria",
	    "Status": "Refugee",
	    "Remarks": "His book is titled, ",
	    "Photo": "Available (Hands)",
	    "Audio": "Available",
	    "Area of the camp": "In his Caravan (across Peace restaurant)",
	    "Name of the Interviewer": "Deepak"
	}, {
	    "Name": "Piero",
	    "Life Lesson": "Family is important",
	    "Story Behind the lesson": "Because I want to build one",
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
	    "Life Lesson": "Just love for peace ",
	    "Story Behind the lesson": "Because of the war in Syria I am forced to think about solutions to make people people love for peace. I can do anything for love.",
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
	    "Life Lesson": "Understand the mind of people",
	    "Story Behind the lesson": "My experiences have taught me that amongst all the differences ideas can be found that work for everyone. In Arab world only two-three religions can be found but in Europe or India many religions co-exist. We can learn from them. Europe gives you freedom and helps you work for your dream. ",
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
	    "Story Behind the lesson": "When you work with yourself and put in the right effot you know the truth of the work. When you start something by yourself even if you fail you can start all over again. I have 15 members in my family and so, I wanted to see them happy always. So I left to work in Lebanon and now hace come to France. ",
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
	    "Life Lesson": "Life is very hard",
	    "Story Behind the lesson": "I was at the mosque for the prayers, I returned and saw that my family died because of a bomb attack. I was all alone until my cousin came and rescued me. He brought me to the jungle also. My dream is to go to England. I miss my mother and father the most. The joy of sitting with them, eating, joking was very comforting.  Every person in the jungle ensures that I am happy. I am grateful. ",
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
	    "Story Behind the lesson": "If you speak a lie you have the risk of loosing people. Truth at least brings them back even if they get upset when they hear it and leave. Truth gives a chance even if it is harsh. Lies break heart. And of, course you want people to love you when you die. Speaking the truth is  a good way to ensure that.",
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
	    "Story Behind the lesson": "Ustad Illaudin, my teacher taught me that when you respect others they will respect you too.",
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
	    "Story Behind the lesson": "I learnt from the very beginning of life a lot of things. But I have realized when one doesn't hate or fight with anyone, and you just keep calm you are saving your country in a way. The freedom starts from within first and later from external forces. ",
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
	    "Story Behind the lesson": "During the war, I faced and witnessed a lot of discrimination myself. The Christians are safe in Syria but the Shia, the Sunni have a lot of conflict. ",
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
	    "Life Lesson": "Ensure that all children get benefit of knowledge",
	    "Story Behind the lesson": "I see our children in Sudan die without knowledge. Ever since they are a small child they start holding guns and fighting.  I don't want any kid to cross the sea, walk for months and get here in a place like the jungle. They should have opportunities to make a meaningful life.",
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
	    "Story Behind the lesson": "We have been suffering all our life. I am trusting God to help us make a better future for our children. Step by step we will get there. Hopefully soon than we expect. ",
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
	    "Story Behind the lesson": "Now we all are one community in this jungle. When I came I was alone. We all witness the cold in the night. Some of us miss the lunch and then go hungry the whole day. The time of the future for so many people is getting wasted. ",
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
	    "Story Behind the lesson": "In the journey from Afghanistan to Iran to Turkey to Unan to Greece to Italy to France I realized the value of my home. It is only when I was out of it I felt a major part of me missing. The comfort of your own people is precious. ",
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
	    "Story Behind the lesson": "I first had to learn to bear the pain and anger I had inside me. Then understand what is this situation teaching me. If you have to do something in life you will have to learn how to take it all in and then fight back the challenges. ",
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
	    "Story Behind the lesson": "My father used to teach me these three rules for a good life. I was 8 or 9 at the time and he was a Principal in Momin Model School. When the trouble started at home my friends asked me to go. I was the eldest so I left the country. I worked in Turkey and Italy for two years. But the expenditure was really high so I came to the Calais jungle in the hope of making it to England one day. ",
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
	    "Story Behind the lesson": "My eyes opened as a refugee. My father used to teach me to get educated and do well. Now also whenever he calls he says the same thing about being a changemaker in the world. I should not have dreamt about another land but stayed in my country. ",
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
	    "Story Behind the lesson": "I didn't get educated. I regret it now. I could have been an engineer or a lawyer in my own country. I studied till class 9th only then I started to get bored. I didn't enjoy it at the time. But now even if I want to study now I can't. If I make it to UK, I will have to work doubly hard to make up for the lost time. I have to send money home as I am recently engaged. ",
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
	    "Story Behind the lesson": "It has been 3 years since I left home. Life is very tough as a refugee.  I would suggest to everyone that become everything in your own country. Travel legally but never illegally. I was beaten by the 4 police men last week. It stills hurts. ",
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
	    "Story Behind the lesson": "There was only war & violence in my village. All my life has gone watching people fight. I walked from Turkey to France for 2 months. The most difficult day for me was in the jungle of Bulgaria. I had nothing to eat or drink. The wind was harsh and I could not give up. I was thinking that I only studied till class 5th and now I often think how much education can contribute in making people become better inspite the terrible situations there are in.",
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
	    "Life Lesson": "Wise men go to school others go to war",
	    "Story Behind the lesson": "The war between the government and the Taliban started two years ago in my region. Education can save the world. If I ever make it to the UK I would love to study Political Science as I used to study it in Afghanistan. ",
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
	    "Story Behind the lesson": "In a village you can know only as much. One can be very narrow minded. Travelling opens your eyes and mind. I learnt a good habit to observe people and interact. ",
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
	    "Story Behind the lesson": "I wanted to come to Europe and I did. I followed my heart so I accept the difficulties that come my way. But I see a lot of young children here in the camp and it bothers me. Because their parents have chosen this life for them. Those kids get into wrong habits when they are exposed to this life. ",
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
	    "Story Behind the lesson": "I have learnt that money will come and go. Situations will change with time. The important thing is to remember to believe in something bigger than you. Education helps in accpeting and yet solving a lot of things. ",
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
	    "Story Behind the lesson": "I have been in the camp for 1 years now. I really like when I see people around me or anywhere in the world is living a peaceful life. I came via the big plastic tube through the sea route risking everything. Yet I am very happy and hopeful whenever I see people feeling the same emotions.",
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
	    "Story Behind the lesson": "I was the lone survivor of a boat in the mediterrean sea. Rest of the 16 pepople drowned and died. I swam for 7 hours to save my life. The police did nothing but the Italian people helped me when I got to the shore. I miss my mother a lot. ",
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
	    "Story Behind the lesson": "I hope all the children in Sudan grow up well with good learning and in a good place. Majority of other children of the world have either privilige or protection but the children of Sudan have nothing. Children who come out of a war hve the power to change the world. They learn to live together because they know the price of separation. ",
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
	    "Story Behind the lesson": "I was in the army for 10 years and I only learnt to fight. In my village when Taliban threatened to destroy my family I had to leave both the Army and the country. I was intimated 10 times. I was in Italy for almost 1 year but there is no work there. They pay you 200 Euros which is nothing. ",
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
	    "Story Behind the lesson": "I learnt as a refugee that bread, tea and sleep even the most basic things are not provided for. Police is very strict. There is no chance of going to England a better place. When the plastic bullet hit me I couldn't move for a week. I have no money and I am helpless. ",
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
	    "Story Behind the lesson": "I have left home to get rid free of drugs. I have become an addict because I saw others doing it. People don't trust me but I haven't left home for money or job or anything just to be free of drugs. And I know I won't be able to leave drugs till I make it to England. I don't want to be provided for. I want to earn my own money and save it for better things. ",
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
	    "Story Behind the lesson": "I studied for 8 years. There was no money to buy books or for school fees, so I had to drop out. In Europe, I am facing bigger problem but the crux is the same of me not having any money. ",
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
	    "Story Behind the lesson": "What is the life of a refugee? Your food and shoes are on the same floor. I have been running and trying to escape this every night for past two months. I am not keeping well. I get to bathe once in one or two weeks. The struggles never end here. it would ahve been better to be tortured and tired in my homeland then in a foreign land. ",
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
	    "Story Behind the lesson": "I studied for 14 years of my life. I wanted to be something but I couldn't. I now hope to see an accompolished emerging in my own village. I wish there was no war. I had amazing classmates who could be changemakers. I miss them. If I would have had the opportunity to study I would study agriculture and bring development. I have chosen to be a refugee to sacrifice my life so that my younger brothers and children can fulfil my dream.",
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
	    "Story Behind the lesson": "I walked for nearly 7 months to get to Europe. Sometimes we would get a train or a busy but mostly it was on foot. I came from Afghanistan to Iran to Turkey to Bulgaria to Serbia to Hungary to Austira to Italy to France. We slept in parks, sidewalks but mostly in the jungles. I am so angry about life as I never thought it would be this hard. Specially, because I came with my own wish. I informed my parents after reaching here. Now when they call I lie to them saying I am super happy here because life is more comfortable. The moment I get my papers I will go to see them and share the truth because I miss the love of my parents.",
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
	    "Story Behind the lesson": "I live in the jungle and its not a place for humans. Monsters woud allow refuse to stay here if given a choice. It is important for everyone to create a good life. I am illiterate so whenever I go to a new city I can't understand the sign boards or the instructions. ",
	    "Age": 20,
	    "Country of Origin": "Afghanistan",
	    "Status": "Refugee",
	    "Remarks": "",
	    "Photo": "Available",
	    "Audio": "Available",
	    "Area of the camp": "In the tent located north of peace restaurant",
	    "Name of the Interviewer": "Deepak"
	}];

/***/ }
]);
//# sourceMappingURL=app.bundle.js.map