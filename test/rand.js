
//! EVENT module@ver data

function logger(module) {
  var instance = Math.random().toString(16).substring(2)
  if('object' === typeof module)
    module = module.name + '@' + module.version
  return function (event, data) {
    console.log('!', event, module, instance, JSON.stringify(data || null))
  }
}

var log = logger('rand1@0.0.0')

log('DATA')
log('DATA')
log('DATA')
log('PAUSE')
log('PAUSE')
log('DRAIN')
log('DATA')
log('END')



