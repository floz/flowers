uimg = require "fz/utils/images"

class ImageResizable

    constructor: ( @dom, @_domImg ) ->
        @_getOriginSize()
        @_isInit = @_w != 0
        if !@_isInit
            @_load()
        
        @resize()

    _load: ->
        @_domImg.onload = =>
            @_domImg.onload = null

            @_getOriginSize()
            @_isInit = true
            @resize()

    _getOriginSize: ->
        @_w = @_domImg.width
        @_h = @_domImg.height

    resize: ->
        return if !@_isInit

        w = @dom.offsetWidth
        h = @dom.offsetHeight

        data = uimg.fit @_w, @_h, w, h
        @_domImg.style.left = data.x + "px"
        @_domImg.style.top = data.y + "px"
        @_domImg.width = data.w 
        @_domImg.height = data.h

module.exports = ImageResizable
