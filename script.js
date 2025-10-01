'use strict';

// Account Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  security: { userName: 'jonas', pin: 1111 },
  culture: 'GBP',
};

const account2 = {
  owner: 'Jessica Davis',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  security: { userName: 'jess', pin: 2222 },
  culture: 'USD',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  security: { userName: 'will', pin: 3333 },
  culture: 'GBP',
};

const account4 = {
  owner: 'Sarah Smith',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  security: { userName: 'sarah', pin: 4444 },
  culture: 'GBP',
};

const account5 = {
  owner: 'Venkatesan Thirumalvalavan',
  transactions: [],
  interestRate: 0.6,
  security: { userName: 'thiru', pin: 5555 },
  culture: 'INR',
};

const accounts = [account1, account2, account3, account4, account5];

// Global Variables
const ERROR_HIGHLIGHT_STYLE = 'error-highlight';

const TRANSACTION_TYPE = {
  Deposit: 'deposit',
  Withdrawal: 'withdrawal',
};

const CURRENCY_CODES = {
  GBP: '€',
  USD: '$',
  INR: '₹',
};

const ERROR_MESSAGES = {
  emptyComponentError() {
    return `Trying to render an empty component.`;
  },
  containerMissingError(containerId) {
    return `Container with ID: ${containerId} does not exist in the DOM.`;
  },
  htmlEmptyError(componentName) {
    return `${componentName} does not have a valid HTML.`;
  },
};

// Global DOM Elements
const welcomeUserTitleEl = document.getElementById('welcome-user-title');

// Global Components
const userControlsComponent = {
  containerId: 'user-controls-container',
  getContainer,
  loginComponent: {
    containerId: 'user-controls-container',
    componentName: 'Login',
    getHtml() {
      return `
        <div class="flex-row align-center login-inputs-gap">
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
        </div>
      `;
    },
    getContainer,
  },
  logoutComponent: {
    containerId: 'user-controls-container',
    componentName: 'Logout',
    getHtml() {
      return `
        <div class="flex-row align-center">
          <button id="logout-btn" class="bankist-btn logout-btn">
            Logout &rarr;
          </button>
        </div>
      `;
    },
    getContainer,
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
    componentName: 'Account Balance',
    getHtml() {
      return `
        <section class="flex-row account-balance-container">
          <div class="flex-row align-center full-width">
            <div class="flex-col">
              <p class="balance-title">Current balance</p>
              <p class="balance-date">as of ${formatField(
                this.data.balanceDate
              )}</p>
            </div>
          </div>
          <div class="flex-row align-center justify-end">
            <p class="balance-value">${formatField(this.data.balanceValue)}</p>
          </div>
        </section>
      `;
    },
    getContainer,
  },
  transactionsOperationsComponent: {
    containerId: 'main-container',
    componentName: 'Transactions Operations',
    getHtml() {
      return `
        <section
          class="flex-row transactions-operations-container transactions-operations-container-gap"
        >
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
                  <button id="transfer-operation-btn" class="operation-btn">
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
                  <button id="loan-operation-btn" class="operation-btn">&rarr;</button>
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
                  <button id="account-operation-btn" class="operation-btn">
                    &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    },
    getContainer,
    transactionsComponent: {
      noTransactionsComponent: {
        containerId: 'transactions-container',
        componentName: 'No Transactions',
        getHtml() {
          return `
          <div
            class="flex-row justify-center align-center full-width no-transactions-container rounded"
          >
            <p class="no-transactions">No transactions to show.</p>
          </div>
        `;
        },
        getContainer,
      },
      transactionsListComponent: {
        containerId: 'transactions-container',
        componentName: 'Transactions List',
        getHtml() {
          return `
          <div class="flex-row full-width">
          <div class="flex-col full-width">
            <div id="transaction-items-container" class="flex-col full-width transactions-container-scroll"></div>
            <div id="transaction-controls-container" class="flex-row justify-end"></div>
          </div>
        `;
        },
        getContainer,
        transactionListItemComponent: {
          data: {
            type: '',
            transactionDate: '',
            transactionAmount: '',
          },
          containerId: 'transaction-items-container',
          componentName: 'Transactions List Item',
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
              class="flex-row no-shrink align-center transaction-container"
            >
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
                <p class="transaction-amount">${formatField(
                  this.data.transactionAmount
                )}</p>
              </div>
            </div>
          `;
          },
          getContainer,
        },
        transactionListControlsComponent: {
          containerId: 'transaction-controls-container',
          componentName: 'Transactions List Controls',
          getHtml() {
            return `
            <div class="transactions-controller-container">
              <button class="bankist-btn transactions-controller-btn">
                &downarrow; Sort
              </button>
            </div>
          `;
          },
          getContainer,
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
    componentName: 'Transaction Summary',
    getHtml() {
      return `
        <section
          class="flex-row transactions-summary-container transactions-summary-items-gap"
        >
          <div class="flex-row align-center transactions-summary-gap">
            <div>
              <p class="transactions-summary-title">IN</p>
            </div>
            <div>
              <p class="transaction-summary-amount plus-amount">${formatField(
                this.data.inAmount
              )}</p>
            </div>
          </div>
          <div class="flex-row align-center transactions-summary-gap">
            <div>
              <p class="transactions-summary-title">OUT</p>
            </div>
            <div>
              <p class="transaction-summary-amount minus-amount">${formatField(
                this.data.outAmount
              )}</p>
            </div>
          </div>
          <div class="flex-row align-center transactions-summary-gap">
            <div>
              <p class="transactions-summary-title">INTEREST</p>
            </div>
            <div>
              <p class="transaction-summary-amount plus-amount">${formatField(
                this.data.interestRate
              )}</p>
            </div>
          </div>
        </section>
      `;
    },
    getContainer,
  },
};

