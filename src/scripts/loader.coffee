assets = require "assets"

class Loader extends Emitter

    constructor: ->
        super

        @_loader = new PIXI.loaders.Loader
        @_loader.once "complete", @_onComplete

    init: ->
        for asset of assets
            @_prepare asset, assets[ asset ]
        return

    _prepare: ( id, url ) ->
        @_loader.add id, url

    _onComplete: =>
        @emit "complete"

    load: ->
        @_loader.load()

module.exports = new Loader
