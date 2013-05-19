
var spec = require('../spec')
var r = require('regular-stream')

var and = r.and, star = r.star, or = r.or, plus = r.plus

var DATA  = spec.event('DATA')
var PAUSE = spec.event('PAUSE')
var DRAIN = spec.event('DRAIN')
var END   = spec.event('END')
var ERROR = spec.event('ERROR')

module.exports = spec('rand1@*', function () {    
  return and(
    star(or(DATA, and(plus(PAUSE), DRAIN))),
    or(END, ERROR)
  )
})

