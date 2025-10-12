'use strict';

// Global Variables
const SECTION_1_ID = 'section-1';
const COOKIE_CONTAINER_ID = 'cookie-container';
const LEARN_MORE_BTN_ID = 'learn-more-btn';
const MODAL_ID = 'modal-container';
const MODAL_SUBMIT_BTN_ID = 'modal-submit-btn';
const NAV_LINKS_CONTAINER_ID = 'nav-links';

const APP_LOGO_CONTAINER_CLASS = 'app-logo';
const LOGO_IMG_CLASS = 'logo-img';
const OPEN_ACCOUNT_BTN_CLASS = 'open-account-btn';
const OPERATIONS_TABS_CONTAINER_CLASS = 'operations-tabs';
const OPERATIONS_TAB_BTN_CLASS = 'operations-tab-btn';
const OPERATIONS_TAB_BTN_ACTIVE_CLASS = 'operations-tab-btn-active';
const OPERATIONS_TABS_CONTENT_CONTAINER_CLASS =
  'operations-tabs-content-container';
const OPERATIONS_TAB_CONTENT_CLASS = 'operations-tab-content';
const OPERATIONS_TAB_CONTENT_ACTIVE_CLASS = 'operations-tab-content-active';
const NAV_CONTAINER_CLASS = 'nav-container';
const NAV_ITEM_CLASS = 'nav-item';
const FADED_CLASS = 'faded';
const VISIBLE_CLASS = 'visible';
const STICKY_CLASS = 'sticky-container';
const HEADER_CONTAINER_CLASS = 'header-container';
const SECTION_CONTAINER_CLASS = 'section-container';
const SECTION_HIDDEN_CLASS = 'section-hidden';
const FEATURES_IMG_CLASS = 'features-img';
const LAZY_IMG_CLASS = 'lazy-img';

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
const NAV_LINKS_CONTAINER_EL = document.getElementById(NAV_LINKS_CONTAINER_ID);

const LOGO_IMG_EL = document.querySelector(getQueryForClass(LOGO_IMG_CLASS));
const OPEN_ACCOUNT_BTN = document.querySelector(
  getQueryForClass(OPEN_ACCOUNT_BTN_CLASS)
);
const OPERATIONS_TABS_CONTAINER_EL = document.querySelector(
  getQueryForClass(OPERATIONS_TABS_CONTAINER_CLASS)
);
const OPERATIONS_TABS_CONTENT_CONTAINER_EL = document.querySelector(
  getQueryForClass(OPERATIONS_TABS_CONTENT_CONTAINER_CLASS)
);
const NAV_CONTAINER_EL = document.querySelector(
  getQueryForClass(NAV_CONTAINER_CLASS)
);
const HEADER_CONTAINER_EL = document.querySelector(
  getQueryForClass(HEADER_CONTAINER_CLASS)
);

// Helper Methods
function getQueryForClass(className) {
  return `.${className}`;
}

// Cookie
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

// Create Account Modal
function showCreateAccountModal() {
  if (MODAL_CONTAINER_EL) {
    MODAL_CONTAINER_EL.showModal();
  } else {
    console.error(ERROR_MESSAGE.getMissingElementWithIdError(MODAL_ID));
  }
}

function closeCreateAccountModal() {
  if (MODAL_CONTAINER_EL) {
    // Clean modal fields before closing
    const MODAL_FIELD_IDS = [
      'create-account-first-name-input',
      'create-account-last-name-input',
      'create-account-email-input',
    ];

    MODAL_FIELD_IDS.forEach((modalFieldId) => {
      const field = document.getElementById(modalFieldId);

      if (field) {
        field.value = '';
      } else {
        console.error(ERROR_MESSAGE.getMissingElementWithIdError(modalFieldId));
      }
    });

    MODAL_CONTAINER_EL.close();
  } else {
    console.error(ERROR_MESSAGE.getMissingElementWithIdError(MODAL_ID));
  }
}

function addCloseCreateAccountModalHandler() {
  if (MODAL_SUBMIT_BTN) {
    MODAL_SUBMIT_BTN.addEventListener('click', closeCreateAccountModal);
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithIdError(MODAL_SUBMIT_BTN_ID)
    );
  }
}

