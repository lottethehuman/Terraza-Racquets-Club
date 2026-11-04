/* Terraza Racquets Club — scroll-triggered reveal + hero parallax
   Elements with class "reveal" or "reveal-zoom" fade/rise/zoom in once as
   they enter the viewport. The home page hero background also gets a
   subtle parallax drift as you scroll past it. */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealEls = document.querySelectorAll('.reveal, .reveal-zoom');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else if (revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Parallax hero background (home page only — other pages don't have .hero)
  var hero = document.querySelector('.hero');
  var heroBg = document.querySelector('.hero-bg');
  if (hero && heroBg && !reduceMotion) {
    var ticking = false;
    var update = function () {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (rect.top * 0.35) + 'px)';
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }
})();
