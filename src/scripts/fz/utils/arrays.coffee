module.exports.shuffle = ( a ) ->
    i = a.length
    while --i > 0
        j = ~~( Math.random() * ( i + 1 ) )
        t = a[ j ]
        a[ j ] = a[ i ]
        a[ i ] = t
    a

module.exports.shift = ( a, from ) ->
    aFirst = a.splice from, a.length
    a = aFirst.concat a.splice 0, a.length
    a
