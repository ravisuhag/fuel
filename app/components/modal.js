'use strict';

const $ = require('jquery');

var story = document.getElementById('story');
var how_to = document.getElementById('how_to');
var duration = 2000;
story.addEventListener('click', function() {
    var img = Math.floor(Math.random() * 23) + 1;
    $('#lesson-title').text('Story').hide().fadeIn(duration);
    $('#lesson-story').html("<p>Calais Jungle was, until recently, an illegal refugee and migrant camp in the south of France where nearly 7000 refugees from more than eight nationalities had temporarily settled. These were not just refugees displaced by conflict in their home countries but also economic and political refugees, amongst others. Most residents of the camp who we interacted with had one big goal - to smuggle themselves into the United Kingdom via lorries / ferries /cars / trains travelling to the UK. </p><p>Today, while the camp no longer exists - since all 7000 of its residents were evicted by French authorities on 24th October 2016 - the wisdom of its refugees lives on.</p><p>Using the satellite map of the Calais Jungle we've created a digital map, which is one of the many outcomes of the <a target=\"_blank\" href=\"http://projectfuel.in/themasterpiecetour/3.php\">Masterpiece Tour 2016</a>. </p><p>These life lessons are of men and women who have walked for seven months across the forests of Bulgaria, have drank diesel to hydrate themselves in the Sahara desert, have been imprisoned in Libya for absence of documents and most importantly, have been separated from a sense of home over and over again. Delve into Calais with these life lessons and then, pass on the map so someone else may explore the legacy too.</p><p> A <a target=\"_blank\" href=\"http://www.projectfuel.in/\">Project FUEL</a> initiative<br><br>Photo Credits: <a  target=\"_blank\" href=\"https://vibhoryadav.com/\">Vibhor Yadav</a><br>Map designed and developed by: <a target=\"_blank\" href=\"http://ravisuhag.com/\">Ravi Suhag</a></p>").hide().fadeIn(duration);
    $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
    $('#lesson-author').text('').hide().fadeIn(duration);
});

how_to.addEventListener('click', function() {
    var img = Math.floor(Math.random() * 23) + 1;
    $('#lesson-title').text('How to use').hide().fadeIn(duration);
    $('#lesson-story').html("Click on any of the blue wisdom pins that you see on the map to discover life lessons from Calais refugees who we met during our 10-day-stay at the camp. The yellow pins on the map are life lessons of volunteers from <a href=\"http://www.laubergedesmigrants.fr\">L'auberge des migrants</a>, who generously devoted their time to the camp. <p> A <a target=\"_blank\" href=\"http://www.projectfuel.in/\">Project FUEL</a> initiative<br><br> Photo Credits: <a  target=\"_blank\" href=\"https://vibhoryadav.com/\">Vibhor Yadav</a><br>Map designed and developed by: <a target=\"_blank\" href=\"http://ravisuhag.com/\">Ravi Suhag</a></p>").hide().fadeIn(duration);
    $('#lesson-banner').css('background-image', 'url(build/images/pictures/' + img + '.jpg)').hide().fadeIn(duration);
    $('#lesson-author').text('').hide().fadeIn(duration);
});
