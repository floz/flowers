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
  var flowers;
  pixi.start();
  flowers = new (require("Flowers"))();
  return pixi.stage.addChild(flowers);
});

loader.load();


},{"Flowers":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/Flowers.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee","loader":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/loader.coffee","pixi":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/pixi.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/Flowers.coffee":[function(require,module,exports){
var Field, Flowers, stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

Field = require("flowers/Field");

Flowers = (function(superClass) {
  extend(Flowers, superClass);

  function Flowers() {
    this._onDown = bind(this._onDown, this);
    Flowers.__super__.constructor.apply(this, arguments);
    this._area = new PIXI.Graphics;
    this._area.beginFill(0xff00ff, 0);
    this._area.drawRect(0, 0, stage.w, stage.h);
    this.addChild(this._area);
    this._area.interactive = this._area.buttonMode = true;
    this._area.on("tap", this._onDown);
    this._area.on("click", this._onDown);
  }

  Flowers.prototype._onDown = function(e) {
    var x, y;
    x = e.data.global.x;
    y = e.data.global.y;
    return console.log(x, y);
  };

  return Flowers;

})(PIXI.Container);

module.exports = Flowers;


},{"flowers/Field":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee":[function(require,module,exports){
var path;

path = "imgs/";

module.exports = {
  petale_0: path + "petale_0.png",
  petale_1: path + "petale_1.png"
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee":[function(require,module,exports){
var Field,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Field = (function(superClass) {
  extend(Field, superClass);

  function Field() {}

  return Field;

})(PIXI.Container);

module.exports = Field;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee":[function(require,module,exports){
var idx, listeners, n, update;

idx = -1;

listeners = [];

n = 0;

update = function() {
  var i, j, ref;
  for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
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


},{"assets":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/pixi.coffee":[function(require,module,exports){
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


},{"fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}]},{},["./src/scripts/main.coffee"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL21haW4uY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9GbG93ZXJzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvYXNzZXRzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy9GaWVsZC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvbG9vcC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvc3RhZ2UuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy9ub3cuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy90aW1lb3V0LmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvbG9hZGVyLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zs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SSxDQUFDLGtCQUFMLENBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLElBQTlCO0lBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixJQUFDLENBQUEsUUFBUSxDQUFDLElBQXBDO1dBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLElBQUksQ0FBQztFQVJoQjs7aUJBVU4sTUFBQSxHQUFRLFNBQUUsQ0FBRixFQUFNLENBQU47SUFBRSxJQUFDLENBQUEsSUFBRDtJQUFJLElBQUMsQ0FBQSxJQUFEO0lBQ1YsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQWlCLElBQUMsQ0FBQSxDQUFsQixFQUFxQixJQUFDLENBQUEsQ0FBdEI7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBckIsR0FBNkIsSUFBQyxDQUFBLENBQUQsR0FBSztXQUNsQyxJQUFDLENBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBckIsR0FBOEIsSUFBQyxDQUFBLENBQUQsR0FBSztFQUgvQjs7aUJBS1IsS0FBQSxHQUFPLFNBQUE7V0FDSCxFQUFFLENBQUMsR0FBSCxDQUFPLElBQUMsQ0FBQSxPQUFSO0VBREc7O2lCQUdQLE9BQUEsR0FBUyxTQUFBO1dBQ0wsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQWlCLElBQUMsQ0FBQSxLQUFsQjtFQURLOzs7Ozs7QUFHYixNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInN0YWdlID0gcmVxdWlyZSBcImZ6L2NvcmUvc3RhZ2VcIlxuc3RhZ2UuaW5pdCgpXG5cbmxwID0gcmVxdWlyZSBcImZ6L2NvcmUvbG9vcFwiXG5scC5zdGFydCgpXG5cbnBpeGkgPSByZXF1aXJlIFwicGl4aVwiXG5waXhpLmluaXQoKVxuXG5sb2FkZXIgPSByZXF1aXJlIFwibG9hZGVyXCJcbmxvYWRlci5pbml0KClcblxucmVzaXplID0gLT5cbiAgICBwaXhpLnJlc2l6ZSBzdGFnZS53LCBzdGFnZS5oXG5zdGFnZS5vbiBcInJlc2l6ZVwiLCByZXNpemVcbnJlc2l6ZSgpXG5cbiNcblxubG9hZGVyLm9uIFwiY29tcGxldGVcIiwgLT5cbiAgICBwaXhpLnN0YXJ0KClcbiAgICBcbiAgICBmbG93ZXJzID0gbmV3ICggcmVxdWlyZSBcIkZsb3dlcnNcIiApKClcbiAgICBwaXhpLnN0YWdlLmFkZENoaWxkIGZsb3dlcnNcbmxvYWRlci5sb2FkKClcbiIsInN0YWdlID0gcmVxdWlyZSBcImZ6L2NvcmUvc3RhZ2VcIlxuRmllbGQgPSByZXF1aXJlIFwiZmxvd2Vycy9GaWVsZFwiXG5cbmNsYXNzIEZsb3dlcnMgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQF9hcmVhID0gbmV3IFBJWEkuR3JhcGhpY3NcbiAgICAgICAgQF9hcmVhLmJlZ2luRmlsbCAweGZmMDBmZiwgMFxuICAgICAgICBAX2FyZWEuZHJhd1JlY3QgMCwgMCwgc3RhZ2Uudywgc3RhZ2UuaFxuICAgICAgICBAYWRkQ2hpbGQgQF9hcmVhXG5cbiAgICAgICAgQF9hcmVhLmludGVyYWN0aXZlID0gQF9hcmVhLmJ1dHRvbk1vZGUgPSB0cnVlXG4gICAgICAgIEBfYXJlYS5vbiBcInRhcFwiLCBAX29uRG93blxuICAgICAgICBAX2FyZWEub24gXCJjbGlja1wiLCBAX29uRG93blxuXG4gICAgX29uRG93bjogKCBlICkgPT5cbiAgICAgICAgeCA9IGUuZGF0YS5nbG9iYWwueFxuICAgICAgICB5ID0gZS5kYXRhLmdsb2JhbC55XG5cbiAgICAgICAgY29uc29sZS5sb2cgeCwgeVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb3dlcnNcbiIsInBhdGggPSBcImltZ3MvXCJcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGV0YWxlXzA6IHBhdGggKyBcInBldGFsZV8wLnBuZ1wiXG4gICAgcGV0YWxlXzE6IHBhdGggKyBcInBldGFsZV8xLnBuZ1wiXG59XG4iLCJjbGFzcyBGaWVsZCBleHRlbmRzIFBJWEkuQ29udGFpbmVyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZFxuIiwiaWR4ID0gLTFcbmxpc3RlbmVycyA9IFtdXG5cbm4gPSAwXG5cbnVwZGF0ZSA9IC0+XG4gIGZvciBpIGluIFswLi4ubl1cbiAgICBsaXN0ZW5lcnNbIGkgXS5hcHBseSB0aGlzLCBudWxsXG4gIGlkeCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMuc3RhcnQgPSAtPlxuICB1cGRhdGUoKVxuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gLT5cbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgaWR4XG5cbm1vZHVsZS5leHBvcnRzLmFkZCA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4ID49IDBcbiAgbGlzdGVuZXJzLnB1c2ggbGlzdGVuZXJcbiAgbisrXG5cbm1vZHVsZS5leHBvcnRzLnJlbW92ZSA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4IDwgMFxuICBsaXN0ZW5lcnMuc3BsaWNlIGlkeCwgMVxuICBuLS1cbiIsInRpbWVvdXQgPSByZXF1aXJlIFwiZnovdXRpbHMvdGltZW91dFwiXG5cbmNsYXNzIFN0YWdlIGV4dGVuZHMgRW1pdHRlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEB3ID0gMFxuICAgICAgICBAaCA9IDBcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIEBfb25SZXNpemUsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwib3JpZW50YXRpb25jaGFuZ2VcIiwgQF9vblJlc2l6ZSwgZmFsc2VcbiAgICAgICAgQF9vblJlc2l6ZSgpXG5cbiAgICBfdXBkYXRlOiA9PlxuICAgICAgICBAdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIEBoID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgQGVtaXQgXCJyZXNpemVcIlxuXG4gICAgX29uUmVzaXplOiA9PlxuICAgICAgICB0aW1lb3V0IEBfdXBkYXRlLCAxMFxuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFN0YWdlXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRvIC0+XG4gICAgcGVyZiA9IHdpbmRvdyAmJiB3aW5kb3cucGVyZm9ybWFuY2VcbiAgICBpZiBwZXJmICYmIHBlcmYubm93XG4gICAgICAgIHBlcmYubm93LmJpbmQgcGVyZlxuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIC0+IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICAgICBcbiIsIm5vdyA9IHJlcXVpcmUgXCJmei91dGlscy9ub3dcIlxuXG5tb2R1bGUuZXhwb3J0cyA9ICggZm4sIGRlbGF5ICkgLT5cbiAgICBzdGFydCA9IG5vdygpXG5cbiAgICBscCA9IC0+XG4gICAgICAgIGlmICggbm93KCkgLSBzdGFydCApID49IGRlbGF5XG4gICAgICAgICAgICBmbi5jYWxsKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGF0YS5pZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSBscFxuXG4gICAgZGF0YSA9IHt9XG4gICAgZGF0YS5pZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSBscFxuICAgIGRhdGFcblxubW9kdWxlLmV4cG9ydHMuY2xlYXIgPSAoIGRhdGEgKSAtPlxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lIGRhdGEuaWRcbiIsImFzc2V0cyA9IHJlcXVpcmUgXCJhc3NldHNcIlxuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBFbWl0dGVyXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBAX2xvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyXG4gICAgICAgIEBfbG9hZGVyLm9uY2UgXCJjb21wbGV0ZVwiLCBAX29uQ29tcGxldGVcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIGZvciBhc3NldCBvZiBhc3NldHNcbiAgICAgICAgICAgIEBfcHJlcGFyZSBhc3NldCwgYXNzZXRzWyBhc3NldCBdXG4gICAgICAgIHJldHVyblxuXG4gICAgX3ByZXBhcmU6ICggaWQsIHVybCApIC0+XG4gICAgICAgIEBfbG9hZGVyLmFkZCBpZCwgdXJsXG5cbiAgICBfb25Db21wbGV0ZTogPT5cbiAgICAgICAgQGVtaXQgXCJjb21wbGV0ZVwiXG5cbiAgICBsb2FkOiAtPlxuICAgICAgICBAX2xvYWRlci5sb2FkKClcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTG9hZGVyXG4iLCJzdGFnZSA9IHJlcXVpcmUgXCJmei9jb3JlL3N0YWdlXCJcbmxwID0gcmVxdWlyZSBcImZ6L2NvcmUvbG9vcFwiXG5cbmNsYXNzIFBpeGlcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBudWxsXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBvcHRzID0gXG4gICAgICAgICAgICBhbnRpYWxpYXM6IHRydWVcbiAgICAgICAgICAgIHJlc29sdXRpb246IDJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlXG4gICAgICAgIEByZW5kZXJlciA9IG5ldyBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlciAwLCAwLCBvcHRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHJlbmRlcmVyLnZpZXdcblxuICAgICAgICBAc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXJcblxuICAgIHJlc2l6ZTogKCBAdywgQGggKSAtPlxuICAgICAgICBAcmVuZGVyZXIucmVzaXplIEB3LCBAaFxuICAgICAgICBAcmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IEB3ICsgXCJweFwiXG4gICAgICAgIEByZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IEBoICsgXCJweFwiXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgbHAuYWRkIEBfdXBkYXRlXG5cbiAgICBfdXBkYXRlOiA9PlxuICAgICAgICBAcmVuZGVyZXIucmVuZGVyIEBzdGFnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQaXhpXG4iXX0=
