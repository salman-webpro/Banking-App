"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Project

let currentAccount;

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserName = (accounts) =>
  accounts.forEach(
    (user) =>
      (user.userName = user.owner
        .toLowerCase()
        .split(" ")
        .map((user) => user.at(0))
        .join(""))
  );

createUserName(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const CalcTransactionsDisplay = function (acc) {
  const allDeposits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  const allWithdrawls = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);

  const interest = (allDeposits * acc.interestRate) / 100;
  labelSumIn.textContent = `${allDeposits} €`;
  labelSumOut.textContent = `${Math.abs(allWithdrawls)} €`;
  labelSumInterest.textContent = `${interest} €`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summery
  CalcTransactionsDisplay(acc);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI
    labelWelcome.textContent = `welcome back ${currentAccount.owner
      .split(" ")
      .at(0)}`;
    containerApp.style.opacity = 100;
    // empty input fields and remve focus
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    currentAccount.userName !== inputTransferTo.value
  ) {
    accounts
      .find((acc) => acc.userName === inputTransferTo?.value)
      ?.movements.push(Number(transferAmount));

    currentAccount.movements.push(Number(-transferAmount));

    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const accountTodelete = accounts.findIndex(
    (acc) => acc.userName === inputCloseUsername.value
  );
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    accounts.splice(accountTodelete, 1);
    containerApp.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = "";
    labelWelcome.textContent = "Log in to get started";
  }
});
