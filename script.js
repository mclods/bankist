'use strict';

// Account Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  transactions: [
    { amount: 200, transactionDate: '2025-09-30T23:30:48' },
    { amount: 450, transactionDate: '2025-01-06T01:57:50' },
    { amount: -400, transactionDate: '2025-08-02T18:10:43' },
    { amount: 3000, transactionDate: '2025-06-04T05:31:03' },
    { amount: -650, transactionDate: '2025-04-22T16:37:24' },
    { amount: -130, transactionDate: '2025-09-21T16:09:27' },
    { amount: 70, transactionDate: '2025-02-17T21:57:09' },
    { amount: 1300, transactionDate: '2025-10-02T12:23:41' },
  ],
  interestRate: 1.2,
  security: { userName: 'jonas', pin: '1111' },
  culture: { currencyCode: 'EUR', locale: 'de-DE' },
};

const account2 = {
  owner: 'Jessica Davis',
  transactions: [
    { amount: 5000, transactionDate: '2025-01-12T18:39:27' },
    { amount: 3400, transactionDate: '2025-06-30T07:50:44' },
    { amount: -150, transactionDate: '2025-09-21T05:59:29' },
    { amount: -790, transactionDate: '2025-05-02T00:57:48' },
    { amount: -3210, transactionDate: '2025-01-06T20:44:52' },
    { amount: -1000, transactionDate: '2025-06-28T03:17:31' },
    { amount: 8500, transactionDate: '2025-02-28T05:00:11' },
    { amount: -30, transactionDate: '2025-06-17T02:35:19' },
  ],
  interestRate: 1.5,
  security: { userName: 'jess', pin: '2222' },
  culture: { currencyCode: 'USD', locale: 'en-US' },
};

const account3 = {
  owner: 'Steven Thomas Williams',
  transactions: [
    { amount: 200, transactionDate: '2025-08-25T09:16:43' },
    { amount: -200, transactionDate: '2025-09-04T19:13:00' },
    { amount: 340, transactionDate: '2025-05-07T02:42:12' },
    { amount: -300, transactionDate: '2025-05-14T02:32:11' },
    { amount: -20, transactionDate: '2025-09-12T05:09:59' },
    { amount: 50, transactionDate: '2025-04-14T20:30:08' },
    { amount: 400, transactionDate: '2025-04-05T10:10:15' },
    { amount: -460, transactionDate: '2025-03-23T01:19:44' },
  ],
  interestRate: 0.7,
  security: { userName: 'will', pin: '3333' },
  culture: { currencyCode: 'MGA', locale: 'en-MG' },
};

const account4 = {
  owner: 'Sarah Smith',
  transactions: [
    { amount: 430, transactionDate: '2025-06-15T21:12:18' },
    { amount: 1000, transactionDate: '2025-05-17T11:54:24' },
    { amount: 700, transactionDate: '2025-03-15T16:01:36' },
    { amount: 50, transactionDate: '2025-04-29T19:03:21' },
    { amount: 90, transactionDate: '2025-07-27T18:29:10' },
  ],
  interestRate: 1,
  security: { userName: 'sarah', pin: '4444' },
  culture: { currencyCode: 'SGD', locale: 'en-SG' },
};

const account5 = {
  owner: 'Venkatesan Thirumalvalavan',
  transactions: [],
  interestRate: 0.6,
  security: { userName: 'thiru', pin: '5555' },
  culture: { currencyCode: 'INR', locale: 'en-IN' },
};

const ACCOUNTS = [account1, account2, account3, account4, account5];

// Global Variables
const ERROR_HIGHLIGHT_STYLE = 'error-highlight';

const ROTATE_STYLE = 'rotate';
const ROTATE_TIME_SECONDS = 0.5;

const CURRENCY_PRECISION = 2;

const TRANSACTION_TYPE = {
  Deposit: 'deposit',
  Withdrawal: 'withdrawal',
};

const CURRENCY_CODES = {
  EUR: '€',
  USD: '$',
  INR: '₹',
  MGA: 'Ar',
  SGD: 'S$',
};

const SORTING_DIRECTION = {
  ASC: 'ascending',
  DESC: 'descending',
};

const ERROR_MESSAGES = {
  emptyComponentError() {
    return `Trying to render an empty component.`;
  },
  containerMissingError(containerId) {
    return `Container with ID: ${containerId} does not exist in the DOM.`;
  },
  componentMissingError(componentId) {
    return `Component with ID: ${componentId} does not exist in the DOM.`;
  },
  htmlEmptyError(componentId) {
    return `Component with ID: ${componentId} does not have a valid HTML.`;
  },
};

