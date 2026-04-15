import './style.css'

const STORAGE_KEY = 'fendo_grills_pos_v1'

const baseCatalog = {
  products: [
    {
      id: 'beef_shawarma',
      name: 'Beef Shawarma',
      priceNaira: 3000,
      recipe: { bread: 1, beef_portion: 1 },
    },
    {
      id: 'chicken_shawarma',
      name: 'Chicken Shawarma',
      priceNaira: 2500,
      recipe: { bread: 1, chicken_portion: 1 },
    },
    {
      id: 'full_grilled_chicken',
      name: 'Full Grilled Chicken',
      priceNaira: 8000,
      recipe: { whole_chicken: 1 },
    },
    {
      id: 'sausage',
      name: 'Sausage',
      priceNaira: 1000,
      recipe: { sausage_unit: 1 },
    },
    {
      id: 'bottled_water',
      name: 'Bottled Water',
      priceNaira: 300,
      recipe: { bottled_water: 1 },
    },
    {
      id: 'coke',
      name: 'Coke',
      priceNaira: 500,
      recipe: { coke: 1 },
    },
    {
      id: 'fanta',
      name: 'Fanta',
      priceNaira: 500,
      recipe: { fanta: 1 },
    },
    {
      id: 'sprite',
      name: 'Sprite',
      priceNaira: 500,
      recipe: { sprite: 1 },
    },
    {
      id: 'malt',
      name: 'Malt',
      priceNaira: 700,
      recipe: { malt: 1 },
    },
    {
      id: 'energy_drink',
      name: 'Energy Drink',
      priceNaira: 800,
      recipe: { energy_drink: 1 },
    },
  ],
  materials: [
    { id: 'bread', name: 'Shawarma Bread', unit: 'pcs', lowStockThreshold: 10 },
    { id: 'beef_portion', name: 'Beef Portion', unit: 'portion', lowStockThreshold: 10 },
    { id: 'chicken_portion', name: 'Chicken Portion', unit: 'portion', lowStockThreshold: 10 },
    { id: 'whole_chicken', name: 'Whole Chicken', unit: 'bird', lowStockThreshold: 3 },
    { id: 'sausage_unit', name: 'Sausage', unit: 'pcs', lowStockThreshold: 10 },
    { id: 'bottled_water', name: 'Bottled Water', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'coke', name: 'Coke', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'fanta', name: 'Fanta', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'sprite', name: 'Sprite', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'malt', name: 'Malt', unit: 'can', lowStockThreshold: 10 },
    { id: 'energy_drink', name: 'Energy Drink', unit: 'can', lowStockThreshold: 10 },
  ],
}

const baseProductById = new Map(baseCatalog.products.map((p) => [p.id, p]))
const materialById = new Map(baseCatalog.materials.map((m) => [m.id, m]))

function formatNaira(amount) {
  const number = Number(amount) || 0
  return new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(number)
}

function getDayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toLocalTimeLabel(isoString) {
  const d = new Date(isoString)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function createEmptyDay() {
  const inventory = {}
  for (const m of baseCatalog.materials) inventory[m.id] = 0
  return { inventory, sales: [], shift: { operatorName: '', startedAt: '' } }
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeJsonParse(raw) : null
  const state =
    parsed && typeof parsed === 'object'
      ? parsed
      : {
          version: 1,
          days: {},
          ui: { lastTab: 'pos' },
          config: { priceOverrides: {}, admin: { passwordHash: '' } },
        }

  if (!state.days || typeof state.days !== 'object') state.days = {}
  if (!state.ui || typeof state.ui !== 'object') state.ui = { lastTab: 'pos' }
  if (!state.ui.lastTab) state.ui.lastTab = 'pos'
  if (!state.config || typeof state.config !== 'object') state.config = {}
  if (!state.config.priceOverrides || typeof state.config.priceOverrides !== 'object')
    state.config.priceOverrides = {}
  if (!state.config.admin || typeof state.config.admin !== 'object') state.config.admin = {}
  if (typeof state.config.admin.passwordHash !== 'string') state.config.admin.passwordHash = ''
  return state
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function ensureDay(state, dayKey) {
  if (!state.days[dayKey]) state.days[dayKey] = createEmptyDay()
  const day = state.days[dayKey]
  if (!day.inventory || typeof day.inventory !== 'object') day.inventory = {}
  if (!Array.isArray(day.sales)) day.sales = []
  if (!day.shift || typeof day.shift !== 'object') day.shift = { operatorName: '', startedAt: '' }
  if (typeof day.shift.operatorName !== 'string') day.shift.operatorName = ''
  if (typeof day.shift.startedAt !== 'string') day.shift.startedAt = ''
  for (const m of baseCatalog.materials) {
    if (typeof day.inventory[m.id] !== 'number') day.inventory[m.id] = 0
  }
  return day
}

function getProducts() {
  const overrides = state.config.priceOverrides || {}
  return baseCatalog.products.map((p) => {
    const override = overrides[p.id]
    const priceNaira =
      typeof override === 'number' && Number.isFinite(override) ? Math.max(0, Math.floor(override)) : p.priceNaira
    return { ...p, priceNaira }
  })
}

function getProduct(productId) {
  const base = baseProductById.get(productId)
  if (!base) return null
  const override = state.config.priceOverrides?.[productId]
  if (typeof override === 'number' && Number.isFinite(override)) {
    return { ...base, priceNaira: Math.max(0, Math.floor(override)) }
  }
  return base
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text))
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function csvEscape(value) {
  const text = String(value ?? '')
  const needs = /[",\r\n]/.test(text)
  if (!needs) return text
  return `"${text.replaceAll('"', '""')}"`
}

function downloadTextFile({ filename, text, mimeType }) {
  const blob = new Blob([text], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function makeId() {
  if (crypto?.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const state = loadState()
let currentDayKey = getDayKey()
let currentDay = ensureDay(state, currentDayKey)
saveState(state)

let ticket = {}
let activeTab = (location.hash || '').replace('#', '') || state.ui.lastTab || 'pos'
if (!['pos', 'inventory', 'ledger'].includes(activeTab)) activeTab = 'pos'

const appRoot = document.querySelector('#app')
appRoot.innerHTML = `
  <div class="app">
    <header class="topbar">
      <div class="topbar-left">
        <div class="appname">Fendo Grills</div>
        <div class="subtitle">POS & Inventory</div>
      </div>
      <div class="topbar-right">
        <div class="badge" id="todayBadge"></div>
        <div class="badge" id="netBadge"></div>
      </div>
    </header>
    <main class="view" id="view"></main>
    <nav class="tabbar" aria-label="Main">
      <button class="tab" type="button" data-tab="pos">POS</button>
      <button class="tab" type="button" data-tab="inventory">Inventory</button>
      <button class="tab" type="button" data-tab="ledger">Today</button>
    </nav>
  </div>
  <div class="modal-root" id="modalRoot"></div>
`

const viewEl = document.querySelector('#view')
const modalRootEl = document.querySelector('#modalRoot')

function renderTopBadges() {
  const nextDayKey = getDayKey()
  if (nextDayKey !== currentDayKey) {
    currentDayKey = nextDayKey
    currentDay = ensureDay(state, currentDayKey)
    saveState(state)
    ticket = {}
    closeModal()
  }
  const todayBadge = document.querySelector('#todayBadge')
  const netBadge = document.querySelector('#netBadge')
  todayBadge.textContent = currentDayKey
  netBadge.textContent = navigator.onLine ? 'Online' : 'Offline'
  netBadge.classList.toggle('offline', !navigator.onLine)
}

function setActiveTab(tab) {
  activeTab = tab
  state.ui.lastTab = tab
  saveState(state)
  if (location.hash.replace('#', '') !== tab) location.hash = tab
  render()
}

function closeModal() {
  modalRootEl.innerHTML = ''
  modalRootEl.classList.remove('open')
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

function openModal(innerHtml, { onMount } = {}) {
  modalRootEl.innerHTML = `
    <div class="modal-backdrop" data-close="1"></div>
    <div class="modal" role="dialog" aria-modal="true">
      ${innerHtml}
    </div>
  `
  modalRootEl.classList.add('open')
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  if (typeof onMount === 'function') onMount(modalRootEl)
}

function computeTicketLines() {
  const lines = []
  for (const [productId, qty] of Object.entries(ticket)) {
    const q = Number(qty) || 0
    if (q <= 0) continue
    const product = getProduct(productId)
    if (!product) continue
    lines.push({
      productId,
      name: product.name,
      qty: q,
      unitPriceNaira: product.priceNaira,
      lineTotalNaira: product.priceNaira * q,
    })
  }
  lines.sort((a, b) => a.name.localeCompare(b.name))
  return lines
}

function computeTicketTotalNaira() {
  let total = 0
  for (const line of computeTicketLines()) total += line.lineTotalNaira
  return total
}

function addToTicket(productId, amount = 1) {
  const next = (Number(ticket[productId]) || 0) + amount
  if (next <= 0) {
    const { [productId]: _, ...rest } = ticket
    ticket = rest
  } else {
    ticket = { ...ticket, [productId]: next }
  }
  render()
}

function clearTicket() {
  ticket = {}
  render()
}

function deductInventoryForSale(lines) {
  for (const line of lines) {
    const product = getProduct(line.productId)
    if (!product) continue
    for (const [materialId, perUnit] of Object.entries(product.recipe || {})) {
      const used = (Number(perUnit) || 0) * line.qty
      if (!used) continue
      const current = Number(currentDay.inventory[materialId]) || 0
      currentDay.inventory[materialId] = current - used
    }
  }
}

function finalizeSale(paymentMethod) {
  const lines = computeTicketLines()
  if (!lines.length) return

  const sale = {
    id: makeId(),
    ts: new Date().toISOString(),
    paymentMethod,
    totalNaira: lines.reduce((sum, l) => sum + l.lineTotalNaira, 0),
    lines: lines.map((l) => ({
      productId: l.productId,
      name: l.name,
      qty: l.qty,
      unitPriceNaira: l.unitPriceNaira,
    })),
  }

  currentDay.sales.unshift(sale)
  deductInventoryForSale(lines)
  saveState(state)
  ticket = {}
  closeModal()
  render()
}

function renderTabbar() {
  const buttons = document.querySelectorAll('.tabbar .tab')
  for (const btn of buttons) {
    const tab = btn.getAttribute('data-tab')
    btn.classList.toggle('active', tab === activeTab)
  }
}

function renderPOS() {
  const lines = computeTicketLines()
  const totalNaira = lines.reduce((sum, l) => sum + l.lineTotalNaira, 0)
  const itemsHtml =
    lines.length === 0
      ? `<div class="empty">Tap a product to start an order.</div>`
      : `
        <div class="ticket-lines">
          ${lines
            .map(
              (l) => `
                <div class="ticket-line">
                  <div class="ticket-main">
                    <div class="ticket-name">${l.name}</div>
                    <div class="ticket-sub">₦${formatNaira(l.unitPriceNaira)} × ${l.qty}</div>
                  </div>
                  <div class="ticket-actions">
                    <button class="mini" type="button" data-dec="${l.productId}">−</button>
                    <div class="qty">${l.qty}</div>
                    <button class="mini" type="button" data-inc="${l.productId}">+</button>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
      `

  viewEl.innerHTML = `
    <section class="screen">
      <div class="screen-head">
        <div class="screen-title">Rapid Order Entry</div>
        <button class="ghost" type="button" data-action="clear-ticket" ${
          lines.length ? '' : 'disabled'
        }>Clear</button>
      </div>

      <div class="grid">
        ${getProducts()
          .map(
            (p) => `
              <button class="product" type="button" data-add="${p.id}">
                <div class="product-name">${p.name}</div>
                <div class="product-price">₦${formatNaira(p.priceNaira)}</div>
              </button>
            `
          )
          .join('')}
      </div>

      <div class="card">
        <div class="card-title">Current Order</div>
        ${itemsHtml}
      </div>

      <div class="sticky-footer">
        <div class="total">
          <div class="total-label">Total</div>
          <div class="total-amount">₦${formatNaira(totalNaira)}</div>
        </div>
        <button class="primary" type="button" data-action="checkout" ${
          lines.length ? '' : 'disabled'
        }>Checkout / Paid</button>
      </div>
    </section>
  `
}

function renderInventory() {
  const list = baseCatalog.materials
    .map((m) => {
      const value = Number(currentDay.inventory[m.id]) || 0
      const isLow = value <= m.lowStockThreshold
      const classes = ['inv-item']
      if (value < 0) classes.push('neg')
      else if (isLow) classes.push('low')
      return `
        <div class="${classes.join(' ')}">
          <div class="inv-main">
            <div class="inv-name">${m.name}</div>
            <div class="inv-sub">Low below ${m.lowStockThreshold} ${m.unit}</div>
          </div>
          <div class="inv-right">
            <div class="inv-value">${value}</div>
            <div class="inv-controls">
              <button class="mini" type="button" data-inv="${m.id}" data-delta="-10">−10</button>
              <button class="mini" type="button" data-inv="${m.id}" data-delta="-1">−1</button>
              <button class="mini" type="button" data-inv="${m.id}" data-delta="1">+1</button>
              <button class="mini" type="button" data-inv="${m.id}" data-delta="10">+10</button>
            </div>
          </div>
        </div>
      `
    })
    .join('')

  viewEl.innerHTML = `
    <section class="screen">
      <div class="screen-head">
        <div class="screen-title">Inventory</div>
        <div class="screen-actions">
          <button class="ghost" type="button" data-action="edit-prices">Prices</button>
          <button class="ghost" type="button" data-action="set-start-stock">Start Shift</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Today’s Stock</div>
        <div class="inv-list">${list}</div>
      </div>
    </section>
  `
}

function computeTodayRevenueNaira() {
  return currentDay.sales.reduce((sum, s) => sum + (Number(s.totalNaira) || 0), 0)
}

function renderLedger() {
  const revenue = computeTodayRevenueNaira()
  const salesHtml =
    currentDay.sales.length === 0
      ? `<div class="empty">No sales yet today.</div>`
      : currentDay.sales
          .map((s) => {
            const lines = Array.isArray(s.lines) ? s.lines : []
            return `
              <div class="sale">
                <div class="sale-head">
                  <div class="sale-time">${toLocalTimeLabel(s.ts)}</div>
                  <div class="sale-meta">${(s.paymentMethod || '').toUpperCase()}</div>
                  <div class="sale-total">₦${formatNaira(s.totalNaira)}</div>
                </div>
                <div class="sale-lines">
                  ${lines
                    .map(
                      (l) => `
                        <div class="sale-line">
                          <div class="sale-item">${l.name}</div>
                          <div class="sale-qty">×${l.qty}</div>
                          <div class="sale-price">₦${formatNaira(l.unitPriceNaira)}</div>
                        </div>
                      `
                    )
                    .join('')}
                </div>
              </div>
            `
          })
          .join('')

  viewEl.innerHTML = `
    <section class="screen">
      <div class="screen-head">
        <div class="screen-title">Today’s Sales</div>
        <button class="ghost" type="button" data-action="export-csv" ${
          currentDay.sales.length ? '' : 'disabled'
        }>Export CSV</button>
      </div>

      <div class="card">
        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Transactions</div>
            <div class="kpi-value">${currentDay.sales.length}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Revenue</div>
            <div class="kpi-value">₦${formatNaira(revenue)}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Ledger</div>
        ${salesHtml}
      </div>
    </section>
  `
}

function render() {
  renderTopBadges()
  renderTabbar()

  if (activeTab === 'pos') renderPOS()
  else if (activeTab === 'inventory') renderInventory()
  else renderLedger()
}

function openCheckoutModal() {
  const total = computeTicketTotalNaira()
  if (total <= 0) return

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Payment Method</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <div class="modal-body">
        <div class="modal-total">₦${formatNaira(total)}</div>
        <div class="pay-grid">
          <button class="primary" type="button" data-pay="cash">Cash</button>
          <button class="primary" type="button" data-pay="transfer">Transfer</button>
        </div>
      </div>
    `
  )
}

function openStartShiftModal() {
  const fields = baseCatalog.materials
    .map((m) => {
      const value = Number(currentDay.inventory[m.id]) || 0
      return `
        <label class="field">
          <div class="field-label">${m.name} (${m.unit})</div>
          <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="${
            m.id
          }" value="${String(Math.max(0, value))}"/>
        </label>
      `
    })
    .join('')

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Start of Shift Stock</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="startShiftForm">
        <label class="field">
          <div class="field-label">Operator Name</div>
          <input class="field-input" type="text" name="operatorName" autocomplete="name" value="${String(
            currentDay.shift?.operatorName || ''
          ).replaceAll('"', '&quot;')}" />
        </label>
        <div class="fields">${fields}</div>
        <button class="primary" type="submit">Save Starting Stock</button>
      </form>
    `,
    {
      onMount: (root) => {
        const form = root.querySelector('#startShiftForm')
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const formData = new FormData(form)
          const operatorName = String(formData.get('operatorName') || '').trim()
          currentDay.shift = {
            operatorName,
            startedAt: new Date().toISOString(),
          }
          for (const m of baseCatalog.materials) {
            const raw = formData.get(m.id)
            const parsed = Number(raw)
            currentDay.inventory[m.id] = Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0
          }
          saveState(state)
          closeModal()
          render()
        })
      },
    }
  )
}

function openSetAdminPasswordModal({ onSuccess }) {
  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Set Admin Password</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="setAdminPasswordForm">
        <div class="error" id="adminError" hidden></div>
        <label class="field">
          <div class="field-label">New Password</div>
          <input class="field-input" type="password" name="password" autocomplete="new-password" required />
        </label>
        <label class="field">
          <div class="field-label">Confirm Password</div>
          <input class="field-input" type="password" name="confirm" autocomplete="new-password" required />
        </label>
        <button class="primary" type="submit">Save Password</button>
      </form>
    `,
    {
      onMount: (root) => {
        const form = root.querySelector('#setAdminPasswordForm')
        const errorEl = root.querySelector('#adminError')
        form.addEventListener('submit', async (e) => {
          e.preventDefault()
          const fd = new FormData(form)
          const password = String(fd.get('password') || '')
          const confirm = String(fd.get('confirm') || '')
          if (password.length < 4) {
            errorEl.textContent = 'Password must be at least 4 characters.'
            errorEl.hidden = false
            return
          }
          if (password !== confirm) {
            errorEl.textContent = 'Passwords do not match.'
            errorEl.hidden = false
            return
          }
          const hash = await sha256Hex(password)
          state.config.admin.passwordHash = hash
          saveState(state)
          closeModal()
          onSuccess()
        })
      },
    }
  )
}

function openAdminLoginModal({ onSuccess }) {
  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Admin Login</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="adminLoginForm">
        <div class="error" id="adminError" hidden></div>
        <label class="field">
          <div class="field-label">Password</div>
          <input class="field-input" type="password" name="password" autocomplete="current-password" required />
        </label>
        <button class="primary" type="submit">Unlock Price Editor</button>
      </form>
    `,
    {
      onMount: (root) => {
        const form = root.querySelector('#adminLoginForm')
        const errorEl = root.querySelector('#adminError')
        const input = root.querySelector('input[name="password"]')
        input?.focus?.()
        form.addEventListener('submit', async (e) => {
          e.preventDefault()
          const fd = new FormData(form)
          const password = String(fd.get('password') || '')
          const hash = await sha256Hex(password)
          if (hash !== state.config.admin.passwordHash) {
            errorEl.textContent = 'Wrong password.'
            errorEl.hidden = false
            return
          }
          closeModal()
          onSuccess()
        })
      },
    }
  )
}

function openEditPricesModal() {
  const products = getProducts()
  const fields = products
    .map((p) => {
      const value = p.priceNaira
      return `
        <label class="field">
          <div class="field-label">${p.name}</div>
          <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="${
            p.id
          }" value="${String(Math.max(0, value))}" />
        </label>
      `
    })
    .join('')

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Edit Prices (₦)</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="editPricesForm">
        <div class="fields">${fields}</div>
        <button class="primary" type="submit">Save Prices</button>
      </form>
    `,
    {
      onMount: (root) => {
        const form = root.querySelector('#editPricesForm')
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const formData = new FormData(form)
          const nextOverrides = { ...state.config.priceOverrides }
          for (const p of baseCatalog.products) {
            const raw = formData.get(p.id)
            const parsed = Number(raw)
            if (Number.isFinite(parsed)) nextOverrides[p.id] = Math.max(0, Math.floor(parsed))
          }
          state.config.priceOverrides = nextOverrides
          saveState(state)
          closeModal()
          render()
        })
      },
    }
  )
}

