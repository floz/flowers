stage = require "fz/core/stage"

_C_LARGE = 0xff0000
_C_MEDIUM = 0xfff000
_C_SMALL = 0x0000ff

_S_LARGE = 20
_S_MEDIUM = _S_LARGE / 2 >> 0
_S_SMALL = _S_LARGE / 4 >> 0

class Grid extends PIXI.Container

    constructor: ->
        super

        @_large = new PIXI.Graphics
        @addChild @_large
        @_medium = new PIXI.Graphics
        @addChild @_medium
        @_small = new PIXI.Graphics
        @addChild @_small

        @_build()

    _build: ->
        @_buildGrid @_large, _C_LARGE, _S_LARGE, .5
        @_buildGrid @_medium, _C_MEDIUM, _S_MEDIUM, .35
        @_buildGrid @_small, _C_SMALL, _S_SMALL, .15

    _buildGrid: ( g, c, s, a ) ->
        g.clear()
        g.lineStyle 1, c, a

        n = stage.w / s >> 0
        for i in [0...n]
            v = i * s >> 0
            g.moveTo v, 0
            g.lineTo v, stage.h

        n = stage.h / s >> 0
        for i in [0...n]
            v = i * s >> 0
            g.moveTo 0, v
            g.lineTo stage.w, v

        g.endFill()

module.exports = Grid
