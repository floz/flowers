class Color

    constructor: ( @c ) ->
        @rgb = getRGB @c
        @hsl = RGBtoHSL @rgb.r, @rgb.g, @rgb.b

    setLuminance: ( value ) ->
        @hsl.l = value
        @rgb = HSLtoRGB @hsl.h, @hsl.s, @hsl.l
        @c = combineRGB @rgb.r, @rgb.g, @rgb.b
        @

    clone: -> new Color @c

module.exports.Color = Color

getRGB = 
module.exports.getRGB = ( c ) ->
    return {
        r: ( c >> 16 ) & 0xff
        g: ( c >> 8 ) & 0xff
        b: c & 0xff
    }

combineRGB = 
module.exports.combineRGB = ( r, g, b ) ->
    ( r << 16 ) | ( g << 8 ) | b
    
# https://github.com/mjackson/mjijackson.github.com/blob/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.txt
RGBtoHSL =
module.exports.RGBtoHSL = ( r, g, b ) ->
    r /= 255
    g /= 255
    b /= 255

    max = Math.max r, g, b
    min = Math.min r, g, b

    l = ( max + min ) * .5

    if max == min
        h = s = 0
    else
        d = max - min
        s = if l > .5 then d / ( 2 - max - min ) else d / ( max + min )
        if max == r
            h = ( g - b ) / d + ( if g < b then 6 else 0 )
        else if max == g
            h = ( b - r ) / d + 2
        else
            h = ( r - g ) / d + 4
        h /= 6

    { h: h, s: s, l: l }

HSLtoRGB =
module.exports.HSLtoRGB = ( h, s, l ) ->
    if s == 0
        r = g = b = l
    else
        hue2rgb = ( p, q, t ) ->
            t += 1 if t < 0 
            t -= 1 if t > 1
            return p + (q - p) * 6 * t if t < 1/6
            return q if t < .5
            return p + (q - p) * (2/3 - t) * 6 if t < 2/3
            return p

        q = if l < 0.5 then l * (1 + s) else l + s - l * s
        p = 2 * l - q

        r = hue2rgb p, q, h + 1/3
        g = hue2rgb p, q, h
        b = hue2rgb p, q, h - 1/3

        { r: r * 255 >> 0, g: g * 255 >> 0, b: b * 255 >> 0 }


# http://devmag.org.za/2012/07/29/how-to-choose-colours-procedurally-algorithms/
module.exports.generateHarmony = ( count, aRef, aOffset0, aOffset1, aRange0, aRange1, aRange2, saturation, luminance ) ->
    colors = []

    # aRef = Math.random() * 360
    for i in [0...count]
        aRand = Math.random() * ( aRange0 + aRange1 + aRange2 )
        if aRand > aRange0
            if aRand < aRange0 + aRange1
                aRand += aOffset0
            else
                aRand += aOffset1

        rgb = HSLtoRGB ( ( aRef + aRand ) / 360 ) % 1, saturation, luminance
        colors.push new Color combineRGB rgb.r, rgb.g, rgb.b

    colors
