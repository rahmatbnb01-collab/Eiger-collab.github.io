const DASHBOARD_DATA = {
  totals: {
    net_sales: 8129385105,
    gross_sales: 9294223008,
    discount: 1164837903,
    disc_rate_pct: 12.53,
    orders: 15315,
    qty: 31577,
    aov: 530812,
    avg_monthly_net: 812938510
  },
  monthly: [
    { month: "2026-01", label: "Jan 2026", net_sales: 855328061, gross_sales: 963508000, discount: 108179939, disc_rate_pct: 11.23, orders: 1494, qty: 3558, aov: 572509 },
    { month: "2026-02", label: "Feb 2026", net_sales: 582151241, gross_sales: 702141006, discount: 119989765, disc_rate_pct: 17.09, orders: 1211, qty: 2275, aov: 480719 },
    { month: "2026-03", label: "Mar 2026", net_sales: 1149184596, gross_sales: 1278683000, discount: 129498404, disc_rate_pct: 10.13, orders: 2505, qty: 4721, aov: 458756 },
    { month: "2026-04", label: "Apr 2026", net_sales: 785218995, gross_sales: 855650001, discount: 70431006, disc_rate_pct: 8.23, orders: 1526, qty: 2763, aov: 514560 },
    { month: "2026-05", label: "Mei 2026", net_sales: 961620842, gross_sales: 1069730001, discount: 108109159, disc_rate_pct: 10.11, orders: 1489, qty: 3364, aov: 645817 },
    { month: "2026-06", label: "Jun 2026", net_sales: 839956226, gross_sales: 1022674000, discount: 182717774, disc_rate_pct: 17.87, orders: 1509, qty: 3328, aov: 556631 },
    { month: "2026-07", label: "Jul 2026", net_sales: 803992916, gross_sales: 912528000, discount: 108535084, disc_rate_pct: 11.89, orders: 1664, qty: 3016, aov: 483169 },
    { month: "2026-08", label: "Agu 2026", net_sales: 796417574, gross_sales: 900183000, discount: 103765426, disc_rate_pct: 11.53, orders: 1440, qty: 3043, aov: 553068 },
    { month: "2026-09", label: "Sep 2026", net_sales: 709918053, gross_sales: 850995000, discount: 141076947, disc_rate_pct: 16.58, orders: 1189, qty: 2757, aov: 597072 },
    { month: "2026-10", label: "Okt 2026", net_sales: 645596601, gross_sales: 738131000, discount: 92534399, disc_rate_pct: 12.54, orders: 1288, qty: 2752, aov: 501240 }
  ],
  categories: [
    { category: "BAGS", net_sales: 2708989422, gross_sales: 3013707000, discount: 304717578, orders: 7014, qty: 10702, share_pct: 33.32 },
    { category: "APPAREL", net_sales: 2503840434, gross_sales: 2973600000, discount: 469759566, orders: 4866, qty: 7830, share_pct: 30.8 },
    { category: "FOOTWEAR", net_sales: 1589083413, gross_sales: 1841873000, discount: 252789587, orders: 4034, qty: 4927, share_pct: 19.55 },
    { category: "ACCESSORIES", net_sales: 416032926, gross_sales: 469517000, discount: 53484074, orders: 1978, qty: 2359, share_pct: 5.12 },
    { category: "EQUIPMENT", net_sales: 378614396, gross_sales: 418804000, discount: 40189604, orders: 1840, qty: 2298, share_pct: 4.66 },
    { category: "HEADWEAR", net_sales: 350514514, gross_sales: 385122000, discount: 34607486, orders: 2139, qty: 2518, share_pct: 4.31 },
    { category: "STATIONERY", net_sales: 180360000, gross_sales: 189650000, discount: 9290000, orders: 21, qty: 917, share_pct: 2.22 },
    { category: "LAINNYA", net_sales: 1950000, gross_sales: 1950008, discount: 8, orders: 25, qty: 26, share_pct: 0.02 }
  ],
  sales_persons: [
    { sales_person: "ALFIA MAILINA", net_sales: 1366343641, orders: 2857, qty: 5320, share_pct: 16.81 },
    { sales_person: "AURINDA  SETYANYNGRUM", net_sales: 1241519781, orders: 2601, qty: 4781, share_pct: 15.27 },
    { sales_person: "SYAHRUL MARANDI", net_sales: 1230303988, orders: 2268, qty: 4863, share_pct: 15.13 },
    { sales_person: "SUNAWIJAYA", net_sales: 1153903402, orders: 2218, qty: 4462, share_pct: 14.19 },
    { sales_person: "MUHAMMAD AKMAL", net_sales: 1138859004, orders: 2180, qty: 4600, share_pct: 14.01 },
    { sales_person: "ALDI ARAHMAT", net_sales: 722101607, orders: 1382, qty: 2787, share_pct: 8.88 },
    { sales_person: "PATRIAS ALLY PURBANGGARA", net_sales: 660305158, orders: 1392, qty: 2513, share_pct: 8.12 },
    { sales_person: "RICKY FIRDAUS", net_sales: 216919372, orders: 387, qty: 748, share_pct: 2.67 },
    { sales_person: "LAINNYA (9 Staf)", net_sales: 399129152, orders: 432, qty: 1503, share_pct: 4.91 }
  ]
};

const formatIDR = (val) => "Rp" + Math.round(val).toLocaleString("id-ID");
const formatNum = (val) => Math.round(val).toLocaleString("id-ID");

let activeTab = "monthly";
let monthlyMetric = "revenue";
let chartInstance = null;

