import './style.css'

const STORAGE_KEY = 'fendo_grills_pos_v1'

const baseCatalog = {
  products: [
    {
      id: 'fendo_shawarma_main',
      name: 'Fendo Shawarma Main',
      category: 'shawarma',
      priceNaira: 6000,
      recipe: { shawarma_bread: 1, shawarma_filling_portion: 1 },
    },
    {
      id: 'regular_shawarma',
      name: 'Regular Shawarma',
      category: 'shawarma',
      priceNaira: 4000,
      recipe: { shawarma_bread: 1, shawarma_filling_portion: 1 },
    },
    {
      id: 'suya_shawarma',
      name: 'Suya Shawarma',
      category: 'shawarma',
      priceNaira: 4500,
      recipe: { shawarma_bread: 1, shawarma_filling_portion: 1, suya_spice: 1 },
    },
    {
      id: 'suya_shawarma_large',
      name: 'Suya Shawarma (Large)',
      category: 'shawarma',
      priceNaira: 6500,
      recipe: { shawarma_bread: 1, shawarma_filling_portion: 2, suya_spice: 1 },
    },
    {
      id: 'barbecue_fish_7000',
      name: 'Barbecue Fish (₦7k)',
      category: 'grilled',
      priceNaira: 7000,
      recipe: { fish_portion: 1 },
    },
    {
      id: 'barbecue_fish_10000',
      name: 'Barbecue Fish (₦10k)',
      category: 'grilled',
      priceNaira: 10000,
      recipe: { fish_portion: 1 },
    },
    {
      id: 'bole_with_fish_8000',
      name: 'Grilled Plantain + Fish (₦8k)',
      category: 'grilled',
      priceNaira: 8000,
      recipe: { plantain_portion: 1, fish_portion: 1 },
    },
    {
      id: 'bole_with_fish_10000',
      name: 'Grilled Plantain + Fish (₦10k)',
      category: 'grilled',
      priceNaira: 10000,
      recipe: { plantain_portion: 1, fish_portion: 1 },
    },
    {
      id: 'fish_plantain_combo_12000',
      name: 'Barbecue Fish + Plantain Combo',
      category: 'grilled',
      priceNaira: 12000,
      recipe: { fish_portion: 1, plantain_portion: 1 },
    },
    {
      id: 'goat_meat_pepper_soup_5500',
      name: 'Goat Meat Pepper Soup (₦5.5k)',
      category: 'pepper_soup',
      priceNaira: 5500,
      recipe: { goat_meat_portion: 1 },
    },
    {
      id: 'goat_meat_pepper_soup_7000',
      name: 'Goat Meat Pepper Soup (₦7k)',
      category: 'pepper_soup',
      priceNaira: 7000,
      recipe: { goat_meat_portion: 1 },
    },
    {
      id: 'pepper_soup_6500',
      name: 'Pepper Soup (₦6.5k)',
      category: 'pepper_soup',
      priceNaira: 6500,
      recipe: { pepper_soup_portion: 1 },
    },
    {
      id: 'pepper_soup_8000',
      name: 'Pepper Soup (₦8k)',
      category: 'pepper_soup',
      priceNaira: 8000,
      recipe: { pepper_soup_portion: 1 },
    },
    {
      id: 'catfish_pepper_soup_6000',
      name: 'Catfish Pepper Soup',
      category: 'pepper_soup',
      priceNaira: 6000,
      recipe: { catfish_portion: 1 },
    },
    {
      id: 'gril_tendo_combo_9000',
      name: 'Fendo Gril-tendo Combo (₦9k)',
      category: 'sides',
      priceNaira: 9000,
      recipe: { fish_portion: 1, noodles_pack: 1, hotdog: 1 },
    },
    {
      id: 'gril_tendo_combo_11000',
      name: 'Fendo Gril-tendo Combo (₦11k)',
      category: 'sides',
      priceNaira: 11000,
      recipe: { fish_portion: 1, noodles_pack: 1, hotdog: 1 },
    },
    {
      id: 'chicken_and_chips',
      name: 'Chicken & Chips',
      category: 'sides',
      priceNaira: 5500,
      recipe: { chicken_portion: 1, chips_portion: 1 },
    },
    {
      id: 'turkey_and_chips',
      name: 'Turkey & Chips',
      category: 'sides',
      priceNaira: 6000,
      recipe: { turkey_portion: 1, chips_portion: 1 },
    },
    {
      id: 'small_chops_pack',
      name: 'Small Chops (Pack)',
      category: 'sides',
      priceNaira: 3000,
      recipe: { small_chops_pack: 1 },
    },
    {
      id: 'veggie_noodles',
      name: 'Veggie Noodles',
      category: 'sides',
      priceNaira: 3000,
      recipe: { noodles_pack: 1, veggies_portion: 1 },
    },
    {
      id: 'white_rice_2000',
      name: 'White Rice (₦2k)',
      category: 'sides',
      priceNaira: 2000,
      recipe: { rice_portion: 1 },
    },
    {
      id: 'white_rice_3500',
      name: 'White Rice (₦3.5k)',
      category: 'sides',
      priceNaira: 3500,
      recipe: { rice_portion: 1 },
    },
    {
      id: 'rice_with_sauce_or_soup_3500',
      name: 'Rice + Sauce/Soup',
      category: 'sides',
      priceNaira: 3500,
      recipe: { rice_portion: 1, sauce_or_soup: 1 },
    },
    {
      id: 'fruity_zobo',
      name: 'Fruity Zobo',
      category: 'drinks',
      priceNaira: 1000,
      recipe: { zobo_bottle: 1 },
    },
    {
      id: 'smoothies',
      name: 'Smoothies',
      category: 'drinks',
      priceNaira: 2500,
      recipe: { smoothie_cup: 1 },
    },
    {
      id: 'soft_drinks',
      name: 'Soft Drinks',
      category: 'drinks',
      priceNaira: 800,
      recipe: { soft_drink_bottle: 1 },
    },
    {
      id: 'alcohol',
      name: 'Alcohol (Set price)',
      category: 'drinks',
      priceNaira: 0,
      recipe: { alcohol_unit: 1 },
    },
  ],
  materials: [
    { id: 'shawarma_bread', name: 'Shawarma Bread', unit: 'pcs', lowStockThreshold: 10 },
    { id: 'shawarma_filling_portion', name: 'Shawarma Filling', unit: 'portion', lowStockThreshold: 10 },
    { id: 'suya_spice', name: 'Suya Spice', unit: 'scoop', lowStockThreshold: 10 },
    { id: 'fish_portion', name: 'Barbecue Fish', unit: 'portion', lowStockThreshold: 5 },
    { id: 'plantain_portion', name: 'Plantain (Bole)', unit: 'portion', lowStockThreshold: 5 },
    { id: 'goat_meat_portion', name: 'Goat Meat', unit: 'portion', lowStockThreshold: 5 },
    { id: 'pepper_soup_portion', name: 'Pepper Soup', unit: 'portion', lowStockThreshold: 5 },
    { id: 'catfish_portion', name: 'Catfish', unit: 'portion', lowStockThreshold: 5 },
    { id: 'noodles_pack', name: 'Noodles', unit: 'pack', lowStockThreshold: 10 },
    { id: 'hotdog', name: 'Hotdog', unit: 'pcs', lowStockThreshold: 10 },
    { id: 'chicken_portion', name: 'Chicken', unit: 'portion', lowStockThreshold: 10 },
    { id: 'turkey_portion', name: 'Turkey', unit: 'portion', lowStockThreshold: 10 },
    { id: 'chips_portion', name: 'Chips', unit: 'portion', lowStockThreshold: 10 },
    { id: 'small_chops_pack', name: 'Small Chops', unit: 'pack', lowStockThreshold: 10 },
    { id: 'veggies_portion', name: 'Veggies', unit: 'portion', lowStockThreshold: 10 },
    { id: 'rice_portion', name: 'White Rice', unit: 'portion', lowStockThreshold: 10 },
    { id: 'sauce_or_soup', name: 'Sauce / Soup', unit: 'portion', lowStockThreshold: 10 },
    { id: 'zobo_bottle', name: 'Fruity Zobo', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'smoothie_cup', name: 'Smoothies', unit: 'cup', lowStockThreshold: 10 },
    { id: 'soft_drink_bottle', name: 'Soft Drinks', unit: 'bottle', lowStockThreshold: 10 },
    { id: 'alcohol_unit', name: 'Alcohol', unit: 'unit', lowStockThreshold: 10 },
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
  return {
    inventory,
    sales: [],
    shifts: [],
    activeShiftId: '',
    shift: { operatorName: '', startedAt: '', endedAt: '' },
  }
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
          config: { priceOverrides: {}, costOverrides: {}, admin: { passwordHash: '' } },
        }

  if (!state.days || typeof state.days !== 'object') state.days = {}
  if (!state.ui || typeof state.ui !== 'object') state.ui = { lastTab: 'pos' }
  if (!state.ui.lastTab) state.ui.lastTab = 'pos'
  if (!state.config || typeof state.config !== 'object') state.config = {}
  if (!state.config.priceOverrides || typeof state.config.priceOverrides !== 'object')
    state.config.priceOverrides = {}
  if (!state.config.costOverrides || typeof state.config.costOverrides !== 'object')
    state.config.costOverrides = {}
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
  if (!Array.isArray(day.shifts)) day.shifts = []
  if (typeof day.activeShiftId !== 'string') day.activeShiftId = ''
  if (!day.shift || typeof day.shift !== 'object') day.shift = { operatorName: '', startedAt: '', endedAt: '' }
  if (typeof day.shift.operatorName !== 'string') day.shift.operatorName = ''
  if (typeof day.shift.startedAt !== 'string') day.shift.startedAt = ''
  if (typeof day.shift.endedAt !== 'string') day.shift.endedAt = ''
  for (const m of baseCatalog.materials) {
    if (typeof day.inventory[m.id] !== 'number') day.inventory[m.id] = 0
  }
  return day
}

