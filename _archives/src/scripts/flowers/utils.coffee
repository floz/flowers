module.exports.initModifs = ( sprite ) ->
    sprite.modifs = 
        x0: 0
        y0: 0
        x1: 0
        y1: 0
        x2: 0
        y2: 0
        x3: 0
        y3: 0
    return

module.exports.eztween =
    in: ( sprite, type, delay = 0 ) ->
        s = sprite.width

        if type == "a"
            sprite.modifs.x1 = -s 
            sprite.modifs.y1 = -s * .5
            sprite.modifs.x2 = -s 
            sprite.modifs.y2 = s * .5
        else if type == "b"
            sprite.modifs.x2 = s * .5 
            sprite.modifs.y2 = -s
            sprite.modifs.x3 = - s * .5 
            sprite.modifs.y3 = -s 
        else if type == "c"
            sprite.modifs.x0 = s
            sprite.modifs.y0 = -s * .5
            sprite.modifs.x3 = s
            sprite.modifs.y3 = s * .5
        else
            sprite.modifs.x0 = -s * .5
            sprite.modifs.y0 = s
            sprite.modifs.x1 = s * .5
            sprite.modifs.y1 = s

        TweenLite.to sprite.modifs, .4,
            delay: delay
            x0: 0
            y0: 0
            x1: 0
            y1: 0
            x2: 0
            y2: 0
            x3: 0
            y3: 0
            ease: Cubic.easeInOut

        return

# todo: prendre en compte la rotation pour les calculs de vertices
module.exports.tween =
    in: ( sprite, delay = 0 ) ->
        s = sprite.width

        sprite.modifs.x0 = -s * .5
        sprite.modifs.x1 = s * .5
        sprite.modifs.y0 = 
        sprite.modifs.y1 = s

        TweenLite.to sprite.modifs, .4,
            delay: delay
            x0: 0
            y0: 0
            x1: 0
            y1: 0
            ease: Cubic.easeInOut

        return
