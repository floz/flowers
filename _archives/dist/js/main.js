(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/main.coffee":[function(require,module,exports){
var loader, lp, pixi, resize, stage;

stage = require("fz/core/stage");

stage.init();

lp = require("fz/core/loop");

lp.start();

pixi = require("pixi");

pixi.init();

loader = require("loader");

loader.init();

resize = function() {
  return pixi.resize(stage.w, stage.h);
};

stage.on("resize", resize);

resize();

loader.on("complete", function() {
  var field, grid;
  pixi.start();
  grid = new (require("Grid"))();
  pixi.stage.addChild(grid);
  field = new (require("flowers/Field"))();
  return pixi.stage.addChild(field);
});

loader.load();


},{"Grid":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/Grid.coffee","flowers/Field":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee","loader":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/loader.coffee","pixi":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/pixi.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/Grid.coffee":[function(require,module,exports){
var Grid, _C_LARGE, _C_MEDIUM, _C_SMALL, _S_LARGE, _S_MEDIUM, _S_SMALL, stage,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

_C_LARGE = 0xff0000;

_C_MEDIUM = 0xfff000;

_C_SMALL = 0x0000ff;

_S_LARGE = 20;

_S_MEDIUM = _S_LARGE / 2 >> 0;

_S_SMALL = _S_LARGE / 4 >> 0;

Grid = (function(superClass) {
  extend(Grid, superClass);

  function Grid() {
    Grid.__super__.constructor.apply(this, arguments);
    this._large = new PIXI.Graphics;
    this.addChild(this._large);
    this._medium = new PIXI.Graphics;
    this.addChild(this._medium);
    this._small = new PIXI.Graphics;
    this.addChild(this._small);
    this._build();
  }

  Grid.prototype._build = function() {
    this._buildGrid(this._large, _C_LARGE, _S_LARGE, .5);
    this._buildGrid(this._medium, _C_MEDIUM, _S_MEDIUM, .35);
    return this._buildGrid(this._small, _C_SMALL, _S_SMALL, .15);
  };

  Grid.prototype._buildGrid = function(g, c, s, a) {
    var i, j, k, n, ref, ref1, v;
    g.clear();
    g.lineStyle(1, c, a);
    n = stage.w / s >> 0;
    for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      v = i * s >> 0;
      g.moveTo(v, 0);
      g.lineTo(v, stage.h);
    }
    n = stage.h / s >> 0;
    for (i = k = 0, ref1 = n; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      v = i * s >> 0;
      g.moveTo(0, v);
      g.lineTo(stage.w, v);
    }
    return g.endFill();
  };

  return Grid;

})(PIXI.Container);

module.exports = Grid;


},{"fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee":[function(require,module,exports){
var path;

path = "imgs/";

module.exports = {
  heart: path + "heart.png",
  petale_0: path + "petale_0.png",
  petale_1: path + "petale_1.png"
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee":[function(require,module,exports){
var Field, Flowers, stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

Flowers = require("flowers/Flowers");

Field = (function(superClass) {
  extend(Field, superClass);

  function Field(_grid) {
    this._grid = _grid;
    this._onDown = bind(this._onDown, this);
    Field.__super__.constructor.apply(this, arguments);
    this._area = new PIXI.Graphics;
    this._area.beginFill(0xff00ff, 0);
    this._area.drawRect(0, 0, stage.w, stage.h);
    this.addChild(this._area);
    this._area.interactive = this._area.buttonMode = true;
    this._area.on("tap", this._onDown);
    this._area.on("click", this._onDown);
  }

  Field.prototype._onDown = function(e) {
    var flowers, x, y;
    x = e.data.global.x;
    y = e.data.global.y;
    flowers = new Flowers;
    flowers.x = x;
    flowers.y = y;
    return this.addChild(flowers);
  };

  return Field;

})(PIXI.Container);

module.exports = Field;


},{"flowers/Flowers":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flowers.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee":[function(require,module,exports){
var Flower, assets, dataShader, lp, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

lp = require("fz/core/loop");

assets = require("assets");

dataShader = require("shaders/FlowerShader");

utils = require("flowers/utils");

Flower = (function(superClass) {
  extend(Flower, superClass);

  function Flower() {
    var s, uniforms;
    Flower.__super__.constructor.apply(this, arguments);
    this._leafs = [];
    this._createLeafs();
    this._heart = new PIXI.Sprite.fromImage(assets.heart);
    this._heart.width = 15;
    this._heart.height = 15;
    this._heart.x = -this._heart.width >> 1;
    this._heart.y = -this._heart.height >> 1;
    this.addChild(this._heart);
    uniforms = dataShader.uniforms();
    s = .5 + Math.random() * .5;
    this.scale.x = 0;
    this.scale.y = 0;
    TweenLite.to(this.scale, .4, {
      x: s,
      y: s,
      ease: Cubic.easeInOut
    });
  }

  Flower.prototype._createLeafs = function() {
    var a, aAdd, i, j, leaf, n, ref, results, types;
    types = ["a", "b", "c", "d"];
    n = types.length;
    a = 0;
    aAdd = (Math.PI * 2) / n;
    results = [];
    for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      leaf = new PIXI.Sprite.fromImage(assets.petale_1);
      leaf.width = leaf.height = 20;
      leaf.x = (-leaf.width >> 1) + 10 * Math.cos(a);
      leaf.y = (-leaf.height >> 1) + 10 * Math.sin(a);
      utils.initModifs(leaf);
      utils.eztween["in"](leaf, types[i], .3);
      this.addChild(leaf);
      results.push(a += aAdd);
    }
    return results;
  };

  return Flower;

})(PIXI.Container);

module.exports = Flower;


},{"assets":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee","flowers/utils":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/utils.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","shaders/FlowerShader":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/shaders/FlowerShader.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flowers.coffee":[function(require,module,exports){
var Drunk, Flower, Flowers, Linear, Opts, PathDrawer, Sinus, Turning, lp, pool, stage, timeout,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

lp = require("fz/core/loop");

pool = require("flowers/pool");

Flower = require("flowers/Flower");

PathDrawer = require("paths/PathDrawer");

Linear = require("paths/Linear");

Turning = require("paths/Turning");

Drunk = require("paths/Drunk");

Sinus = require("paths/Sinus");

Opts = require("paths/Opts");

timeout = require("fz/utils/timeout");

Flowers = (function(superClass) {
  extend(Flowers, superClass);

  function Flowers() {
    this._update = bind(this._update, this);
    var i, j, n, path, rad, ref;
    Flowers.__super__.constructor.apply(this, arguments);
    this._pathDrawer = new PathDrawer;
    this.addChild(this._pathDrawer);
    this._origin = new Flower;
    this.addChild(this._origin);
    this._flowers = [this._origin];
    this._opts = [];
    this._isAlive = true;
    rad = 0;
    n = 25;
    this._paths = [];
    for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      path = new Sinus(rad);
      this._paths.push(path);
      this._opts.push({
        speed: Math.random() * 40 + 20 >> 0,
        life: Math.random() * 15 + 5 >> 0
      });
      this._pathDrawer.add(path);
      rad += (Math.PI * 2) / n;
    }
    timeout(this._update, 50);
  }

  Flowers.prototype._update = function() {
    var i, isAlive, j, len, opt, path, ref;
    if (!this._isAlive) {
      return;
    }
    isAlive = false;
    ref = this._paths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      opt = this._opts[i];
      if (!opt.life) {
        continue;
      }
      if (path.modifier) {
        opt.speed = path.modifier.speed(opt.speed);
        if (opt.speed < 10) {
          opt.speed = 10;
        }
      }
      path.next(opt.speed);
      this._addFlower(path.current);
      opt.life -= 1;
      if (opt.life > 0) {
        isAlive = true;
      }
    }
    this._pathDrawer.update();
    this._isAlive = isAlive;
    return timeout(this._update, 50);
  };

  Flowers.prototype._addFlower = function(pos) {
    var flower;
    flower = new Flower;
    flower.x = pos.x;
    flower.y = pos.y;
    this.addChild(flower);
    return this._flowers.push(flower);
  };

  return Flowers;

})(PIXI.Container);

module.exports = Flowers;


},{"flowers/Flower":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee","flowers/pool":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/pool.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee","fz/utils/timeout":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee","paths/Drunk":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Drunk.coffee","paths/Linear":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Linear.coffee","paths/Opts":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Opts.coffee","paths/PathDrawer":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/PathDrawer.coffee","paths/Sinus":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Sinus.coffee","paths/Turning":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Turning.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/pool.coffee":[function(require,module,exports){
var Flower, Pool;

Flower = require("flowers/Flower");

Pool = (function() {
  function Pool() {
    this._available = [];
  }

  Pool.prototype.fill = function(amount) {
    var i, j, ref;
    if (amount == null) {
      amount = 500;
    }
    for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this._available.push(new Flower);
    }
  };

  Pool.prototype.get = function() {
    return this._available.pop();
  };

  Pool.prototype["return"] = function(item) {
    return this._available.push(item);
  };

  return Pool;

})();

module.exports = new Pool;


},{"flowers/Flower":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/utils.coffee":[function(require,module,exports){
module.exports.initModifs = function(sprite) {
  sprite.modifs = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0
  };
};

module.exports.eztween = {
  "in": function(sprite, type, delay) {
    var s;
    if (delay == null) {
      delay = 0;
    }
    s = sprite.width;
    if (type === "a") {
      sprite.modifs.x1 = -s;
      sprite.modifs.y1 = -s * .5;
      sprite.modifs.x2 = -s;
      sprite.modifs.y2 = s * .5;
    } else if (type === "b") {
      sprite.modifs.x2 = s * .5;
      sprite.modifs.y2 = -s;
      sprite.modifs.x3 = -s * .5;
      sprite.modifs.y3 = -s;
    } else if (type === "c") {
      sprite.modifs.x0 = s;
      sprite.modifs.y0 = -s * .5;
      sprite.modifs.x3 = s;
      sprite.modifs.y3 = s * .5;
    } else {
      sprite.modifs.x0 = -s * .5;
      sprite.modifs.y0 = s;
      sprite.modifs.x1 = s * .5;
      sprite.modifs.y1 = s;
    }
    TweenLite.to(sprite.modifs, .4, {
      delay: delay,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      x3: 0,
      y3: 0,
      ease: Cubic.easeInOut
    });
  }
};

