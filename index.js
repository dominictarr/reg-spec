var toPull = require('stream-to-pull-stream')
var pull   = require('pull-stream')
var split  = require('pull-split')
var r = require('regular-stream')
var cat = r.cat, star = r.star, maybe = r.maybe, plus = r.plus, or = r.or
var markable = require('pull-markable')
var pSwitch = require('pull-switch')

module.exports = function () {
  return split().pipe(pull.map(function (line) {
    var parts = line.split(/\s+/)
    if(parts.shift() !== '!') return
    var event = parts.shift()
    var module = parts.shift()
    if(!/^([\w\-_.0-9]+\/)*[\w\-_.0-9]+@\d+\.\d+\.\d+$/.test(module))
      return console.error('invalid version:', module)

    var m = module.split('@')
    var name = m.shift()
    var version = m.shift()

    var instance = parts.shift()
    data = JSON.parse(parts.join(' '))


    return {
      key: event,
      id: instance,
      module: name,
      version: version,
      value: data
    }

  }))
}
 
if(!module.parent) {

  // okay, so if I have a bunch of Regular Machines
  // then I can track each one...
  // and verify that when the process terminates,
  // all machines are in the correct final state.
  // and that all specs are checked...
  // giving a report in the end...

  var spec = require(process.argv[2])

    toPull(process.stdin)
    .pipe(module.exports())
    .pipe(pull.filter(Boolean))
    .pipe(pSwitch(function (data) {
      return data.instance
    }, function (data) {
      return function (read) {
        console.log('SPEC', spec.rule)
        //find the spec that matches this module,
        //this version...
        spec.rule() (
          read.pipe(markable())
        , function (err) {
          if(err) throw err
          console.error('valid', data)
        })
      }
    }))

//    .pipe(pull.drain(function (e) {
//      console.log(e)
//    }))

//  .pipe(markable()),
//    function (err) {
//      console.log(err || 'valid')
//    })

}
