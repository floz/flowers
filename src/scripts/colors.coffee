uColors = require "fz/utils/colors"
Color = uColors.Color

class Set

    constructor: ( cLeafs, cHeart ) ->
        @colorsLeafs = @_generateColors cLeafs, 1, 10
        @colorsHeart = @_generateColors cHeart, 1, 5

    _generateColors: ( c, offset, steps ) ->
        o = offset * .5

        oCurr = offset - o
        oAdd = offset / steps

        colors = []
        for i in [0...steps]
            cNew = c.generateFromOffset oCurr
            colors.push cNew
            oCurr += oAdd

        colors

    getColorLeaf: ->
        idx = Math.random() * @colorsLeafs.length >> 0
        @colorsLeafs[ idx ]

    getColorHeart: ->
        idx = Math.random() * @colorsHeart.length >> 0
        @colorsHeart[ idx ]

# blue1 = new Set new Color( 0x1e45b9 ), new Color( 0xbfc7df )
# blue2 = new Set new Color( 0x3528f0 ), new Color( 0xe3b622 )
# red1 = new Set new Color( 0xe4381a ), new Color( 0xcc7402 )
# red2 = new Set new Color( 0xe4381a ), new Color( 0xfff702 )
# yellow1 = new Set new Color( 0xfff702 ), new Color( 0xfff702 )
# yellow2 = new Set new Color( 0xffa703 ), new Color( 0xffe203 )
# purple1 = new Set new Color( 0x9005c7 ), new Color( 0xeac408 )
# purple2 = new Set new Color( 0x7209eb ), new Color( 0xffe203 )

# module.exports = [
#     [ blue1 ],
#     [ blue2 ],
#     [ blue1, blue2 ],
#     [ red1 ],
#     [ red2 ],
#     [ red1, red2 ],
#     [ purple1 ],
#     [ purple2 ],
#     [ purple1, purple2 ],
#     [ purple1, blue1 ],
#     [ yellow1, yellow2 ],
#     [ yellow1 ],
#     [ yellow2 ],
#     [ yellow2, blue2 ],
# ]

# complementary
# module.exports = -> uColors.generateHarmony 50, 0, 180, 0, 40, 50, 0, .75, .5

HUE = 0

module.exports.setHUE = ( value ) ->
    HUE = value

# analogous
module.exports.getFlowers = -> uColors.generateHarmony 50, HUE, 90, 180, 60, 0, 0, 1, .5
module.exports.getFloor = -> uColors.generateHarmony 50, HUE + 180, 90, 180, 30, 0, 0, 1, .5

# triad
# module.exports = -> uColors.generateHarmony 50, 0, 120, 240, 10, 10, 10, 1, .5