function renderKPIs() {
  const { totals } = DASHBOARD_DATA;
  const kpis = [
    { label: "Total Net Sales", value: formatIDR(totals.net_sales), sub: `Rata-rata ${formatIDR(totals.avg_monthly_net)}/bln` },
    { label: "Total Orders & Qty", value: `${formatNum(totals.orders)} Order`, sub: `${formatNum(totals.qty)} item terjual` },
    { label: "Average Order Value", value: formatIDR(totals.aov), sub: "Nilai rata-rata per pesanan" },
    { label: "Total Diskon", value: formatIDR(totals.discount), sub: `${totals.disc_rate_pct.toFixed(1)}% dari Gross Sales` }
  ];

  document.getElementById("kpiGrid").innerHTML = kpis.map((k) => `
    <div class="kpi-card">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-sub">${k.sub}</div>
    </div>
  `).join("");
}

function renderView() {
  const controlsEl = document.getElementById("monthlyControls");
  const titleEl = document.getElementById("chartTitle");
  const tableEl = document.getElementById("tableContainer");
  controlsEl.style.display = activeTab === "monthly" ? "flex" : "none";

  if (chartInstance) chartInstance.destroy();
  const ctx = document.getElementById("mainChart").getContext("2d");

  if (activeTab === "monthly") {
    const rows = DASHBOARD_DATA.monthly;
    if (monthlyMetric === "revenue") {
      titleEl.textContent = "Penjualan Bersih vs Diskon Bulanan (Rp)";
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: rows.map((r) => r.label),
          datasets: [
            { label: "Net Sales", data: rows.map((r) => r.net_sales), backgroundColor: "#0f766e", borderRadius: 6 },
            { label: "Diskon", data: rows.map((r) => r.discount), backgroundColor: "#d97706", borderRadius: 6 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: { label: (c) => `${c.dataset.label}: ${formatIDR(c.raw)}` }
            }
          },
          scales: {
            y: { ticks: { callback: (v) => "Rp" + (v / 1e6).toFixed(0) + " jt" } }
          }
        }
      });
    } else {
      titleEl.textContent = "Jumlah Pesanan Unik Bulanan (Orders)";
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: rows.map((r) => r.label),
          datasets: [
            { label: "Orders", data: rows.map((r) => r.orders), backgroundColor: "#0284c7", borderRadius: 6 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: { label: (c) => `${formatNum(c.raw)} pesanan` }
            }
          }
        }
      });
    }

    tableEl.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Bulan</th>
            <th class="num">Orders</th>
            <th class="num">Qty</th>
            <th class="num">Diskon (%)</th>
            <th class="num">AOV</th>
            <th class="num">Net Sales</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <td>${r.label}</td>
              <td class="num">${formatNum(r.orders)}</td>
              <td class="num">${formatNum(r.qty)}</td>
              <td class="num">${r.disc_rate_pct.toFixed(1)}%</td>
              <td class="num">${formatIDR(r.aov)}</td>
              <td class="num"><strong>${formatIDR(r.net_sales)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } else if (activeTab === "categories") {
    const rows = DASHBOARD_DATA.categories;
    titleEl.textContent = "Penjualan Bersih per Kategori Produk (Category Lv.3)";
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: rows.map((r) => r.category),
        datasets: [
          { label: "Net Sales", data: rows.map((r) => r.net_sales), backgroundColor: "#0f766e", borderRadius: 6 }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: { label: (c) => `${formatIDR(c.raw)} (${rows[c.dataIndex].share_pct.toFixed(1)}%)` }
          }
        },
        scales: {
          x: { ticks: { callback: (v) => "Rp" + (v / 1e6).toFixed(0) + " jt" } }
        }
      }
    });

    tableEl.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th class="num">Orders</th>
            <th class="num">Qty</th>
            <th class="num">Diskon</th>
            <th class="num">Kontribusi</th>
            <th class="num">Net Sales</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <td>${r.category}</td>
              <td class="num">${formatNum(r.orders)}</td>
              <td class="num">${formatNum(r.qty)}</td>
              <td class="num">${formatIDR(r.discount)}</td>
              <td class="num">${r.share_pct.toFixed(1)}%</td>
              <td class="num"><strong>${formatIDR(r.net_sales)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } else {
    const rows = DASHBOARD_DATA.sales_persons;
    titleEl.textContent = "Kontribusi Penjualan Bersih per Sales Person";
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: rows.map((r) => r.sales_person.trim()),
        datasets: [
          { label: "Net Sales", data: rows.map((r) => r.net_sales), backgroundColor: "#0f766e", borderRadius: 6 }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: { label: (c) => `${formatIDR(c.raw)} (${rows[c.dataIndex].share_pct.toFixed(1)}%)` }
          }
        },
        scales: {
          x: { ticks: { callback: (v) => "Rp" + (v / 1e6).toFixed(0) + " jt" } }
        }
      }
    });

    tableEl.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Sales Person</th>
            <th class="num">Orders</th>
            <th class="num">Qty</th>
            <th class="num">Kontribusi</th>
            <th class="num">Net Sales</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <td>${r.sales_person.trim()}</td>
              <td class="num">${formatNum(r.orders)}</td>
              <td class="num">${formatNum(r.qty)}</td>
              <td class="num">${r.share_pct.toFixed(1)}%</td>
              <td class="num"><strong>${formatIDR(r.net_sales)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeTab = btn.dataset.tab;
    renderView();
  });
});

document.querySelectorAll(".chip-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    monthlyMetric = btn.dataset.metric;
    renderView();
  });
});

renderKPIs();
renderView();