module.exports.tween = {
  "in": function(sprite, delay) {
    var s;
    if (delay == null) {
      delay = 0;
    }
    s = sprite.width;
    sprite.modifs.x0 = -s * .5;
    sprite.modifs.x1 = s * .5;
    sprite.modifs.y0 = sprite.modifs.y1 = s;
    TweenLite.to(sprite.modifs, .4, {
      delay: delay,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      ease: Cubic.easeInOut
    });
  }
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee":[function(require,module,exports){
var idx, listeners, n, update;

idx = -1;

listeners = [];

n = 0;

update = function() {
  var i;
  i = n;
  while (--i >= 0) {
    listeners[i].apply(this, null);
  }
  return idx = requestAnimationFrame(update);
};

module.exports.start = function() {
  return update();
};

module.exports.stop = function() {
  return cancelAnimationFrame(idx);
};

module.exports.add = function(listener) {
  idx = listeners.indexOf(listener);
  if (idx >= 0) {
    return;
  }
  listeners.push(listener);
  return n++;
};

module.exports.remove = function(listener) {
  idx = listeners.indexOf(listener);
  if (idx < 0) {
    return;
  }
  listeners.splice(idx, 1);
  return n--;
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee":[function(require,module,exports){
var Stage, timeout,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

timeout = require("fz/utils/timeout");

Stage = (function(superClass) {
  extend(Stage, superClass);

  function Stage() {
    this._onResize = bind(this._onResize, this);
    this._update = bind(this._update, this);
    this.w = 0;
    this.h = 0;
  }

  Stage.prototype.init = function() {
    window.addEventListener("resize", this._onResize, false);
    window.addEventListener("orientationchange", this._onResize, false);
    return this._onResize();
  };

  Stage.prototype._update = function() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    return this.emit("resize");
  };

  Stage.prototype._onResize = function() {
    return timeout(this._update, 10);
  };

  Stage.prototype.resize = function(withDelay) {
    if (withDelay == null) {
      withDelay = false;
    }
    if (withDelay) {
      this._onResize();
      return;
    }
    return this._update();
  };

  return Stage;

})(Emitter);

module.exports = new Stage;


},{"fz/utils/timeout":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/now.coffee":[function(require,module,exports){
module.exports = (function() {
  var perf;
  perf = window && window.performance;
  if (perf && perf.now) {
    return perf.now.bind(perf);
  } else {
    return function() {
      return new Date().getTime();
    };
  }
})();


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee":[function(require,module,exports){
var now;

now = require("fz/utils/now");

module.exports = function(fn, delay) {
  var data, lp, start;
  start = now();
  lp = function() {
    if ((now() - start) >= delay) {
      return fn.call();
    } else {
      return data.id = requestAnimationFrame(lp);
    }
  };
  data = {};
  data.id = requestAnimationFrame(lp);
  return data;
};

module.exports.clear = function(data) {
  return cancelAnimationFrame(data.id);
};


},{"fz/utils/now":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/now.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/loader.coffee":[function(require,module,exports){
var Loader, assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

assets = require("assets");

Loader = (function(superClass) {
  extend(Loader, superClass);

  function Loader() {
    this._onComplete = bind(this._onComplete, this);
    Loader.__super__.constructor.apply(this, arguments);
    this._loader = new PIXI.loaders.Loader;
    this._loader.once("complete", this._onComplete);
  }

  Loader.prototype.init = function() {
    var asset;
    for (asset in assets) {
      this._prepare(asset, assets[asset]);
    }
  };

  Loader.prototype._prepare = function(id, url) {
    return this._loader.add(id, url);
  };

  Loader.prototype._onComplete = function() {
    return this.emit("complete");
  };

  Loader.prototype.load = function() {
    return this._loader.load();
  };

  return Loader;

})(Emitter);

module.exports = new Loader;


},{"assets":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Drunk.coffee":[function(require,module,exports){
var Drunk;

Drunk = (function() {
  function Drunk(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this._a = 0;
  }

  Drunk.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this._a += 1;
    this.current.x += speed * Math.cos(this._dir + this._a);
    return this.current.y += speed * Math.sin(this._dir + this._a);
  };

  return Drunk;

})();

module.exports = Drunk;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Linear.coffee":[function(require,module,exports){
var Linear;

Linear = (function() {
  function Linear(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
  }

  Linear.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir);
    return this.current.y += speed * Math.sin(this._dir);
  };

  return Linear;

})();

module.exports = Linear;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Opts.coffee":[function(require,module,exports){
var Opts;

Opts = (function() {
  function Opts() {
    this.speed = 50;
    this.life = 10;
  }

  return Opts;

})();

module.exports = Opts;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/PathDrawer.coffee":[function(require,module,exports){
var PathDrawer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PathDrawer = (function(superClass) {
  extend(PathDrawer, superClass);

  function PathDrawer(color) {
    if (color == null) {
      color = 0xff00ff;
    }
    PathDrawer.__super__.constructor.apply(this, arguments);
    this._paths = [];
    this._lasts = [];
    this._g = new PIXI.Graphics;
    this._g.lineColor = 0;
    this._g.lineAlpha = 1;
    this._g.lineWidth = 1;
    this.addChild(this._g);
  }

  PathDrawer.prototype.add = function(path) {
    this._paths.push(path);
    return this._lasts.push({
      x: 0,
      y: 0
    });
  };

  PathDrawer.prototype.update = function() {
    var current, i, j, last, len, path, ref;
    ref = this._paths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      last = this._lasts[i];
      current = path.current;
      this._g.moveTo(last.x, last.y);
      this._g.lineTo(current.x, current.y);
      last.x = current.x;
      last.y = current.y;
    }
  };

  return PathDrawer;

})(PIXI.Container);

module.exports = PathDrawer;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Sinus.coffee":[function(require,module,exports){
var Modifier, Sinus;

Modifier = (function() {
  function Modifier() {}

  Modifier.prototype.speed = function(value) {
    return value * .9;
  };

  return Modifier;

})();

Sinus = (function() {
  function Sinus(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this.modifier = new Modifier;
    this._a = 0;
    this._aAdd = Math.PI * (.4 * Math.random()) + .1;
    this._aPerp = this._dir + Math.PI * .5;
    this._rad = 0;
    this._radMax = 15 + Math.random() * 25;
  }

  Sinus.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir) + this._rad * Math.cos(this._aPerp);
    this.current.y += speed * Math.sin(this._dir) + this._rad * Math.sin(this._aPerp);
    this._a += this._aAdd;
    return this._rad = this._radMax * Math.cos(this._a);
  };

  return Sinus;

})();

module.exports = Sinus;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Turning.coffee":[function(require,module,exports){
var Turning;

Turning = (function() {
  function Turning(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this._a = 0;
    this._aAdd = (Math.PI * 2) * .1;
  }

  Turning.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir + this._a);
    this.current.y += speed * Math.sin(this._dir + this._a);
    this._a += this._aAdd;
    return console.log(this._a);
  };

  return Turning;

})();

module.exports = Turning;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/pixi.coffee":[function(require,module,exports){
var Pixi, lp, stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

stage = require("fz/core/stage");

lp = require("fz/core/loop");

Pixi = (function() {
  function Pixi() {
    this._update = bind(this._update, this);
    this.renderer = null;
  }

  Pixi.prototype.init = function() {
    var opts;
    opts = {
      antialias: true,
      resolution: 2,
      transparent: true
    };
    this.renderer = new PIXI.autoDetectRenderer(0, 0, opts);
    document.body.appendChild(this.renderer.view);
    return this.stage = new PIXI.Container;
  };

  Pixi.prototype.resize = function(w, h) {
    this.w = w;
    this.h = h;
    this.renderer.resize(this.w, this.h);
    this.renderer.view.style.width = this.w + "px";
    return this.renderer.view.style.height = this.h + "px";
  };

  Pixi.prototype.start = function() {
    return lp.add(this._update);
  };

  Pixi.prototype._update = function() {
    return this.renderer.render(this.stage);
  };

  return Pixi;

})();

