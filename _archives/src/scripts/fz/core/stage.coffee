timeout = require "fz/utils/timeout"

class Stage extends Emitter

    constructor: ->
        @w = 0
        @h = 0

    init: ->
        window.addEventListener "resize", @_onResize, false
        window.addEventListener "orientationchange", @_onResize, false
        @_onResize()

    _update: =>
        @w = window.innerWidth
        @h = window.innerHeight

        @emit "resize"

    _onResize: =>
        timeout @_update, 10

    resize: ( withDelay = false ) ->
        if withDelay
            @_onResize()
            return
        @_update()


module.exports = new Stage
