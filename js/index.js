(function () {
  function defaultedInt(raw, defaultValue) {
    let v = parseInt(raw);

    return Number.isNaN(v) ? defaultValue : v;
  }

  function setAge() {
    var today = new Date();
    var birthday = new Date('2001-01-28T23:00:00.000Z');
    var yearToday = today.getUTCFullYear();
    var thisYearBirthday = new Date(birthday).setUTCFullYear(yearToday);

    var years = today.getUTCFullYear() - birthday.getUTCFullYear();
    if (today - thisYearBirthday > 0) {
      var lastBirthdayYear = yearToday;
    } else {
      var lastBirthdayYear = yearToday - 1;
      years--;
    }

    var lastBirthday = new Date(birthday).setUTCFullYear(lastBirthdayYear);

    var days = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24));
    var ageStr = years + ' (+' + days + ' days)';
    var ageElement = document.querySelector('#age');
    if (ageElement !== null) {
      ageElement.innerText = ageStr;
    }
  }

  document.querySelectorAll('.delayedCharAnimation').forEach((e) => {
    const chars = e.innerText.split('');
    e.innerHTML = '';

    const step = defaultedInt(e.getAttribute('data-step'), 200);
    const base = defaultedInt(e.getAttribute('data-base'), 500);

    const duration = defaultedInt(e.getAttribute('data-duration'), Math.abs(step));
    const endDuration = defaultedInt(e.getAttribute('data-endDuration'), duration);

    for (let i = 0; i < chars.length; i++) {
      let s = document.createElement('span');
      const delay = base + step * i;
      s.innerText = chars[i];
      s.style.animationDelay = `${delay}ms`;
      s.style.animationDuration = `${duration}ms`;
      e.appendChild(s);
    }

    const delay = step > 0 ? base + step * chars.length : base + step * -1;
    e.style.animationDelay = `${delay}ms`;
    e.style.animationDuration = `${endDuration}ms`;
  });

  document.querySelectorAll('.name-switch').forEach((e) => {
    let version = 0;
    let isIn = true;

    const onAnimationEnd = () => {
      if (isIn) {
        setTimeout(() => {
          e.classList.remove('fadeInDown');
          e.classList.add('fadeOutUp');
        }, 3000);
      } else {
        e.classList.add('fadeInDown');
        e.classList.remove('fadeOutUp');

        version = (version + 1) % 2;
        switch (version) {
          case 0:
            e.innerText = 'Yazaar';
            break;
          case 1:
            e.innerText = 'Jesper';
            break;
        }
      }
      isIn = !isIn;
    };

    e.addEventListener('animationend', onAnimationEnd);
    setTimeout(onAnimationEnd, Math.floor(Math.random() * 5000));
  });

  setAge();
})();
