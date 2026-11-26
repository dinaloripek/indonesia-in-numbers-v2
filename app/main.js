// Indonesia in Numbers — router and wiring.
//
// Reads the hash route, renders the page from views.js, draws that
// page's charts, and wires the province table's search and sort. No
// network requests: every page is built from the local data file.

import { POPULATION, ECONOMY, PRICES, JOBS } from './data.js';
import { drawBars, drawLine, drawShareBars } from './charts.js';
import { homePage, populationPage, economyPage, pricesPage, jobsPage, provincesPage } from './views.js';

const ROUTES = {
  '': { title: 'Indonesia in Numbers — Statistik Indonesia', render: homePage },
  'penduduk': { title: 'Penduduk — Indonesia in Numbers', render: populationPage },
  'ekonomi': { title: 'Ekonomi — Indonesia in Numbers', render: economyPage },
  'harga': { title: 'Harga — Indonesia in Numbers', render: pricesPage },
  'pekerjaan': { title: 'Pekerjaan — Indonesia in Numbers', render: jobsPage },
  'provinsi': { title: 'Provinsi — Indonesia in Numbers', render: provincesPage },
};

function drawCharts(route) {
  const growth = document.getElementById('chart-growth');
  if (growth) {
    drawLine(growth, ECONOMY.growthByYear.map((d) => ({ label: d.year, value: d.value })), {
      formatValue: (v) => v.toFixed(2) + '%',
    });
  }
  const islands = document.getElementById('chart-islands');
  if (islands) {
    drawShareBars(
      islands,
      POPULATION.byIsland.map((d) => ({ label: d.name, value: d.share })),
    );
  }
  const pop = document.getElementById('chart-pop');
  if (pop) {
    drawBars(pop, POPULATION.byYear.map((d) => ({ label: d.year, value: d.value })), {
      formatValue: (v) => v.toFixed(1),
    });
  }
  const inflation = document.getElementById('chart-inflation');
  if (inflation) {
    drawLine(inflation, PRICES.inflationByYear.map((d) => ({ label: d.year, value: d.value })), {
      formatValue: (v) => v.toFixed(2) + '%',
    });
  }
  const jobs = document.getElementById('chart-jobs');
  if (jobs) {
    drawLine(jobs, JOBS.tptByYear.map((d) => ({ label: d.year, value: d.value })), {
      formatValue: (v) => v.toFixed(2) + '%',
    });
  }
  void route;
}

function wireProvinces() {
  const search = document.getElementById('province-search');
  const sort = document.getElementById('province-sort');
  const table = document.getElementById('province-table');
  if (!search || !sort || !table) return;
  const empty = document.getElementById('province-empty');
  const body = table.querySelector('tbody');
  const rows = [...body.querySelectorAll('tr')];

  function apply() {
    const query = search.value.trim().toLowerCase();
    const mode = sort.value;
    const visible = rows.filter((row) => !query || row.dataset.name.includes(query));
    visible.sort((a, b) => {
      const cellsA = a.querySelectorAll('td');
      const cellsB = b.querySelectorAll('td');
      if (mode === 'name') return cellsA[0].textContent.localeCompare(cellsB[0].textContent, 'id');
      if (mode === 'density') return parseFloat(cellsB[3].textContent.replace(/\./g, '').replace(',', '.')) - parseFloat(cellsA[3].textContent.replace(/\./g, '').replace(',', '.'));
      return parseFloat(cellsB[2].textContent.replace(',', '.')) - parseFloat(cellsA[2].textContent.replace(',', '.'));
    });
    rows.forEach((row) => row.remove());
    visible.forEach((row) => body.appendChild(row));
    if (empty) empty.hidden = visible.length > 0;
  }

  search.addEventListener('input', apply);
  sort.addEventListener('change', apply);
}

function render() {
  const route = location.hash.replace(/^#\/?/, '').split('/')[0] || '';
  const page = ROUTES[route] ?? ROUTES[''];
  document.title = page.title;
  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.classList.toggle('active', (link.dataset.route || '') === route);
  });
  const app = document.getElementById('app');
  app.innerHTML = page.render();
  drawCharts(route);
  wireProvinces();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
