# 1366 1064 1238 675

# wImg = 1238, hImg = 675
# sw = 1238 / 1366 = 0.906295754
# sh = 675 / 1064 = 0.6343984962
# sw > sh => sh => sh < 1 => ratio = 1 / sh

# wImg = 1366, hImg = 1064
# sw = 1366 / 1238 = 1.1033925687
# sh = 1064 / 675 = 1.5762962963
# sw < sh => sw => sw > 1 => ratio = 1 / sw

# wImg = 1238, hImg = 1064
# sw = 1238 / 1366 = 0.906295754
# sh = 1064 / 675 = 1.5762962963
# sw < sh => sw

# wImg = 1366, hImg = 1064
# sw = 1366 / 1238 = 1.1033925687
# sh = 675 / 1064 = 0.6343984962
# sw > sh => sh

module.exports.fit = ( wImg, hImg, wHolder, hHolder ) ->
    sw = wImg / wHolder
    sh = hImg / hHolder

    if sw > sh
        ratio = sh
    else
        ratio = sw
    ratio = 1 / ratio    

    w = wImg * ratio
    h = hImg * ratio
    x = wHolder - w >> 1
    y = hHolder - h >> 1

    { x: x, y: y, w: w, h: h }
