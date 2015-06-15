_HALF_PI = Math.PI * .5

module.exports.sine =
    out: ( p ) -> Math.sin p * _HALF_PI
    in: ( p ) -> -Math.cos( p * _HALF_PI ) + 1

module.exports.expo = 
    out: ( p ) -> 1 - Math.pow 2, -10 * p
    in: ( p ) -> Math.pow( 2, 10 * (p - 1) ) - 0.001
