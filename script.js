'use strict';

// Global Variables
const NAVIGATION_LOAD_DELAY_TIME_MS = 1000;
const HIDDEN_STYLE = 'hidden';
const ROTATE_STYLE = 'rotate';
const ROTATE_TIME_SECONDS = 0.5;

const ERROR_MESSAGES = {
  containerMissingError(containerId) {
    return `Container with ID: ${containerId} does not exist in the DOM.`;
  },
};

// Global DOM Elements
const BODY_EL = document.body;
const NAVIGATION_EL = document.querySelector('.navigation-container');
const APP_LOGO_EL = document.querySelector('.logo-img');

function showElement(element) {
  if (element) {
    element.classList.remove(HIDDEN_STYLE);
  } else {
    console.error('Trying to show a non-existent element in the DOM.');
  }
}

function loadEasterEgg() {
  if (APP_LOGO_EL) {
    APP_LOGO_EL.addEventListener('click', () => {
      APP_LOGO_EL.classList.add(ROTATE_STYLE);

      setTimeout(() => {
        APP_LOGO_EL.classList.remove(ROTATE_STYLE);
      }, ROTATE_TIME_SECONDS * 1000);
    });
  } else {
    console.error(ERROR_MESSAGES.containerMissingError('App Logo'));
  }
}

function initApp() {
  showElement(BODY_EL);
  loadEasterEgg();

  setTimeout(() => {
    showElement(NAVIGATION_EL);
  }, NAVIGATION_LOAD_DELAY_TIME_MS);
}

initApp();
