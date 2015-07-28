class Drunk

    constructor: ( @_dir ) ->
        @current = { x: 0, y: 0 }
        @_a = 0

    next: ( speed ) ->
        speed += Math.random() * 10 - 5

        @_a += 1
        # @_a += .1
        @current.x += speed * Math.cos @_dir + @_a
        @current.y += speed * Math.sin @_dir + @_a

module.exports = Drunk
