"use strict";

const account1 = {
  owner: "Salman Mahmmud",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2024-11-20T14:43:26.374Z",
    "2024-11-25T18:49:59.371Z",
    "2024-11-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Nahian Noman",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-08-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-06-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Tuhin Islam",
  movements: [6000, 2000, -150, -790, -3210, -3000, 7000, -30],
  interestRate: 1.8,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-08-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-06-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-UK",
};

const account4 = {
  owner: "Shehnewaz Shahid",
  movements: [10000, 8000, -150, -790, -3210, -3000, 7000, -30],
  interestRate: 1.8,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-08-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-06-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-UK",
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

let currentAccount, timer;

// All the  Number formatter

const numberFormatter = function (num) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: "currency",
    currency: currentAccount.currency,
  }).format(num);
};

// All the  Dates formatter
const formatDate = function (date, options) {
  const calcDates = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDates(new Date(), date);
  if (options)
    return new Intl.DateTimeFormat(currentAccount?.locale, options).format(
      date
    );
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "yesterday";
  if (daysPassed < 7) return `${daysPassed} days ago`;
  else return new Intl.DateTimeFormat(currentAccount?.locale).format(date);
};

// Displaying All the Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movOrder = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movOrder.forEach((mov, i) => {
    const formattedMov = numberFormatter(mov);
    const date = formatDate(new Date(acc.movementsDates.at(i)));
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${date}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// username creation
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

// calculating and displaying total Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMov = numberFormatter(acc.balance);
  labelBalance.textContent = `${formattedMov}`;

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  labelDate.textContent = formatDate(new Date(), options);
};

// calculating and displaying Summery
const CalcSummeryDisplay = function (acc) {
  const allDeposits = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  const allWithdrawls = Math.abs(
    acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov)
  );

  const interest = (allDeposits * acc.interestRate) / 100;
  labelSumIn.textContent = `${numberFormatter(allDeposits)}`;
  labelSumOut.textContent = `${numberFormatter(allWithdrawls)}`;
  labelSumInterest.textContent = `${numberFormatter(interest)}`;
};

// updating the UI
const updateUI = function (acc) {
  displayMovements(acc);
  // display balance
  calcDisplayBalance(acc);
  // display summery
  CalcSummeryDisplay(acc);
};

// Log Out Handle
const logout = function () {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
};

// Timer
const startLogoutTimer = function () {
  let time = 300;
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const seconds = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min} : ${seconds}`;
    if (time === 0) {
      clearInterval(logoutTimer);
      logout();
    }
    time--;
  };
  tick();
  const logoutTimer = setInterval(tick, 1000);
  return logoutTimer;
};

// Login Handle
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const now = new Date();
  const day = now.getDate();
  const Month = now.getMonth();
  const Year = now.getFullYear();
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
  labelDate.textContent = `${day}/${Month}/${Year}`;
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
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

// Taransfer Money handle
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const reciver = accounts.find(
    (acc) => acc.userName === inputTransferTo?.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  const moveDate = new Date().toISOString();

  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    currentAccount.userName !== inputTransferTo.value
  ) {
    reciver?.movements.push(Number(transferAmount));
    reciver?.movementsDates.push(moveDate);
    currentAccount.movements.push(Number(-transferAmount));
    currentAccount.movementsDates.push(moveDate);
    updateUI(currentAccount);
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// Account close handle
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const accountTodelete = accounts.findIndex(
    (acc) => acc.userName === inputCloseUsername.value
  );
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    accounts.splice(accountTodelete, 1);
    containerApp.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = "";
    labelWelcome.textContent = "Log in to get started";
  }
});

// Taking loan handle
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  const isValid = currentAccount.movements
    .filter((mov) => mov > 0)
    .some((mov) => mov >= (loanAmount * 10) / 100);

  if (loanAmount > 0 && isValid) {
    setTimeout(() => {
      currentAccount.movements.push(+loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 3000);
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    inputLoanAmount.value = "";
  }
});

// Movements sorting handle
let sorted;
btnSort.addEventListener("click", function () {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

document.querySelector(".AccountBtn").addEventListener("click", function () {
  location.href = "./Website/index_web.html";
});

("use strict");

// Constractor fucntion

const User = function (userName, passWord) {
  this.userName = userName;
  this.passWord = passWord;
};

const Admin = function (user, pass) {
  this.user = user;
  this.pass = pass;
};

User.prototype.calcAge = function () {
  this.age = 2037 - this.passWord;
};

const salman = new User("salman", 1111);
const Mahmud = new User("Mhamud", 9999);
const Sejan = { Mhamud: 9999 };
const Sabbir = new Admin("Sabbir", 4444);

const AllUsers = [];
const Admins = [];

function insert(user) {
  if (user instanceof User) {
    AllUsers.push(user);
  }
  if (user instanceof Admin) {
    Admins.push(user);
  }
}

salman.calcAge();
insert(salman);
insert(Mahmud);
insert(Sejan);
insert(Sabbir);

console.log(AllUsers);
console.log(Admins);
console.log(salman.__proto__);
console.log(User.prototype.isPrototypeOf(salman));
