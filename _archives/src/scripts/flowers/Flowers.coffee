stage = require "fz/core/stage"
lp = require "fz/core/loop"

pool = require "flowers/pool"
Flower = require "flowers/Flower"

PathDrawer = require "paths/PathDrawer"
Linear = require "paths/Linear"
Turning = require "paths/Turning"
Drunk = require "paths/Drunk"
Sinus = require "paths/Sinus"
Opts = require "paths/Opts"

timeout = require "fz/utils/timeout"

class Flowers extends PIXI.Container

    constructor: ->
        super

        @_pathDrawer = new PathDrawer
        @addChild @_pathDrawer

        @_origin = new Flower
        @addChild @_origin

        @_flowers = [ @_origin ]

        @_opts = []
        
        @_isAlive = true

        rad = 0
        n = 25
        @_paths = []
        for i in [ 0...n ]
            path = new Sinus rad
            @_paths.push path

            @_opts.push
                speed: Math.random() * 40 + 20 >> 0
                life: Math.random() * 15 + 5 >> 0

            @_pathDrawer.add path

            rad += ( Math.PI * 2 ) / n

        # lp.add @_update
        timeout @_update, 50

    _update: =>
        if !@_isAlive
            return

        isAlive = false
        for path, i in @_paths
            opt = @_opts[ i ]

            continue if !opt.life

            if path.modifier
                opt.speed = path.modifier.speed opt.speed
                opt.speed = 10 if opt.speed < 10
            path.next opt.speed
            @_addFlower path.current

            opt.life -= 1
            isAlive = true if opt.life > 0
        @_pathDrawer.update()

        @_isAlive = isAlive

        timeout @_update, 50

    _addFlower: ( pos ) ->
        flower = new Flower
        flower.x = pos.x
        flower.y = pos.y
        @addChild flower

        @_flowers.push flower

module.exports = Flowers
