CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
COUNT_CHARS = CHARS.length

module.exports.generate = ->
    s = ""

    for i in [ 0...14 ]
        idx = Math.random() * COUNT_CHARS >> 0
        s += CHARS[ idx ]

    s
