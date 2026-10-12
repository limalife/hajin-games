// 주인공 하진: 까만 바가지 머리, 동그란 눈, 통통한 볼, 회색 후드티 (키 44 단위, 발밑 중앙이 원점)
function drawKid(ctx, cx, by, s, face, t, air, moving) {
  const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
  const ell = (x, y, rx, ry) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); };
  ctx.save();
  ctx.translate(cx, by); ctx.scale(face * s, s);
  const sw = air ? 0.9 : (moving ? Math.sin(t * 0.35) : 0);
  const leg = (x, a) => {
    ctx.save(); ctx.translate(x, -13); ctx.rotate(a * 0.6);
    ctx.fillStyle = '#bfc3c9'; rr(-3.5, 0, 7, 10, 3);
    ctx.fillStyle = '#ffffff'; rr(-3.5, 8, 10, 5, 2.5);
    ctx.fillStyle = '#9aa0a8'; ctx.fillRect(-3, 12, 9, 1);
    ctx.restore();
  };
  leg(-4, sw); leg(4, -sw);
  // 후드
  ctx.fillStyle = '#cfd3d8'; ell(-6, -24, 6.5, 4.5);
  // 몸통
  ctx.fillStyle = '#e6e8eb'; rr(-9, -25, 18, 14, 6);
  ctx.strokeStyle = '#c5c9ce'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(-4, -13.5); ctx.quadraticCurveTo(1, -18, 6, -13.5); ctx.stroke();
  // 팔
  ctx.save(); ctx.translate(0, -22); ctx.rotate(air ? -2.3 : -sw * 0.8);
  ctx.fillStyle = '#d9dce0'; rr(-3, 0, 6, 10, 3);
  ctx.fillStyle = '#ffdfc6'; ell(0, 10.5, 2.8, 2.8);
  ctx.restore();
  // 얼굴
  ctx.fillStyle = '#ffdfc6'; ell(1, -32, 11.5, 10.5);
  // 머리카락 (일자 앞머리 바가지 컷)
  ctx.fillStyle = '#1c1512';
  ctx.beginPath(); ctx.ellipse(1, -32.5, 12.3, 11.8, 0, Math.PI, Math.PI * 2); ctx.closePath(); ctx.fill();
  rr(-4, -33.5, 17.3, 2.6, [0, 0, 2, 2]);
  rr(-11.3, -33.5, 6.5, 8, [0, 0, 3, 3]);
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.ellipse(1, -33, 8.5, 8, 0, Math.PI * 1.15, Math.PI * 1.6); ctx.stroke();
  // 귀
  ctx.fillStyle = '#ffdfc6'; ell(-6.5, -29, 3, 3.8);
  ctx.fillStyle = '#f0bfa2'; ell(-6.3, -29, 1.4, 2.1);
  // 눈
  ctx.fillStyle = '#1f1612'; ell(4, -28.3, 2.1, 2.6); ell(10, -28.3, 1.9, 2.6);
  ctx.fillStyle = '#fff'; ell(4.7, -29.2, 0.8, 0.8); ell(10.6, -29.2, 0.8, 0.8);
  // 볼, 코, 삐죽 입
  ctx.fillStyle = 'rgba(255,125,125,.45)'; ell(9.3, -24.3, 2.6, 1.7); ell(0.5, -24.3, 2.4, 1.7);
  ctx.fillStyle = '#eab99b'; ell(7.6, -25.6, 0.9, 0.7);
  ctx.fillStyle = '#e0787a'; ell(7.4, -22.7, 1.9, 1.1);
  ctx.restore();
}
