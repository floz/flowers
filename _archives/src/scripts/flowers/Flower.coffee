lp = require "fz/core/loop"
assets = require "assets"

dataShader = require "shaders/FlowerShader"
utils = require "flowers/utils"

class Flower extends PIXI.Container

    constructor: ->
        super

        @_leafs = []
        @_createLeafs()

        @_heart = new PIXI.Sprite.fromImage assets.heart
        @_heart.width = 15
        @_heart.height = 15
        @_heart.x = -@_heart.width >> 1
        @_heart.y = -@_heart.height >> 1
        @addChild @_heart

        uniforms = dataShader.uniforms()

        # @rotation = Math.random() * ( Math.PI * 2 )

        s = .5 + Math.random() * .5
        @.scale.x = 0
        @.scale.y = 0
        TweenLite.to @.scale, .4,
            x: s
            y: s
            ease: Cubic.easeInOut

    _createLeafs: ->
        types = [ "a", "b", "c", "d"]

        n = types.length
        a = 0
        aAdd = ( Math.PI * 2 ) / n
        for i in [0...n]
            leaf = new PIXI.Sprite.fromImage assets.petale_1
            leaf.width =
            leaf.height = 20
            leaf.x = ( -leaf.width >> 1 ) + 10 * Math.cos a
            leaf.y = ( -leaf.height >> 1 ) + 10 * Math.sin a
            utils.initModifs leaf
            utils.eztween.in leaf, types[ i ], .3
            @addChild leaf

            a += aAdd


module.exports = Flower
