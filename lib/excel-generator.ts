import ExcelJS from 'exceljs'
import type { CalculatorInputs } from '@/config/calculator.config'

// ─── Colour palette ──────────────────────────────────────────────────────────
const C = {
  ink:      'FF0D0D0D',
  paper:    'FFF7F4EF',
  accent:   'FFFF4D00',
  muted:    'FF8C8C7A',
  border:   'FFE0DDD6',
  white:    'FFFFFFFF',
  success:  'FF1A7A4A',
  inputBg:  'FFFFFFF0', // pale yellow = user-editable (industry standard)
  section:  'FFF0EDE8',
  dark:     'FF1A1A1A',
  errorRed: 'FFCC0000',
}

// ─── Calculation logic (mirrors calculator.config.ts) ────────────────────────
const PLATFORM_FEES: Record<string, number> = {
  independent: 0, direct: 0, upwork: 0.15, fiverr: 0.20,
  freelancer: 0.10, toptal: 0, contra: 0, peopleperhour: 0.20,
  guru: 0.09, designhill: 0.15, '99designs': 0.15,
  solidgigs: 0, marketerHire: 0, other: 0.10,
}

const INDUSTRY_BENCHMARKS: Record<string, { low: number; mid: number; high: number }> = {
  design:      { low: 35, mid: 75,  high: 150 },
  development: { low: 40, mid: 90,  high: 200 },
  writing:     { low: 25, mid: 60,  high: 120 },
  marketing:   { low: 30, mid: 70,  high: 150 },
  consulting:  { low: 50, mid: 120, high: 300 },
  video:       { low: 35, mid: 75,  high: 150 },
  finance:     { low: 50, mid: 100, high: 250 },
  other:       { low: 25, mid: 65,  high: 150 },
}

const CURRENCY_MULTIPLIERS: Record<string, number> = {
  USD: 1, GBP: 0.79, EUR: 0.92, AUD: 1.52, CAD: 1.36,
  INR: 83.5, BRL: 5.0, ZAR: 18.6, PHP: 56.5, PKR: 278.0,
  NGN: 1580.0, MXN: 17.2, AED: 3.67, KES: 129.0,
  SGD: 1.34, SEK: 10.4, CHF: 0.90,
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$',
  INR: '₹', BRL: 'R$', ZAR: 'R', PHP: '₱', PKR: '₨',
  NGN: '₦', MXN: 'MX$', AED: 'AED ', KES: 'KSh ',
  SGD: 'S$', SEK: 'kr', CHF: 'CHF ',
}

const INDUSTRY_LABELS: Record<string, string> = {
  design: 'Design', development: 'Development', writing: 'Writing / Copy',
  marketing: 'Marketing / SEO', consulting: 'Consulting',
  video: 'Video / Motion', finance: 'Finance / Accounting', other: 'Other',
}

