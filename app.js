const DATA = {
  totals: {
    net_sales: 8129385105,
    gross_sales: 9294223008,
    discount: 1164837903,
    disc_rate_pct: 12.53,
    orders: 15315,
    qty: 31577,
    aov: 530812,
    unique_customers: 4911
  },
  monthly: [
    { label: "Jan", net_sales: 855328061, orders: 1494 },
    { label: "Feb", net_sales: 582151241, orders: 1211 },
    { label: "Mar", net_sales: 1149184596, orders: 2505 },
    { label: "Apr", net_sales: 785218995, orders: 1526 },
    { label: "Mei", net_sales: 961620842, orders: 1489 },
    { label: "Jun", net_sales: 839956226, orders: 1509 },
    { label: "Jul", net_sales: 803992916, orders: 1664 },
    { label: "Agu", net_sales: 796417574, orders: 1440 },
    { label: "Sep", net_sales: 709918053, orders: 1189 },
    { label: "Okt", net_sales: 645596601, orders: 1288 }
  ],
  categories: [
    { category: "BAGS", net_sales: 2708989422, share_pct: 33.32 },
    { category: "APPAREL", net_sales: 2503840434, share_pct: 30.8 },
    { category: "FOOTWEAR", net_sales: 1589083413, share_pct: 19.55 },
    { category: "ACCESSORIES", net_sales: 416032926, share_pct: 5.12 },
    { category: "EQUIPMENT", net_sales: 378614396, share_pct: 4.66 },
    { category: "HEADWEAR", net_sales: 350514514, share_pct: 4.31 },
    { category: "STATIONERY", net_sales: 180360000, share_pct: 2.22 },
    { category: "LAINNYA", net_sales: 1950000, share_pct: 0.02 }
  ],
  top_products: [
    { sku_name: "EIGER VOUCHER 500K, NOC, NOS", orders: 17, qty: 288, net_sales: 136987500 },
    { sku_name: "AURA AG 50, PUR, 47L", orders: 15, qty: 15, net_sales: 85019147 },
    { sku_name: "ATMOS AG 65 S22, BLK, 65L", orders: 11, qty: 11, net_sales: 66210620 },
    { sku_name: "ATMOS AG 50 S22, BLK, 50L", orders: 8, qty: 8, net_sales: 43782300 },
    { sku_name: "WANDERHAUL DUFFELPACK 40L, BRW, 40L", orders: 8, qty: 56, net_sales: 33282827 }
  ],
  recent_orders: [
    { order_no: "20222610310062", customer: "Walk-in Guest", sku_name: "HOLDERIDE LEATHER WALLET, BRW, NOS", status: "delivered", net_sales: 279000 },
    { order_no: "20222610310061", customer: "Walk-in Guest", sku_name: "GRAPNEL POUCH 1A, TER, 2L", status: "delivered", net_sales: 229000 },
    { order_no: "20222610310060", customer: "Walk-in Guest", sku_name: "RIBS TRANS CARGO, BLK, 32", status: "delivered", net_sales: 260788 },
    { order_no: "20222610310060", customer: "Walk-in Guest", sku_name: "CUSCO PINCH, OLI, 41", status: "delivered", net_sales: 187212 },
    { order_no: "20222610310059", customer: "Rizal Golant Nugroho", sku_name: "PAPER BAG EIGER GREEN S, BRW, 6L", status: "delivered", net_sales: 3000 }
  ],
  sales_persons: [
    { sales_person: "ALFIA MAILINA", orders: 2857, net_sales: 1366343641 },
    { sales_person: "AURINDA SETYANYNGRUM", orders: 2601, net_sales: 1241519781 },
    { sales_person: "SYAHRUL MARANDI", orders: 2268, net_sales: 1230303988 },
    { sales_person: "SUNAWIJAYA", orders: 2218, net_sales: 1153903402 },
    { sales_person: "MUHAMMAD AKMAL", orders: 2180, net_sales: 1138859004 }
  ]
};

const PALETTE = ["#f97316", "#f59e0b", "#141518", "#9ca3af", "#0d9488", "#6366f1", "#ec4899", "#cbd5e1"];
const fmtIDR = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
const fmtNum = (n) => Math.round(n).toLocaleString("id-ID");

let activeMetric = "net_sales";
let overviewChart = null;
let categoryDonut = null;

