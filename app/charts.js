// Indonesia in Numbers — canvas charts, drawn with the browser's own
// 2D canvas. No library, no network: every chart is computed from the
// data file and drawn here.

const GREEN = '#1b6b3a';
const AMBER = '#c77b0a';
const GRID = '#e3ddd0';
const MUTED = '#5b6b62';
const INK = '#1d2a24';

function setup(canvas, height) {
  const width = canvas.clientWidth || 640;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
  return { ctx, width, height };
}

function niceMax(values) {
  const top = Math.max(...values);
  const bottom = Math.min(0, ...values);
  const span = top - bottom || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span)));
  const nice = Math.ceil(top / step) * step;
  return { top: nice, bottom: Math.floor(bottom / step) * step };
}

function axes(ctx, box, min, max, formatValue) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const value = min + ((max - min) * i) / ticks;
    const y = box.bottom - ((value - min) / (max - min)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(formatValue(value), box.left - 8, y + 4);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(box.left, box.bottom);
  ctx.lineTo(box.right, box.bottom);
  ctx.stroke();
}

export function drawBars(canvas, points, options = {}) {
  const { ctx, width, height } = setup(canvas, 260);
  const values = points.map((p) => p.value);
  const { top, bottom } = niceMax(values);
  const box = { left: 56, right: width - 12, top: 14, bottom: height - 30 };
  box.height = box.bottom - box.top;
  box.width = box.right - box.left;
  const formatValue = options.formatValue ?? ((v) => String(Math.round(v)));
  axes(ctx, box, bottom, top, formatValue);

  const slot = box.width / points.length;
  const barWidth = Math.min(46, slot * 0.62);
  points.forEach((point, i) => {
    const x = box.left + slot * i + (slot - barWidth) / 2;
    const valueHeight = ((point.value - bottom) / (top - bottom)) * box.height;
    const y = box.bottom - valueHeight;
    ctx.fillStyle = point.color ?? (i === points.length - 1 ? AMBER : GREEN);
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, Math.max(valueHeight, 2), 4);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(formatValue(point.value), x + barWidth / 2, y - 6);
    ctx.fillStyle = MUTED;
    const label = point.label.length > 12 ? point.label.slice(0, 11) + '…' : point.label;
    ctx.fillText(label, x + barWidth / 2, box.bottom + 18);
  });
}

export function drawLine(canvas, points, options = {}) {
  const { ctx, width, height } = setup(canvas, 260);
  const values = points.map((p) => p.value);
  const { top, bottom } = niceMax(values);
  const box = { left: 56, right: width - 12, top: 18, bottom: height - 30 };
  box.height = box.bottom - box.top;
  box.width = box.right - box.left;
  const formatValue = options.formatValue ?? ((v) => v.toFixed(2));
  axes(ctx, box, bottom, top, formatValue);

  const step = box.width / Math.max(points.length - 1, 1);
  const at = (i) => ({
    x: box.left + step * i,
    y: box.bottom - ((points[i].value - bottom) / (top - bottom)) * box.height,
  });

  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((point, i) => {
    const p = at(i);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  points.forEach((point, i) => {
    const p = at(i);
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(formatValue(point.value), p.x, p.y - 11);
    ctx.fillStyle = MUTED;
    ctx.fillText(point.label, p.x, box.bottom + 18);
  });
}

export function drawShareBars(canvas, points) {
  const { ctx, width } = setup(canvas, 240);
  const rowHeight = 34;
  const top = 8;
  const labelWidth = 170;
  const barLeft = labelWidth + 10;
  const barMax = width - barLeft - 56;
  ctx.font = '13px -apple-system, "Segoe UI", Roboto, sans-serif';
  points.forEach((point, i) => {
    const y = top + i * rowHeight;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(point.label, labelWidth, y + 15);
    const barWidth = Math.max(2, (point.value / 100) * barMax);
    ctx.fillStyle = point.color ?? GREEN;
    ctx.beginPath();
    ctx.roundRect(barLeft, y + 4, barWidth, 16, 4);
    ctx.fill();
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'left';
    ctx.fillText(point.value.toFixed(1) + '%', barLeft + barWidth + 8, y + 17);
  });
}