const PLATFORM_LABELS: Record<string, string> = {
  independent: 'Independent (own clients)', direct: 'Direct Client Contract',
  upwork: 'Upwork', fiverr: 'Fiverr', freelancer: 'Freelancer.com',
  toptal: 'Toptal', contra: 'Contra', peopleperhour: 'PeoplePerHour',
  guru: 'Guru', designhill: 'Designhill', '99designs': '99designs',
  solidgigs: 'SolidGigs', marketerHire: 'MarketerHire', other: 'Other Platform',
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function compute(inputs: CalculatorInputs) {
  const { desiredMonthlyIncome: monthly, monthlyBusinessExpenses: bizExp,
    monthlyPersonalExpenses: persExp, hoursPerWeek: hpw, weeksPerYear: wpy,
    taxRate: tax, platform, industry, currency } = inputs

  const billableHrs = hpw * wpy
  const annualIncome = monthly * 12
  const annualExp = (bizExp + persExp) * 12
  const annualGross = (annualIncome + annualExp) / (1 - tax / 100)
  const annualTax = annualGross * (tax / 100)
  const fee = PLATFORM_FEES[platform] ?? 0.10
  const feeMult = fee < 1 ? 1 / (1 - fee) : 1
  const minHourly = (annualGross / billableHrs) * feeMult
  const recHourly = minHourly * 1.3
  const mult = CURRENCY_MULTIPLIERS[currency] ?? 1
  const bench = INDUSTRY_BENCHMARKS[industry] ?? INDUSTRY_BENCHMARKS.other

  return {
    minHourly:   Math.ceil(minHourly * 100) / 100,
    recHourly:   Math.ceil(recHourly * 100) / 100,
    dayRate:     Math.ceil(recHourly * 8 * 100) / 100,
    weekRate:    Math.ceil(recHourly * hpw * 100) / 100,
    monthRate:   Math.ceil(recHourly * hpw * (wpy / 12) * 100) / 100,
    takeHome:    Math.ceil(recHourly * (1 - fee) * 100) / 100,
    feePct:      fee * 100,
    smallProj:   Math.ceil(recHourly * 10 * 1.1 * 100) / 100,
    medProj:     Math.ceil(recHourly * 40 * 1.1 * 100) / 100,
    largeProj:   Math.ceil(recHourly * 160 * 1.1 * 100) / 100,
    annualGross: Math.ceil(annualGross),
    annualTax:   Math.ceil(annualTax),
    annualNet:   annualIncome,
    billableHrs,
    benchLow:    Math.ceil(bench.low * mult * 100) / 100,
    benchMid:    Math.ceil(bench.mid * mult * 100) / 100,
    benchHigh:   Math.ceil(bench.high * mult * 100) / 100,
  }
}

// ─── Style helpers ────────────────────────────────────────────────────────────
function headerFill(color: string): ExcelJS.Fill {
  return { type: 'pattern', pattern: 'solid', fgColor: { argb: color } }
}

function thinBorder(): Partial<ExcelJS.Borders> {
  const s: ExcelJS.BorderStyle = 'thin'
  const c = { argb: 'FFD0CCC4' }
  return { top: { style: s, color: c }, bottom: { style: s, color: c },
           left: { style: s, color: c }, right: { style: s, color: c } }
}

function bottomBorder(): Partial<ExcelJS.Borders> {
  return { bottom: { style: 'thin', color: { argb: 'FFD0CCC4' } } }
}

function applyHeader(cell: ExcelJS.Cell, text: string, bgArgb: string,
  fontArgb = C.white, size = 11, italic = false) {
  cell.value = text
  cell.font = { name: 'Arial', size, bold: true, color: { argb: fontArgb }, italic }
  cell.fill = headerFill(bgArgb)
  cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
}

function applyLabel(cell: ExcelJS.Cell, text: string, bold = false) {
  cell.value = text
  cell.font = { name: 'Arial', size: 10, bold, color: { argb: C.ink } }
  cell.alignment = { horizontal: 'left', vertical: 'middle' }
}

function applyValue(cell: ExcelJS.Cell, value: number | string,
  numFmt?: string, bold = false, colorArgb = C.ink) {
  cell.value = value
  cell.font = { name: 'Arial', size: 10, bold, color: { argb: colorArgb } }
  cell.alignment = { horizontal: 'right', vertical: 'middle' }
  if (numFmt) cell.numFmt = numFmt
}

function applyFormula(cell: ExcelJS.Cell, formula: string,
  numFmt?: string, bold = false, colorArgb = C.ink) {
  cell.value = { formula, result: 0 }
  cell.font = { name: 'Arial', size: 10, bold, color: { argb: colorArgb } }
  cell.alignment = { horizontal: 'right', vertical: 'middle' }
  if (numFmt) cell.numFmt = numFmt
}

function applyInput(cell: ExcelJS.Cell, value: number | string, numFmt?: string) {
  cell.value = value
  cell.font = { name: 'Arial', size: 10, color: { argb: '000000FF' } } // blue = editable
  cell.fill = headerFill(C.inputBg)
  cell.alignment = { horizontal: 'right', vertical: 'middle' }
  cell.border = thinBorder()
  if (numFmt) cell.numFmt = numFmt
}

function curFmt(sym: string) {
  return `"${sym}"#,##0.00;"(${sym}"#,##0.00);"-"`
}

// ─── TAB 1: Rate Dashboard ────────────────────────────────────────────────────
function buildDashboard(wb: ExcelJS.Workbook, inputs: CalculatorInputs,
  r: ReturnType<typeof compute>, sym: string, fmt: string) {
  const ws = wb.addWorksheet('📊 Rate Dashboard', { views: [{ showGridLines: false }] })

  ws.getColumn('A').width = 32
  ws.getColumn('B').width = 22
  ws.getColumn('C').width = 22
  ws.getColumn('D').width = 22

  let row = 1

  // Title
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'FREELANCE PRICE CALCULATOR  —  RATE DASHBOARD', C.ink, C.white, 13)
  ws.getRow(row).height = 30
  row++
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'freelancepricecalculator.com  |  Premium Pack', C.dark, C.muted, 9)
  ws.getRow(row).height = 18
  row += 2

  // Inputs block
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'YOUR INPUTS', C.accent, C.white, 10)
  ws.getRow(row).height = 24
  row++

  const inputRows: [string, string][] = [
    ['Desired Monthly Income', `${sym}${(r.annualNet / 12).toLocaleString('en', { maximumFractionDigits: 0 })}`],
    ['Monthly Business Expenses', `${sym}${inputs.monthlyBusinessExpenses.toLocaleString()}`],
    ['Monthly Personal Expenses', `${sym}${inputs.monthlyPersonalExpenses.toLocaleString()}`],
    ['Hours / Week', `${inputs.hoursPerWeek} hrs`],
    ['Weeks Working / Year', `${inputs.weeksPerYear} wks`],
    ['Tax Rate', `${inputs.taxRate}%`],
    ['Platform', PLATFORM_LABELS[inputs.platform] ?? inputs.platform],
    ['Industry', INDUSTRY_LABELS[inputs.industry] ?? inputs.industry],
    ['Currency', inputs.currency],
  ]

  for (const [label, val] of inputRows) {
    applyLabel(ws.getCell(row, 1), label)
    ws.getCell(row, 1).fill = headerFill(C.section)
    ws.mergeCells(row, 2, row, 4)
    const vc = ws.getCell(row, 2)
    vc.value = val
    vc.font = { name: 'Arial', size: 10, bold: true, color: { argb: C.ink } }
    vc.fill = headerFill(C.section)
    vc.alignment = { horizontal: 'right', vertical: 'middle' }
    ws.getRow(row).height = 18
    row++
  }
  row++

  // Rates
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'YOUR RECOMMENDED RATES', C.ink, C.white, 10)
  ws.getRow(row).height = 24
  row++

  // Hero rate
  ws.getCell(row, 1).value = 'Recommended Hourly Rate'
  ws.getCell(row, 1).font = { name: 'Arial', size: 12, bold: true, color: { argb: C.white } }
  ws.getCell(row, 1).fill = headerFill(C.dark)
  ws.getCell(row, 1).alignment = { horizontal: 'left', vertical: 'middle' }
  ws.mergeCells(row, 2, row, 4)
  applyValue(ws.getCell(row, 2), r.recHourly, fmt, true, C.accent)
  ws.getCell(row, 2).fill = headerFill(C.dark)
  ws.getRow(row).height = 32
  row++

  const rateRows: [string, number][] = [
    ['Minimum Hourly Rate (cost floor)', r.minHourly],
    ['Day Rate (8 hrs)', r.dayRate],
    ['Week Rate', r.weekRate],
    ['Month Rate (approx.)', r.monthRate],
    ['Take-Home After Platform Fee', r.takeHome],
  ]
  for (const [label, val] of rateRows) {
    applyLabel(ws.getCell(row, 1), label)
    ws.mergeCells(row, 2, row, 4)
    applyValue(ws.getCell(row, 2), val, fmt)
    ws.getRow(row).height = 18
    row++
  }
  row++

  // Project pricing
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'PROJECT PRICING GUIDE  (includes 10% revision buffer)', C.accent, C.white, 10)
  ws.getRow(row).height = 24
  row++

  for (const [h, ci] of [['Project Size', 1], ['Approx. Hours', 2], ['Recommended Price', 3]] as [string, number][]) {
    const c = ws.getCell(row, ci)
    c.value = h; c.font = { name: 'Arial', size: 10, bold: true, color: { argb: C.ink } }
    c.fill = headerFill(C.section); c.alignment = { horizontal: 'center', vertical: 'middle' }
    c.border = bottomBorder()
  }
  ws.getRow(row).height = 20
  row++

  for (const [label, hrs, val] of [
    ['Small Project', '~10 hrs', r.smallProj],
    ['Medium Project', '~40 hrs', r.medProj],
    ['Large Project', '~160 hrs', r.largeProj],
  ] as [string, string, number][]) {
    applyLabel(ws.getCell(row, 1), label)
    ws.getCell(row, 2).value = hrs
    ws.getCell(row, 2).font = { name: 'Arial', size: 10, color: { argb: C.ink } }
    ws.getCell(row, 2).alignment = { horizontal: 'center', vertical: 'middle' }
    applyValue(ws.getCell(row, 3), val, fmt, true)
    ws.getRow(row).height = 18
    row++
  }
  row++

  // Annual picture
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), 'ANNUAL FINANCIAL PICTURE', C.ink, C.white, 10)
  ws.getRow(row).height = 24
  row++

  for (const [label, val, f] of [
    ['Total Billable Hours / Year', r.billableHrs, '#,##0 "hrs"'],
    ['Annual Gross Revenue Needed', r.annualGross, fmt],
    ['Estimated Tax Liability', r.annualTax, fmt],
    ['Annual Net Take-Home Target', r.annualNet, fmt],
  ] as [string, number, string][]) {
    applyLabel(ws.getCell(row, 1), label)
    ws.mergeCells(row, 2, row, 4)
    applyValue(ws.getCell(row, 2), val, f)
    ws.getRow(row).height = 18
    row++
  }
  row++

  // Benchmark
  const industryLabel = INDUSTRY_LABELS[inputs.industry] ?? inputs.industry
  ws.mergeCells(row, 1, row, 4)
  applyHeader(ws.getCell(row, 1), `MARKET RATE BENCHMARK  —  ${industryLabel.toUpperCase()}`, C.section, C.ink, 10)
  ws.getRow(row).height = 24
  row++

  for (const [h, ci] of [['', 1], ['Low', 2], ['Mid', 3], ['High', 4]] as [string, number][]) {
    const c = ws.getCell(row, ci)
    c.value = h; c.font = { name: 'Arial', size: 10, bold: true, color: { argb: C.ink } }
    c.fill = headerFill(C.section); c.alignment = { horizontal: 'center', vertical: 'middle' }
  }
  ws.getRow(row).height = 20
  row++

  applyLabel(ws.getCell(row, 1), `Global ${industryLabel} Rate`)
  applyValue(ws.getCell(row, 2), r.benchLow, fmt)
  applyValue(ws.getCell(row, 3), r.benchMid, fmt)
  applyValue(ws.getCell(row, 4), r.benchHigh, fmt)
  ws.getRow(row).height = 18
  row++

  applyLabel(ws.getCell(row, 1), 'Your Recommended Rate', true)
  applyValue(ws.getCell(row, 2), r.recHourly, fmt, true, C.accent)
  ws.getRow(row).height = 18
  row++

  const diff = r.recHourly - r.benchMid
  const verdict = r.recHourly < r.benchLow
    ? '⚠  Your rate is BELOW market. Consider raising it.'
    : r.recHourly > r.benchHigh
    ? '✓  Your rate is ABOVE market — strong positioning.'
    : '✓  Your rate aligns with market rates.'
  const verdictColor = r.recHourly < r.benchLow ? C.errorRed : C.success

  ws.mergeCells(row, 1, row, 4)
  const vc = ws.getCell(row, 1)
  vc.value = verdict
  vc.font = { name: 'Arial', size: 10, bold: true, color: { argb: verdictColor } }
  vc.alignment = { horizontal: 'left', vertical: 'middle' }
  ws.getRow(row).height = 24
  row += 2

  ws.mergeCells(row, 1, row, 4)
  const note = ws.getCell(row, 1)
  note.value = 'Blue cells = editable inputs  |  Black cells = formulas  |  Rates are estimates — adjust for your market and experience.'
  note.font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
  note.alignment = { horizontal: 'left', vertical: 'middle' }
}

