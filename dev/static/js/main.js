(function(){
  'use strict';

  const body = document.querySelector('body');
  let unlock = true;

  function bodyLock(delay) {
    const body = document.querySelector('body');
    if (body.classList.contains('_lock')) {
      bodyLockRemove(delay);
    } else {
      bodyLockAdd(delay);
    }
  }

  function bodyLockRemove(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, delay);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }

  function bodyLockAdd(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
      body.classList.add('_lock');

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }

  const getPageVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const getSendwich = () => {
    const sandwich = document.querySelector('.sandwich');
    const nav = document.querySelector('.header__list');

    if (sandwich != null) {
      const delay = 500;
      sandwich.addEventListener('click', function (e) {
        if (unlock) {
          bodyLock(delay);
          sandwich.classList.toggle('_active');
          nav.classList.toggle('_active');
          body.classList.toggle('_overlay');
        }
      });
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('_active')) return;
        if (!e.target.closest('._active')) {
          bodyLock(delay);
          nav.classList.remove('_active');
          sandwich.classList.remove('_active');
          body.classList.remove('_overlay');
        }
      });
    }
  };

  const getLeedOption = () => {
    let currentTarget;
    const burgerClickHandler = e => {
      const menuItem = e.target.nextElementSibling;
      if (menuItem && menuItem.matches('.events__leed-more._active')) {
        menuItem.previousElementSibling.classList.remove('_active');
        menuItem.classList.remove('_active');
        return;
      }
      if (currentTarget) {
        if (!e.target.closest('.events__leed-more')) {
          currentTarget.previousElementSibling.classList.remove('_active');
          currentTarget.classList.remove('_active');
        }
      }
      if (menuItem && menuItem.matches('.events__leed-more')) {
        menuItem.previousElementSibling.classList.add('_active');
        menuItem.classList.add('_active');
        currentTarget = menuItem;
      }
    };
    document.body.addEventListener('click', burgerClickHandler);
  };

  getPageVh();
  getSendwich();
  getLeedOption();
})();
