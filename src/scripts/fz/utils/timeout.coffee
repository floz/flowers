now = require "fz/utils/now"

module.exports = ( fn, delay ) ->
    start = now()

    lp = ->
        if ( now() - start ) >= delay
            fn.call()
        else
            data.id = requestAnimationFrame lp

    data = {}
    data.id = requestAnimationFrame lp
    data

module.exports.clear = ( data ) ->
    cancelAnimationFrame data.id
