// 주인공 하진: 가운데가 살짝 갈라진 삐죽 앞머리, 작고 까만 눈, 쏙 나온 귀, 갸름한 얼굴,
// 빨강·파랑 히어로 슈트(가슴에 노란 별) (키 44 단위, 발밑 중앙이 원점)
function drawKid(ctx, cx, by, s, face, t, air, moving) {
  const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
  const ell = (x, y, rx, ry) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); };
  const poly = pts => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fill(); };
  const SKIN = '#ffdcc2', HAIR = '#1d1714', RED = '#e23b3b', BLUE = '#2f5fc4';

  ctx.save();
  ctx.translate(cx, by); ctx.scale(face * s, s);
  const sw = air ? 0.9 : (moving ? Math.sin(t * 0.35) : 0);

  // 파란 히어로 바지와 빨간 부츠
  const leg = (x, a) => {
    ctx.save(); ctx.translate(x, -13); ctx.rotate(a * 0.6);
    ctx.fillStyle = BLUE; rr(-4, 0, 8, 10, 2.5);
    ctx.fillStyle = RED; rr(-4, 6.5, 11, 6.5, 2.4);
    ctx.fillStyle = '#fff'; ctx.fillRect(-4, 6.5, 8, 1.1);
    ctx.fillStyle = '#8c1f1f'; ctx.fillRect(-3.5, 12, 10, 1);
    ctx.restore();
  };
  leg(-4, sw); leg(4, -sw);

  // 빨간 히어로 슈트: 가슴에 노란 별, 노란 벨트, 파란 소매와 빨간 장갑
  ctx.fillStyle = RED; rr(-8, -25, 16, 14.5, 5);
  ctx.fillStyle = '#ffd23f'; ctx.fillRect(-7.3, -13.4, 14.6, 1.8);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 1.25 : 2.9, ang = -Math.PI / 2 + i * Math.PI / 5;
    ctx.lineTo(4.7 + Math.cos(ang) * r, -19 + Math.sin(ang) * r);
  }
  ctx.closePath(); ctx.fill();
  ctx.save(); ctx.translate(0, -22); ctx.rotate(air ? -2.3 : -sw * 0.8);
  ctx.fillStyle = BLUE; rr(-3, 0, 6, 10, 3);
  ctx.fillStyle = RED; ell(0, 10.3, 3, 3);
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

  // 작고 단순한 까만 눈, 옅은 눈썹
  const eye = (ex, ey, w) => {
    ctx.strokeStyle = 'rgba(60,45,38,.45)'; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(ex - 1.2, ey - 2.3); ctx.quadraticCurveTo(ex, ey - 2.8, ex + 1.2, ey - 2.4); ctx.stroke();
    ctx.fillStyle = '#241915'; ell(ex, ey, w, w * 1.1);
  };
  ctx.lineCap = 'round';
  eye(3.7, -29.6, 1.05); eye(8.6, -29.6, 0.95);

  // 볼, 작은 코, 살짝 다문 입
  ctx.fillStyle = 'rgba(255,125,125,.26)'; ell(7.9, -26.6, 1.5, 1.05); ell(0.4, -26.5, 1.9, 1.15);
  ctx.fillStyle = '#e6b091'; ell(6.6, -27.3, 0.75, 0.5);
  ctx.fillStyle = 'rgba(232,130,130,.55)'; ell(6.5, -24.3, 1.15, 0.5);
  ctx.strokeStyle = '#c4605f'; ctx.lineWidth = 0.6;
  ctx.beginPath(); ctx.moveTo(5.1, -24.75); ctx.quadraticCurveTo(6.5, -24.1, 7.9, -24.8); ctx.stroke();
  ctx.restore();
}
