class Linear

    # @_dir in radians
    constructor: ( @_dir ) ->
        @current = { x: 0, y: 0 }

    next: ( speed ) ->
        speed += Math.random() * 10 - 5
        @current.x += speed * Math.cos @_dir
        @current.y += speed * Math.sin @_dir

module.exports = Linear
