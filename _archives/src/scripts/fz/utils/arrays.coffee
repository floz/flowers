module.exports.shuffle = ( a ) ->
    i = a.length
    while --i > 0
        j = ~~( Math.random() * ( i + 1 ) )
        t = a[ j ]
        a[ j ] = a[ i ]
        a[ i ] = t
    a
