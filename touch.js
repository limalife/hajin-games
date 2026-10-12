// 터치 조작 패드. 여러 손가락을 동시에 인식하고, 손가락을 떼지 않고 버튼 사이를 미끄러져도 따라간다.
function setupTouchPad(onDown, onUp) {
  const buttons = [...document.querySelectorAll('.pad button')];
  let held = new Set();
  const refresh = e => {
    document.body.classList.add('touch');
    const now = new Set();
    for (const t of e.touches) {
      const el = document.elementFromPoint(t.clientX, t.clientY);
      const b = el && el.closest && el.closest('.pad button');
      if (b) now.add(b);
    }
    for (const b of buttons) {
      if (now.has(b) && !held.has(b)) { b.classList.add('on'); onDown(b.dataset.key); }
      else if (!now.has(b) && held.has(b)) { b.classList.remove('on'); onUp(b.dataset.key); }
    }
    held = now;
    // 링크 탭 외에는 스크롤·확대·길게 누르기 메뉴를 막는다
    if (e.cancelable && !(e.target.closest && e.target.closest('a'))) e.preventDefault();
  };
  for (const type of ['touchstart', 'touchmove', 'touchend', 'touchcancel']) {
    document.addEventListener(type, refresh, { passive: false });
  }
  document.addEventListener('contextmenu', e => e.preventDefault());
  // 마우스로도 버튼을 누를 수 있게 한다
  for (const b of buttons) {
    b.addEventListener('mousedown', () => { b.classList.add('on'); onDown(b.dataset.key); });
    for (const type of ['mouseup', 'mouseleave']) {
      b.addEventListener(type, () => { if (b.classList.contains('on') && !held.has(b)) { b.classList.remove('on'); onUp(b.dataset.key); } });
    }
  }
}
