class Modifier

    speed: ( value ) ->
        value * .9


class Sinus

    constructor: ( @_dir ) ->
        @current = { x: 0, y: 0 }

        @modifier = new Modifier

        @_a = 0
        @_aAdd = Math.PI * ( .4 * Math.random() ) + .1
        @_aPerp = @_dir + Math.PI * .5

        @_rad = 0
        @_radMax = 15 + Math.random() * 25

    next: ( speed ) ->
        speed += Math.random() * 10 - 5
        @current.x += speed * Math.cos( @_dir ) + @_rad * Math.cos( @_aPerp )
        @current.y += speed * Math.sin( @_dir ) + @_rad * Math.sin( @_aPerp )

        @_a += @_aAdd
        @_rad = @_radMax * Math.cos @_a

module.exports = Sinus
