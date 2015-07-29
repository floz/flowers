lp = require "fz/core/loop"
uArrays = require "fz/utils/arrays"

cFlowers = require "flowers/consts"
assets = require "assets"
dataShader = require "shaders/FlowerShader"
utils = require "flowers/utils"

class Flower extends THREE.Object3D

    constructor: ( @_life, colorsSet ) ->
        super

        idx = colorsSet.length * Math.random() >> 0
        @_color = colorsSet[ idx ]
        colorDarken = @_color.clone().setLuminance .35
        colorDarkest = @_color.clone().setLuminance .15

        @_dRand = Math.random() * 1

        geom = new THREE.PlaneBufferGeometry 20, 20, 1

        @_createLeafs 20, @_color.c
        @_createLeafs 12, colorDarken.c if Math.random() > .25
        mat = new THREE.MeshLambertMaterial { map: assets.textures.heart, transparent: true, color: colorDarkest.c }
        @_heart = new THREE.Mesh geom, mat
        @add @_heart

        @_leafs = []

        sRatio = @_life / cFlowers.life
        s = ( .7 + Math.random() * .3 ) * sRatio
        s = .35 if s < .35
        s *= 1.65
        @.scale.x = 0.000001
        @.scale.y = 0.000001
        TweenLite.to @.scale, .6,
            delay: @_dRand
            x: s
            y: s
            ease: Quad.easeOut

        @rotation.z = Math.random() * Math.PI * 2

    _createLeafs: ( size, c ) ->
        types = [ "a", "b", "c", "d"]

        geom = new THREE.PlaneBufferGeometry size, size, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.petale_1, transparent: true, color: c }
        mat.depthTest = false
        mat.side = THREE.DoubleSide

        n = 4 + Math.random() * 5 >> 0
        n += 1 if n == 4 && Math.random() > .3
        a = 0
        aAdd = ( Math.PI * 2 ) / n
        as = []
        for i in [0...n]
            as.push a
            a += aAdd
        as.reverse() if Math.random() < .5
        as = uArrays.shift as, as.length * Math.random() >> 0

        d = 0
        dAdd = .1
        dAddMin = .04
        dFriction = .87
        for i in [0...n]
            a = as[ i ]

            rand = Math.random()
            tox = size * 3 / ( 4.2 + rand ) * Math.cos a
            toy = size * 3 / ( 4.2 + rand ) * Math.sin a

            cntLeaf = new THREE.Object3D
            cntLeaf.position.x = tox * .75
            cntLeaf.position.y = toy * .75
            cntLeaf.rotation.z = a
            
            leaf = new THREE.Mesh geom, mat
            leaf.rotation.x = -Math.PI * .3 * Math.random()
            leaf.rotation.y = -Math.PI * .45
            cntLeaf.add leaf

            dRand = Math.random() * 
            leaf.visible = false
            TweenLite.to cntLeaf.position, 1.2,
                delay: .17 + d + @_dRand
                x: tox
                y: toy
                ease: Cubic.easeOut

            TweenLite.to leaf.rotation, 1.2,
                delay: .17 + d + @_dRand
                x: 0
                y: 0
                ease: Quad.easeOut
                onStart: ( obj ) ->
                    obj.visible = true
                onStartParams: [ leaf ]

            @add cntLeaf

            d += dAdd
            dAdd *= dFriction
            dAdd = dAddMin if dAdd < dAddMin

            


module.exports = Flower