module.exports = new Pixi;


},{"fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/shaders/FlowerShader.coffee":[function(require,module,exports){
module.exports.uniforms = function() {
  return {};
};

module.exports.vertex = ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", '}'].join("");

module.exports.fragment = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;", "}"].join("");


},{}]},{},["./src/scripts/main.coffee"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL21haW4uY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9HcmlkLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvYXNzZXRzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy9GaWVsZC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Zsb3dlcnMvRmxvd2VyLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy9GbG93ZXJzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy9wb29sLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy91dGlscy5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvbG9vcC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvc3RhZ2UuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy9ub3cuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy90aW1lb3V0LmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvbG9hZGVyLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvRHJ1bmsuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9wYXRocy9MaW5lYXIuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9wYXRocy9PcHRzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvUGF0aERyYXdlci5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL3BhdGhzL1NpbnVzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvVHVybmluZy5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL3BpeGkuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9zaGFkZXJzL0Zsb3dlclNoYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFDUixLQUFLLENBQUMsSUFBTixDQUFBOztBQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUjs7QUFDTCxFQUFFLENBQUMsS0FBSCxDQUFBOztBQUtBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7QUFDUCxJQUFJLENBQUMsSUFBTCxDQUFBOztBQUVBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFDVCxNQUFNLENBQUMsSUFBUCxDQUFBOztBQUVBLE1BQUEsR0FBUyxTQUFBO1NBQ0wsSUFBSSxDQUFDLE1BQUwsQ0FBWSxLQUFLLENBQUMsQ0FBbEIsRUFBcUIsS0FBSyxDQUFDLENBQTNCO0FBREs7O0FBRVQsS0FBSyxDQUFDLEVBQU4sQ0FBUyxRQUFULEVBQW1CLE1BQW5COztBQUNBLE1BQUEsQ0FBQTs7QUFJQSxNQUFNLENBQUMsRUFBUCxDQUFVLFVBQVYsRUFBc0IsU0FBQTtBQUNsQixNQUFBO0VBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBQTtFQUVBLElBQUEsR0FBVyxJQUFBLENBQUUsT0FBQSxDQUFRLE1BQVIsQ0FBRixDQUFBLENBQUE7RUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVgsQ0FBb0IsSUFBcEI7RUFFQSxLQUFBLEdBQVksSUFBQSxDQUFFLE9BQUEsQ0FBUSxlQUFSLENBQUYsQ0FBQSxDQUFBO1NBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFYLENBQW9CLEtBQXBCO0FBUGtCLENBQXRCOztBQVNBLE1BQU0sQ0FBQyxJQUFQLENBQUE7Ozs7QUMvQkEsSUFBQSx5RUFBQTtFQUFBOzs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVI7O0FBRVIsUUFBQSxHQUFXOztBQUNYLFNBQUEsR0FBWTs7QUFDWixRQUFBLEdBQVc7O0FBRVgsUUFBQSxHQUFXOztBQUNYLFNBQUEsR0FBWSxRQUFBLEdBQVcsQ0FBWCxJQUFnQjs7QUFDNUIsUUFBQSxHQUFXLFFBQUEsR0FBVyxDQUFYLElBQWdCOztBQUVyQjs7O0VBRVcsY0FBQTtJQUNULHVDQUFBLFNBQUE7SUFFQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBSSxDQUFDO0lBQ25CLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE1BQVg7SUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUksSUFBSSxDQUFDO0lBQ3BCLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE9BQVg7SUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUksSUFBSSxDQUFDO0lBQ25CLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE1BQVg7SUFFQSxJQUFDLENBQUEsTUFBRCxDQUFBO0VBVlM7O2lCQVliLE1BQUEsR0FBUSxTQUFBO0lBQ0osSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsTUFBYixFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxFQUF6QztJQUNBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLE9BQWIsRUFBc0IsU0FBdEIsRUFBaUMsU0FBakMsRUFBNEMsR0FBNUM7V0FDQSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxNQUFiLEVBQXFCLFFBQXJCLEVBQStCLFFBQS9CLEVBQXlDLEdBQXpDO0VBSEk7O2lCQUtSLFVBQUEsR0FBWSxTQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVg7QUFDUixRQUFBO0lBQUEsQ0FBQyxDQUFDLEtBQUYsQ0FBQTtJQUNBLENBQUMsQ0FBQyxTQUFGLENBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsQ0FBbEI7SUFFQSxDQUFBLEdBQUksS0FBSyxDQUFDLENBQU4sR0FBVSxDQUFWLElBQWU7QUFDbkIsU0FBUywwRUFBVDtNQUNJLENBQUEsR0FBSSxDQUFBLEdBQUksQ0FBSixJQUFTO01BQ2IsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxDQUFULEVBQVksQ0FBWjtNQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsQ0FBVCxFQUFZLEtBQUssQ0FBQyxDQUFsQjtBQUhKO0lBS0EsQ0FBQSxHQUFJLEtBQUssQ0FBQyxDQUFOLEdBQVUsQ0FBVixJQUFlO0FBQ25CLFNBQVMsK0VBQVQ7TUFDSSxDQUFBLEdBQUksQ0FBQSxHQUFJLENBQUosSUFBUztNQUNiLENBQUMsQ0FBQyxNQUFGLENBQVMsQ0FBVCxFQUFZLENBQVo7TUFDQSxDQUFDLENBQUMsTUFBRixDQUFTLEtBQUssQ0FBQyxDQUFmLEVBQWtCLENBQWxCO0FBSEo7V0FLQSxDQUFDLENBQUMsT0FBRixDQUFBO0VBaEJROzs7O0dBbkJHLElBQUksQ0FBQzs7QUFxQ3hCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDL0NqQixJQUFBOztBQUFBLElBQUEsR0FBTzs7QUFFUCxNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUNiLEtBQUEsRUFBTyxJQUFBLEdBQU8sV0FERDtFQUViLFFBQUEsRUFBVSxJQUFBLEdBQU8sY0FGSjtFQUdiLFFBQUEsRUFBVSxJQUFBLEdBQU8sY0FISjs7Ozs7QUNGakIsSUFBQSxxQkFBQTtFQUFBOzs7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUNSLE9BQUEsR0FBVSxPQUFBLENBQVEsaUJBQVI7O0FBRUo7OztFQUVXLGVBQUUsS0FBRjtJQUFFLElBQUMsQ0FBQSxRQUFEOztJQUNYLHdDQUFBLFNBQUE7SUFFQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksSUFBSSxDQUFDO0lBQ2xCLElBQUMsQ0FBQSxLQUFLLENBQUMsU0FBUCxDQUFpQixRQUFqQixFQUEyQixDQUEzQjtJQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBUCxDQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixLQUFLLENBQUMsQ0FBNUIsRUFBK0IsS0FBSyxDQUFDLENBQXJDO0lBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsS0FBWDtJQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxHQUFxQixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0I7SUFDekMsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsS0FBVixFQUFpQixJQUFDLENBQUEsT0FBbEI7SUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLElBQUMsQ0FBQSxPQUFwQjtFQVZTOztrQkFZYixPQUFBLEdBQVMsU0FBRSxDQUFGO0FBQ0wsUUFBQTtJQUFBLENBQUEsR0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFBLEdBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFbEIsT0FBQSxHQUFVLElBQUk7SUFDZCxPQUFPLENBQUMsQ0FBUixHQUFZO0lBQ1osT0FBTyxDQUFDLENBQVIsR0FBWTtXQUNaLElBQUMsQ0FBQSxRQUFELENBQVUsT0FBVjtFQVBLOzs7O0dBZE8sSUFBSSxDQUFDOztBQXVCekIsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUMxQmpCLElBQUEscUNBQUE7RUFBQTs7O0FBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxjQUFSOztBQUNMLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUjs7QUFFVCxVQUFBLEdBQWEsT0FBQSxDQUFRLHNCQUFSOztBQUNiLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFFRjs7O0VBRVcsZ0JBQUE7QUFDVCxRQUFBO0lBQUEseUNBQUEsU0FBQTtJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsWUFBRCxDQUFBO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixNQUFNLENBQUMsS0FBN0I7SUFDZCxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsR0FBZ0I7SUFDaEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLEdBQWlCO0lBQ2pCLElBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBUixHQUFZLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFULElBQWtCO0lBQzlCLElBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBUixHQUFZLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFULElBQW1CO0lBQy9CLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE1BQVg7SUFFQSxRQUFBLEdBQVcsVUFBVSxDQUFDLFFBQVgsQ0FBQTtJQUlYLENBQUEsR0FBSSxFQUFBLEdBQUssSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCO0lBQ3pCLElBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBUixHQUFZO0lBQ1osSUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFSLEdBQVk7SUFDWixTQUFTLENBQUMsRUFBVixDQUFhLElBQUMsQ0FBQyxLQUFmLEVBQXNCLEVBQXRCLEVBQ0k7TUFBQSxDQUFBLEVBQUcsQ0FBSDtNQUNBLENBQUEsRUFBRyxDQURIO01BRUEsSUFBQSxFQUFNLEtBQUssQ0FBQyxTQUZaO0tBREo7RUFwQlM7O21CQXlCYixZQUFBLEdBQWMsU0FBQTtBQUNWLFFBQUE7SUFBQSxLQUFBLEdBQVEsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakI7SUFFUixDQUFBLEdBQUksS0FBSyxDQUFDO0lBQ1YsQ0FBQSxHQUFJO0lBQ0osSUFBQSxHQUFPLENBQUUsSUFBSSxDQUFDLEVBQUwsR0FBVSxDQUFaLENBQUEsR0FBa0I7QUFDekI7U0FBUywwRUFBVDtNQUNJLElBQUEsR0FBVyxJQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBWixDQUFzQixNQUFNLENBQUMsUUFBN0I7TUFDWCxJQUFJLENBQUMsS0FBTCxHQUNBLElBQUksQ0FBQyxNQUFMLEdBQWM7TUFDZCxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBTixJQUFlLENBQWpCLENBQUEsR0FBdUIsRUFBQSxHQUFLLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVDtNQUNyQyxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTixJQUFnQixDQUFsQixDQUFBLEdBQXdCLEVBQUEsR0FBSyxJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQ7TUFDdEMsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsSUFBakI7TUFDQSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUQsQ0FBYixDQUFpQixJQUFqQixFQUF1QixLQUFPLENBQUEsQ0FBQSxDQUE5QixFQUFtQyxFQUFuQztNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjttQkFFQSxDQUFBLElBQUs7QUFWVDs7RUFOVTs7OztHQTNCRyxJQUFJLENBQUM7O0FBOEMxQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ3BEakIsSUFBQSwwRkFBQTtFQUFBOzs7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUNSLEVBQUEsR0FBSyxPQUFBLENBQVEsY0FBUjs7QUFFTCxJQUFBLEdBQU8sT0FBQSxDQUFRLGNBQVI7O0FBQ1AsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFFVCxVQUFBLEdBQWEsT0FBQSxDQUFRLGtCQUFSOztBQUNiLE1BQUEsR0FBUyxPQUFBLENBQVEsY0FBUjs7QUFDVCxPQUFBLEdBQVUsT0FBQSxDQUFRLGVBQVI7O0FBQ1YsS0FBQSxHQUFRLE9BQUEsQ0FBUSxhQUFSOztBQUNSLEtBQUEsR0FBUSxPQUFBLENBQVEsYUFBUjs7QUFDUixJQUFBLEdBQU8sT0FBQSxDQUFRLFlBQVI7O0FBRVAsT0FBQSxHQUFVLE9BQUEsQ0FBUSxrQkFBUjs7QUFFSjs7O0VBRVcsaUJBQUE7O0FBQ1QsUUFBQTtJQUFBLDBDQUFBLFNBQUE7SUFFQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUk7SUFDbkIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWDtJQUVBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSTtJQUNmLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLE9BQVg7SUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUUsSUFBQyxDQUFBLE9BQUg7SUFFWixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRVQsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUVaLEdBQUEsR0FBTTtJQUNOLENBQUEsR0FBSTtJQUNKLElBQUMsQ0FBQSxNQUFELEdBQVU7QUFDVixTQUFTLDBFQUFUO01BQ0ksSUFBQSxHQUFXLElBQUEsS0FBQSxDQUFNLEdBQU47TUFDWCxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxJQUFiO01BRUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQ0k7UUFBQSxLQUFBLEVBQU8sSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLEVBQWhCLEdBQXFCLEVBQXJCLElBQTJCLENBQWxDO1FBQ0EsSUFBQSxFQUFNLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixFQUFoQixHQUFxQixDQUFyQixJQUEwQixDQURoQztPQURKO01BSUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQWpCO01BRUEsR0FBQSxJQUFPLENBQUUsSUFBSSxDQUFDLEVBQUwsR0FBVSxDQUFaLENBQUEsR0FBa0I7QUFWN0I7SUFhQSxPQUFBLENBQVEsSUFBQyxDQUFBLE9BQVQsRUFBa0IsRUFBbEI7RUEvQlM7O29CQWlDYixPQUFBLEdBQVMsU0FBQTtBQUNMLFFBQUE7SUFBQSxJQUFHLENBQUMsSUFBQyxDQUFBLFFBQUw7QUFDSSxhQURKOztJQUdBLE9BQUEsR0FBVTtBQUNWO0FBQUEsU0FBQSw2Q0FBQTs7TUFDSSxHQUFBLEdBQU0sSUFBQyxDQUFBLEtBQU8sQ0FBQSxDQUFBO01BRWQsSUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFqQjtBQUFBLGlCQUFBOztNQUVBLElBQUcsSUFBSSxDQUFDLFFBQVI7UUFDSSxHQUFHLENBQUMsS0FBSixHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBZCxDQUFvQixHQUFHLENBQUMsS0FBeEI7UUFDWixJQUFrQixHQUFHLENBQUMsS0FBSixHQUFZLEVBQTlCO1VBQUEsR0FBRyxDQUFDLEtBQUosR0FBWSxHQUFaO1NBRko7O01BR0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxHQUFHLENBQUMsS0FBZDtNQUNBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBSSxDQUFDLE9BQWpCO01BRUEsR0FBRyxDQUFDLElBQUosSUFBWTtNQUNaLElBQWtCLEdBQUcsQ0FBQyxJQUFKLEdBQVcsQ0FBN0I7UUFBQSxPQUFBLEdBQVUsS0FBVjs7QUFaSjtJQWFBLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixDQUFBO0lBRUEsSUFBQyxDQUFBLFFBQUQsR0FBWTtXQUVaLE9BQUEsQ0FBUSxJQUFDLENBQUEsT0FBVCxFQUFrQixFQUFsQjtFQXRCSzs7b0JBd0JULFVBQUEsR0FBWSxTQUFFLEdBQUY7QUFDUixRQUFBO0lBQUEsTUFBQSxHQUFTLElBQUk7SUFDYixNQUFNLENBQUMsQ0FBUCxHQUFXLEdBQUcsQ0FBQztJQUNmLE1BQU0sQ0FBQyxDQUFQLEdBQVcsR0FBRyxDQUFDO0lBQ2YsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO1dBRUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsTUFBZjtFQU5ROzs7O0dBM0RNLElBQUksQ0FBQzs7QUFtRTNCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDbEZqQixJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsZ0JBQVI7O0FBRUg7RUFFVyxjQUFBO0lBQ1QsSUFBQyxDQUFBLFVBQUQsR0FBYztFQURMOztpQkFHYixJQUFBLEdBQU0sU0FBRSxNQUFGO0FBQ0YsUUFBQTs7TUFESSxTQUFTOztBQUNiLFNBQVMsK0VBQVQ7TUFDSSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsSUFBSSxNQUFyQjtBQURKO0VBREU7O2lCQUtOLEdBQUEsR0FBSyxTQUFBO1dBQ0QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUE7RUFEQzs7aUJBR0wsU0FBQSxHQUFRLFNBQUUsSUFBRjtXQUNKLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQjtFQURJOzs7Ozs7QUFHWixNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFJOzs7O0FDbEJyQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQWYsR0FBNEIsU0FBRSxNQUFGO0VBQ3hCLE1BQU0sQ0FBQyxNQUFQLEdBQ0k7SUFBQSxFQUFBLEVBQUksQ0FBSjtJQUNBLEVBQUEsRUFBSSxDQURKO0lBRUEsRUFBQSxFQUFJLENBRko7SUFHQSxFQUFBLEVBQUksQ0FISjtJQUlBLEVBQUEsRUFBSSxDQUpKO0lBS0EsRUFBQSxFQUFJLENBTEo7SUFNQSxFQUFBLEVBQUksQ0FOSjtJQU9BLEVBQUEsRUFBSSxDQVBKOztBQUZvQjs7QUFZNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFmLEdBQ0k7RUFBQSxJQUFBLEVBQUksU0FBRSxNQUFGLEVBQVUsSUFBVixFQUFnQixLQUFoQjtBQUNBLFFBQUE7O01BRGdCLFFBQVE7O0lBQ3hCLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxJQUFHLElBQUEsS0FBUSxHQUFYO01BQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLEdBQW1CLENBQUM7TUFDcEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLEdBQW1CLENBQUMsQ0FBRCxHQUFLO01BQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixDQUFDO01BQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixDQUFBLEdBQUksR0FKM0I7S0FBQSxNQUtLLElBQUcsSUFBQSxLQUFRLEdBQVg7TUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUIsQ0FBQSxHQUFJO01BQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixDQUFDO01BQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixDQUFFLENBQUYsR0FBTTtNQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUIsQ0FBQyxFQUpuQjtLQUFBLE1BS0EsSUFBRyxJQUFBLEtBQVEsR0FBWDtNQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQjtNQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUIsQ0FBQyxDQUFELEdBQUs7TUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLEdBQW1CO01BQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixDQUFBLEdBQUksR0FKdEI7S0FBQSxNQUFBO01BTUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLEdBQW1CLENBQUMsQ0FBRCxHQUFLO01BQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQjtNQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUIsQ0FBQSxHQUFJO01BQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBZCxHQUFtQixFQVRsQjs7SUFXTCxTQUFTLENBQUMsRUFBVixDQUFhLE1BQU0sQ0FBQyxNQUFwQixFQUE0QixFQUE1QixFQUNJO01BQUEsS0FBQSxFQUFPLEtBQVA7TUFDQSxFQUFBLEVBQUksQ0FESjtNQUVBLEVBQUEsRUFBSSxDQUZKO01BR0EsRUFBQSxFQUFJLENBSEo7TUFJQSxFQUFBLEVBQUksQ0FKSjtNQUtBLEVBQUEsRUFBSSxDQUxKO01BTUEsRUFBQSxFQUFJLENBTko7TUFPQSxFQUFBLEVBQUksQ0FQSjtNQVFBLEVBQUEsRUFBSSxDQVJKO01BU0EsSUFBQSxFQUFNLEtBQUssQ0FBQyxTQVRaO0tBREo7RUF4QkEsQ0FBSjs7O0FBdUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBZixHQUNJO0VBQUEsSUFBQSxFQUFJLFNBQUUsTUFBRixFQUFVLEtBQVY7QUFDQSxRQUFBOztNQURVLFFBQVE7O0lBQ2xCLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUIsQ0FBQyxDQUFELEdBQUs7SUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLEdBQW1CLENBQUEsR0FBSTtJQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FDQSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWQsR0FBbUI7SUFFbkIsU0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFNLENBQUMsTUFBcEIsRUFBNEIsRUFBNUIsRUFDSTtNQUFBLEtBQUEsRUFBTyxLQUFQO01BQ0EsRUFBQSxFQUFJLENBREo7TUFFQSxFQUFBLEVBQUksQ0FGSjtNQUdBLEVBQUEsRUFBSSxDQUhKO01BSUEsRUFBQSxFQUFJLENBSko7TUFLQSxJQUFBLEVBQU0sS0FBSyxDQUFDLFNBTFo7S0FESjtFQVJBLENBQUo7Ozs7O0FDckRKLElBQUE7O0FBQUEsR0FBQSxHQUFNLENBQUM7O0FBQ1AsU0FBQSxHQUFZOztBQUVaLENBQUEsR0FBSTs7QUFFSixNQUFBLEdBQVMsU0FBQTtBQUNQLE1BQUE7RUFBQSxDQUFBLEdBQUk7QUFDSixTQUFNLEVBQUUsQ0FBRixJQUFPLENBQWI7SUFDRSxTQUFXLENBQUEsQ0FBQSxDQUFHLENBQUMsS0FBZixDQUFxQixJQUFyQixFQUEyQixJQUEzQjtFQURGO1NBRUEsR0FBQSxHQUFNLHFCQUFBLENBQXNCLE1BQXRCO0FBSkM7O0FBTVQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFmLEdBQXVCLFNBQUE7U0FDckIsTUFBQSxDQUFBO0FBRHFCOztBQUd2QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQWYsR0FBc0IsU0FBQTtTQUNwQixvQkFBQSxDQUFxQixHQUFyQjtBQURvQjs7QUFHdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFmLEdBQXFCLFNBQUUsUUFBRjtFQUNuQixHQUFBLEdBQU0sU0FBUyxDQUFDLE9BQVYsQ0FBa0IsUUFBbEI7RUFDTixJQUFVLEdBQUEsSUFBTyxDQUFqQjtBQUFBLFdBQUE7O0VBQ0EsU0FBUyxDQUFDLElBQVYsQ0FBZSxRQUFmO1NBQ0EsQ0FBQTtBQUptQjs7QUFNckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFmLEdBQXdCLFNBQUUsUUFBRjtFQUN0QixHQUFBLEdBQU0sU0FBUyxDQUFDLE9BQVYsQ0FBa0IsUUFBbEI7RUFDTixJQUFVLEdBQUEsR0FBTSxDQUFoQjtBQUFBLFdBQUE7O0VBQ0EsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEI7U0FDQSxDQUFBO0FBSnNCOzs7O0FDdkJ4QixJQUFBLGNBQUE7RUFBQTs7OztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsa0JBQVI7O0FBRUo7OztFQUVXLGVBQUE7OztJQUNULElBQUMsQ0FBQSxDQUFELEdBQUs7SUFDTCxJQUFDLENBQUEsQ0FBRCxHQUFLO0VBRkk7O2tCQUliLElBQUEsR0FBTSxTQUFBO0lBQ0YsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLElBQUMsQ0FBQSxTQUFuQyxFQUE4QyxLQUE5QztJQUNBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixtQkFBeEIsRUFBNkMsSUFBQyxDQUFBLFNBQTlDLEVBQXlELEtBQXpEO1dBQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBQTtFQUhFOztrQkFLTixPQUFBLEdBQVMsU0FBQTtJQUNMLElBQUMsQ0FBQSxDQUFELEdBQUssTUFBTSxDQUFDO0lBQ1osSUFBQyxDQUFBLENBQUQsR0FBSyxNQUFNLENBQUM7V0FFWixJQUFDLENBQUEsSUFBRCxDQUFNLFFBQU47RUFKSzs7a0JBTVQsU0FBQSxHQUFXLFNBQUE7V0FDUCxPQUFBLENBQVEsSUFBQyxDQUFBLE9BQVQsRUFBa0IsRUFBbEI7RUFETzs7a0JBR1gsTUFBQSxHQUFRLFNBQUUsU0FBRjs7TUFBRSxZQUFZOztJQUNsQixJQUFHLFNBQUg7TUFDSSxJQUFDLENBQUEsU0FBRCxDQUFBO0FBQ0EsYUFGSjs7V0FHQSxJQUFDLENBQUEsT0FBRCxDQUFBO0VBSkk7Ozs7R0FwQlE7O0FBMkJwQixNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFJOzs7O0FDN0JyQixNQUFNLENBQUMsT0FBUCxHQUFvQixDQUFBLFNBQUE7QUFDaEIsTUFBQTtFQUFBLElBQUEsR0FBTyxNQUFBLElBQVUsTUFBTSxDQUFDO0VBQ3hCLElBQUcsSUFBQSxJQUFRLElBQUksQ0FBQyxHQUFoQjtXQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBVCxDQUFjLElBQWQsRUFESjtHQUFBLE1BQUE7QUFHSSxXQUFPLFNBQUE7YUFBTyxJQUFBLElBQUEsQ0FBQSxDQUFNLENBQUMsT0FBUCxDQUFBO0lBQVAsRUFIWDs7QUFGZ0IsQ0FBQSxDQUFILENBQUE7Ozs7QUNBakIsSUFBQTs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLGNBQVI7O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBRSxFQUFGLEVBQU0sS0FBTjtBQUNiLE1BQUE7RUFBQSxLQUFBLEdBQVEsR0FBQSxDQUFBO0VBRVIsRUFBQSxHQUFLLFNBQUE7SUFDRCxJQUFHLENBQUUsR0FBQSxDQUFBLENBQUEsR0FBUSxLQUFWLENBQUEsSUFBcUIsS0FBeEI7YUFDSSxFQUFFLENBQUMsSUFBSCxDQUFBLEVBREo7S0FBQSxNQUFBO2FBR0ksSUFBSSxDQUFDLEVBQUwsR0FBVSxxQkFBQSxDQUFzQixFQUF0QixFQUhkOztFQURDO0VBTUwsSUFBQSxHQUFPO0VBQ1AsSUFBSSxDQUFDLEVBQUwsR0FBVSxxQkFBQSxDQUFzQixFQUF0QjtTQUNWO0FBWGE7O0FBYWpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBZixHQUF1QixTQUFFLElBQUY7U0FDbkIsb0JBQUEsQ0FBcUIsSUFBSSxDQUFDLEVBQTFCO0FBRG1COzs7O0FDZnZCLElBQUEsY0FBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztBQUVIOzs7RUFFVyxnQkFBQTs7SUFDVCx5Q0FBQSxTQUFBO0lBRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDNUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsVUFBZCxFQUEwQixJQUFDLENBQUEsV0FBM0I7RUFKUzs7bUJBTWIsSUFBQSxHQUFNLFNBQUE7QUFDRixRQUFBO0FBQUEsU0FBQSxlQUFBO01BQ0ksSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLEVBQWlCLE1BQVEsQ0FBQSxLQUFBLENBQXpCO0FBREo7RUFERTs7bUJBS04sUUFBQSxHQUFVLFNBQUUsRUFBRixFQUFNLEdBQU47V0FDTixJQUFDLENBQUEsT0FBTyxDQUFDLEdBQVQsQ0FBYSxFQUFiLEVBQWlCLEdBQWpCO0VBRE07O21CQUdWLFdBQUEsR0FBYSxTQUFBO1dBQ1QsSUFBQyxDQUFBLElBQUQsQ0FBTSxVQUFOO0VBRFM7O21CQUdiLElBQUEsR0FBTSxTQUFBO1dBQ0YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUE7RUFERTs7OztHQW5CVzs7QUFzQnJCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLElBQUk7Ozs7QUN4QnJCLElBQUE7O0FBQU07RUFFVyxlQUFFLElBQUY7SUFBRSxJQUFDLENBQUEsT0FBRDtJQUNYLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFBRSxDQUFBLEVBQUcsQ0FBTDtNQUFRLENBQUEsRUFBRyxDQUFYOztJQUNYLElBQUMsQ0FBQSxFQUFELEdBQU07RUFGRzs7a0JBSWIsSUFBQSxHQUFNLFNBQUUsS0FBRjtJQUNGLEtBQUEsSUFBUyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsRUFBaEIsR0FBcUI7SUFFOUIsSUFBQyxDQUFBLEVBQUQsSUFBTztJQUVQLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxJQUFjLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLEVBQWxCO1dBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxJQUFjLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLEVBQWxCO0VBTnBCOzs7Ozs7QUFRVixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ2RqQixJQUFBOztBQUFNO0VBR1csZ0JBQUUsSUFBRjtJQUFFLElBQUMsQ0FBQSxPQUFEO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUFFLENBQUEsRUFBRyxDQUFMO01BQVEsQ0FBQSxFQUFHLENBQVg7O0VBREY7O21CQUdiLElBQUEsR0FBTSxTQUFFLEtBQUY7SUFDRixLQUFBLElBQVMsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLEVBQWhCLEdBQXFCO0lBQzlCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxJQUFjLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxJQUFWO1dBQ3RCLElBQUMsQ0FBQSxPQUFPLENBQUMsQ0FBVCxJQUFjLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxJQUFWO0VBSHBCOzs7Ozs7QUFLVixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ1hqQixJQUFBOztBQUFNO0VBRVcsY0FBQTtJQUNULElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsSUFBRCxHQUFRO0VBRkM7Ozs7OztBQUlqQixNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQ05qQixJQUFBLFVBQUE7RUFBQTs7O0FBQU07OztFQUVXLG9CQUFFLEtBQUY7O01BQUUsUUFBUTs7SUFDbkIsNkNBQUEsU0FBQTtJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsSUFBQyxDQUFBLEVBQUQsR0FBTSxJQUFJLElBQUksQ0FBQztJQUNmLElBQUMsQ0FBQSxFQUFFLENBQUMsU0FBSixHQUFnQjtJQUNoQixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQUosR0FBZ0I7SUFDaEIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFKLEdBQWdCO0lBQ2hCLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLEVBQVg7RUFWUzs7dUJBWWIsR0FBQSxHQUFLLFNBQUUsSUFBRjtJQUNELElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWI7V0FDQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYTtNQUFFLENBQUEsRUFBRyxDQUFMO01BQVEsQ0FBQSxFQUFHLENBQVg7S0FBYjtFQUZDOzt1QkFJTCxNQUFBLEdBQVEsU0FBQTtBQUNKLFFBQUE7QUFBQTtBQUFBLFNBQUEsNkNBQUE7O01BQ0ksSUFBQSxHQUFPLElBQUMsQ0FBQSxNQUFRLENBQUEsQ0FBQTtNQUNoQixPQUFBLEdBQVUsSUFBSSxDQUFDO01BRWYsSUFBQyxDQUFBLEVBQUUsQ0FBQyxNQUFKLENBQVcsSUFBSSxDQUFDLENBQWhCLEVBQW1CLElBQUksQ0FBQyxDQUF4QjtNQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsTUFBSixDQUFXLE9BQU8sQ0FBQyxDQUFuQixFQUFzQixPQUFPLENBQUMsQ0FBOUI7TUFFQSxJQUFJLENBQUMsQ0FBTCxHQUFTLE9BQU8sQ0FBQztNQUNqQixJQUFJLENBQUMsQ0FBTCxHQUFTLE9BQU8sQ0FBQztBQVJyQjtFQURJOzs7O0dBbEJhLElBQUksQ0FBQzs7QUE4QjlCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDOUJqQixJQUFBOztBQUFNOzs7cUJBRUYsS0FBQSxHQUFPLFNBQUUsS0FBRjtXQUNILEtBQUEsR0FBUTtFQURMOzs7Ozs7QUFJTDtFQUVXLGVBQUUsSUFBRjtJQUFFLElBQUMsQ0FBQSxPQUFEO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUFFLENBQUEsRUFBRyxDQUFMO01BQVEsQ0FBQSxFQUFHLENBQVg7O0lBRVgsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFJO0lBRWhCLElBQUMsQ0FBQSxFQUFELEdBQU07SUFDTixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxFQUFMLEdBQVUsQ0FBRSxFQUFBLEdBQUssSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFQLENBQVYsR0FBbUM7SUFDNUMsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxFQUFMLEdBQVU7SUFFNUIsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBQSxHQUFLLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQjtFQVZ2Qjs7a0JBWWIsSUFBQSxHQUFNLFNBQUUsS0FBRjtJQUNGLEtBQUEsSUFBUyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsRUFBaEIsR0FBcUI7SUFDOUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFULElBQWMsS0FBQSxHQUFRLElBQUksQ0FBQyxHQUFMLENBQVUsSUFBQyxDQUFBLElBQVgsQ0FBUixHQUE0QixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxHQUFMLENBQVUsSUFBQyxDQUFBLE1BQVg7SUFDbEQsSUFBQyxDQUFBLE9BQU8sQ0FBQyxDQUFULElBQWMsS0FBQSxHQUFRLElBQUksQ0FBQyxHQUFMLENBQVUsSUFBQyxDQUFBLElBQVgsQ0FBUixHQUE0QixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksQ0FBQyxHQUFMLENBQVUsSUFBQyxDQUFBLE1BQVg7SUFFbEQsSUFBQyxDQUFBLEVBQUQsSUFBTyxJQUFDLENBQUE7V0FDUixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLENBQUEsRUFBVjtFQU5qQjs7Ozs7O0FBUVYsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUM1QmpCLElBQUE7O0FBQU07RUFFVyxpQkFBRSxJQUFGO0lBQUUsSUFBQyxDQUFBLE9BQUQ7SUFDWCxJQUFDLENBQUEsT0FBRCxHQUFXO01BQUUsQ0FBQSxFQUFHLENBQUw7TUFBUSxDQUFBLEVBQUcsQ0FBWDs7SUFDWCxJQUFDLENBQUEsRUFBRCxHQUFNO0lBQ04sSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFFLElBQUksQ0FBQyxFQUFMLEdBQVUsQ0FBWixDQUFBLEdBQWtCO0VBSGxCOztvQkFLYixJQUFBLEdBQU0sU0FBRSxLQUFGO0lBQ0YsS0FBQSxJQUFTLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixFQUFoQixHQUFxQjtJQUM5QixJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsSUFBYyxLQUFBLEdBQVEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxFQUFsQjtJQUN0QixJQUFDLENBQUEsT0FBTyxDQUFDLENBQVQsSUFBYyxLQUFBLEdBQVEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxFQUFsQjtJQUV0QixJQUFDLENBQUEsRUFBRCxJQUFPLElBQUMsQ0FBQTtXQUNSLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLEVBQWI7RUFORTs7Ozs7O0FBU1YsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNoQmpCLElBQUEsZUFBQTtFQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFDUixFQUFBLEdBQUssT0FBQSxDQUFRLGNBQVI7O0FBRUM7RUFFVyxjQUFBOztJQUNULElBQUMsQ0FBQSxRQUFELEdBQVk7RUFESDs7aUJBR2IsSUFBQSxHQUFNLFNBQUE7QUFDRixRQUFBO0lBQUEsSUFBQSxHQUNJO01BQUEsU0FBQSxFQUFXLElBQVg7TUFDQSxVQUFBLEVBQVksQ0FEWjtNQUVBLFdBQUEsRUFBYSxJQUZiOztJQUdKLElBQUMsQ0FBQSxRQUFELEdBQWdCLElBQUEsSUFBSSxDQUFDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLElBQTlCO0lBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixJQUFDLENBQUEsUUFBUSxDQUFDLElBQXBDO1dBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLElBQUksQ0FBQztFQVJoQjs7aUJBVU4sTUFBQSxHQUFRLFNBQUUsQ0FBRixFQUFNLENBQU47SUFBRSxJQUFDLENBQUEsSUFBRDtJQUFJLElBQUMsQ0FBQSxJQUFEO0lBQ1YsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQWlCLElBQUMsQ0FBQSxDQUFsQixFQUFxQixJQUFDLENBQUEsQ0FBdEI7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBckIsR0FBNkIsSUFBQyxDQUFBLENBQUQsR0FBSztXQUNsQyxJQUFDLENBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBckIsR0FBOEIsSUFBQyxDQUFBLENBQUQsR0FBSztFQUgvQjs7aUJBS1IsS0FBQSxHQUFPLFNBQUE7V0FDSCxFQUFFLENBQUMsR0FBSCxDQUFPLElBQUMsQ0FBQSxPQUFSO0VBREc7O2lCQUdQLE9BQUEsR0FBUyxTQUFBO1dBQ0wsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQWlCLElBQUMsQ0FBQSxLQUFsQjtFQURLOzs7Ozs7QUFHYixNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFJOzs7O0FDN0JyQixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQWYsR0FBMEIsU0FBQTtBQUN0QixTQUFPO0FBRGU7O0FBSTFCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBZixHQUF3QixDQUVwQix1QkFGb0IsRUFJcEIsaUNBSm9CLEVBS3BCLCtCQUxvQixFQU1wQix3QkFOb0IsRUFRcEIsZ0NBUm9CLEVBVXBCLDZCQVZvQixFQVdwQixzQkFYb0IsRUFhcEIsa0JBYm9CLEVBY3BCLHNGQWRvQixFQWVwQixtQ0Fmb0IsRUFnQnBCLG9EQWhCb0IsRUFpQnBCLEdBakJvQixDQW1CdkIsQ0FBQyxJQW5Cc0IsQ0FtQmpCLEVBbkJpQjs7QUFxQnhCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBZixHQUEwQixDQUV0Qix1QkFGc0IsRUFJdEIsNkJBSnNCLEVBS3RCLHNCQUxzQixFQU90Qiw2QkFQc0IsRUFTdEIsa0JBVHNCLEVBVXRCLGdFQVZzQixFQVd0QixHQVhzQixDQWF6QixDQUFDLElBYndCLENBYW5CLEVBYm1CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInN0YWdlID0gcmVxdWlyZSBcImZ6L2NvcmUvc3RhZ2VcIlxuc3RhZ2UuaW5pdCgpXG5cbmxwID0gcmVxdWlyZSBcImZ6L2NvcmUvbG9vcFwiXG5scC5zdGFydCgpXG5cbiMgcG9vbCA9IHJlcXVpcmUgXCJmbG93ZXJzL3Bvb2xcIlxuIyBwb29sLmZpbGwoKVxuXG5waXhpID0gcmVxdWlyZSBcInBpeGlcIlxucGl4aS5pbml0KClcblxubG9hZGVyID0gcmVxdWlyZSBcImxvYWRlclwiXG5sb2FkZXIuaW5pdCgpXG5cbnJlc2l6ZSA9IC0+XG4gICAgcGl4aS5yZXNpemUgc3RhZ2Uudywgc3RhZ2UuaFxuc3RhZ2Uub24gXCJyZXNpemVcIiwgcmVzaXplXG5yZXNpemUoKVxuXG4jXG5cbmxvYWRlci5vbiBcImNvbXBsZXRlXCIsIC0+XG4gICAgcGl4aS5zdGFydCgpXG4gICAgXG4gICAgZ3JpZCA9IG5ldyAoIHJlcXVpcmUgXCJHcmlkXCIgKSgpXG4gICAgcGl4aS5zdGFnZS5hZGRDaGlsZCBncmlkXG5cbiAgICBmaWVsZCA9IG5ldyAoIHJlcXVpcmUgXCJmbG93ZXJzL0ZpZWxkXCIgKSgpXG4gICAgcGl4aS5zdGFnZS5hZGRDaGlsZCBmaWVsZFxuXG5sb2FkZXIubG9hZCgpXG4iLCJzdGFnZSA9IHJlcXVpcmUgXCJmei9jb3JlL3N0YWdlXCJcblxuX0NfTEFSR0UgPSAweGZmMDAwMFxuX0NfTUVESVVNID0gMHhmZmYwMDBcbl9DX1NNQUxMID0gMHgwMDAwZmZcblxuX1NfTEFSR0UgPSAyMFxuX1NfTUVESVVNID0gX1NfTEFSR0UgLyAyID4+IDBcbl9TX1NNQUxMID0gX1NfTEFSR0UgLyA0ID4+IDBcblxuY2xhc3MgR3JpZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBAX2xhcmdlID0gbmV3IFBJWEkuR3JhcGhpY3NcbiAgICAgICAgQGFkZENoaWxkIEBfbGFyZ2VcbiAgICAgICAgQF9tZWRpdW0gPSBuZXcgUElYSS5HcmFwaGljc1xuICAgICAgICBAYWRkQ2hpbGQgQF9tZWRpdW1cbiAgICAgICAgQF9zbWFsbCA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBhZGRDaGlsZCBAX3NtYWxsXG5cbiAgICAgICAgQF9idWlsZCgpXG5cbiAgICBfYnVpbGQ6IC0+XG4gICAgICAgIEBfYnVpbGRHcmlkIEBfbGFyZ2UsIF9DX0xBUkdFLCBfU19MQVJHRSwgLjVcbiAgICAgICAgQF9idWlsZEdyaWQgQF9tZWRpdW0sIF9DX01FRElVTSwgX1NfTUVESVVNLCAuMzVcbiAgICAgICAgQF9idWlsZEdyaWQgQF9zbWFsbCwgX0NfU01BTEwsIF9TX1NNQUxMLCAuMTVcblxuICAgIF9idWlsZEdyaWQ6ICggZywgYywgcywgYSApIC0+XG4gICAgICAgIGcuY2xlYXIoKVxuICAgICAgICBnLmxpbmVTdHlsZSAxLCBjLCBhXG5cbiAgICAgICAgbiA9IHN0YWdlLncgLyBzID4+IDBcbiAgICAgICAgZm9yIGkgaW4gWzAuLi5uXVxuICAgICAgICAgICAgdiA9IGkgKiBzID4+IDBcbiAgICAgICAgICAgIGcubW92ZVRvIHYsIDBcbiAgICAgICAgICAgIGcubGluZVRvIHYsIHN0YWdlLmhcblxuICAgICAgICBuID0gc3RhZ2UuaCAvIHMgPj4gMFxuICAgICAgICBmb3IgaSBpbiBbMC4uLm5dXG4gICAgICAgICAgICB2ID0gaSAqIHMgPj4gMFxuICAgICAgICAgICAgZy5tb3ZlVG8gMCwgdlxuICAgICAgICAgICAgZy5saW5lVG8gc3RhZ2UudywgdlxuXG4gICAgICAgIGcuZW5kRmlsbCgpXG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFxuIiwicGF0aCA9IFwiaW1ncy9cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoZWFydDogcGF0aCArIFwiaGVhcnQucG5nXCJcbiAgICBwZXRhbGVfMDogcGF0aCArIFwicGV0YWxlXzAucG5nXCJcbiAgICBwZXRhbGVfMTogcGF0aCArIFwicGV0YWxlXzEucG5nXCJcbn1cbiIsInN0YWdlID0gcmVxdWlyZSBcImZ6L2NvcmUvc3RhZ2VcIlxuRmxvd2VycyA9IHJlcXVpcmUgXCJmbG93ZXJzL0Zsb3dlcnNcIlxuXG5jbGFzcyBGaWVsZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyXG5cbiAgICBjb25zdHJ1Y3RvcjogKCBAX2dyaWQgKSAtPlxuICAgICAgICBzdXBlclxuXG4gICAgICAgIEBfYXJlYSA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBfYXJlYS5iZWdpbkZpbGwgMHhmZjAwZmYsIDBcbiAgICAgICAgQF9hcmVhLmRyYXdSZWN0IDAsIDAsIHN0YWdlLncsIHN0YWdlLmhcbiAgICAgICAgQGFkZENoaWxkIEBfYXJlYVxuXG4gICAgICAgIEBfYXJlYS5pbnRlcmFjdGl2ZSA9IEBfYXJlYS5idXR0b25Nb2RlID0gdHJ1ZVxuICAgICAgICBAX2FyZWEub24gXCJ0YXBcIiwgQF9vbkRvd25cbiAgICAgICAgQF9hcmVhLm9uIFwiY2xpY2tcIiwgQF9vbkRvd25cblxuICAgIF9vbkRvd246ICggZSApID0+XG4gICAgICAgIHggPSBlLmRhdGEuZ2xvYmFsLnhcbiAgICAgICAgeSA9IGUuZGF0YS5nbG9iYWwueVxuXG4gICAgICAgIGZsb3dlcnMgPSBuZXcgRmxvd2Vyc1xuICAgICAgICBmbG93ZXJzLnggPSB4XG4gICAgICAgIGZsb3dlcnMueSA9IHlcbiAgICAgICAgQGFkZENoaWxkIGZsb3dlcnNcblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZFxuIiwibHAgPSByZXF1aXJlIFwiZnovY29yZS9sb29wXCJcbmFzc2V0cyA9IHJlcXVpcmUgXCJhc3NldHNcIlxuXG5kYXRhU2hhZGVyID0gcmVxdWlyZSBcInNoYWRlcnMvRmxvd2VyU2hhZGVyXCJcbnV0aWxzID0gcmVxdWlyZSBcImZsb3dlcnMvdXRpbHNcIlxuXG5jbGFzcyBGbG93ZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQF9sZWFmcyA9IFtdXG4gICAgICAgIEBfY3JlYXRlTGVhZnMoKVxuXG4gICAgICAgIEBfaGVhcnQgPSBuZXcgUElYSS5TcHJpdGUuZnJvbUltYWdlIGFzc2V0cy5oZWFydFxuICAgICAgICBAX2hlYXJ0LndpZHRoID0gMTVcbiAgICAgICAgQF9oZWFydC5oZWlnaHQgPSAxNVxuICAgICAgICBAX2hlYXJ0LnggPSAtQF9oZWFydC53aWR0aCA+PiAxXG4gICAgICAgIEBfaGVhcnQueSA9IC1AX2hlYXJ0LmhlaWdodCA+PiAxXG4gICAgICAgIEBhZGRDaGlsZCBAX2hlYXJ0XG5cbiAgICAgICAgdW5pZm9ybXMgPSBkYXRhU2hhZGVyLnVuaWZvcm1zKClcblxuICAgICAgICAjIEByb3RhdGlvbiA9IE1hdGgucmFuZG9tKCkgKiAoIE1hdGguUEkgKiAyIClcblxuICAgICAgICBzID0gLjUgKyBNYXRoLnJhbmRvbSgpICogLjVcbiAgICAgICAgQC5zY2FsZS54ID0gMFxuICAgICAgICBALnNjYWxlLnkgPSAwXG4gICAgICAgIFR3ZWVuTGl0ZS50byBALnNjYWxlLCAuNCxcbiAgICAgICAgICAgIHg6IHNcbiAgICAgICAgICAgIHk6IHNcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJbk91dFxuXG4gICAgX2NyZWF0ZUxlYWZzOiAtPlxuICAgICAgICB0eXBlcyA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCJdXG5cbiAgICAgICAgbiA9IHR5cGVzLmxlbmd0aFxuICAgICAgICBhID0gMFxuICAgICAgICBhQWRkID0gKCBNYXRoLlBJICogMiApIC8gblxuICAgICAgICBmb3IgaSBpbiBbMC4uLm5dXG4gICAgICAgICAgICBsZWFmID0gbmV3IFBJWEkuU3ByaXRlLmZyb21JbWFnZSBhc3NldHMucGV0YWxlXzFcbiAgICAgICAgICAgIGxlYWYud2lkdGggPVxuICAgICAgICAgICAgbGVhZi5oZWlnaHQgPSAyMFxuICAgICAgICAgICAgbGVhZi54ID0gKCAtbGVhZi53aWR0aCA+PiAxICkgKyAxMCAqIE1hdGguY29zIGFcbiAgICAgICAgICAgIGxlYWYueSA9ICggLWxlYWYuaGVpZ2h0ID4+IDEgKSArIDEwICogTWF0aC5zaW4gYVxuICAgICAgICAgICAgdXRpbHMuaW5pdE1vZGlmcyBsZWFmXG4gICAgICAgICAgICB1dGlscy5lenR3ZWVuLmluIGxlYWYsIHR5cGVzWyBpIF0sIC4zXG4gICAgICAgICAgICBAYWRkQ2hpbGQgbGVhZlxuXG4gICAgICAgICAgICBhICs9IGFBZGRcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb3dlclxuIiwic3RhZ2UgPSByZXF1aXJlIFwiZnovY29yZS9zdGFnZVwiXG5scCA9IHJlcXVpcmUgXCJmei9jb3JlL2xvb3BcIlxuXG5wb29sID0gcmVxdWlyZSBcImZsb3dlcnMvcG9vbFwiXG5GbG93ZXIgPSByZXF1aXJlIFwiZmxvd2Vycy9GbG93ZXJcIlxuXG5QYXRoRHJhd2VyID0gcmVxdWlyZSBcInBhdGhzL1BhdGhEcmF3ZXJcIlxuTGluZWFyID0gcmVxdWlyZSBcInBhdGhzL0xpbmVhclwiXG5UdXJuaW5nID0gcmVxdWlyZSBcInBhdGhzL1R1cm5pbmdcIlxuRHJ1bmsgPSByZXF1aXJlIFwicGF0aHMvRHJ1bmtcIlxuU2ludXMgPSByZXF1aXJlIFwicGF0aHMvU2ludXNcIlxuT3B0cyA9IHJlcXVpcmUgXCJwYXRocy9PcHRzXCJcblxudGltZW91dCA9IHJlcXVpcmUgXCJmei91dGlscy90aW1lb3V0XCJcblxuY2xhc3MgRmxvd2VycyBleHRlbmRzIFBJWEkuQ29udGFpbmVyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBAX3BhdGhEcmF3ZXIgPSBuZXcgUGF0aERyYXdlclxuICAgICAgICBAYWRkQ2hpbGQgQF9wYXRoRHJhd2VyXG5cbiAgICAgICAgQF9vcmlnaW4gPSBuZXcgRmxvd2VyXG4gICAgICAgIEBhZGRDaGlsZCBAX29yaWdpblxuXG4gICAgICAgIEBfZmxvd2VycyA9IFsgQF9vcmlnaW4gXVxuXG4gICAgICAgIEBfb3B0cyA9IFtdXG4gICAgICAgIFxuICAgICAgICBAX2lzQWxpdmUgPSB0cnVlXG5cbiAgICAgICAgcmFkID0gMFxuICAgICAgICBuID0gMjVcbiAgICAgICAgQF9wYXRocyA9IFtdXG4gICAgICAgIGZvciBpIGluIFsgMC4uLm4gXVxuICAgICAgICAgICAgcGF0aCA9IG5ldyBTaW51cyByYWRcbiAgICAgICAgICAgIEBfcGF0aHMucHVzaCBwYXRoXG5cbiAgICAgICAgICAgIEBfb3B0cy5wdXNoXG4gICAgICAgICAgICAgICAgc3BlZWQ6IE1hdGgucmFuZG9tKCkgKiA0MCArIDIwID4+IDBcbiAgICAgICAgICAgICAgICBsaWZlOiBNYXRoLnJhbmRvbSgpICogMTUgKyA1ID4+IDBcblxuICAgICAgICAgICAgQF9wYXRoRHJhd2VyLmFkZCBwYXRoXG5cbiAgICAgICAgICAgIHJhZCArPSAoIE1hdGguUEkgKiAyICkgLyBuXG5cbiAgICAgICAgIyBscC5hZGQgQF91cGRhdGVcbiAgICAgICAgdGltZW91dCBAX3VwZGF0ZSwgNTBcblxuICAgIF91cGRhdGU6ID0+XG4gICAgICAgIGlmICFAX2lzQWxpdmVcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGlzQWxpdmUgPSBmYWxzZVxuICAgICAgICBmb3IgcGF0aCwgaSBpbiBAX3BhdGhzXG4gICAgICAgICAgICBvcHQgPSBAX29wdHNbIGkgXVxuXG4gICAgICAgICAgICBjb250aW51ZSBpZiAhb3B0LmxpZmVcblxuICAgICAgICAgICAgaWYgcGF0aC5tb2RpZmllclxuICAgICAgICAgICAgICAgIG9wdC5zcGVlZCA9IHBhdGgubW9kaWZpZXIuc3BlZWQgb3B0LnNwZWVkXG4gICAgICAgICAgICAgICAgb3B0LnNwZWVkID0gMTAgaWYgb3B0LnNwZWVkIDwgMTBcbiAgICAgICAgICAgIHBhdGgubmV4dCBvcHQuc3BlZWRcbiAgICAgICAgICAgIEBfYWRkRmxvd2VyIHBhdGguY3VycmVudFxuXG4gICAgICAgICAgICBvcHQubGlmZSAtPSAxXG4gICAgICAgICAgICBpc0FsaXZlID0gdHJ1ZSBpZiBvcHQubGlmZSA+IDBcbiAgICAgICAgQF9wYXRoRHJhd2VyLnVwZGF0ZSgpXG5cbiAgICAgICAgQF9pc0FsaXZlID0gaXNBbGl2ZVxuXG4gICAgICAgIHRpbWVvdXQgQF91cGRhdGUsIDUwXG5cbiAgICBfYWRkRmxvd2VyOiAoIHBvcyApIC0+XG4gICAgICAgIGZsb3dlciA9IG5ldyBGbG93ZXJcbiAgICAgICAgZmxvd2VyLnggPSBwb3MueFxuICAgICAgICBmbG93ZXIueSA9IHBvcy55XG4gICAgICAgIEBhZGRDaGlsZCBmbG93ZXJcblxuICAgICAgICBAX2Zsb3dlcnMucHVzaCBmbG93ZXJcblxubW9kdWxlLmV4cG9ydHMgPSBGbG93ZXJzXG4iLCJGbG93ZXIgPSByZXF1aXJlIFwiZmxvd2Vycy9GbG93ZXJcIlxuXG5jbGFzcyBQb29sXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQF9hdmFpbGFibGUgPSBbXVxuXG4gICAgZmlsbDogKCBhbW91bnQgPSA1MDAgKSAtPlxuICAgICAgICBmb3IgaSBpbiBbIDAuLi5hbW91bnQgXVxuICAgICAgICAgICAgQF9hdmFpbGFibGUucHVzaCBuZXcgRmxvd2VyXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0OiAtPlxuICAgICAgICBAX2F2YWlsYWJsZS5wb3AoKVxuXG4gICAgcmV0dXJuOiAoIGl0ZW0gKSAtPlxuICAgICAgICBAX2F2YWlsYWJsZS5wdXNoIGl0ZW1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUG9vbFxuIiwibW9kdWxlLmV4cG9ydHMuaW5pdE1vZGlmcyA9ICggc3ByaXRlICkgLT5cbiAgICBzcHJpdGUubW9kaWZzID0gXG4gICAgICAgIHgwOiAwXG4gICAgICAgIHkwOiAwXG4gICAgICAgIHgxOiAwXG4gICAgICAgIHkxOiAwXG4gICAgICAgIHgyOiAwXG4gICAgICAgIHkyOiAwXG4gICAgICAgIHgzOiAwXG4gICAgICAgIHkzOiAwXG4gICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzLmV6dHdlZW4gPVxuICAgIGluOiAoIHNwcml0ZSwgdHlwZSwgZGVsYXkgPSAwICkgLT5cbiAgICAgICAgcyA9IHNwcml0ZS53aWR0aFxuXG4gICAgICAgIGlmIHR5cGUgPT0gXCJhXCJcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueDEgPSAtcyBcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTEgPSAtcyAqIC41XG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLngyID0gLXMgXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkyID0gcyAqIC41XG4gICAgICAgIGVsc2UgaWYgdHlwZSA9PSBcImJcIlxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MiA9IHMgKiAuNSBcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTIgPSAtc1xuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MyA9IC0gcyAqIC41IFxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy55MyA9IC1zIFxuICAgICAgICBlbHNlIGlmIHR5cGUgPT0gXCJjXCJcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueDAgPSBzXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkwID0gLXMgKiAuNVxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MyA9IHNcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTMgPSBzICogLjVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MCA9IC1zICogLjVcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTAgPSBzXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLngxID0gcyAqIC41XG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkxID0gc1xuXG4gICAgICAgIFR3ZWVuTGl0ZS50byBzcHJpdGUubW9kaWZzLCAuNCxcbiAgICAgICAgICAgIGRlbGF5OiBkZWxheVxuICAgICAgICAgICAgeDA6IDBcbiAgICAgICAgICAgIHkwOiAwXG4gICAgICAgICAgICB4MTogMFxuICAgICAgICAgICAgeTE6IDBcbiAgICAgICAgICAgIHgyOiAwXG4gICAgICAgICAgICB5MjogMFxuICAgICAgICAgICAgeDM6IDBcbiAgICAgICAgICAgIHkzOiAwXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5PdXRcblxuICAgICAgICByZXR1cm5cblxuIyB0b2RvOiBwcmVuZHJlIGVuIGNvbXB0ZSBsYSByb3RhdGlvbiBwb3VyIGxlcyBjYWxjdWxzIGRlIHZlcnRpY2VzXG5tb2R1bGUuZXhwb3J0cy50d2VlbiA9XG4gICAgaW46ICggc3ByaXRlLCBkZWxheSA9IDAgKSAtPlxuICAgICAgICBzID0gc3ByaXRlLndpZHRoXG5cbiAgICAgICAgc3ByaXRlLm1vZGlmcy54MCA9IC1zICogLjVcbiAgICAgICAgc3ByaXRlLm1vZGlmcy54MSA9IHMgKiAuNVxuICAgICAgICBzcHJpdGUubW9kaWZzLnkwID0gXG4gICAgICAgIHNwcml0ZS5tb2RpZnMueTEgPSBzXG5cbiAgICAgICAgVHdlZW5MaXRlLnRvIHNwcml0ZS5tb2RpZnMsIC40LFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5XG4gICAgICAgICAgICB4MDogMFxuICAgICAgICAgICAgeTA6IDBcbiAgICAgICAgICAgIHgxOiAwXG4gICAgICAgICAgICB5MTogMFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluT3V0XG5cbiAgICAgICAgcmV0dXJuXG4iLCJpZHggPSAtMVxubGlzdGVuZXJzID0gW11cblxubiA9IDBcblxudXBkYXRlID0gLT5cbiAgaSA9IG5cbiAgd2hpbGUgLS1pID49IDBcbiAgICBsaXN0ZW5lcnNbIGkgXS5hcHBseSB0aGlzLCBudWxsXG4gIGlkeCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMuc3RhcnQgPSAtPlxuICB1cGRhdGUoKVxuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gLT5cbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgaWR4XG5cbm1vZHVsZS5leHBvcnRzLmFkZCA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4ID49IDBcbiAgbGlzdGVuZXJzLnB1c2ggbGlzdGVuZXJcbiAgbisrXG5cbm1vZHVsZS5leHBvcnRzLnJlbW92ZSA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4IDwgMFxuICBsaXN0ZW5lcnMuc3BsaWNlIGlkeCwgMVxuICBuLS1cbiIsInRpbWVvdXQgPSByZXF1aXJlIFwiZnovdXRpbHMvdGltZW91dFwiXG5cbmNsYXNzIFN0YWdlIGV4dGVuZHMgRW1pdHRlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEB3ID0gMFxuICAgICAgICBAaCA9IDBcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIEBfb25SZXNpemUsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwib3JpZW50YXRpb25jaGFuZ2VcIiwgQF9vblJlc2l6ZSwgZmFsc2VcbiAgICAgICAgQF9vblJlc2l6ZSgpXG5cbiAgICBfdXBkYXRlOiA9PlxuICAgICAgICBAdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIEBoID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgQGVtaXQgXCJyZXNpemVcIlxuXG4gICAgX29uUmVzaXplOiA9PlxuICAgICAgICB0aW1lb3V0IEBfdXBkYXRlLCAxMFxuXG4gICAgcmVzaXplOiAoIHdpdGhEZWxheSA9IGZhbHNlICkgLT5cbiAgICAgICAgaWYgd2l0aERlbGF5XG4gICAgICAgICAgICBAX29uUmVzaXplKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX3VwZGF0ZSgpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3RhZ2VcbiIsIm1vZHVsZS5leHBvcnRzID0gZG8gLT5cbiAgICBwZXJmID0gd2luZG93ICYmIHdpbmRvdy5wZXJmb3JtYW5jZVxuICAgIGlmIHBlcmYgJiYgcGVyZi5ub3dcbiAgICAgICAgcGVyZi5ub3cuYmluZCBwZXJmXG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gLT4gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIFxuIiwibm93ID0gcmVxdWlyZSBcImZ6L3V0aWxzL25vd1wiXG5cbm1vZHVsZS5leHBvcnRzID0gKCBmbiwgZGVsYXkgKSAtPlxuICAgIHN0YXJ0ID0gbm93KClcblxuICAgIGxwID0gLT5cbiAgICAgICAgaWYgKCBub3coKSAtIHN0YXJ0ICkgPj0gZGVsYXlcbiAgICAgICAgICAgIGZuLmNhbGwoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkYXRhLmlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGxwXG5cbiAgICBkYXRhID0ge31cbiAgICBkYXRhLmlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGxwXG4gICAgZGF0YVxuXG5tb2R1bGUuZXhwb3J0cy5jbGVhciA9ICggZGF0YSApIC0+XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgZGF0YS5pZFxuIiwiYXNzZXRzID0gcmVxdWlyZSBcImFzc2V0c1wiXG5cbmNsYXNzIExvYWRlciBleHRlbmRzIEVtaXR0ZXJcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuXG4gICAgICAgIEBfbG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXJcbiAgICAgICAgQF9sb2FkZXIub25jZSBcImNvbXBsZXRlXCIsIEBfb25Db21wbGV0ZVxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgZm9yIGFzc2V0IG9mIGFzc2V0c1xuICAgICAgICAgICAgQF9wcmVwYXJlIGFzc2V0LCBhc3NldHNbIGFzc2V0IF1cbiAgICAgICAgcmV0dXJuXG5cbiAgICBfcHJlcGFyZTogKCBpZCwgdXJsICkgLT5cbiAgICAgICAgQF9sb2FkZXIuYWRkIGlkLCB1cmxcblxuICAgIF9vbkNvbXBsZXRlOiA9PlxuICAgICAgICBAZW1pdCBcImNvbXBsZXRlXCJcblxuICAgIGxvYWQ6IC0+XG4gICAgICAgIEBfbG9hZGVyLmxvYWQoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2FkZXJcbiIsImNsYXNzIERydW5rXG5cbiAgICBjb25zdHJ1Y3RvcjogKCBAX2RpciApIC0+XG4gICAgICAgIEBjdXJyZW50ID0geyB4OiAwLCB5OiAwIH1cbiAgICAgICAgQF9hID0gMFxuXG4gICAgbmV4dDogKCBzcGVlZCApIC0+XG4gICAgICAgIHNwZWVkICs9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDVcblxuICAgICAgICBAX2EgKz0gMVxuICAgICAgICAjIEBfYSArPSAuMVxuICAgICAgICBAY3VycmVudC54ICs9IHNwZWVkICogTWF0aC5jb3MgQF9kaXIgKyBAX2FcbiAgICAgICAgQGN1cnJlbnQueSArPSBzcGVlZCAqIE1hdGguc2luIEBfZGlyICsgQF9hXG5cbm1vZHVsZS5leHBvcnRzID0gRHJ1bmtcbiIsImNsYXNzIExpbmVhclxuXG4gICAgIyBAX2RpciBpbiByYWRpYW5zXG4gICAgY29uc3RydWN0b3I6ICggQF9kaXIgKSAtPlxuICAgICAgICBAY3VycmVudCA9IHsgeDogMCwgeTogMCB9XG5cbiAgICBuZXh0OiAoIHNwZWVkICkgLT5cbiAgICAgICAgc3BlZWQgKz0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNVxuICAgICAgICBAY3VycmVudC54ICs9IHNwZWVkICogTWF0aC5jb3MgQF9kaXJcbiAgICAgICAgQGN1cnJlbnQueSArPSBzcGVlZCAqIE1hdGguc2luIEBfZGlyXG5cbm1vZHVsZS5leHBvcnRzID0gTGluZWFyXG4iLCJjbGFzcyBPcHRzXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHNwZWVkID0gNTBcbiAgICAgICAgQGxpZmUgPSAxMFxuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdHNcbiIsImNsYXNzIFBhdGhEcmF3ZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lclxuXG4gICAgY29uc3RydWN0b3I6ICggY29sb3IgPSAweGZmMDBmZiApIC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQF9wYXRocyA9IFtdXG4gICAgICAgIEBfbGFzdHMgPSBbXVxuXG4gICAgICAgIEBfZyA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBfZy5saW5lQ29sb3IgPSAwXG4gICAgICAgIEBfZy5saW5lQWxwaGEgPSAxXG4gICAgICAgIEBfZy5saW5lV2lkdGggPSAxXG4gICAgICAgIEBhZGRDaGlsZCBAX2dcblxuICAgIGFkZDogKCBwYXRoICkgLT5cbiAgICAgICAgQF9wYXRocy5wdXNoIHBhdGhcbiAgICAgICAgQF9sYXN0cy5wdXNoIHsgeDogMCwgeTogMCB9XG5cbiAgICB1cGRhdGU6IC0+XG4gICAgICAgIGZvciBwYXRoLCBpIGluIEBfcGF0aHNcbiAgICAgICAgICAgIGxhc3QgPSBAX2xhc3RzWyBpIF1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBwYXRoLmN1cnJlbnRcblxuICAgICAgICAgICAgQF9nLm1vdmVUbyBsYXN0LngsIGxhc3QueVxuICAgICAgICAgICAgQF9nLmxpbmVUbyBjdXJyZW50LngsIGN1cnJlbnQueVxuXG4gICAgICAgICAgICBsYXN0LnggPSBjdXJyZW50LnhcbiAgICAgICAgICAgIGxhc3QueSA9IGN1cnJlbnQueVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoRHJhd2VyXG4iLCJjbGFzcyBNb2RpZmllclxuXG4gICAgc3BlZWQ6ICggdmFsdWUgKSAtPlxuICAgICAgICB2YWx1ZSAqIC45XG5cblxuY2xhc3MgU2ludXNcblxuICAgIGNvbnN0cnVjdG9yOiAoIEBfZGlyICkgLT5cbiAgICAgICAgQGN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfVxuXG4gICAgICAgIEBtb2RpZmllciA9IG5ldyBNb2RpZmllclxuXG4gICAgICAgIEBfYSA9IDBcbiAgICAgICAgQF9hQWRkID0gTWF0aC5QSSAqICggLjQgKiBNYXRoLnJhbmRvbSgpICkgKyAuMVxuICAgICAgICBAX2FQZXJwID0gQF9kaXIgKyBNYXRoLlBJICogLjVcblxuICAgICAgICBAX3JhZCA9IDBcbiAgICAgICAgQF9yYWRNYXggPSAxNSArIE1hdGgucmFuZG9tKCkgKiAyNVxuXG4gICAgbmV4dDogKCBzcGVlZCApIC0+XG4gICAgICAgIHNwZWVkICs9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDVcbiAgICAgICAgQGN1cnJlbnQueCArPSBzcGVlZCAqIE1hdGguY29zKCBAX2RpciApICsgQF9yYWQgKiBNYXRoLmNvcyggQF9hUGVycCApXG4gICAgICAgIEBjdXJyZW50LnkgKz0gc3BlZWQgKiBNYXRoLnNpbiggQF9kaXIgKSArIEBfcmFkICogTWF0aC5zaW4oIEBfYVBlcnAgKVxuXG4gICAgICAgIEBfYSArPSBAX2FBZGRcbiAgICAgICAgQF9yYWQgPSBAX3JhZE1heCAqIE1hdGguY29zIEBfYVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbnVzXG4iLCJjbGFzcyBUdXJuaW5nXG5cbiAgICBjb25zdHJ1Y3RvcjogKCBAX2RpciApIC0+XG4gICAgICAgIEBjdXJyZW50ID0geyB4OiAwLCB5OiAwIH1cbiAgICAgICAgQF9hID0gMFxuICAgICAgICBAX2FBZGQgPSAoIE1hdGguUEkgKiAyICkgKiAuMVxuXG4gICAgbmV4dDogKCBzcGVlZCApIC0+XG4gICAgICAgIHNwZWVkICs9IE1hdGgucmFuZG9tKCkgKiAxMCAtIDVcbiAgICAgICAgQGN1cnJlbnQueCArPSBzcGVlZCAqIE1hdGguY29zIEBfZGlyICsgQF9hXG4gICAgICAgIEBjdXJyZW50LnkgKz0gc3BlZWQgKiBNYXRoLnNpbiBAX2RpciArIEBfYVxuXG4gICAgICAgIEBfYSArPSBAX2FBZGRcbiAgICAgICAgY29uc29sZS5sb2cgQF9hXG5cblxubW9kdWxlLmV4cG9ydHMgPSBUdXJuaW5nXG4iLCJzdGFnZSA9IHJlcXVpcmUgXCJmei9jb3JlL3N0YWdlXCJcbmxwID0gcmVxdWlyZSBcImZ6L2NvcmUvbG9vcFwiXG5cbmNsYXNzIFBpeGlcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBudWxsXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBvcHRzID0gXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICAgICAgICAgIHJlc29sdXRpb246IDJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlXG4gICAgICAgIEByZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlciAwLCAwLCBvcHRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHJlbmRlcmVyLnZpZXdcblxuICAgICAgICBAc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXJcblxuICAgIHJlc2l6ZTogKCBAdywgQGggKSAtPlxuICAgICAgICBAcmVuZGVyZXIucmVzaXplIEB3LCBAaFxuICAgICAgICBAcmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IEB3ICsgXCJweFwiXG4gICAgICAgIEByZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IEBoICsgXCJweFwiXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgbHAuYWRkIEBfdXBkYXRlXG5cbiAgICBfdXBkYXRlOiA9PlxuICAgICAgICBAcmVuZGVyZXIucmVuZGVyIEBzdGFnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQaXhpXG4iLCJtb2R1bGUuZXhwb3J0cy51bmlmb3JtcyA9IC0+XG4gICAgcmV0dXJuIHtcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzLnZlcnRleCA9IFtcblxuICAgIFwicHJlY2lzaW9uIGxvd3AgZmxvYXQ7XCJcbiAgICBcbiAgICBcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIlxuICAgIFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIlxuICAgIFwiYXR0cmlidXRlIHZlYzQgYUNvbG9yO1wiXG5cbiAgICBcInVuaWZvcm0gbWF0MyBwcm9qZWN0aW9uTWF0cml4O1wiXG5cbiAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiXG4gICAgXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiXG5cbiAgICBcInZvaWQgbWFpbih2b2lkKXtcIlxuICAgIFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KChwcm9qZWN0aW9uTWF0cml4ICogdmVjMyhhVmVydGV4UG9zaXRpb24sIDEuMCkpLnh5LCAwLjAsIDEuMCk7XCJcbiAgICBcIiAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiXG4gICAgXCIgICB2Q29sb3IgPSB2ZWM0KGFDb2xvci5yZ2IgKiBhQ29sb3IuYSwgYUNvbG9yLmEpO1wiXG4gICAgJ30nXG5cbl0uam9pbiBcIlwiXG5cbm1vZHVsZS5leHBvcnRzLmZyYWdtZW50ID0gW1xuXG4gICAgXCJwcmVjaXNpb24gbG93cCBmbG9hdDtcIlxuXG4gICAgXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIlxuICAgIFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIlxuXG4gICAgXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIlxuXG4gICAgXCJ2b2lkIG1haW4odm9pZCl7XCJcbiAgICBcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCkgKiB2Q29sb3I7XCJcbiAgICBcIn1cIlxuXG5dLmpvaW4gXCJcIlxuIl19