// ─── TAB 2: Monthly Tracker ───────────────────────────────────────────────────
function buildTracker(wb: ExcelJS.Workbook, inputs: CalculatorInputs,
  r: ReturnType<typeof compute>, sym: string, fmt: string) {
  const ws = wb.addWorksheet('📅 Monthly Tracker', { views: [{ showGridLines: false }] })

  ws.getColumn('A').width = 28
  for (let c = 2; c <= 14; c++) ws.getColumn(c).width = c === 14 ? 13 : 9
  ws.getColumn(15).width = 18

  let row = 1

  ws.mergeCells(row, 1, row, 15)
  applyHeader(ws.getCell(row, 1), 'MONTHLY INCOME & EXPENSE TRACKER', C.ink, C.white, 13)
  ws.getRow(row).height = 30
  row++
  ws.mergeCells(row, 1, row, 15)
  applyHeader(ws.getCell(row, 1), 'freelancepricecalculator.com  |  Edit blue cells each month', C.dark, C.muted, 9)
  ws.getRow(row).height = 18
  row += 2

  // Month headers
  applyHeader(ws.getCell(row, 1), 'CATEGORY', C.section, C.ink, 10)
  for (let m = 0; m < 12; m++) {
    applyHeader(ws.getCell(row, m + 2), MONTHS[m], C.section, C.ink, 10)
  }
  applyHeader(ws.getCell(row, 14), 'ANNUAL', C.section, C.ink, 10)
  applyHeader(ws.getCell(row, 15), 'NOTES', C.section, C.ink, 10)
  ws.getRow(row).height = 22
  row++

  function addSection(title: string, categories: [string, number][]) {
    ws.mergeCells(row, 1, row, 15)
    applyHeader(ws.getCell(row, 1), title, C.ink, C.white, 10)
    ws.getRow(row).height = 24
    row++

    const dataRows: number[] = []
    for (const [cat, def] of categories) {
      applyLabel(ws.getCell(row, 1), cat)
      for (let m = 2; m <= 13; m++) applyInput(ws.getCell(row, m), Math.round(def), fmt)
      applyFormula(ws.getCell(row, 14), `SUM(B${row}:M${row})`, fmt, true)
      dataRows.push(row)
      ws.getRow(row).height = 18
      row++
    }

    // Total row
    applyLabel(ws.getCell(row, 1), `TOTAL ${title}`, true)
    ws.getCell(row, 1).fill = headerFill(C.section)
    for (let col = 2; col <= 14; col++) {
      const colLetter = ws.getColumn(col).letter
      const formula = dataRows.map(r2 => `${colLetter}${r2}`).join('+')
      const fc = ws.getCell(row, col)
      fc.value = { formula, result: 0 }
      fc.font = { name: 'Arial', size: 10, bold: true, color: { argb: '000000FF' } }
      fc.fill = headerFill(C.section)
      fc.numFmt = fmt
      fc.alignment = { horizontal: 'right', vertical: 'middle' }
    }
    ws.getRow(row).height = 22
    const totalRow = row
    row += 2
    return totalRow
  }

  const incomeTotal = addSection('INCOME', [
    ['Client Payments', r.monthRate],
    ['Platform Earnings', 0],
    ['Retainer Income', 0],
    ['Other Income', 0],
  ])

  const bizTotal = addSection('BUSINESS EXPENSES', [
    ['Software & Subscriptions', inputs.monthlyBusinessExpenses * 0.4],
    ['Equipment & Hardware', 0],
    ['Internet & Phone', inputs.monthlyBusinessExpenses * 0.15],
    ['Marketing & Advertising', inputs.monthlyBusinessExpenses * 0.15],
    ['Professional Development', inputs.monthlyBusinessExpenses * 0.10],
    ['Accountant / Legal Fees', inputs.monthlyBusinessExpenses * 0.10],
    ['Office / Co-working Space', inputs.monthlyBusinessExpenses * 0.10],
    ['Other Business Expenses', 0],
  ])

  const persTotal = addSection('PERSONAL EXPENSES', [
    ['Rent / Mortgage', inputs.monthlyPersonalExpenses * 0.45],
    ['Food & Groceries', inputs.monthlyPersonalExpenses * 0.15],
    ['Transport', inputs.monthlyPersonalExpenses * 0.10],
    ['Utilities', inputs.monthlyPersonalExpenses * 0.08],
    ['Health & Insurance', inputs.monthlyPersonalExpenses * 0.10],
    ['Savings & Pension', inputs.monthlyPersonalExpenses * 0.10],
    ['Entertainment & Lifestyle', inputs.monthlyPersonalExpenses * 0.07],
    ['Other Personal Expenses', 0],
  ])

  // Net Profit section
  ws.mergeCells(row, 1, row, 15)
  applyHeader(ws.getCell(row, 1), 'NET MONTHLY PROFIT', '0D3D1A', C.white, 10)
  ws.getRow(row).height = 24
  row++

  const profitSummaryRows: [string, (col: string) => string, string][] = [
    ['Total Income',    col => `${col}${incomeTotal}`, C.success],
    ['Total Expenses',  col => `${col}${bizTotal}+${col}${persTotal}`, C.ink],
    [`Tax (${inputs.taxRate}%)`, col => `${col}${row + 1}*${inputs.taxRate / 100}`, C.ink],
  ]

  const refRows: number[] = []
  for (const [label, formulaFn, color] of profitSummaryRows) {
    applyLabel(ws.getCell(row, 1), label)
    for (let col = 2; col <= 14; col++) {
      const colLetter = ws.getColumn(col).letter
      applyFormula(ws.getCell(row, col), formulaFn(colLetter), fmt, false, color)
    }
    ws.getRow(row).height = 18
    refRows.push(row)
    row++
  }

  // Fix tax formula — it referenced row+1 which is itself; recalculate properly
  const taxRow = refRows[2]
  const incomeRefRow = refRows[0]
  for (let col = 2; col <= 14; col++) {
    const colLetter = ws.getColumn(col).letter
    applyFormula(ws.getCell(taxRow, col), `${colLetter}${incomeRefRow}*${inputs.taxRate / 100}`, fmt)
  }

  // Net profit row
  for (let col = 1; col <= 14; col++) {
    const c = ws.getCell(row, col)
    if (col === 1) {
      c.value = 'NET PROFIT'
    } else {
      const colLetter = ws.getColumn(col).letter
      c.value = { formula: `${colLetter}${refRows[0]}-${colLetter}${refRows[1]}-${colLetter}${taxRow}`, result: 0 }
      c.numFmt = fmt
      c.alignment = { horizontal: 'right', vertical: 'middle' }
    }
    c.font = { name: 'Arial', size: 11, bold: true, color: { argb: C.success } }
    c.fill = headerFill('0D3D1A')
  }
  ws.getRow(row).height = 28
  row += 2

  ws.mergeCells(row, 1, row, 15)
  const note = ws.getCell(row, 1)
  note.value = 'Blue cells = edit with your actual figures  |  All totals and profit recalculate automatically'
  note.font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
}

