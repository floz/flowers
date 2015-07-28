class PathDrawer extends PIXI.Container

    constructor: ( color = 0xff00ff ) ->
        super

        @_paths = []
        @_lasts = []

        @_g = new PIXI.Graphics
        @_g.lineColor = 0
        @_g.lineAlpha = 1
        @_g.lineWidth = 1
        @addChild @_g

    add: ( path ) ->
        @_paths.push path
        @_lasts.push { x: 0, y: 0 }

    update: ->
        for path, i in @_paths
            last = @_lasts[ i ]
            current = path.current

            @_g.moveTo last.x, last.y
            @_g.lineTo current.x, current.y

            last.x = current.x
            last.y = current.y
        return

module.exports = PathDrawer
