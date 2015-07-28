Flower = require "flowers/Flower"

class Pool

    constructor: ->
        @_available = []

    fill: ( amount = 500 ) ->
        for i in [ 0...amount ]
            @_available.push new Flower
        return

    get: ->
        @_available.pop()

    return: ( item ) ->
        @_available.push item

module.exports = new Pool
