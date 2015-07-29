stage = require "fz/core/stage"
lp = require "fz/core/loop"

pool = require "flowers/pool"
Flower = require "flowers/Flower"
cFlowers = require "flowers/consts"

colors = require "colors"

PathDrawer = require "paths/PathDrawer"
Linear = require "paths/Linear"
Turning = require "paths/Turning"
Drunk = require "paths/Drunk"
Sinus = require "paths/Sinus"
Opts = require "paths/Opts"

timeout = require "fz/utils/timeout"

class Flowers extends THREE.Object3D

    constructor: ->
        super

        @_pathDrawer = new PathDrawer
        # @addChild @_pathDrawer

        # @_colors = @_generateColors()

        @_origin = new Flower cFlowers.life, colors.getFlowers()
        @add @_origin

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
                speed: ( Math.random() * 50 + 20 ) * 1.2 >> 0
                life: Math.random() * cFlowers.life * .6 + cFlowers.life * .4 >> 0

            @_pathDrawer.add path

            rad += ( Math.PI * 2 ) / n

        timeout @_update, 80

    _generateColors: ->
        idx = Math.random() * colors.length >> 0
        colors[ idx ]

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
            @_addFlower path.current, opt.life

            opt.life -= 1
            isAlive = true if opt.life > 0
        @_pathDrawer.update()

        @_isAlive = isAlive

        timeout @_update, 50

    _addFlower: ( pos, life ) ->
        flower = new Flower life, colors.getFlowers()
        flower.position.x = pos.x
        flower.position.y = pos.y
        @add flower

        @_flowers.push flower

module.exports = Flowers
