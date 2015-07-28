stage = require "fz/core/stage"
lp = require "fz/core/loop"

class Engine

    constructor: ->
        @renderer = null

    init: ->
        @scene = new THREE.Scene

        @scene.add new THREE.AmbientLight 0x444444

        lightDir = new THREE.DirectionalLight 0xffffff, .5
        lightDir.position.z = 1000
        @scene.add lightDir

        @camera = new THREE.OrthographicCamera 0, 0, 0, 0, -100, 10000
        # @camera = new THREE.PerspectiveCamera 50, 0, 1, 5000
        @scene.add @camera
        # @camera.position.z = 500

        @renderer = new THREE.WebGLRenderer { antialias: true }
        @renderer.setPixelRatio window.devicePixelRatio
        @renderer.setClearColor 0x64a543
        @renderer.autoClear = false
        document.body.appendChild @renderer.domElement

    resize: ( w, h ) ->
        @renderer.setSize w, h

        # @camera.aspect = w / h
        # @camera.updateProjectionMatrix()

        @camera.left = -stage.w * .5;
        @camera.right = stage.w * .5;
        @camera.top = stage.h * .5;
        @camera.bottom = -stage.h * .5;
        @camera.updateProjectionMatrix();

    start: ->
        lp.add @_update

    _update: =>
        @renderer.clear()
        @renderer.render @scene, @camera

module.exports = new Engine
