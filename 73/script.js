const width = 101
const height = 101
const rows = []
const speed = 100

init()

function init () {
  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    setTimeout(() => {
      const row = createRow(rowIndex)
      document.body.appendChild(row)
      rows.push(row)
    }, rowIndex * speed)
  }
}

function createRow (rowIndex) {
  const row = document.createElement('row')

  for (let cellIndex = 0; cellIndex < width; cellIndex++) {
    const cell = createCell(rowIndex, cellIndex)
    row.appendChild(cell)
  }

  return row
}

function createCell (rowIndex, cellIndex) {
  const cell = document.createElement('cell')

  // Cells in first row will randomly be assigned an active state.
  if (rowIndex === 0) {
    if (randomBinary()) {
      activate(cell)
    }

    return cell
  }

  // Cells in suqsequent rows will get assigned an active state
  // based on the state of their prior self as well as the state
  // of their prior siblings.
  const priorRow = rows[rowIndex - 1]
  const priorSelf = priorRow.childNodes[cellIndex]
  const priorSiblingLeft = priorRow.childNodes[cellIndex - 1] || priorRow.childNodes[width - 1]
  const priorSiblingRight = priorRow.childNodes[cellIndex + 1] || priorRow.childNodes[0]

  if (isActive(priorSiblingLeft) && isActive(priorSelf) && !isActive(priorSiblingRight)) {
    activate(cell)
  }

  if (!isActive(priorSiblingLeft) && isActive(priorSelf) && isActive(priorSiblingRight)) {
    activate(cell)
  }

  if (!isActive(priorSiblingLeft) && !isActive(priorSelf) && !isActive(priorSiblingRight)) {
    activate(cell)
  }

  return cell
}

function activate (cell) {
  cell.classList.add('active')
}

function isActive (cell) {
  return cell.classList.contains('active')
}

function randomBinary () {
  return Math.floor(Math.random() * (1 - 0 + 1))
}
