stage = require "fz/core/stage"
Field = require "flowers/Field"

class Flowers extends PIXI.Container

    constructor: ->
        super

        @_area = new PIXI.Graphics
        @_area.beginFill 0xff00ff, 0
        @_area.drawRect 0, 0, stage.w, stage.h
        @addChild @_area

        @_area.interactive = @_area.buttonMode = true
        @_area.on "tap", @_onDown
        @_area.on "click", @_onDown

    _onDown: ( e ) =>
        x = e.data.global.x
        y = e.data.global.y

        console.log x, y

module.exports = Flowers