// ─── TAB 3: Invoice Template ──────────────────────────────────────────────────
function buildInvoice(wb: ExcelJS.Workbook, inputs: CalculatorInputs,
  r: ReturnType<typeof compute>, sym: string, fmt: string) {
  const ws = wb.addWorksheet('🧾 Invoice Template', { views: [{ showGridLines: false }] })

  ws.getColumn('A').width = 5
  ws.getColumn('B').width = 30
  ws.getColumn('C').width = 22
  ws.getColumn('D').width = 15
  ws.getColumn('E').width = 16
  ws.getColumn('F').width = 18

  let row = 1

  ws.mergeCells(row, 1, row, 6)
  applyHeader(ws.getCell(row, 1), 'INVOICE', C.ink, C.white, 16)
  ws.getRow(row).height = 36
  row++
  ws.mergeCells(row, 1, row, 6)
  applyHeader(ws.getCell(row, 1), 'Edit all blue cells before sending  |  freelancepricecalculator.com', C.dark, C.muted, 9)
  ws.getRow(row).height = 18
  row += 2

  // FROM + Invoice meta
  ws.mergeCells(row, 2, row, 3)
  applyHeader(ws.getCell(row, 2), 'FROM (Your Details)', C.section, C.ink, 10)
  ws.getCell(row, 5).value = 'Invoice #'
  ws.getCell(row, 5).font = { name: 'Arial', size: 10, bold: true, color: { argb: C.ink } }
  ws.getCell(row, 5).alignment = { horizontal: 'right', vertical: 'middle' }
  applyInput(ws.getCell(row, 6), 'INV-001')
  ws.getRow(row).height = 22
  row++

  const today = new Date().toLocaleDateString('en-GB')
  const fromFields = ['Your Full Name / Company', 'Your Email Address', 'Your Website / Phone']
  const metaFields = [['Invoice Date', today], ['Due Date', ''], ['PO / Ref', '']]

  for (let i = 0; i < 3; i++) {
    ws.getCell(row, 2).value = fromFields[i] + ':'
    ws.getCell(row, 2).font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
    ws.getCell(row, 2).alignment = { horizontal: 'left', vertical: 'middle' }
    applyInput(ws.getCell(row, 3), '')
    ws.getCell(row, 5).value = metaFields[i][0]
    ws.getCell(row, 5).font = { name: 'Arial', size: 10, bold: true, color: { argb: C.ink } }
    ws.getCell(row, 5).alignment = { horizontal: 'right', vertical: 'middle' }
    applyInput(ws.getCell(row, 6), metaFields[i][1])
    ws.getRow(row).height = 18
    row++
  }
  row++

  // TO
  ws.mergeCells(row, 2, row, 3)
  applyHeader(ws.getCell(row, 2), 'TO (Client Details)', C.section, C.ink, 10)
  ws.getRow(row).height = 22
  row++

  for (const field of ['Client Name / Company', 'Client Email', 'Project Description']) {
    ws.getCell(row, 2).value = field + ':'
    ws.getCell(row, 2).font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
    ws.getCell(row, 2).alignment = { horizontal: 'left', vertical: 'middle' }
    applyInput(ws.getCell(row, 3), '')
    ws.getRow(row).height = 18
    row++
  }
  row++

  // Line items header
  for (const [ci, h] of [[2, 'Description'], [3, 'Qty / Hours'], [4, 'Unit Rate'], [5, 'Subtotal']] as [number, string][]) {
    applyHeader(ws.getCell(row, ci), h, C.ink, C.white, 10)
  }
  ws.getRow(row).height = 22
  row++

  // 4 line item rows — first pre-filled with their rate
  const lineStart = row
  for (let li = 0; li < 4; li++) {
    applyInput(ws.getCell(row, 2), li === 0 ? 'Project / Services Rendered' : '')
    applyInput(ws.getCell(row, 3), li === 0 ? 1 : 0, '#,##0.00')
    applyInput(ws.getCell(row, 4), li === 0 ? r.recHourly : 0, fmt)
    applyFormula(ws.getCell(row, 5), `C${row}*D${row}`, fmt)
    ws.getRow(row).height = 20
    row++
  }
  const lineEnd = row - 1
  row++

  // Totals
  const subtotalRow = row
  ws.getCell(row, 4).value = 'Subtotal'
  ws.getCell(row, 4).font = { name: 'Arial', size: 10, color: { argb: C.ink } }
  ws.getCell(row, 4).alignment = { horizontal: 'right', vertical: 'middle' }
  applyFormula(ws.getCell(row, 5), `SUM(E${lineStart}:E${lineEnd})`, fmt)
  ws.getRow(row).height = 18
  row++

  const taxRow = row
  ws.getCell(row, 4).value = `Tax / VAT (${inputs.taxRate}%)`
  ws.getCell(row, 4).font = { name: 'Arial', size: 10, color: { argb: C.ink } }
  ws.getCell(row, 4).alignment = { horizontal: 'right', vertical: 'middle' }
  applyFormula(ws.getCell(row, 5), `E${subtotalRow}*${inputs.taxRate / 100}`, fmt)
  ws.getRow(row).height = 18
  row++

  // Total due
  ws.getCell(row, 4).value = 'TOTAL DUE'
  ws.getCell(row, 4).font = { name: 'Arial', size: 12, bold: true, color: { argb: C.white } }
  ws.getCell(row, 4).fill = headerFill(C.ink)
  ws.getCell(row, 4).alignment = { horizontal: 'right', vertical: 'middle' }
  const totalCell = ws.getCell(row, 5)
  totalCell.value = { formula: `E${subtotalRow}+E${taxRow}`, result: 0 }
  totalCell.font = { name: 'Arial', size: 12, bold: true, color: { argb: C.accent } }
  totalCell.fill = headerFill(C.ink)
  totalCell.numFmt = fmt
  totalCell.alignment = { horizontal: 'right', vertical: 'middle' }
  ws.getRow(row).height = 30
  row += 2

  // Payment details
  ws.mergeCells(row, 2, row, 5)
  applyHeader(ws.getCell(row, 2), 'PAYMENT DETAILS', C.section, C.ink, 10)
  ws.getRow(row).height = 22
  row++

  for (const field of ['Bank / Payment Method', 'Account Name', 'Account Number / IBAN',
    'Sort Code / BIC / SWIFT', 'Payment Reference']) {
    ws.getCell(row, 2).value = field + ':'
    ws.getCell(row, 2).font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
    ws.getCell(row, 2).alignment = { horizontal: 'left', vertical: 'middle' }
    ws.mergeCells(row, 3, row, 5)
    applyInput(ws.getCell(row, 3), '')
    ws.getRow(row).height = 18
    row++
  }

  row++
  ws.mergeCells(row, 2, row, 6)
  const note = ws.getCell(row, 2)
  note.value = `Rate pre-filled at ${sym}${r.recHourly.toFixed(2)}/hr from your calculator results  |  Edit all blue cells before sending`
  note.font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
}

