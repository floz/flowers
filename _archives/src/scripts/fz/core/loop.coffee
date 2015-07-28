idx = -1
listeners = []

n = 0

update = ->
  i = n
  while --i >= 0
    listeners[ i ].apply this, null
  idx = requestAnimationFrame update

module.exports.start = ->
  update()

module.exports.stop = ->
  cancelAnimationFrame idx

module.exports.add = ( listener ) ->
  idx = listeners.indexOf listener
  return if idx >= 0
  listeners.push listener
  n++

module.exports.remove = ( listener ) ->
  idx = listeners.indexOf listener
  return if idx < 0
  listeners.splice idx, 1
  n--