let LOGGED_IN_USER;

let SORTING_POSITION = SORTING_DIRECTION.DESC;

// Global DOM Elements
const welcomeUserTitleEl = document.getElementById('welcome-user-title');
const appLogo = document.querySelector('.logo-img');

// Global Components
const userControlsComponent = {
  containerId: 'user-controls-container',
  getContainer,
  loginComponent: {
    containerId: 'user-controls-container',
    componentId: 'login-container',
    getHtml() {
      return `
        <div id="login-container" class="flex-row align-center login-inputs-gap">
          ${this.getChildHtml()}
        </div>
      `;
    },
    getChildHtml() {
      return `
        <input
          type="text"
          id="login-username-input"
          class="font-poppins-regular login-input"
          placeholder="Username"
        />
        <input
          type="password"
          id="login-pin-input"
          class="font-poppins-regular login-input"
          placeholder="PIN"
        />
        <button id="login-btn" class="bankist-btn login-btn">&rarr;</button>
      `;
    },
    getContainer,
    getComponent,
  },
  logoutComponent: {
    containerId: 'user-controls-container',
    componentId: 'logout-container',
    getHtml() {
      return `
        <div id="logout-container" class="flex-row align-center">
          ${this.getChildHtml()}
        </div>
      `;
    },
    getChildHtml() {
      return `
        <button id="logout-btn" class="bankist-btn logout-btn">
          Logout &rarr;
        </button>
      `;
    },
    getContainer,
    getComponent,
  },
};

