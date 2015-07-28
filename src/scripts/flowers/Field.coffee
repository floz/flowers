stage = require "fz/core/stage"
Flowers = require "flowers/Flowers"

interactions = require "fz/core/interactions"

class Field extends THREE.Object3D

    constructor: ( @_grid ) ->
        super

        interactions.on document.body, "down", @_onDown

    #     @_area = new PIXI.Graphics
    #     @_area.beginFill 0xff00ff, 0
    #     @_area.drawRect 0, 0, stage.w, stage.h
    #     @addChild @_area

    #     @_area.interactive = @_area.buttonMode = true
    #     @_area.on "tap", @_onDown
    #     @_area.on "click", @_onDown

        # console.log "yo"
        # @_onDown { x: 0, y: 0}

    _onDown: ( e ) =>
        x = e.x - stage.w * .5 >> 0
        y = -e.y + stage.h * .5 >> 0

        flowers = new Flowers
        flowers.position.x = x
        flowers.position.y = y
        @add flowers

module.exports = Field
