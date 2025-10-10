'use strict';

// Global Variables
const SECTION_1_ID = 'section-1';
const COOKIE_CONTAINER_ID = 'cookie-container';
const LEARN_MORE_BTN_ID = 'learn-more-btn';
const MODAL_ID = 'modal-container';
const MODAL_SUBMIT_BTN_ID = 'modal-submit-btn';

const APP_LOGO_CLASS = 'logo-img';
const OPEN_ACCOUNT_BTN_CLASS = 'open-account-btn';

const ROTATE_STYLE = 'rotate';
const ROTATE_TIME_SECONDS = 0.5;

const ERROR_MESSAGE = {
  getMissingElementWithIdError(id) {
    return `Element with ID: ${id} does not exist in the DOM.`;
  },
  getMissingElementWithClassError(className) {
    return `Element with ClassName: ${className} does not exist in the DOM.`;
  },
};

// Global DOM Elements
const COOKIE_CONTAINER_EL = document.getElementById(COOKIE_CONTAINER_ID);
const SECTION_1_EL = document.getElementById(SECTION_1_ID);
const LEARN_MORE_BTN_EL = document.getElementById(LEARN_MORE_BTN_ID);
const MODAL_CONTAINER_EL = document.getElementById(MODAL_ID);
const MODAL_SUBMIT_BTN = document.getElementById(MODAL_SUBMIT_BTN_ID);

const APP_LOGO_EL = document.querySelector(getQueryForClass(APP_LOGO_CLASS));
const OPEN_ACCOUNT_BTN = document.querySelector(
  getQueryForClass(OPEN_ACCOUNT_BTN_CLASS)
);

// Helper Methods
function getQueryForClass(className) {
  return `.${className}`;
}

function showCookieMessage() {
  const COOKIE_MESSAGE =
    'We use cookies for improved functionality and analytics.';

  const COOKIE_CLOSE_BTN_ID = 'close-cookie-btn';
  const COOKIE_CLOSE_BTN_TEXT = 'Got it!';

  const cookieMessageContainer = document.createElement('div');
  cookieMessageContainer.classList.add(
    'flex-row',
    'align-center',
    'justify-center',
    'cookie-message'
  );
  cookieMessageContainer.innerHTML = `<p>${COOKIE_MESSAGE}</p><button id="${COOKIE_CLOSE_BTN_ID}" class="btn round-btn primary-btn font-poppins-regular">${COOKIE_CLOSE_BTN_TEXT}</button>`;

  if (COOKIE_CONTAINER_EL) {
    COOKIE_CONTAINER_EL.appendChild(cookieMessageContainer);

    document
      .getElementById(COOKIE_CLOSE_BTN_ID)
      .addEventListener('click', () => {
        cookieMessageContainer.remove();
      });
  } else {
    console.error(
      `${ERROR_MESSAGE.getMissingElementWithIdError(
        COOKIE_CONTAINER_ID
      )} Cannot show cookie.`
    );
  }
}

function addLearnMoreBtnScrollEvent() {
  if (LEARN_MORE_BTN_EL) {
    LEARN_MORE_BTN_EL.addEventListener('click', () => {
      if (SECTION_1_EL) {
        SECTION_1_EL.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error(ERROR_MESSAGE.getMissingElementWithIdError(SECTION_1_ID));
      }
    });
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithIdError(LEARN_MORE_BTN_CLASSNAME)
    );
  }
}

function showCreateAccountModal() {
  if (MODAL_CONTAINER_EL) {
    MODAL_CONTAINER_EL.showModal();
  } else {
    console.error(ERROR_MESSAGE.getMissingElementWithIdError(MODAL_ID));
  }
}

function closeCreateAccountModal() {
  if (MODAL_CONTAINER_EL) {
    MODAL_CONTAINER_EL.close();
  } else {
    console.error(ERROR_MESSAGE.getMissingElementWithIdError(MODAL_ID));
  }
}

function setupCreateAccountModal() {
  if (MODAL_SUBMIT_BTN) {
    MODAL_SUBMIT_BTN.addEventListener('click', closeCreateAccountModal);
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithIdError(MODAL_SUBMIT_BTN_ID)
    );
  }
}

function addCreateAccountClickEvent() {
  setupCreateAccountModal();

  if (OPEN_ACCOUNT_BTN) {
    OPEN_ACCOUNT_BTN.addEventListener('click', showCreateAccountModal);
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithClassError(OPEN_ACCOUNT_BTN_CLASS)
    );
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
    console.error(ERROR_MESSAGES.getMissingElementWithClassError('logo-img'));
  }
}

loadEasterEgg();
showCookieMessage();
addCreateAccountClickEvent();
addLearnMoreBtnScrollEvent();