const mainComponent = {
  containerId: 'main-container',
  getContainer,
  accountBalanceComponent: {
    data: {
      balanceDate: '',
      balanceValue: '',
    },
    containerId: 'main-container',
    componentId: 'account-balance-container',
    getHtml() {
      return `
        <section id="account-balance-container" class="flex-row account-balance-container">
          ${this.getChildHtml()}
        </section>
      `;
    },
    getChildHtml() {
      return `
        <div class="flex-row align-center full-width">
          <div class="flex-col">
            <p class="balance-title">Current balance</p>
            <p class="balance-date">as of ${formatField(
              this.data.balanceDate
            )}</p>
          </div>
        </div>
        <div class="flex-row align-center justify-end">
          <p class="balance-value">${this.data.balanceValue}</p>
        </div>
      `;
    },
    getContainer,
    getComponent,
  },
  transactionsOperationsComponent: {
    containerId: 'main-container',
    componentId: 'transactions-operations-container',
    getHtml() {
      return `
        <section
          id="transactions-operations-container"
          class="flex-row transactions-operations-container transactions-operations-container-gap"
        >
          ${this.getChildHtml()}
        </section>
      `;
    },
    getChildHtml() {
      return `
        <div id="transactions-container" class="flex-row full-width"></div>
        <div class="flex-col full-width operations-containers-gap">
          <div
            class="flex-col justify-center full-width operation-transfer-container rounded content-padding"
          >
            <div class="flex-row operation-title-container">
              <p class="operation-title">Transfer Money</p>
            </div>
            <div class="flex-row operation-fields-gap">
              <div class="flex-col">
                <input
                  type="text"
                  id="transfer-operation-recipient-input"
                  class="operation-input font-poppins-regular"
                />
                <label
                  class="operation-input-label"
                  for="transfer-operation-recipient-input"
                >
                  Transfer To
                </label>
              </div>
              <div class="flex-col">
                <input
                  type="text"
                  id="transfer-operation-amount-input"
                  class="operation-input font-poppins-regular"
                />
                <label
                  class="operation-input-label"
                  for="transfer-operation-amount-input"
                >
                  Amount
                </label>
              </div>
              <div class="flex-col">
                <button id="transfer-operation-btn" class="bankist-btn operation-btn">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex-col justify-center full-width operation-loan-container rounded content-padding"
          >
            <div class="flex-row operation-title-container">
              <p class="operation-title">Request Loan</p>
            </div>
            <div class="flex-row operation-fields-gap">
              <div class="flex-col">
                <input
                  type="text"
                  id="loan-operation-amount-input"
                  class="operation-input font-poppins-regular"
                />
                <label
                  class="operation-input-label"
                  for="loan-operation-amount-input"
                >
                  Amount
                </label>
              </div>
              <div class="flex-col">
                <button id="loan-operation-btn" class="bankist-btn operation-btn">&rarr;</button>
              </div>
            </div>
          </div>
          <div
            class="flex-col justify-center full-width operation-account-container rounded content-padding"
          >
            <div class="flex-row operation-title-container">
              <p class="operation-title">Close Account</p>
            </div>
            <div class="flex-row operation-fields-gap">
              <div class="flex-col">
                <input
                  type="text"
                  id="account-operation-username-input"
                  class="operation-input font-poppins-regular"
                />
                <label
                  class="operation-input-label"
                  for="account-operation-username-input"
                >
                  Confirm User
                </label>
              </div>
              <div class="flex-col">
                <input
                  type="password"
                  id="account-operation-pin-input"
                  class="operation-input font-poppins-regular"
                />
                <label
                  class="operation-input-label"
                  for="account-operation-pin-input"
                >
                  Confirm PIN
                </label>
              </div>
              <div class="flex-col">
                <button id="account-operation-btn" class="bankist-btn operation-btn">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    },
    getContainer,
    getComponent,
    transactionsComponent: {
      noTransactionsComponent: {
        containerId: 'transactions-container',
        componentId: 'no-transactions-container',
        getHtml() {
          return `
          <div
            id="no-transactions-container"
            class="flex-row justify-center align-center full-width no-transactions-container rounded"
          >
            ${this.getChildHtml()}
          </div>
        `;
        },
        getChildHtml() {
          return `<p class="no-transactions">No transactions to show.</p>`;
        },
        getContainer,
        getComponent,
      },
      transactionsListComponent: {
        containerId: 'transactions-container',
        componentId: 'transactions-list-container',
        getHtml() {
          return `
          <div id="transactions-list-container" class="flex-col full-width">
            ${this.getChildHtml()}
          </div>
        `;
        },
        getChildHtml() {
          return `
            <div id="transaction-items-container" class="flex-col full-width transactions-container-scroll"></div>
            <div id="transaction-controls-container" class="flex-row justify-end"></div>
          `;
        },
        getContainer,
        getComponent,
        transactionListItemComponent: {
          data: {
            type: '',
            transactionDate: '',
            transactionAmount: '',
            styles: '',
          },
          containerId: 'transaction-items-container',
          componentId: 'transaction-container',
          getTypeText(type) {
            let currentType = type?.toLowerCase();

            if (currentType === TRANSACTION_TYPE.Deposit) {
              return getPascalCase(currentType);
            } else if (currentType === TRANSACTION_TYPE.Withdrawal) {
              return getPascalCase(currentType);
            } else {
              console.error(
                `Wrong Transaction Type: ${this.type} is set for Transaction Item`
              );
              return '';
            }
          },
          getTypeCssClass(type) {
            let currentType = type?.toLowerCase();

            if (currentType === TRANSACTION_TYPE.Deposit) {
              return currentType;
            } else if (currentType === TRANSACTION_TYPE.Withdrawal) {
              return currentType;
            } else {
              console.error(
                `Wrong Transaction Type: ${this.type} is set for Transaction Item`
              );
              return '';
            }
          },
          getHtml() {
            return `
            <div
              id="transaction-container"
              class="flex-row no-shrink align-center transaction-container ${
                this.data.styles ?? ''
              }"
            >
              ${this.getChildHtml()}
            </div>
          `;
          },
          getChildHtml() {
            return `
              <div class="flex-row full-width transaction-type-container">
                <div class="transaction-type-chip ${this.getTypeCssClass(
                  this.data.type
                )}-chip">
                  <p class="transaction-type">${this.getTypeText(
                    this.data.type
                  )}</p>
                </div>
              </div>
              <div class="flex-row full-width">
                <p class="transaction-date">${formatField(
                  this.data.transactionDate
                )}</p>
              </div>
              <div
                class="flex-row full-width justify-end transaction-amount-container"
              >
                <p class="transaction-amount">${this.data.transactionAmount}</p>
              </div>
            `;
          },
          getContainer,
          getComponent,
        },
        transactionListControlsComponent: {
          data: {
            sortingDirection: '',
          },
          containerId: 'transaction-controls-container',
          componentId: 'transactions-controller-container',
          getHtml() {
            return `
            <div id="transactions-controller-container" class="transactions-controller-container">
              ${this.getChildHtml()}
            </div>
          `;
          },
          getChildHtml() {
            return `
              <button id="sort-transactions-btn" class="bankist-btn transactions-controller-btn">
                ${this.data.sortingDirection} Sort
              </button>
            `;
          },
          getContainer,
          getComponent,
        },
      },
    },
  },
  transactionsSummaryComponent: {
    data: {
      inAmount: '',
      outAmount: '',
      interestRate: '',
    },
    containerId: 'main-container',
    componentId: 'transactions-summary-container',
    getHtml() {
      return `
        <section
          id="transactions-summary-container"
          class="flex-row transactions-summary-container transactions-summary-items-gap"
        >
          ${this.getChildHtml()}
        </section>
      `;
    },
    getChildHtml() {
      return `
        <div class="flex-row align-center transactions-summary-gap">
          <div>
            <p class="transactions-summary-title">IN</p>
          </div>
          <div>
            <p class="transaction-summary-amount plus-amount">${this.data.inAmount}</p>
          </div>
        </div>
        <div class="flex-row align-center transactions-summary-gap">
          <div>
            <p class="transactions-summary-title">OUT</p>
          </div>
          <div>
            <p class="transaction-summary-amount minus-amount">${this.data.outAmount}</p>
          </div>
        </div>
        <div class="flex-row align-center transactions-summary-gap">
          <div>
            <p class="transactions-summary-title">INTEREST</p>
          </div>
          <div>
            <p class="transaction-summary-amount plus-amount">${this.data.interestEarned}</p>
          </div>
        </div>
      `;
    },
    getContainer,
    getComponent,
  },
};

// Helper Methods
function getContainer() {
  return document.getElementById(this.containerId);
}

function getComponent() {
  return document.getElementById(this.componentId);
}

function getElement(id) {
  const element = document.getElementById(id);

  if (element) {
    return element;
  } else {
    console.error(`Element with ID: ${id} does not exist in the DOM.`);
    return undefined;
  }
}

function clearComponent(component) {
  const containerEl = component.getContainer();

  if (containerEl) {
    containerEl.innerHTML = '';
    return true;
  } else {
    console.error(ERROR_MESSAGES.containerMissingError(component.containerId));
    return false;
  }
}

function renderComponent(component, renderPosition = 'beforeend') {
  if (component) {
    const containerEl = component.getContainer();

    if (containerEl) {
      const componentHtml = component.getHtml();

      if (componentHtml) {
        containerEl.insertAdjacentHTML(renderPosition, componentHtml);

        // Clean Component State
        cleanComponentState(component);
        return true;
      } else {
        console.error(ERROR_MESSAGES.htmlEmptyError(component.componentId));
        return false;
      }
    } else {
      console.error(
        ERROR_MESSAGES.containerMissingError(component.containerId)
      );
      return false;
    }
  } else {
    console.error(ERROR_MESSAGES.emptyComponentError());
    return false;
  }
}

function updateComponent(component) {
  if (component) {
    const componentEl = component.getComponent();

    if (componentEl) {
      const componentChildHtml = component.getChildHtml();

      if (componentChildHtml) {
        componentEl.innerHTML = '';
        componentEl.insertAdjacentHTML('afterbegin', componentChildHtml);

        // Clean Component State
        cleanComponentState(component);
        return true;
      } else {
        console.error(ERROR_MESSAGES.htmlEmptyError(component.componentId));
        return false;
      }
    } else {
      console.error(
        ERROR_MESSAGES.componentMissingError(component.componentId)
      );
      return false;
    }
  } else {
    console.error(ERROR_MESSAGES.emptyComponentError());
    return false;
  }
}

function loadComponent(component, renderPosition) {
  clearComponent(component);
  renderComponent(component, renderPosition);
}

function cleanComponentState(component) {
  if (component.data) {
    component.data = undefined;
  }
}

function updateComponentData(component, data) {
  const updatedComponent = {
    ...component,
    data,
  };

  return updatedComponent;
}

function getPascalCase(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function getWelcomeUserText(userName) {
  return `Hi ${userName}`;
}

function formatField(field) {
  return field ?? '';
}

function formatCurrency(currency, culture) {
  let currencyWithPrecision;

  if (currency === null || currency === undefined) {
    console.error('Currency value is nullish.');
    return '';
  }

  currencyWithPrecision = currency.toFixed(CURRENCY_PRECISION);

  if (culture === null || culture === undefined) {
    console.error('Currency Code is nullish.');
    return currencyWithPrecision;
  }

  // return `${currencyWithPrecision}${CURRENCY_CODES[culture.currencyCode] ?? ''}`;

  const options = {
    style: 'currency',
    currency: culture.currencyCode,
  };

  return Intl.NumberFormat(culture.locale, options).format(
    currencyWithPrecision
  );
}

function getCurrentDateTimeCultureFormatted(culture) {
  const now = new Date();

  // const date = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();

  // const hours = `${now.getHours()}`.padStart(2, 0);
  // const minutes = `${now.getMinutes()}`.padStart(2, 0);

  // return `${date}-${month}-${year} ${hours}:${minutes}`;

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return Intl.DateTimeFormat(culture.locale, options).format(now);
}

function getDateTimeCultureFormatted(dateTimeISOString, culture) {
  const now = new Date(dateTimeISOString);

  // const date = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();

  // const hours = `${now.getHours()}`.padStart(2, 0);
  // const minutes = `${now.getMinutes()}`.padStart(2, 0);

  // return `${date}-${month}-${year} ${hours}:${minutes}`;

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return Intl.DateTimeFormat(culture.locale, options).format(now);
}

function getCurrentDateTimeISOFormatted() {
  return new Date().toISOString();
}

function isEven(num) {
  return num % 2 === 0;
}

function getTransactionType(transactionAmount) {
  return transactionAmount >= 0
    ? TRANSACTION_TYPE.Deposit
    : TRANSACTION_TYPE.Withdrawal;
}

function getSortingArrow(sortingDirection) {
  if (sortingDirection === SORTING_DIRECTION.ASC) {
    return '&uparrow;';
  } else if (sortingDirection === SORTING_DIRECTION.DESC) {
    return '&downarrow;';
  } else {
    console.error('Sorting direction is invalid.');
  }
}

function getFields(...fieldIds) {
  return fieldIds.map((id) => getElement(id));
}

function getLoginFields() {
  return getFields('login-username-input', 'login-pin-input');
}

function getMoneyTransferFields() {
  return getFields(
    'transfer-operation-recipient-input',
    'transfer-operation-amount-input'
  );
}

function getLoadAddFields() {
  return getFields('loan-operation-amount-input');
}

function getCloseAccountFields() {
  return getFields(
    'account-operation-username-input',
    'account-operation-pin-input'
  );
}

function resetLoginFields() {
  const [userName, pin] = getLoginFields();

  userName.value = '';
  pin.value = '';
}

function resetMoneyTransferFields() {
  const [recipient, amount] = getMoneyTransferFields();

  recipient.value = '';
  amount.value = '';
}

function resetLoanAddFields() {
  const [amount] = getLoadAddFields();

  amount.value = '';
}

function resetCloseAccountFields() {
  const [userName, pin] = getCloseAccountFields();

  userName.value = '';
  pin.value = '';
}

function showLoginError() {
  const [userName, pin] = getLoginFields();

  userName.classList.add(ERROR_HIGHLIGHT_STYLE);
  pin.classList.add(ERROR_HIGHLIGHT_STYLE);
}

function showMoneyTransferError() {
  const [recipient, amount] = getMoneyTransferFields();

  recipient.classList.add(ERROR_HIGHLIGHT_STYLE);
  amount.classList.add(ERROR_HIGHLIGHT_STYLE);
}

function showLoanAddError() {
  const [amount] = getLoadAddFields();

  amount.classList.add(ERROR_HIGHLIGHT_STYLE);
}

function showCloseAccountError() {
  const [userName, pin] = getCloseAccountFields();

  userName.classList.add(ERROR_HIGHLIGHT_STYLE);
  pin.classList.add(ERROR_HIGHLIGHT_STYLE);
}

function clearLoginError() {
  const [userName, pin] = getLoginFields();

  userName.classList.remove(ERROR_HIGHLIGHT_STYLE);
  pin.classList.remove(ERROR_HIGHLIGHT_STYLE);
}

function clearMoneyTransferError() {
  const [recipient, amount] = getMoneyTransferFields();

  recipient.classList.remove(ERROR_HIGHLIGHT_STYLE);
  amount.classList.remove(ERROR_HIGHLIGHT_STYLE);
}

function clearLoanAddError() {
  const [amount] = getLoadAddFields();

  amount.classList.remove(ERROR_HIGHLIGHT_STYLE);
}

function clearCloseAccountError() {
  const [userName, pin] = getCloseAccountFields();

  userName.classList.remove(ERROR_HIGHLIGHT_STYLE);
  pin.classList.remove(ERROR_HIGHLIGHT_STYLE);
}

function getTotalBalance(transactions) {
  return transactions.reduce((acc, current) => acc + current, 0);
}

function getDepositsBalance(transactions) {
  return transactions.reduce(
    (acc, current) => (current >= 0 ? acc + current : acc),
    0
  );
}

function getWithdrawalsBalance(transactions) {
  return transactions.reduce(
    (acc, current) => (current < 0 ? acc + current : acc),
    0
  );
}

// Welcome Text Controls
function showWelcomeUserText(userName) {
  if (welcomeUserTitleEl) {
    welcomeUserTitleEl.textContent = getWelcomeUserText(userName);
  } else {
    console.error(ERROR_MESSAGES.containerMissingError('Welcome User Title'));
  }
}

function clearWelcomeUserText() {
  if (welcomeUserTitleEl) {
    welcomeUserTitleEl.textContent = '';
  } else {
    console.error(ERROR_MESSAGES.containerMissingError('Welcome User Title'));
  }
}

// Main Component
function updateAccountBalanceData(component, userAccount) {
  const data = {
    balanceDate: getCurrentDateTimeCultureFormatted(userAccount.culture),
    balanceValue: formatCurrency(
      getTotalBalance(
        userAccount.transactions.flatMap((transaction) => transaction.amount)
      ),
      userAccount.culture
    ),
  };

  return updateComponentData(component, data);
}

function renderAccountBalance(component, userAccount) {
  // Set Data
  const componentToRender = updateAccountBalanceData(component, userAccount);
  renderComponent(componentToRender);
}

function updateAccountBalance(component, userAccount) {
  // Set Data
  const componentToRender = updateAccountBalanceData(component, userAccount);
  updateComponent(componentToRender);
}

function updateTransactionItemData(component, transaction, culture, styles) {
  const data = {
    type: getTransactionType(transaction.amount),
    transactionDate: getDateTimeCultureFormatted(
      transaction.transactionDate,
      culture
    ),
    transactionAmount: formatCurrency(transaction.amount, culture),
    styles,
  };

  return updateComponentData(component, data);
}

function renderTransactionItem(component, transaction, culture, styles) {
  // Set Data
  const componentToRender = updateTransactionItemData(
    component,
    transaction,
    culture,
    styles
  );
  renderComponent(componentToRender);
}

function renderTransactionItems(component, transactions, culture) {
  clearComponent(component);

  const evenRowStyles = 'transaction-container-color';

  transactions
    .slice()
    .reverse()
    .forEach((transaction, index) => {
      renderTransactionItem(
        component,
        transaction,
        culture,
        isEven(index) ? evenRowStyles : ''
      );
    });
}

function updateTransactionListControlsData(component) {
  const data = {
    sortingDirection: getSortingArrow(SORTING_POSITION),
  };

  return updateComponentData(component, data);
}

function renderTransactionListControls(component) {
  // Set Data
  const componentToRender = updateTransactionListControlsData(component);
  loadComponent(componentToRender);
}

function renderTransactionList(component, transactions, culture) {
  loadComponent(component);

  // Render Child Components
  renderTransactionItems(
    component.transactionListItemComponent,
    transactions,
    culture
  );
  renderTransactionListControls(component.transactionListControlsComponent);
}

function renderTransactions(component, userAccount) {
  const hasTransactions = userAccount.transactions.length > 0;

  if (hasTransactions) {
    renderTransactionList(
      component.transactionsListComponent,
      userAccount.transactions,
      userAccount.culture
    );
  } else {
    loadComponent(component.noTransactionsComponent);
  }
}

function renderTransactionsOperations(component, userAccount) {
  renderComponent(component);

  // Render Child Components
  renderTransactions(component.transactionsComponent, userAccount);
}

function updateTransactionSummaryData(component, userAccount) {
  const data = {
    inAmount: formatCurrency(
      getDepositsBalance(
        userAccount.transactions.flatMap((transaction) => transaction.amount)
      ),
      userAccount.culture
    ),
    outAmount: formatCurrency(
      getWithdrawalsBalance(
        userAccount.transactions.flatMap((transaction) => transaction.amount)
      ),
      userAccount.culture
    ),
    interestEarned: formatCurrency(
      getTotalBalance(
        userAccount.transactions.flatMap((transaction) => transaction.amount)
      ) *
        (userAccount.interestRate / 100),
      userAccount.culture
    ),
  };

  return updateComponentData(component, data);
}

function updateTransactionsSummary(component, userAccount) {
  // Set Data
  const componentToRender = updateTransactionSummaryData(
    component,
    userAccount
  );
  updateComponent(componentToRender);
}

function renderTransactionsSummary(component, userAccount) {
  // Set Data
  const componentToRender = updateTransactionSummaryData(
    component,
    userAccount
  );
  renderComponent(componentToRender);
}

function renderMainComponent(userAccount) {
  renderAccountBalance(mainComponent.accountBalanceComponent, userAccount);
  renderTransactionsOperations(
    mainComponent.transactionsOperationsComponent,
    userAccount
  );
  renderTransactionsSummary(
    mainComponent.transactionsSummaryComponent,
    userAccount
  );
  registerMainComponentEventHandlers();
}

function updateMainComponent(userAccount) {
  updateAccountBalance(mainComponent.accountBalanceComponent, userAccount);
  renderTransactions(
    mainComponent.transactionsOperationsComponent.transactionsComponent,
    userAccount
  );
  updateTransactionsSummary(
    mainComponent.transactionsSummaryComponent,
    userAccount
  );
  registerTransactionsControlEventHandlers();
}

function updateTransactions(userAccount) {
  renderTransactions(
    mainComponent.transactionsOperationsComponent.transactionsComponent,
    userAccount
  );
  registerTransactionsControlEventHandlers();
}

function clearMainComponent() {
  clearComponent(mainComponent);
}

function clearUserControls() {
  clearComponent(userControlsComponent);
}

function clearUserAccountDetails() {
  clearMainComponent();
}

function renderLoginControls() {
  loadComponent(userControlsComponent.loginComponent);
  registerLoginEventHandlers();
}

function renderLogoutControls() {
  loadComponent(userControlsComponent.logoutComponent);
  registerLogoutEventHandlers();
}

function renderUserAccountDetails(userAccount) {
  clearUserAccountDetails();
  renderMainComponent(userAccount);
}

// Event Handlers
function registerMainComponentEventHandlers() {
  registerMoneyTransferEventHandlers();
  registerLoanAddEventHandlers();
  registerCloseAccountEventHandlers();
  registerTransactionsControlEventHandlers();
}

function registerLoginEventHandlers() {
  const loginBtn = getElement('login-btn');
  loginBtn.addEventListener('click', performLogin);
}

function registerLogoutEventHandlers() {
  const loginBtn = getElement('logout-btn');
  loginBtn.addEventListener('click', performLogout);
}

function registerMoneyTransferEventHandlers() {
  const moneyTransferBtn = getElement('transfer-operation-btn');
  moneyTransferBtn.addEventListener('click', performMoneyTransfer);
}

function registerLoanAddEventHandlers() {
  const loanAddBtn = getElement('loan-operation-btn');
  loanAddBtn.addEventListener('click', performLoanAdd);
}

function registerCloseAccountEventHandlers() {
  const closeAccountBtn = getElement('account-operation-btn');
  closeAccountBtn.addEventListener('click', performCloseAccount);
}

function registerTransactionsControlEventHandlers() {
  if (LOGGED_IN_USER.transactions.length > 0) {
    const sortBtn = getElement('sort-transactions-btn');
    sortBtn.addEventListener('click', performSort);
  }
}

function performLogin() {
  clearLoginError();
  const [userName, pin] = getLoginFields();

  const enteredUserName = userName.value;
  const enteredPin = pin.value;

  resetLoginFields();

  if (enteredUserName && enteredPin) {
    const accountToLogin = ACCOUNTS.find(
      (account) =>
        account.security.userName === enteredUserName &&
        account.security.pin === enteredPin
    );

    if (accountToLogin) {
      login(accountToLogin);
    } else {
      showLoginError();
      console.info(
        `Login Failed. Wrong Credentials Entered. Username: ${enteredUserName}, Pin: ${enteredPin}`
      );
    }
  } else {
    showLoginError();
    console.info(
      `Login to Username: ${enteredUserName}, Pin: ${enteredPin} cannot be performed.`
    );
  }
}

function performLogout() {
  LOGGED_IN_USER = undefined;
  clearWelcomeUserText();
  renderLoginControls();
  clearUserAccountDetails();
}

function performSort() {
  let sortedTransactions;

  if (SORTING_POSITION === SORTING_DIRECTION.ASC) {
    sortedTransactions = LOGGED_IN_USER.transactions
      .slice()
      .sort((a, b) => b.amount - a.amount);
    SORTING_POSITION = SORTING_DIRECTION.DESC;
  } else if (SORTING_POSITION === SORTING_DIRECTION.DESC) {
    sortedTransactions = LOGGED_IN_USER.transactions
      .slice()
      .sort((a, b) => a.amount - b.amount);
    SORTING_POSITION = SORTING_DIRECTION.ASC;
  } else {
    console.error('Sorting Position is invalid.');
  }

  // Update UI
  updateTransactions({
    ...LOGGED_IN_USER,
    transactions: sortedTransactions,
  });
}

function performMoneyTransfer() {
  clearMoneyTransferError();
  const [recipient, amount] = getMoneyTransferFields();

  const recipientUserName = recipient.value;
  const transferAmount = Number(amount.value);

  resetMoneyTransferFields();

  if (
    recipientUserName &&
    transferAmount > 0 &&
    recipientUserName !== LOGGED_IN_USER.security.userName
  ) {
    transferMoney(recipientUserName, transferAmount);
  } else {
    showMoneyTransferError();
    console.info(
      `Transfer to Username: ${recipientUserName}, Amount: ${transferAmount} cannot be performed.`
    );
  }
}

function performLoanAdd() {
  clearLoanAddError();
  const [amount] = getLoadAddFields();

  const loanAmount = Number(amount.value);

  resetLoanAddFields();

  if (loanAmount > 0) {
    loadAdd(loanAmount);
  } else {
    showLoanAddError();
    console.info(`Loan Add of Amount: ${loanAmount} cannot be performed.`);
  }
}

function performCloseAccount() {
  clearCloseAccountError();
  const [userName, pin] = getCloseAccountFields();

  const enteredUserName = userName.value;
  const enteredPin = pin.value;

  resetCloseAccountFields();

  if (enteredUserName && enteredPin) {
    const isValidCredentials =
      LOGGED_IN_USER.security.userName === enteredUserName &&
      LOGGED_IN_USER.security.pin === enteredPin;

    if (isValidCredentials) {
      closeAccount();
    } else {
      showCloseAccountError();
      console.info(
        `Close Account Operation Failed. Wrong Credentials Entered. Username: ${enteredUserName}, Pin: ${enteredPin}`
      );
    }
  } else {
    showCloseAccountError();
    console.info(
      `Account of Username: ${enteredUserName}, Pin: ${enteredPin} cannot be closed.`
    );
  }
}

function login(userAccount) {
  LOGGED_IN_USER = userAccount;
  showWelcomeUserText(userAccount.owner);
  renderLogoutControls();
  renderUserAccountDetails(userAccount);
}

function transferMoney(recipientUserName, transferAmount) {
  const accountToTransfer = ACCOUNTS.find(
    (account) => account.security.userName === recipientUserName
  );

  if (accountToTransfer) {
    const loggedInUserAccountBalance = getTotalBalance(
      LOGGED_IN_USER.transactions.flatMap((transaction) => transaction.amount)
    );

    if (loggedInUserAccountBalance > transferAmount) {
      LOGGED_IN_USER.transactions.push({
        amount: -transferAmount,
        transactionDate: getCurrentDateTimeISOFormatted(),
      });
      accountToTransfer.transactions.push({
        amount: transferAmount,
        transactionDate: getCurrentDateTimeISOFormatted(),
      });

      // Update UI
      updateMainComponent(LOGGED_IN_USER);
      console.info(
        `Money Transfer of Amount: ${transferAmount} to Username: ${recipientUserName} is successful.`
      );
    } else {
      console.info('Money Transfer Failed. Insufficient Funds.');
    }
  } else {
    console.info(`Username: ${recipientUserName} does not exist.`);
  }
}

function loadAdd(loanAmount) {
  const hasRequiredDeposit = LOGGED_IN_USER.transactions
    .flatMap((transaction) => transaction.amount)
    .some((transaction) => transaction > 0 && transaction > loanAmount * 0.1);

  if (hasRequiredDeposit) {
    LOGGED_IN_USER.transactions.push({
      amount: loanAmount,
      transactionDate: getCurrentDateTimeISOFormatted(),
    });

    // Update UI
    updateMainComponent(LOGGED_IN_USER);
    console.info(
      `User: ${LOGGED_IN_USER.owner} successfully received a Loan of Amount: ${loanAmount}`
    );
  } else {
    console.info(
      `User: ${LOGGED_IN_USER.owner} is not eligible for a Loan of Amount: ${loanAmount}`
    );
  }
}

function closeAccount() {
  const index = ACCOUNTS.findIndex(
    (account) => account.security.userName === LOGGED_IN_USER.security.userName
  );
  ACCOUNTS.splice(index, 1);
  performLogout();
}

function loadEasterEgg() {
  appLogo.addEventListener('click', () => {
    appLogo.classList.add(ROTATE_STYLE);

    setTimeout(() => {
      appLogo.classList.remove(ROTATE_STYLE);
    }, ROTATE_TIME_SECONDS * 1000);
  });
}

function initApp() {
  performLogout();
  loadEasterEgg();
}

initApp();
