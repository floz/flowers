stage = require "fz/core/stage"
stage.init()

lp = require "fz/core/loop"
lp.start()

colors = require "colors"
colors.setHUE 20

engine = require "engine"
engine.init()
engine.setClearColor colors.getFloor()[ 0 ].c

loader = require "loader"
loader.init()

resize = ->
    engine.resize stage.w, stage.h
stage.on "resize", resize
resize()

#

loader.on "complete", ->
    console.log "complete"
    engine.start()
    # pixi.start()
    
    # grid = new ( require "Grid" )()
    # pixi.stage.addChild grid

    # floor = new ( require "floor/Floor" )()
    # engine.scene.add floor

    field = new ( require "flowers/Field" )()
    engine.scene.add field

loader.load()