// ─── TAB 4: Rate Benchmarks ───────────────────────────────────────────────────
function buildBenchmarks(wb: ExcelJS.Workbook, inputs: CalculatorInputs,
  r: ReturnType<typeof compute>, sym: string, fmt: string) {
  const ws = wb.addWorksheet('📈 Rate Benchmarks', { views: [{ showGridLines: false }] })

  ws.getColumn('A').width = 24
  ws.getColumn('B').width = 15
  ws.getColumn('C').width = 15
  ws.getColumn('D').width = 15
  ws.getColumn('E').width = 24

  let row = 1

  ws.mergeCells(row, 1, row, 5)
  applyHeader(ws.getCell(row, 1), 'GLOBAL FREELANCE RATE BENCHMARKS', C.ink, C.white, 13)
  ws.getRow(row).height = 30
  row++
  ws.mergeCells(row, 1, row, 5)
  applyHeader(ws.getCell(row, 1),
    `Rates in ${inputs.currency}  |  Global mid-market estimates  |  freelancepricecalculator.com`,
    C.dark, C.muted, 9)
  ws.getRow(row).height = 18
  row += 2

  for (const [h, ci] of [['Industry', 1], ['Low /hr', 2], ['Mid /hr', 3],
    ['High /hr', 4], ['Your Rate vs Mid', 5]] as [string, number][]) {
    applyHeader(ws.getCell(row, ci), h, C.section, C.ink, 10)
  }
  ws.getRow(row).height = 22
  row++

  const mult = CURRENCY_MULTIPLIERS[inputs.currency] ?? 1
  for (const [key, bench] of Object.entries(INDUSTRY_BENCHMARKS)) {
    const isYours = key === inputs.industry
    const bg = isYours ? 'FFFFF7F4' : C.white
    const low = Math.ceil(bench.low * mult * 100) / 100
    const mid = Math.ceil(bench.mid * mult * 100) / 100
    const high = Math.ceil(bench.high * mult * 100) / 100

    const label = (isYours ? '★ ' : '') + (INDUSTRY_LABELS[key] ?? key)
    applyLabel(ws.getCell(row, 1), label, isYours)
    ws.getCell(row, 1).fill = headerFill(bg)

    for (const [ci, val] of [[2, low], [3, mid], [4, high]] as [number, number][]) {
      applyValue(ws.getCell(row, ci), val, fmt, isYours)
      ws.getCell(row, ci).fill = headerFill(bg)
    }

    if (isYours) {
      const diffPct = mid > 0 ? ((r.recHourly - mid) / mid) * 100 : 0
      const verdict = `${diffPct >= 0 ? '+' : ''}${diffPct.toFixed(0)}% vs mid (${diffPct >= 0 ? 'above' : 'below'})`
      const vc = ws.getCell(row, 5)
      vc.value = verdict
      vc.font = { name: 'Arial', size: 10, bold: true,
        color: { argb: diffPct >= 0 ? C.success : C.errorRed } }
      vc.fill = headerFill(bg)
      vc.alignment = { horizontal: 'center', vertical: 'middle' }
    } else {
      const dc = ws.getCell(row, 5)
      dc.value = '—'
      dc.font = { name: 'Arial', size: 10, color: { argb: C.muted } }
      dc.fill = headerFill(bg)
      dc.alignment = { horizontal: 'center', vertical: 'middle' }
    }

    ws.getRow(row).height = 20
    row++
  }

  row += 2
  ws.mergeCells(row, 1, row, 5)
  const note = ws.getCell(row, 1)
  note.value = '★ = Your industry  |  Benchmarks are global estimates. Adjust for your experience, location and specialism.'
  note.font = { name: 'Arial', size: 9, italic: true, color: { argb: C.muted } }
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export async function generatePremiumExcel(inputs: CalculatorInputs): Promise<Uint8Array> {
  const r = compute(inputs)
  const sym = CURRENCY_SYMBOLS[inputs.currency] ?? '$'
  const fmt = curFmt(sym)

  const wb = new ExcelJS.Workbook()
  wb.creator = 'Freelance Price Calculator'
  wb.lastModifiedBy = 'freelancepricecalculator.com'
  wb.created = new Date()
  wb.modified = new Date()

  buildDashboard(wb, inputs, r, sym, fmt)
  buildTracker(wb, inputs, r, sym, fmt)
  buildInvoice(wb, inputs, r, sym, fmt)
  buildBenchmarks(wb, inputs, r, sym, fmt)

  const buffer = await wb.xlsx.writeBuffer()
  return new Uint8Array(buffer)
}
