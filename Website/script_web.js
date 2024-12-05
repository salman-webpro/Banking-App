'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\
// Lecture

/*
// Selection

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('section');
document.querySelectorAll('section');

document.getElementById('#section-1');
console.log(document.getElementsByClassName('btn'));

document.getElementsByTagName('button');

// creating element

const massage = document.createElement('div');

massage.classList.add('cookie-message');
const html =
  'give me the cookies please! I am hungry<button class="btn btn-cookie">understand</button>';

massage.innerHTML = html;
document.querySelector('.header__title').insertAdjacentHTML('afterbegin', html);

document.querySelector('.header').append(massage);

document.querySelector('.header__title').prepend(massage);

document.querySelector('.header__title').after(massage.cloneNode(true));

document.querySelector('.header__title').before(massage);

const clone = massage.cloneNode(true);
console.log(clone);

// Remove element

document.querySelector('.btn-cookie').addEventListener('click', function () {
  massage.parentElement.removeChild(massage);
  massage.remove();
});

// DOM design

massage.style.width = '120%';
massage.style.height =
  Number.parseInt(getComputedStyle(massage).height, 10) + 20 + 'px';

console.log(Number.parseInt(getComputedStyle(massage).height, 10) + 700 + 'px');

document.documentElement.style.setProperty('--color-primary', '#222222');
*/
