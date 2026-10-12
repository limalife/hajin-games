// 주인공 하진: 가운데가 살짝 갈라진 삐죽 앞머리, 가로로 긴 까만 눈, 쏙 나온 귀, 씩 웃는 입,
// 회색 줄무늬 긴팔 + 연회색 카고 바지 + 흰 운동화 (키 44 단위, 발밑 중앙이 원점)
function drawKid(ctx, cx, by, s, face, t, air, moving) {
  const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
  const ell = (x, y, rx, ry) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); };
  const poly = pts => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); };
  // 줄무늬 천: 둥근 사각형 안에 가로 줄을 채운다
  const striped = (x, y, w, h, r) => {
    ctx.fillStyle = '#eceef0'; rr(x, y, w, h, r);
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.clip();
    ctx.fillStyle = '#7f8993';
    for (let ly = y + 1; ly < y + h; ly += 1.9) ctx.fillRect(x, ly, w, 0.7);
    ctx.restore();
  };
  const SKIN = '#ffdcc2', HAIR = '#1d1714';

  ctx.save();
  ctx.translate(cx, by); ctx.scale(face * s, s);
  const sw = air ? 0.9 : (moving ? Math.sin(t * 0.35) : 0);

  // 통 넓은 카고 바지와 운동화
  const leg = (x, a) => {
    ctx.save(); ctx.translate(x, -13); ctx.rotate(a * 0.6);
    ctx.fillStyle = '#c6ccd2'; rr(-4.5, 0, 9, 10.5, 2.5);
    ctx.fillStyle = '#b0b8c0'; rr(-3.6, 3, 5, 4.2, 1);
    ctx.fillStyle = '#f4f5f7'; rr(-4, 8.5, 11, 4.5, 2.2);
    ctx.fillStyle = '#b9c0c9'; ctx.fillRect(1, 9.6, 3.5, 1.4);
    ctx.fillStyle = '#8f96a0'; ctx.fillRect(-3.5, 12, 10, 1);
    ctx.restore();
  };
  leg(-4, sw); leg(4, -sw);

  // 줄무늬 긴팔 티
  striped(-8, -25, 16, 14.5, 5);
  ctx.save(); ctx.translate(0, -22); ctx.rotate(air ? -2.3 : -sw * 0.8);
  striped(-3, 0, 6, 10, 3);
  ctx.strokeStyle = 'rgba(90,100,110,.35)'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.roundRect(-3, 0, 6, 10, 3); ctx.stroke();
  ctx.fillStyle = SKIN; ell(0, 10.5, 2.8, 2.8);
  ctx.restore();

  // 목, 갸름한 달걀형 얼굴 (볼은 통통하고 턱은 좁게)
  ctx.fillStyle = '#f5cdb0'; rr(-1.5, -24.5, 5, 3.5, 1);
  ctx.fillStyle = SKIN;
  ctx.beginPath();
  ctx.moveTo(-8.5, -34);
  ctx.bezierCurveTo(-9, -27, -5, -21.5, 1.5, -21.5);
  ctx.bezierCurveTo(8, -21.5, 11, -27, 10.5, -34);
  ctx.bezierCurveTo(10.5, -44, -8.5, -44, -8.5, -34);
  ctx.fill();

  // 머리카락: 옆은 짧고, 끝이 삐죽삐죽하며 가운데가 갈라진 앞머리
  ctx.fillStyle = HAIR;
  ctx.beginPath();
  ctx.moveTo(-9.4, -29.5);
  ctx.bezierCurveTo(-11.5, -48, 13.5, -48, 11.3, -34.5);
  [[10, -33.2], [8.8, -34.6], [7.4, -33], [6.6, -35], [5.6, -37.3], [4.6, -35], [3, -33.2], [1.2, -34.6],
   [-0.6, -33], [-2.6, -34.5], [-4.4, -33.3], [-5.8, -35], [-6, -30.5]].forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.quadraticCurveTo(-7.5, -29, -9.4, -29.5);
  ctx.fill();
  poly([[-3, -43.4], [-1.5, -46.8], [0.5, -43.7]]);
  poly([[1, -43.7], [3.6, -46.2], [4.4, -43.2]]);
  ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.ellipse(1, -35.5, 7, 6.5, 0, Math.PI * 1.15, Math.PI * 1.6); ctx.stroke();

  // 쏙 나온 귀
  ctx.fillStyle = SKIN; ell(-7.8, -30, 2.6, 3.7);
  ctx.fillStyle = '#f0bb9c'; ell(-7.6, -30, 1.1, 2);

  // 초롱초롱한 까만 눈 (반짝이 두 개)
  const eye = (ex, ey, w) => {
    ctx.fillStyle = '#1b1310'; ell(ex, ey, w, w * 1.22);
    ctx.fillStyle = '#4a342a'; ell(ex, ey + w * 0.45, w * 0.6, w * 0.5);
    ctx.fillStyle = '#fff'; ell(ex + w * 0.35, ey - w * 0.5, w * 0.36, w * 0.36); ell(ex - w * 0.4, ey + w * 0.45, w * 0.18, w * 0.18);
  };
  eye(3.5, -29.9, 1.75); eye(8.8, -29.9, 1.6);

  // 볼, 코, 씩 웃는 작은 입
  ctx.fillStyle = 'rgba(255,120,120,.4)'; ell(7.9, -26.5, 1.5, 1.1); ell(0.4, -26.5, 2, 1.25);
  ctx.fillStyle = '#e6b091'; ell(6.7, -27.6, 0.8, 0.55);
  ctx.strokeStyle = '#c4605f'; ctx.lineWidth = 0.75; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(4.9, -24.9); ctx.quadraticCurveTo(6.5, -24, 8.2, -25.2); ctx.stroke();
  ctx.restore();
}
