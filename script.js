'use strict';

const NAVIGATION_LOAD_DELAY_TIME_MS = 2000;
const HIDDEN_STYLE = 'hidden';

// Global DOM Elements
const BODY_EL = document.body;
const NAVIGATION_EL = document.querySelector('.navigation-container');

function showElement(element) {
  if (element) {
    element.classList.remove(HIDDEN_STYLE);
  } else {
    console.error('Trying to show a non-existent element in the DOM.');
  }
}

function initApp() {
  showElement(BODY_EL);

  setTimeout(() => {
    showElement(NAVIGATION_EL);
  }, NAVIGATION_LOAD_DELAY_TIME_MS);
}

initApp();
