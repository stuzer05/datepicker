function todaysDate(includeDay) {
  const today = new Date()
  return [
    today.getFullYear(),
    today.getMonth(),
    includeDay && today.getDate()
  ].filter(Boolean)
}

module.exports = todaysDate
