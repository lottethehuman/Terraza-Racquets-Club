/* Terraza Racquets Club — mobile menu toggle (hamburger).
   Progressive enhancement: if this file fails to load, the menu simply
   stays visible in the plain wrapped layout (no .js class is relied on
   without the button below existing). */
(function () {
  try {
    var header = document.querySelector('.site-nav');
    var btn = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!header || !btn || !links) { return; }

    // Only now that everything exists do we switch to the collapsed layout.
    document.documentElement.classList.add('nav-js');

    function setOpen(open) {
      header.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
      setOpen(!header.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) { setOpen(false); }
    });
  } catch (err) { /* never block the page */ }
})();
