stage = require "fz/core/stage"
Flowers = require "flowers/Flowers"

class Field extends PIXI.Container

    constructor: ( @_grid ) ->
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

        flowers = new Flowers
        flowers.x = x
        flowers.y = y
        @addChild flowers

module.exports = Field