function addCreateAccountClickEvent() {
  addCloseCreateAccountModalHandler();

  if (OPEN_ACCOUNT_BTN) {
    OPEN_ACCOUNT_BTN.addEventListener('click', showCreateAccountModal);
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithClassError(OPEN_ACCOUNT_BTN_CLASS)
    );
  }
}

// Page Scrolling
function addPageNavigationScrollEvents() {
  if (NAV_LINKS_CONTAINER_EL) {
    NAV_LINKS_CONTAINER_EL.addEventListener('click', (e) => {
      e.preventDefault();

      const targetEl = e.target;

      if (targetEl && targetEl.classList.contains('nav-link')) {
        const sectionToScrollId = targetEl.getAttribute('href');

        if (sectionToScrollId) {
          const sectionEl = document.querySelector(sectionToScrollId);

          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error(
              ERROR_MESSAGE.getMissingElementWithIdError(sectionToScrollId)
            );
          }
        } else {
          console.error('Cannot find a valid container id to scroll.');
        }
      }
    });
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithIdError(NAV_LINKS_CONTAINER_ID)
    );
  }
}

function addFadeUnFadeStyle(element, fade) {
  if (element) {
    element.classList.remove(fade ? VISIBLE_CLASS : FADED_CLASS);
    element.classList.add(fade ? FADED_CLASS : VISIBLE_CLASS);
  } else {
    console.error('Trying to add blur/unblur style to invalid element.');
  }
}

function addFadeUnFadeToNavbarItemsNotInFocus(event, fade) {
  const targetEl = event.target;

  if (targetEl && targetEl.classList.contains(NAV_ITEM_CLASS)) {
    const navItemInFocus = targetEl;

    // Fade other nav bar items including logo
    const appLogoEl = NAV_CONTAINER_EL.querySelector(
      getQueryForClass(APP_LOGO_CONTAINER_CLASS)
    );
    addFadeUnFadeStyle(appLogoEl, fade);

    if (NAV_CONTAINER_EL) {
      NAV_CONTAINER_EL.querySelectorAll(
        getQueryForClass(NAV_ITEM_CLASS)
      ).forEach((navItem) => {
        if (navItem !== navItemInFocus) {
          addFadeUnFadeStyle(navItem, fade);
        }
      });
    } else {
      console.error(
        ERROR_MESSAGE.getMissingElementWithClassError(NAV_CONTAINER_CLASS)
      );
    }
  }
}

function addNavLinksFadeOnHoverEffect() {
  if (NAV_CONTAINER_EL) {
    NAV_CONTAINER_EL.addEventListener('mouseover', (e) =>
      addFadeUnFadeToNavbarItemsNotInFocus(e, true)
    );

    NAV_CONTAINER_EL.addEventListener('mouseout', (e) =>
      addFadeUnFadeToNavbarItemsNotInFocus(e, false)
    );
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithClassError(NAV_CONTAINER_CLASS)
    );
  }
}

function addRemoveStickyStyle(element, makeSticky) {
  if (element) {
    makeSticky
      ? element.classList.add(STICKY_CLASS)
      : element.classList.remove(STICKY_CLASS);
  } else {
    console.error('Trying to add/remove sticky style to invalid element.');
  }
}

