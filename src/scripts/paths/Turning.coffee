class Turning

    constructor: ( @_dir ) ->
        @current = { x: 0, y: 0 }
        @_a = 0
        @_aAdd = ( Math.PI * 2 ) * .1

    next: ( speed ) ->
        speed += Math.random() * 10 - 5
        @current.x += speed * Math.cos @_dir + @_a
        @current.y += speed * Math.sin @_dir + @_a

        @_a += @_aAdd
        console.log @_a


module.exports = Turning