// Helper Methods
function getContainer() {
  return document.getElementById(this.containerId);
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

function getPascalCase(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function getWelcomeUserText(userName) {
  return `Hi ${userName}`;
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
        console.error(ERROR_MESSAGES.htmlEmptyError(component.componentName));
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

function loadComponent(component, renderPosition) {
  clearComponent(component);
  renderComponent(component, renderPosition);
}

function cleanComponentState(component) {
  if (component.data) {
    component.data = {};
  }
}

function formatField(field) {
  return field ?? '';
}

function formatCurrency(value, culture) {
  if (value === null || value === undefined) {
    console.error('Currency value is nullish.');
    return '';
  } else if (culture === null || culture === undefined) {
    console.error('Culture is nullish.');
    return value;
  }

  return `${value}${CURRENCY_CODES[culture]}`;
}

function getTransactionType(transactionAmount) {
  return transactionAmount >= 0
    ? TRANSACTION_TYPE.Deposit
    : TRANSACTION_TYPE.Withdrawal;
}

function getLoginFields() {
  const userName = getElement('login-username-input');
  const pin = getElement('login-pin-input');

  return [userName, pin];
}

function resetLoginFields() {
  const [userName, pin] = getLoginFields();

  userName.value = '';
  pin.value = '';
}

function showLoginError() {
  const [userName, pin] = getLoginFields();

  userName.classList.add(ERROR_HIGHLIGHT_STYLE);
  pin.classList.add(ERROR_HIGHLIGHT_STYLE);
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
function renderAccountBalance(userAccount, component) {
  // Set Data
  component.data = {
    ...component.data,
    balanceDate: '28-09-2025',
    balanceValue: formatCurrency(
      getTotalBalance(userAccount.transactions),
      userAccount.culture
    ),
  };
  renderComponent(component);
}

function renderTransactionItem(transaction, culture, component) {
  // Set Data
  component.data = {
    ...component.data,
    type: getTransactionType(transaction),
    transactionDate: '28-09-2025',
    transactionAmount: formatCurrency(transaction, culture),
  };
  renderComponent(component);
}

function renderTransactionItems(transactions, culture, component) {
  clearComponent(component);

  transactions.forEach((transaction) => {
    renderTransactionItem(transaction, culture, component);
  });
}

function renderTransactionListControls(component) {
  loadComponent(component);
}

function renderTransactionList(transactions, culture, component) {
  loadComponent(component);

  // Render Child Components
  renderTransactionItems(
    transactions,
    culture,
    component.transactionListItemComponent
  );
  renderTransactionListControls(component.transactionListControlsComponent);
}

function renderTransactions(userAccount, component) {
  const hasTransactions = userAccount.transactions.length > 0;

  if (hasTransactions) {
    renderTransactionList(
      userAccount.transactions,
      userAccount.culture,
      component.transactionsListComponent
    );
  } else {
    loadComponent(component.noTransactionsComponent);
  }
}

function renderTransactionsOperations(userAccount, component) {
  renderComponent(component);

  // Render Child Components
  renderTransactions(userAccount, component.transactionsComponent);
}

function renderTransactionsSummary(userAccount, component) {
  // Set Data
  component.data = {
    ...component.data,
    inAmount: formatCurrency(
      getDepositsBalance(userAccount.transactions),
      userAccount.culture
    ),
    outAmount: formatCurrency(
      getWithdrawalsBalance(userAccount.transactions),
      userAccount.culture
    ),
    interestRate: formatCurrency(
      getTotalBalance(userAccount.transactions) *
        (userAccount.interestRate / 100),
      userAccount.culture
    ),
  };
  renderComponent(component);
}

function renderMainComponent(userAccount, component) {
  renderAccountBalance(userAccount, component.accountBalanceComponent);
  renderTransactionsOperations(
    userAccount,
    component.transactionsOperationsComponent
  );
  renderTransactionsSummary(
    userAccount,
    component.transactionsSummaryComponent
  );
}

// Component renderers
function clearUserControls() {
  clearComponent(userControlsComponent);
}

function clearMainComponent() {
  clearComponent(mainComponent);
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
  renderMainComponent(userAccount, mainComponent);
}

function clearUserAccountDetails() {
  clearMainComponent();
}

function registerLoginEventHandlers() {
  const loginBtn = getElement('login-btn');
  loginBtn.addEventListener('click', performLogin);
}

function registerLogoutEventHandlers() {
  const loginBtn = getElement('logout-btn');
  loginBtn.addEventListener('click', performLogout);
}

function performLogin() {
  const [userName, pin] = getLoginFields();

  const enteredUserName = userName.value;
  const enteredPin = pin.value;

  const accountToLogin = accounts.find(
    (account) =>
      account.security.userName === enteredUserName &&
      account.security.pin == enteredPin
  );

  if (accountToLogin) {
    onLogin(accountToLogin);
  } else {
    showLoginError();
    resetLoginFields();
    console.info(
      `Login Failed. Wrong Credentials Entered. Username: ${enteredUserName} Pin: ${enteredPin}`
    );
  }
}

function performLogout() {
  clearWelcomeUserText();
  renderLoginControls();
  clearUserAccountDetails();
}

function onLogin(userAccount) {
  showWelcomeUserText(userAccount.owner);
  renderLogoutControls();
  renderUserAccountDetails(userAccount);
}

function initApp() {
  performLogout();
}

initApp();
