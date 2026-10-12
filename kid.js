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
  striped(-9, -25, 18, 14.5, 5);
  ctx.save(); ctx.translate(0, -22); ctx.rotate(air ? -2.3 : -sw * 0.8);
  striped(-3, 0, 6, 10, 3);
  ctx.strokeStyle = 'rgba(90,100,110,.35)'; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.roundRect(-3, 0, 6, 10, 3); ctx.stroke();
  ctx.fillStyle = SKIN; ell(0, 10.5, 2.8, 2.8);
  ctx.restore();

  // 목, 얼굴
  ctx.fillStyle = '#f5cdb0'; rr(-2, -24.5, 6, 3, 1);
  ctx.fillStyle = SKIN; ell(1, -32, 11.2, 10.6); ell(1.5, -27.6, 11, 6.6);

  // 머리카락: 둥근 윗머리 + 짧은 옆머리 + 삐죽삐죽 앞머리
  ctx.fillStyle = HAIR;
  ctx.beginPath(); ctx.ellipse(1, -35, 12.2, 10, 0, Math.PI, Math.PI * 2); ctx.closePath(); ctx.fill();
  rr(-11.2, -35.5, 5, 6.8, [0, 0, 3, 3]);
  poly([[-6.5, -35.5], [-5, -33.2], [-2.6, -34.4], [-1, -32.8], [1, -34.2], [2.8, -32.9], [4.6, -34.8],
        [6.8, -34.8], [8.4, -33], [9.8, -34.3], [11.2, -33.3], [12.6, -34.8], [13.2, -35.5]]);
  poly([[-4, -44], [-2.2, -47.2], [-0.2, -44.5]]);
  poly([[0.6, -44.7], [3.4, -46.8], [4.2, -44.3]]);
  // 앞머리 가운데 갈라진 틈
  ctx.fillStyle = SKIN; poly([[4.6, -34.7], [5.7, -37.6], [6.8, -34.7]]);
  ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.ellipse(1, -35, 8.5, 7, 0, Math.PI * 1.15, Math.PI * 1.6); ctx.stroke();

  // 쏙 나온 귀
  ctx.fillStyle = SKIN; ell(-7.2, -29.5, 3.2, 4.1);
  ctx.fillStyle = '#f0bb9c'; ell(-7, -29.5, 1.4, 2.2);

  // 옅은 눈썹, 가로로 긴 까만 눈
  ctx.strokeStyle = 'rgba(70,50,40,.55)'; ctx.lineWidth = 0.6; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(2.4, -31.4); ctx.quadraticCurveTo(4, -32, 5.6, -31.5);
  ctx.moveTo(8.4, -31.5); ctx.quadraticCurveTo(9.9, -32, 11.2, -31.4);
  ctx.stroke();
  ctx.fillStyle = '#1b1310'; ell(4, -29, 1.75, 1.3); ell(9.8, -29, 1.6, 1.3);
  ctx.fillStyle = '#fff'; ell(4.5, -29.4, 0.5, 0.5); ell(10.2, -29.4, 0.5, 0.5);

  // 볼, 코, 씩 웃는 입
  ctx.fillStyle = 'rgba(255,125,125,.38)'; ell(8.6, -25.3, 2, 1.4); ell(1.2, -25.3, 2, 1.4);
  ctx.fillStyle = '#e8b596'; ell(7.4, -26.2, 0.9, 0.6);
  ctx.strokeStyle = '#c4605f'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(6, -23.6); ctx.quadraticCurveTo(7.6, -22.6, 9.3, -23.9); ctx.stroke();
  ctx.restore();
}