function renderKPIs() {
  const { totals } = DATA;
  const cards = [
    { title: "Total Net Sales", value: fmtIDR(totals.net_sales), meta: `Diskon ${totals.disc_rate_pct.toFixed(1)}% dari Gross`, hero: true },
    { title: "Total Orders", value: fmtNum(totals.orders), meta: `${fmtNum(totals.qty)} item terjual`, hero: false },
    { title: "Unique Customers", value: fmtNum(totals.unique_customers), meta: "Nama pelanggan unik tercatat", hero: false },
    { title: "Avg Order Value", value: fmtIDR(totals.aov), meta: "Rata-rata per pesanan unik", hero: false }
  ];

  document.getElementById("kpiRow").innerHTML = cards.map((c) => `
    <div class="kpi-card ${c.hero ? "hero" : ""}">
      <div class="kpi-title">${c.title}</div>
      <div class="kpi-num">${c.value}</div>
      <div class="kpi-meta">${c.meta}</div>
    </div>
  `).join("");
}

function renderOverviewChart() {
  if (overviewChart) overviewChart.destroy();
  const ctx = document.getElementById("overviewChart").getContext("2d");
  const isRev = activeMetric === "net_sales";

  overviewChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: DATA.monthly.map((m) => m.label),
      datasets: [{
        label: isRev ? "Net Sales" : "Orders",
        data: DATA.monthly.map((m) => (isRev ? m.net_sales : m.orders)),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.14)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#f97316"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => (isRev ? fmtIDR(c.raw) : `${fmtNum(c.raw)} pesanan`)
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (v) => (isRev ? "Rp" + (v / 1e6).toFixed(0) + "jt" : fmtNum(v))
          }
        }
      }
    }
  });
}

function renderCategoryDonut() {
  if (categoryDonut) categoryDonut.destroy();
  const top5 = DATA.categories.slice(0, 5);
  const ctx = document.getElementById("categoryDonut").getContext("2d");

  categoryDonut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: top5.map((c) => c.category),
      datasets: [{
        data: top5.map((c) => c.net_sales),
        backgroundColor: PALETTE.slice(0, 5),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "66%",
      plugins: { legend: { display: false } }
    }
  });

  document.getElementById("categoryLegend").innerHTML = top5.map((c, idx) => `
    <li class="legend-item">
      <span><span class="dot" style="background:${PALETTE[idx]}"></span>${c.category}</span>
      <strong>${c.share_pct.toFixed(1)}%</strong>
    </li>
  `).join("");
}

function renderLists(query = "") {
  const q = query.trim().toLowerCase();

  const filteredProducts = DATA.top_products.filter((p) => p.sku_name.toLowerCase().includes(q));
  document.getElementById("topProductsList").innerHTML = filteredProducts.map((p) => `
    <div class="row-item">
      <div>
        <div class="row-main">${p.sku_name}</div>
        <div class="row-sub">${fmtNum(p.qty)} unit · ${fmtNum(p.orders)} order</div>
      </div>
      <strong>${fmtIDR(p.net_sales)}</strong>
    </div>
  `).join("");

  const filteredOrders = DATA.recent_orders.filter((o) =>
    o.sku_name.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.order_no.includes(q)
  );
  document.getElementById("recentOrdersList").innerHTML = filteredOrders.map((o) => `
    <div class="row-item">
      <div>
        <div class="row-main">${o.customer}</div>
        <div class="row-sub">#${o.order_no} · ${o.sku_name}</div>
      </div>
      <div>
        <div><strong>${fmtIDR(o.net_sales)}</strong></div>
        <span class="status-tag">${o.status}</span>
      </div>
    </div>
  `).join("");

  document.getElementById("salesPersonList").innerHTML = DATA.sales_persons.map((s) => `
    <div class="row-item">
      <div>
        <div class="row-main">${s.sales_person}</div>
        <div class="row-sub">${fmtNum(s.orders)} order</div>
      </div>
      <strong>${fmtIDR(s.net_sales)}</strong>
    </div>
  `).join("");
}

document.querySelectorAll(".pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeMetric = btn.dataset.metric;
    renderOverviewChart();
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderLists(e.target.value);
});

renderKPIs();
renderOverviewChart();
renderCategoryDonut();
renderLists();
