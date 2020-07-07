const levels = {
  global: 'WO',
  regions: ['AT', 'AF', 'AS', 'EU', 'NA', 'OC', 'SA'],
}

const isISOCountry = (isoCode) => isoCode.length === 3

module.exports = {
  levels,
  isISOCountry,
}
