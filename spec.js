var ins = require('util').inspect

function inspect (data) {
  return ins(data, {depth: 10000})
}

var spec = module.exports = function (module, rule) {
  //module is a string 'module@range`, 
  //rule... traverse rule to find all events that it matches...
  var m = module.split('@')
  return {
    name : m.shift(),
    range: m.shift(),
    rule : rule
  }
}

spec.event = function (event) {
  var m = function (read, cb) {
    read(null, function (err, data) {
      if(err) return cb(err)
      if(data.key != event)
        return cb(new Error('expected:' + event + ' found:' + inspect(data)))
      cb()
    })
  }
  m.parts = [event]
  return m
}

