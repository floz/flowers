assets = require "assets"
uColors = require "fz/utils/colors"

class Floor extends THREE.Object3D

    constructor: ->
        super

        @_colors = uColors.generateHarmony 50, 100, 90, 180, 30, 0, 0, .64, .59

        @_fill()

    _fill: ->
        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_0, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = -200
        mesh.position.y = -200
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_1, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = 200
        mesh.position.y = 200
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_1, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = 200
        mesh.position.y = -200
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_1, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = -400
        mesh.position.y = 400
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_0, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = -200
        mesh.position.y = 200
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_0, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = -400
        @add mesh

        c = @_getRandomColor()
        geom = new THREE.PlaneBufferGeometry 1280, 960, 1
        mat = new THREE.MeshLambertMaterial { map: assets.textures.floor_0, transparent: true, color: c.c }
        mat.depthTest = false
        mesh = new THREE.Mesh geom, mat
        mesh.position.x = 400
        mesh.position.y = -300
        @add mesh

    _getRandomColor: ->
        idx = @_colors.length * Math.random() >> 0
        @_colors[ idx ]

module.exports = Floor
