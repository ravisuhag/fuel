'use strict';

var open_about = document.getElementById('open-about');

open_about.addEventListener('click', function() {
    openModal();
});

var close_about = document.getElementById('close-about');

close_about.addEventListener('click', function() {
    closeModal();
});

var overlay = document.getElementById('overlay');

function openModal() {
    overlay.classList.remove("is-hidden");
}

function closeModal() {
    overlay.classList.add("is-hidden");
}