function addStickyNavbarOnScrollEffect() {
  if (NAV_CONTAINER_EL && HEADER_CONTAINER_EL) {
    const NAV_CONTAINER_EL_HEIGHT =
      NAV_CONTAINER_EL.getBoundingClientRect().height;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry) {
          if (entry.isIntersecting) {
            addRemoveStickyStyle(NAV_CONTAINER_EL, false);
          } else {
            addRemoveStickyStyle(NAV_CONTAINER_EL, true);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${NAV_CONTAINER_EL_HEIGHT}px`,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(HEADER_CONTAINER_EL);
  } else {
    console.error('Cannot add sticky navbar effect');
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
      ERROR_MESSAGE.getMissingElementWithIdError(LEARN_MORE_BTN_ID)
    );
  }
}

function addRevealSectionStyle(sectionElement) {
  if (sectionElement) {
    sectionElement.classList.remove(SECTION_HIDDEN_CLASS);
  } else {
    console.log('Trying to reveal invalid section element.');
  }
}

function addRevealSectionsEffect() {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry && entry.isIntersecting) {
        addRevealSectionStyle(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0.15,
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document
    .querySelectorAll(getQueryForClass(SECTION_CONTAINER_CLASS))
    .forEach((sectionEl) => {
      if (sectionEl) {
        observer.observe(sectionEl);
        sectionEl.classList.add(SECTION_HIDDEN_CLASS);
      } else {
        console.error('Unable to add observer to section.');
      }
    });
}

function lazyLoadFeaturesImages() {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry && entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', () => {
          entry.target.classList.remove(LAZY_IMG_CLASS);
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  document
    .querySelectorAll(getQueryForClass(FEATURES_IMG_CLASS))
    .forEach((featuresImg) => {
      if (featuresImg) {
        observer.observe(featuresImg);
      } else {
        console.error('Unable to add observer to features image.');
      }
    });
}

function loadOperationsTabs() {
  if (OPERATIONS_TABS_CONTAINER_EL) {
    OPERATIONS_TABS_CONTAINER_EL.addEventListener('click', (e) => {
      const targetEl = e.target;

      if (targetEl) {
        const clickedTabBtnEl = targetEl.closest(
          getQueryForClass(OPERATIONS_TAB_BTN_CLASS)
        );

        if (clickedTabBtnEl) {
          const selectedTabNumber = clickedTabBtnEl.dataset.tab;

          if (selectedTabNumber) {
            const selectedTabContentEl =
              OPERATIONS_TABS_CONTENT_CONTAINER_EL.querySelector(
                getQueryForClass(`operations-tab-${selectedTabNumber}`)
              );

            if (selectedTabContentEl) {
              // Clear selected content
              OPERATIONS_TABS_CONTAINER_EL.querySelectorAll(
                getQueryForClass(OPERATIONS_TAB_BTN_CLASS)
              ).forEach((tabBtn) => {
                tabBtn.classList.remove(OPERATIONS_TAB_BTN_ACTIVE_CLASS);
              });

              OPERATIONS_TABS_CONTENT_CONTAINER_EL.querySelectorAll(
                getQueryForClass(OPERATIONS_TAB_CONTENT_CLASS)
              ).forEach((tabContent) => {
                tabContent.classList.remove(
                  OPERATIONS_TAB_CONTENT_ACTIVE_CLASS
                );
              });

              clickedTabBtnEl.classList.add(OPERATIONS_TAB_BTN_ACTIVE_CLASS);
              selectedTabContentEl.classList.add(
                OPERATIONS_TAB_CONTENT_ACTIVE_CLASS
              );
            } else {
              console.error('Unable to find content for the clicked tab');
            }
          } else {
            console.error('Unable to find clicked tab number');
          }
        } else {
          console.error('Unable to find clicked operations tab');
        }
      }
    });
  } else {
    console.error(
      ERROR_MESSAGE.getMissingElementWithClassError(
        OPERATIONS_TABS_CONTAINER_CLASS
      )
    );
  }
}

function loadEasterEgg() {
  if (LOGO_IMG_EL) {
    LOGO_IMG_EL.addEventListener('click', () => {
      LOGO_IMG_EL.classList.add(ROTATE_STYLE);

      setTimeout(() => {
        LOGO_IMG_EL.classList.remove(ROTATE_STYLE);
      }, ROTATE_TIME_SECONDS * 1000);
    });
  } else {
    console.error(
      ERROR_MESSAGES.getMissingElementWithClassError(LOGO_IMG_CLASS)
    );
  }
}

loadEasterEgg();
showCookieMessage();
addCreateAccountClickEvent();
addPageNavigationScrollEvents();
addNavLinksFadeOnHoverEffect();
addStickyNavbarOnScrollEffect();
addLearnMoreBtnScrollEvent();
addRevealSectionsEffect();
lazyLoadFeaturesImages();
loadOperationsTabs();
