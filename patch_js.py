with open('/home/nayan-linux/Developer/DDSE_Site/src/js/main.js', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.startswith('});'):
        idx = i
        break

js_code = """
  // ─── Tour Sliders ───
  document.querySelectorAll('.tour-slider').forEach(slider => {
    const track = slider.querySelector('.tour-slider-track');
    const slides = slider.querySelectorAll('.tour-slide');
    const prevBtn = slider.querySelector('.tour-slider-prev');
    const nextBtn = slider.querySelector('.tour-slider-next');
    const dotsContainer = slider.querySelector('.tour-slider-dots');
    let currentIndex = 0;
    let autoplayInterval = null;
    const autoplayDelay = parseInt(slider.dataset.autoplay) || 5000;

    if (slides.length === 0) return;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'tour-slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      if (currentIndex >= slides.length) currentIndex = 0;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dotsContainer.querySelectorAll('.tour-slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Auto-play
    function startAutoplay() {
      autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), autoplayDelay);
    }
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    startAutoplay();

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    });
  });
"""

lines.insert(idx, js_code)

with open('/home/nayan-linux/Developer/DDSE_Site/src/js/main.js', 'w') as f:
    f.writelines(lines)
