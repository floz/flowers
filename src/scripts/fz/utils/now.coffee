module.exports = do ->
    perf = window && window.performance
    if perf && perf.now
        perf.now.bind perf
    else
        return -> new Date().getTime()
            