function requireAdminThen(action) {
  const hasPassword = Boolean(state.config.admin.passwordHash)
  if (!hasPassword) {
    openSetAdminPasswordModal({ onSuccess: action })
    return
  }
  openAdminLoginModal({ onSuccess: action })
}

function exportTodayCsv() {
  const rows = [['Timestamp', 'Item Sold', 'Quantity', 'Price (₦)', 'Payment Method']]
  for (const sale of currentDay.sales.slice().reverse()) {
    const tsLabel = `${currentDayKey} ${toLocalTimeLabel(sale.ts)}`
    const method = sale.paymentMethod || ''
    const lines = Array.isArray(sale.lines) ? sale.lines : []
    for (const line of lines) {
      rows.push([tsLabel, line.name, line.qty, line.unitPriceNaira, method])
    }
  }
  const csv = rows.map((r) => r.map(csvEscape).join(',')).join('\r\n')
  downloadTextFile({
    filename: `fendo-sales-${currentDayKey}.csv`,
    text: csv,
    mimeType: 'text/csv;charset=utf-8',
  })
}

document.addEventListener('click', (e) => {
  const target = e.target
  if (!(target instanceof HTMLElement)) return

  const tabBtn = target.closest('[data-tab]')
  if (tabBtn) {
    const tab = tabBtn.getAttribute('data-tab')
    if (tab) setActiveTab(tab)
    return
  }

  const addBtn = target.closest('[data-add]')
  if (addBtn) {
    const id = addBtn.getAttribute('data-add')
    if (id) addToTicket(id, 1)
    return
  }

  const incBtn = target.closest('[data-inc]')
  if (incBtn) {
    const id = incBtn.getAttribute('data-inc')
    if (id) addToTicket(id, 1)
    return
  }

  const decBtn = target.closest('[data-dec]')
  if (decBtn) {
    const id = decBtn.getAttribute('data-dec')
    if (id) addToTicket(id, -1)
    return
  }

  const invBtn = target.closest('[data-inv][data-delta]')
  if (invBtn) {
    const id = invBtn.getAttribute('data-inv')
    const delta = Number(invBtn.getAttribute('data-delta'))
    if (id && Number.isFinite(delta) && materialById.has(id)) {
      const current = Number(currentDay.inventory[id]) || 0
      currentDay.inventory[id] = current + delta
      saveState(state)
      render()
    }
    return
  }

  const payBtn = target.closest('[data-pay]')
  if (payBtn) {
    const method = payBtn.getAttribute('data-pay')
    if (method === 'cash' || method === 'transfer') finalizeSale(method)
    return
  }

  const actionBtn = target.closest('[data-action]')
  if (actionBtn) {
    const action = actionBtn.getAttribute('data-action')
    if (action === 'checkout') openCheckoutModal()
    if (action === 'clear-ticket') clearTicket()
    if (action === 'export-csv') exportTodayCsv()
    if (action === 'set-start-stock') openStartShiftModal()
    if (action === 'edit-prices') requireAdminThen(openEditPricesModal)
    if (action === 'close-modal') closeModal()
    return
  }

  if (target.closest('[data-close]')) closeModal()
})

window.addEventListener('hashchange', () => {
  const tab = (location.hash || '').replace('#', '')
  if (['pos', 'inventory', 'ledger'].includes(tab) && tab !== activeTab) setActiveTab(tab)
})

window.addEventListener('online', renderTopBadges)
window.addEventListener('offline', renderTopBadges)

render()

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
