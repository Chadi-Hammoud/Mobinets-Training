 // first we need to create a stage
 var stage1 = new Konva.Stage({
    container: 'container1',   // id of container <div>
    width: 200,
    height: 200
  });
  var stage2 = new Konva.Stage({
    container: 'container2',   // id of container <div>
    width: 200,
    height: 200
  });
  var stage3 = new Konva.Stage({
    container: 'container3',   // id of container <div>
    width: 200,
    height: 200
  });
  var stage4 = new Konva.Stage({
    container: 'container4',   // id of container <div>
    width: 200,
    height: 200
  });
  
  
  
  
  // then create layer4
  var layer1 = new Konva.Layer();
  var layer2 = new Konva.Layer();
  var layer3 = new Konva.Layer();
  var layer4 = new Konva.Layer();

  
  // create our shape
  var circle = new Konva.Circle({
    x: stage2.width() / 2,
    y: stage2.height() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
  });

  var triangle = new Konva.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(120, 50);
      context.lineTo(200, 80);
      context.quadraticCurveTo(150, 100, 200, 170);
      context.closePath();

      // special Konva.js method
      context.fillStrokeShape(this);
    },
    fill: '#00D2FF',
    stroke: 'lightblue',
    strokeWidth: 4,
    
});

var pentagon = new Konva.RegularPolygon({
    // x: stage.width() / 3,
    // y: stage.height() / 3,
    x:100,
    y:100,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    shadowOffsetX : 20,
    shadowOffsetY : 25,
    shadowBlur : 40,
    opacity : 0.5
});


var tempLayer = new Konva.Layer();
      stage4.add(tempLayer);

      var text = new Konva.Text({
        fill: 'black',
      });
      layer4.add(text);

      var star;
      for (var i = 0; i < 10; i++) {
        star = new Konva.Star({
          x: stage4.width() * Math.random(),
          y: stage4.height() * Math.random(),
          fill: 'blue',
          numPoints: 10,
          innerRadius: 20,
          outerRadius: 25,
          draggable: true,
          name: 'star ' + i,
          shadowOffsetX: 5,
          shadowOffsetY: 5,
        });
        layer4.add(star);
      }

      stage4.on('dragstart', function (e) {
        e.target.moveTo(tempLayer);
        layer4.draw();
        text.text('Moving ' + e.target.name());
      });

      var previousShape;
      stage4.on('dragmove', function (evt) {
        var pos = stage4.getPointerPosition();
        var shape = layer4.getIntersection(pos);
        if (previousShape && shape) {
          if (previousShape !== shape) {
            // leave from old targer
            previousShape.fire(
              'dragleave',
              {
                evt: evt.evt,
              },
              true
            );

            // enter new targer
            shape.fire(
              'dragenter',
              {
                evt: evt.evt,
              },
              true
            );
            previousShape = shape;
          } else {
            previousShape.fire(
              'dragover',
              {
                evt: evt.evt,
              },
              true
            );
          }
        } else if (!previousShape && shape) {
          previousShape = shape;
          shape.fire(
            'dragenter',
            {
              evt: evt.evt,
            },
            true
          );
        } else if (previousShape && !shape) {
          previousShape.fire(
            'dragleave',
            {
              evt: evt.evt,
            },
            true
          );
          previousShape = undefined;
        }
      });
      stage4.on('dragend', function (e) {
        var pos = stage4.getPointerPosition();
        var shape = layer4.getIntersection(pos);
        if (shape) {
          previousShape.fire(
            'drop',
            {
              evt: e.evt,
            },
            true
          );
        }
        previousShape = undefined;
        e.target.moveTo(layer4);
      });

      stage4.on('dragenter', function (e) {
        e.target.fill('green');
        text.text('dragenter ' + e.target.name());
      });

      stage4.on('dragleave', function (e) {
        e.target.fill('blue');
        text.text('dragleave ' + e.target.name());
      });

      stage4.on('dragover', function (e) {
        text.text('dragover ' + e.target.name());
      });

      stage4.on('drop', function (e) {
        e.target.fill('red');
        text.text('drop ' + e.target.name());
      });
  
  // add the shape to the layer4
  layer1.add(triangle);
  layer2.add(circle);
  layer3.add(pentagon);


  
  // add the layer4 to the stage
  stage1.add(layer1);
  stage2.add(layer2);
  stage3.add(layer3);
  stage4.add(layer4);

  
  // draw the image
  layer1.draw();
  layer2.draw();
  layer3.draw();
  layer4.draw();