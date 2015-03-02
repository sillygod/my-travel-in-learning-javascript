// In book learning javascript design pattern, there are many ways
// to implement a moduel
// ex.
//   module pattern
//   object literal
//   commonJS modules
//
//   in module pattern
//     encapsulates privacy state and organization using closures


var gf = (function($){
    
    var gf = {
        baseRate: 30,
        width: 640,
        height: 480,
        time: 0
    };
    
    gf.animations = [];
    gf.imagesToPreload = [];
    gf.callbacks = [];
    gf.keyboard = [];
    
    // for performance issue
    gf.spriteFragment = $("<div class='gf_sprite' style='position: absolute; overflow: hidden;'></div>");
    gf.groupFragment = $("<div class='gf_group' style='position: absolute; overflow: visible;'></div>");
    gf.tilemapFragment = $("<div class='gf_tilemap' style='position: absolute'></div>");
    
    gf.addImage = function(url){
        if($.inArray(url, gf.imagesToPreload) < 0){
            gf.imagesToPreload.push(url);
        }
    }
    
    $(document).keydown(function(event){
        gf.keyboard[event.keyCode] = true;
    });
    
    $(document).keyup(function(event){
        gf.keyboard[event.keyCode] = false;
    });
    
    return {
        
        keyboard: gf.keyboard,
        
        initialize: function(options){
            $.extend(gf, options);
        },
        
        animation: function(options){
            // create animation object
            // usage: new animation()
            var defaultValues = {
                url: false,
                width: 64,
                numberOfFrames: 1,
                currentFrame: 0,
                rate: 1,
                offset: 0
            }
            
            $.extend(this, defaultValues, options);
            
            if(options.rate){
                this.rate = Math.round(this.rate/gf.baseRate);
            }
            if(this.url){
                gf.addImage(this.url);
            }
        },
        
        setFrame: function(div, animation){
             div.css("backgroundPosition", "-" + (animation.currentFrame * animation.width + animation.offset) + "px 0px");
        },
        
        setAnimation: function(div, animation, loop){
            // if there is already an animation for the div,
            // overwrite it or just set it
            var animate = {
                animation: $.extend({}, animation),
                div: div,
                loop: loop,
                counter: 0
            };
            
            if(animation.url){
                div.css("backgroundImage", "url('"+animation.url+"')");
            }
            
            var divHasAnimation = false;
            
            for(var i=0; i< gf.animations.length; i++){
                if(gf.animations[i].div.is(div)){
                    divHasAnimation = true;
                    gf.animations[i] = animate;
                }
            }
            
            if(!divHasAnimation){
                gf.animations.push(animate);
            }
        },
        /**
        * adds a sprite the div defined by the first argument
        **/
        addSprite: function(parent, divId, options){
            var options = $.extend({
                x: 0,
                y: 0,
                width: 64,
                height: 64,
                flipH: false,
                flipV: false,
                rotate: 0,
                scale: 1
            }, options);
            
            var sprite = gf.spriteFragment.clone().css({
                left:   options.x,
                top:    options.y,
                width:  options.width,
                height: options.height}).attr("id",divId).data("gf",options);
            
            parent.append(sprite);
            return sprite;
        },
        
        addGroup: function(parent, divId, options){
            var options = $.extend({
                x: 0,
                y: 0,
                flipH: false,
                flipV: false,
                rotate: 0,
                scale: 1
            }, options);
            
            var group = gf.groupFragment.clone().css({
                    left:   options.x,
                    top:    options.y}).attr("id",divId).data("gf",options);
            parent.append(group);
            return group;
        },
        
        intersect: function(a1, a2, b1, b2){
            // get the intersect of two line
            // there are three situation -- you can draw a pic
            // to get more clear...
            // 1.
            //    a      b
            //  -----   -----
            // 2.
            //   a
            //  -----  b
            //     -------
            // 3.
            //   b   a
            //     -----
            //  ------
            var i1 = Math.min(Math.max(a1, b1), a2);
            var i2 = Math.max(Math.min(a2, b2), a1);
            return [i1, i2];
        },
        
        tilemapBox: function(tilemapOptions, boxOptions){
            var tmX = tilemapOptions.x;
            var tmXW = tilemapOptions.x + tilemapOptions.width * tilemapOptions.tileWidth;
            var tmY  = tilemapOptions.y;
            var tmYH = tilemapOptions.y + tilemapOptions.height * tilemapOptions.tileHeight;

            var bX  = boxOptions.x;
            var bXW = boxOptions.x + boxOptions.width;
            var bY  = boxOptions.y;
            var bYH = boxOptions.y + boxOptions.height;
            
            var x = this.intersect(tmX,tmXW, bX, bXW);
            var y = this.intersect(tmY, tmYH, bY, bYH);
            
            return {
                x1: Math.floor((x[0] - tilemapOptions.x) / tilemapOptions.tileWidth),
                y1: Math.floor((y[0] - tilemapOptions.y) / tilemapOptions.tileHeight),
                x2: Math.ceil((x[1] - tilemapOptions.x) / tilemapOptions.tileWidth),
                y2: Math.ceil((y[1] - tilemapOptions.y) / tilemapOptions.tileHeight)
            }
        },
        
        addTilemap : function(parent, divId, options){
            var options = $.extend({
                x: 0,
                y: 0,
                tileWidth: 64,
                tileHeight: 64,
                width: 0,
                height: 0,
                map: [],
                animations: []
            }, options);
            
            var tilemap = gf.tilemapFragment.clone().attr("id", divId).data("gf", options);
            for(var i=0; i<options.height; i++){
                for(var j=0; j<options.width; j++){
                    var animationIndex = options.map[i][j];
                    
                    if(animationIndex>0){
                        var tileOptions = {
                            x: options.x + j*options.tileWidth,
                            y: options.y + i*options.tileHeight,
                            width: options.tileWidth,
                            height: options.tileHeight
                        }
                        
                        var tile = gf.spriteFragment.clone().css({
                            left:   tileOptions.x,
                            top:    tileOptions.y,
                            width:  tileOptions.width,
                            height: tileOptions.height
                        }).addClass("gf_line_"+i).addClass("gf_column_"+j).data("gf", tileOptions);
                        
                        this.setAnimation(tile, options.animations[animationIndex-1]);
                        tilemap.append(tile);
                    }
                }
            }
            
            parent.append(tilemap);
            return tilemap;
        },
        
        tilemapCollide: function(tilemap, box){
            var options = tilemap.data('gf');
            var collisionBox = this.tilemapBox(options, box);
            var divs = [];
            
            for(var i=collisionBox.y1; i<collisionBox.y2; i++){
                for(var j=collisionBox.x1; j< collisionBox.x2; j++){
                    var index = options.map[i][j];
                    if(index>0){
                        divs.push(tilemap.find(".gf_line_"+i+".gf_column_"+j));
                        
                    }
                }
            }
            
            return divs;
        },
        
        spriteCollide: function(sprite1, sprite2){
            var option1 = sprite1.data('gf');
            var option2 = sprite2.data('gf');
            
            var x = this.intersect(
                option1.x,
                option1.x+option1.width,
                option2.x,
                option2.x+option2.width);
            
            var y = this.intersect(
                option1.y,
                option1.y + option1.height,
		        option2.y,
		        option2.y + option2.height);
            
            if( x[0] == x[1] || y[0] == y[1]){
                return false;
            }else{
                return true;
            }
        },
        
        x: function(div, position){
            // use $().data function to
            // reduce the traverse time
            if(position){
                div.css('left', position);
                div.data('gf').x = position;
            }else{
                return div.data('gf').x;
            }
        },
        
        y: function(div, position){
            if(position){
                div.css('top', position);
                div.data('gf').y = position;
            }else{
                return div.data('gf').y;
            }
        },
        
        transform: function(div, options){
            var gf = div.data('gf');
            if(options.flipH !== undefined){
	        	gf.flipH = options.flipH;
            }
            if(options.flipV !== undefined){
                gf.flipV = options.flipV;
            }
            if(options.rotate !== undefined){
                gf.rotate = options.rotate;
            }
            if(options.scale !== undefined){
                gf.scale = options.scale;
            }
            
            var factorH = gf.flipH ? -1 : 1;
            var factorV = gf.flipV ? -1 : 1;
            div.css("transform", "rotate("+gf.rotate+"deg) scale("+(gf.scale*factorH)+","+(gf.scale*factorV)+")");
        },
        
        width: function(div, dimension){
            if(dimension){
                div.css('width', dimension);
                div.data('gf').width = dimension;
            } else {
                return div.data('gf').width;
            }
        },
        
        height: function(div, dimension){
            if(dimension){
                div.css('height', dimension);
                div.data('gf').height = dimension;
            } else {
                return div.data('gf').height;
            }
        },
        
        addCallback: function(callback, rate){
            gf.callbacks.push({
                callback: callback,
                rate: Math.round(rate/ gf.baseRate),
                counter: 0
            });
        },
        
        refreshGame: function(){
            //
            var finishedAnimations = [];
            for(var i=0; i<gf.animations.length; i++){
                var animate = gf.animations[i];
                
                animate.counter++;
                
                if(animate.counter == animate.animation.rate){
                    animate.counter = 0;
                    animate.animation.currentFrame++;
                    if(!animate.loop && animate.animation.currentFrame > animate.animation.numberOfFrames){
                        finishedAnimations.push(i);
                    } else{
                        animate.animation.currentFrame %= animate.animation.numberOfFrames;
                        this.setFrame(animate.div, animate.animation);
                    }
                }
            }
            
            for(var i=0; i<finishedAnimations.length; i++){
                // use splice to delete the element
                gf.animations.splice(finishedAnimations[i], 1);
            }
            
            for(var i=0; i<gf.callbacks.length; i++){
                var call = gf.callbacks[i];
                
                call.counter++;
                if(call.counter == call.rate){
                    var currentTime = (new Date()).getTime();
                    call.counter = 0;
                    call.callback(currentTime - gf.time);
                }
            }
            gf.time = (new Date()).getTime();
                
        },
        
        startGame: function(endCallback, progressCallback){
            
            var images = [];
            var total = gf.imagesToPreload.length;
            
            var $this = this;
            
            for(var i=0; i<total; i++){
                var image = new Image();
                images.push(image);
                image.src = gf.imagesToPreload[i];
            }
            
            // use use a fixed rate callback
            // setInterval is better than setTimeout
            var preloadingPoller = setInterval(function(){
                var counter = 0;
                var total = gf.imagesToPreload.length;
                
                for(var i=0; i<total; i++){
                    if(images[i].complete){
                        counter++;
                    }
                }
                
                if(counter == total){
                    clearInterval(preloadingPoller);
                    endCallback();
                    setInterval(function(){$this.refreshGame();}, gf.baseRate);
                    gf.time = (new Date()).getTime();
                } else {
                    if(progressCallback){
                        counter++;
                        progressCallback((counter/total)*100);
                    }
                }
            }, 100);
        }
    }
}(jQuery));


