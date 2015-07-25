            var stage = new PIXI.Container();
            // Test Code Below
            var texture = PIXI.Texture.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=");
            onDragStart = function(event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;
            };
            onDragEnd = function() {
                this.alpha = 1;
                this.dragging = false;
                this.data = null;
            };
            onDragMove = function() {
                if(this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.position.x = newPosition.x;
                    this.position.y = newPosition.y;
                }
            };
            createBunny = function(x, y) {
                var bunny = new PIXI.Sprite(texture);
                bunny.interactive = true;
                bunny.buttonMode = true;
                bunny.anchor.set(0.5);
                bunny.scale.set(3);
                bunny.on('mousedown', onDragStart)
                     .on('touchstart', onDragStart)
                     .on('mouseup', onDragEnd)
                     .on('mouseupoutside', onDragEnd)
                     .on('touchend', onDragEnd)
                     .on('touchendoutside', onDragEnd)
                     .on('mousemove', onDragMove)
                     .on('touchmove', onDragMove);
                bunny.position.x = x;
                bunny.position.y = y;
                stage.addChild(bunny);
            };
            for(var i = 0; i < 10; i++)
                createBunny(Math.floor(Math.random() * PLUMB.width), Math.floor(Math.random() * PLUMB.height));
            // Test Code Above
            var plusobj = new PIXI.Graphics();
            plusobj.beginFill(0x123456, 0.5);
            plusobj.drawCircle(PLUMB.width - 60, 50, 30);
            plusobj.endFill();
            plusobj.lineStyle(3, 0xffff00, 1);
            plusobj.moveTo(PLUMB.width - 75, 50);
            plusobj.lineTo(PLUMB.width - 45, 50);
            plusobj.moveTo(PLUMB.width - 60, 35);
            plusobj.lineTo(PLUMB.width - 60, 65);
            plusobj.interactive = true;
            plusobj.buttonMode = true;
            var list = new PIXI.Graphics();
            list.beginFill(0x897897, 0.5);
            list.drawRoundedRect(PLUMB.width - 220, 110, 200, PLUMB.height - 130, 20);
            list.endFill();
            var added = false;
            plusobj.on('mousedown', function() {
                    if(added)
                        PLUMB.home.stage.removeChild(list);
                    else
                        PLUMB.home.stage.addChild(list);
                    added = !added;
                });
            stage.addChild(plusobj);
            this.stage = stage;
