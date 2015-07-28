stage = require "fz/core/stage"
lp = require "fz/core/loop"

class Pixi

    constructor: ->
        @renderer = null

    init: ->
        opts = 
            antialias: true
            resolution: 2
            transparent: true
        @renderer = new PIXI.autoDetectRenderer 0, 0, opts
        document.body.appendChild @renderer.view

        @stage = new PIXI.Container

    resize: ( @w, @h ) ->
        @renderer.resize @w, @h
        @renderer.view.style.width = @w + "px"
        @renderer.view.style.height = @h + "px"

    start: ->
        lp.add @_update

    _update: =>
        @renderer.render @stage

module.exports = new Pixi