function getProducts() {
  const overrides = state.config.priceOverrides || {}
  const costs = state.config.costOverrides || {}
  return baseCatalog.products.map((p) => {
    const override = overrides[p.id]
    const priceNaira =
      typeof override === 'number' && Number.isFinite(override) ? Math.max(0, Math.floor(override)) : p.priceNaira
    const costOverride = costs[p.id]
    const costNaira =
      typeof costOverride === 'number' && Number.isFinite(costOverride)
        ? Math.max(0, Math.floor(costOverride))
        : Math.max(0, Math.floor(Number(p.costNaira) || 0))
    return { ...p, priceNaira, costNaira }
  })
}

function getProduct(productId) {
  const base = baseProductById.get(productId)
  if (!base) return null
  const override = state.config.priceOverrides?.[productId]
  const costOverride = state.config.costOverrides?.[productId]
  const priceNaira =
    typeof override === 'number' && Number.isFinite(override) ? Math.max(0, Math.floor(override)) : base.priceNaira
  const costNaira =
    typeof costOverride === 'number' && Number.isFinite(costOverride)
      ? Math.max(0, Math.floor(costOverride))
      : Math.max(0, Math.floor(Number(base.costNaira) || 0))
  return { ...base, priceNaira, costNaira }
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

function getActiveShift() {
  const activeId = currentDay.activeShiftId
  if (!activeId) return null
  const shifts = Array.isArray(currentDay.shifts) ? currentDay.shifts : []
  return shifts.find((s) => s && s.id === activeId) || null
}

function computeSaleProfitNaira(sale) {
  if (typeof sale?.totalProfitNaira === 'number' && Number.isFinite(sale.totalProfitNaira)) {
    return sale.totalProfitNaira
  }
  const lines = Array.isArray(sale?.lines) ? sale.lines : []
  return lines.reduce((sum, l) => {
    const qty = Number(l.qty) || 0
    const unitPrice = Number(l.unitPriceNaira) || 0
    const unitCost = Number(l.unitCostNaira) || 0
    return sum + (unitPrice - unitCost) * qty
  }, 0)
}

function computeShiftTotals(shiftId) {
  const sales = currentDay.sales.filter((s) => s && s.shiftId === shiftId)
  const revenueNaira = sales.reduce((sum, s) => sum + (Number(s.totalNaira) || 0), 0)
  const profitNaira = sales.reduce((sum, s) => sum + computeSaleProfitNaira(s), 0)
  const cashReceivedNaira = sales.reduce((sum, s) => sum + (Number(s.cashReceivedNaira) || 0), 0)
  const changeGivenNaira = sales.reduce((sum, s) => sum + (Number(s.changeGivenNaira) || 0), 0)
  const netCashNaira = cashReceivedNaira - changeGivenNaira
  return { revenueNaira, profitNaira, cashReceivedNaira, changeGivenNaira, netCashNaira, txCount: sales.length }
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
        <div class="badge" id="shiftBadge"></div>
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
  const shiftBadge = document.querySelector('#shiftBadge')
  const netBadge = document.querySelector('#netBadge')
  todayBadge.textContent = currentDayKey
  const activeShift = getActiveShift()
  shiftBadge.textContent = activeShift?.operatorName ? activeShift.operatorName : 'No Shift'
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
    const unitCostNaira = Number(product.costNaira) || 0
    const unitProfitNaira = (Number(product.priceNaira) || 0) - unitCostNaira
    lines.push({
      productId,
      name: product.name,
      qty: q,
      unitPriceNaira: product.priceNaira,
      unitCostNaira,
      unitProfitNaira,
      lineTotalNaira: product.priceNaira * q,
      lineProfitNaira: unitProfitNaira * q,
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

function finalizeSale(paymentMethod, { cashReceivedNaira, changeGivenNaira } = {}) {
  const lines = computeTicketLines()
  if (!lines.length) return

  const activeShift = getActiveShift()
  const operatorName = String(activeShift?.operatorName || '').trim()
  const shiftId = activeShift?.id || ''

  const totalNaira = lines.reduce((sum, l) => sum + l.lineTotalNaira, 0)
  const totalProfitNaira = lines.reduce((sum, l) => sum + (Number(l.lineProfitNaira) || 0), 0)
  const cashReceived =
    paymentMethod === 'cash' && Number.isFinite(Number(cashReceivedNaira)) ? Math.max(0, Math.floor(cashReceivedNaira)) : 0
  const changeGiven =
    paymentMethod === 'cash' && Number.isFinite(Number(changeGivenNaira)) ? Math.max(0, Math.floor(changeGivenNaira)) : 0

  const sale = {
    id: makeId(),
    ts: new Date().toISOString(),
    paymentMethod,
    operatorName,
    shiftId,
    totalNaira,
    totalProfitNaira,
    cashReceivedNaira: paymentMethod === 'cash' ? cashReceived : 0,
    changeGivenNaira: paymentMethod === 'cash' ? changeGiven : 0,
    lines: lines.map((l) => ({
      productId: l.productId,
      name: l.name,
      qty: l.qty,
      unitPriceNaira: l.unitPriceNaira,
      unitCostNaira: l.unitCostNaira,
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
  const products = getProducts()
  const sections = [
    { id: 'shawarma', name: 'Shawarma' },
    { id: 'grilled', name: 'Grilled' },
    { id: 'pepper_soup', name: 'Pepper Soup' },
    { id: 'sides', name: 'Sides' },
    { id: 'drinks', name: 'Drinks' },
  ]

  const byCategory = new Map(sections.map((s) => [s.id, []]))
  for (const p of products) {
    const categoryId = p.category || 'sides'
    if (!byCategory.has(categoryId)) byCategory.set(categoryId, [])
    byCategory.get(categoryId).push(p)
  }

  const chipsHtml = `
    <div class="pos-chips" role="navigation" aria-label="Menu sections">
      ${sections
        .filter((s) => (byCategory.get(s.id) || []).length)
        .map((s) => `<button class="chip" type="button" data-jump="${s.id}">${s.name}</button>`)
        .join('')}
    </div>
  `

  const sectionsHtml = sections
    .filter((s) => (byCategory.get(s.id) || []).length)
    .map((s) => {
      const items = byCategory.get(s.id) || []
      return `
        <section class="pos-section" id="sec-${s.id}">
          <div class="pos-section-head">
            <div class="pos-section-title">${s.name}</div>
          </div>
          <div class="grid">
            ${items
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
        </section>
      `
    })
    .join('')

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

      ${chipsHtml}
      ${sectionsHtml}

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
  const activeShift = getActiveShift()
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
          <button class="ghost" type="button" data-action="set-start-stock" ${
            activeShift ? 'disabled' : ''
          }>Start Shift</button>
          <button class="ghost" type="button" data-action="stop-shift" ${
            activeShift ? '' : 'disabled'
          }>Stop Shift</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Shift</div>
        <div class="shift-row">
          <div class="shift-label">Active</div>
          <div class="shift-value">${activeShift?.operatorName ? activeShift.operatorName : 'No active shift'}</div>
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

function computeTodayProfitNaira() {
  return currentDay.sales.reduce((sum, s) => sum + computeSaleProfitNaira(s), 0)
}

function renderLedger() {
  const revenue = computeTodayRevenueNaira()
  const profit = computeTodayProfitNaira()
  const salesHtml =
    currentDay.sales.length === 0
      ? `<div class="empty">No sales yet today.</div>`
      : currentDay.sales
          .map((s) => {
            const lines = Array.isArray(s.lines) ? s.lines : []
            const saleProfit = computeSaleProfitNaira(s)
            const operatorName = String(s.operatorName || '').trim() || '—'
            const cashLine =
              (s.paymentMethod || '') === 'cash'
                ? `<div class="sale-sub">Cash received: ₦${formatNaira(
                    s.cashReceivedNaira
                  )} · Change: ₦${formatNaira(s.changeGivenNaira)}</div>`
                : ''
            return `
              <div class="sale">
                <div class="sale-head">
                  <div class="sale-time">${toLocalTimeLabel(s.ts)}</div>
                  <div class="sale-meta">${(s.paymentMethod || '').toUpperCase()}</div>
                  <div class="sale-total">₦${formatNaira(s.totalNaira)}</div>
                </div>
                <div class="sale-sub">Salesperson: ${operatorName} · Profit: ₦${formatNaira(saleProfit)}</div>
                ${cashLine}
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
          <div class="kpi">
            <div class="kpi-label">Profit</div>
            <div class="kpi-value">₦${formatNaira(profit)}</div>
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

  const activeShift = getActiveShift()
  const operatorName = String(activeShift?.operatorName || '').trim()
  if (!activeShift || !operatorName) {
    openModal(
      `
        <div class="modal-head">
          <div class="modal-title">No Active Shift</div>
          <button class="ghost" type="button" data-action="close-modal">Close</button>
        </div>
        <div class="modal-body">
          <div class="sale-sub">Start a shift first so sales are linked to a salesperson.</div>
          <button class="primary" type="button" data-action="go-inventory">Go to Inventory</button>
        </div>
      `
    )
    return
  }

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Checkout</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="checkoutForm">
        <div class="modal-total">₦${formatNaira(total)}</div>
        <div class="sale-sub">${operatorName ? `Salesperson: ${operatorName}` : 'Salesperson: —'}</div>

        <div class="pay-grid">
          <button class="ghost" type="button" data-method="cash">Cash</button>
          <button class="ghost" type="button" data-method="transfer">Transfer</button>
        </div>

        <input type="hidden" name="method" value="cash" />

        <div id="cashFields">
          <label class="field">
            <div class="field-label">Cash Received (₦)</div>
            <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="cashReceived" />
          </label>
          <label class="field">
            <div class="field-label">Change Given (₦)</div>
            <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="changeGiven" />
          </label>
          <div class="sale-sub" id="cashHint"></div>
          <div class="error" id="cashError" hidden></div>
        </div>

        <button class="primary" type="submit">Confirm Paid</button>
      </form>
    `,
    {
      onMount: (root) => {
        const form = root.querySelector('#checkoutForm')
        const methodInput = form.querySelector('input[name="method"]')
        const cashFields = form.querySelector('#cashFields')
        const cashReceivedInput = form.querySelector('input[name="cashReceived"]')
        const changeGivenInput = form.querySelector('input[name="changeGiven"]')
        const cashHint = form.querySelector('#cashHint')
        const cashError = form.querySelector('#cashError')
        const methodButtons = Array.from(form.querySelectorAll('[data-method]'))

        const setMethod = (method) => {
          methodInput.value = method
          for (const btn of methodButtons) {
            btn.classList.toggle('active', btn.getAttribute('data-method') === method)
          }
          cashFields.hidden = method !== 'cash'
          if (method === 'cash') {
            cashReceivedInput.focus()
            if (!cashReceivedInput.value) cashReceivedInput.value = String(total)
            syncFromReceived()
          }
        }

        const showCashError = (message) => {
          if (!message) {
            cashError.hidden = true
            cashError.textContent = ''
            return
          }
          cashError.textContent = message
          cashError.hidden = false
        }

        const syncFromReceived = () => {
          const received = Math.floor(Number(cashReceivedInput.value) || 0)
          const change = Math.max(0, received - total)
          changeGivenInput.value = String(change)
          const net = received - change
          cashHint.textContent = `Net cash kept: ₦${formatNaira(net)}`
          showCashError(received < total ? 'Cash received is less than total.' : '')
        }

        const syncFromChange = () => {
          const change = Math.floor(Number(changeGivenInput.value) || 0)
          const received = total + Math.max(0, change)
          cashReceivedInput.value = String(received)
          const net = received - change
          cashHint.textContent = `Net cash kept: ₦${formatNaira(net)}`
          showCashError('')
        }

        form.addEventListener('click', (e) => {
          const t = e.target
          if (!(t instanceof HTMLElement)) return
          const btn = t.closest('[data-method]')
          if (!btn) return
          const method = btn.getAttribute('data-method')
          if (method === 'cash' || method === 'transfer') setMethod(method)
        })

        cashReceivedInput.addEventListener('input', syncFromReceived)
        changeGivenInput.addEventListener('input', syncFromChange)

        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const method = methodInput.value
          if (method === 'transfer') {
            finalizeSale('transfer')
            return
          }
          const received = Math.floor(Number(cashReceivedInput.value) || 0)
          const change = Math.floor(Number(changeGivenInput.value) || 0)
          if (received < total) {
            showCashError('Cash received is less than total.')
            return
          }
          finalizeSale('cash', { cashReceivedNaira: received, changeGivenNaira: Math.max(0, change) })
        })

        setMethod('cash')
      },
    }
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
        <div class="error" id="shiftError" hidden></div>
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
        const errorEl = root.querySelector('#shiftError')
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const formData = new FormData(form)
          const operatorName = String(formData.get('operatorName') || '').trim()
          if (currentDay.activeShiftId) {
            errorEl.textContent = 'A shift is already running. Stop shift first.'
            errorEl.hidden = false
            return
          }
          if (!operatorName) {
            errorEl.textContent = 'Please enter operator name.'
            errorEl.hidden = false
            return
          }
          const startedAt = new Date().toISOString()
          const shiftId = makeId()
          const shift = {
            id: shiftId,
            operatorName,
            startedAt,
            endedAt: '',
            totals: { revenueNaira: 0, profitNaira: 0, cashReceivedNaira: 0, changeGivenNaira: 0, netCashNaira: 0, txCount: 0 },
          }
          currentDay.shifts.unshift(shift)
          currentDay.activeShiftId = shiftId
          currentDay.shift = { operatorName, startedAt, endedAt: '' }
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

function stopActiveShift() {
  const activeShift = getActiveShift()
  if (!activeShift) return
  const endedAt = new Date().toISOString()
  const totals = computeShiftTotals(activeShift.id)
  activeShift.endedAt = endedAt
  activeShift.totals = totals
  currentDay.activeShiftId = ''
  currentDay.shift = { operatorName: activeShift.operatorName, startedAt: activeShift.startedAt, endedAt }
  saveState(state)

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Shift Summary</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <div class="modal-body">
        <div class="card">
          <div class="card-title">${activeShift.operatorName}</div>
          <div class="shift-row"><div class="shift-label">Transactions</div><div class="shift-value">${totals.txCount}</div></div>
          <div class="shift-row"><div class="shift-label">Revenue</div><div class="shift-value">₦${formatNaira(totals.revenueNaira)}</div></div>
          <div class="shift-row"><div class="shift-label">Profit</div><div class="shift-value">₦${formatNaira(totals.profitNaira)}</div></div>
          <div class="shift-row"><div class="shift-label">Cash received</div><div class="shift-value">₦${formatNaira(totals.cashReceivedNaira)}</div></div>
          <div class="shift-row"><div class="shift-label">Change given</div><div class="shift-value">₦${formatNaira(totals.changeGivenNaira)}</div></div>
          <div class="shift-row"><div class="shift-label">Net cash kept</div><div class="shift-value">₦${formatNaira(totals.netCashNaira)}</div></div>
        </div>
        <button class="primary" type="button" data-action="close-modal">Done</button>
      </div>
    `
  )

  renderTopBadges()
  render()
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
      const costValue = Number(p.costNaira) || 0
      return `
        <label class="field">
          <div class="field-label">${p.name}</div>
          <div class="two-col">
            <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="${
              p.id
            }__price" value="${String(Math.max(0, value))}" />
            <input class="field-input" inputmode="numeric" pattern="[0-9]*" type="number" min="0" step="1" name="${
              p.id
            }__cost" value="${String(Math.max(0, costValue))}" />
          </div>
        </label>
      `
    })
    .join('')

  openModal(
    `
      <div class="modal-head">
        <div class="modal-title">Edit Prices & Costs (₦)</div>
        <button class="ghost" type="button" data-action="close-modal">Close</button>
      </div>
      <form class="modal-body" id="editPricesForm">
        <div class="sale-sub">Left = Price, Right = Cost (used for profit)</div>
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
          const nextCosts = { ...state.config.costOverrides }
          for (const p of baseCatalog.products) {
            const rawPrice = formData.get(`${p.id}__price`)
            const parsedPrice = Number(rawPrice)
            if (Number.isFinite(parsedPrice)) nextOverrides[p.id] = Math.max(0, Math.floor(parsedPrice))

            const rawCost = formData.get(`${p.id}__cost`)
            const parsedCost = Number(rawCost)
            if (Number.isFinite(parsedCost)) nextCosts[p.id] = Math.max(0, Math.floor(parsedCost))
          }
          state.config.priceOverrides = nextOverrides
          state.config.costOverrides = nextCosts
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
  const rows = [
    [
      'Timestamp',
      'Salesperson',
      'Shift ID',
      'Item Sold',
      'Quantity',
      'Price (₦)',
      'Cost (₦)',
      'Line Profit (₦)',
      'Payment Method',
      'Cash Received (₦)',
      'Change Given (₦)',
    ],
  ]
  for (const sale of currentDay.sales.slice().reverse()) {
    const tsLabel = `${currentDayKey} ${toLocalTimeLabel(sale.ts)}`
    const method = sale.paymentMethod || ''
    const operatorName = sale.operatorName || ''
    const shiftId = sale.shiftId || ''
    const cashReceived = (sale.paymentMethod || '') === 'cash' ? sale.cashReceivedNaira || 0 : ''
    const changeGiven = (sale.paymentMethod || '') === 'cash' ? sale.changeGivenNaira || 0 : ''
    const lines = Array.isArray(sale.lines) ? sale.lines : []
    for (const line of lines) {
      const qty = Number(line.qty) || 0
      const unitPrice = Number(line.unitPriceNaira) || 0
      const unitCost = Number(line.unitCostNaira) || 0
      const lineProfit = (unitPrice - unitCost) * qty
      rows.push([
        tsLabel,
        operatorName,
        shiftId,
        line.name,
        qty,
        unitPrice,
        unitCost,
        lineProfit,
        method,
        cashReceived,
        changeGiven,
      ])
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

  const jumpBtn = target.closest('[data-jump]')
  if (jumpBtn) {
    const id = jumpBtn.getAttribute('data-jump')
    const el = id ? document.getElementById(`sec-${id}`) : null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  const actionBtn = target.closest('[data-action]')
  if (actionBtn) {
    const action = actionBtn.getAttribute('data-action')
    if (action === 'checkout') openCheckoutModal()
    if (action === 'clear-ticket') clearTicket()
    if (action === 'export-csv') exportTodayCsv()
    if (action === 'set-start-stock') openStartShiftModal()
    if (action === 'stop-shift') stopActiveShift()
    if (action === 'edit-prices') requireAdminThen(openEditPricesModal)
    if (action === 'go-inventory') {
      closeModal()
      setActiveTab('inventory')
    }
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
