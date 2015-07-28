assets = require "assets"

class Loader extends Emitter

    constructor: ->
        super

        @_idxLoaded = 0
        @_idxTotal = 0

    init: ->
        @_idxTotal++ for id of assets.data
        return

    _onComplete: =>
        @_idxLoaded++
        if @_idxLoaded == @_idxTotal
            @emit "complete"

    load: ->
        for id of assets.data
            url = assets.data[ id ]
            tex = THREE.ImageUtils.loadTexture url, undefined, @_onComplete
            tex.minFilter = THREE.NearestFilter
            assets.textures[ id ] = tex
        return

module.exports = new Loader
