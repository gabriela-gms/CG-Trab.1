"use strict";
var vertices = new Float32Array([
   -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
]);
/**
 * Number of points (vertices).
 * @type {Number}
 */
var numPoints = vertices.length / 2;

// A few global variables...

/**
 * Canvas width.
 * @type {Number}
 */
var w;

/**
 * Canvas height.
 * @type {Number}
 */
var h;

/**
 * Maps a point in world coordinates to viewport coordinates.<br>
 * - [-n,n] x [-n,n] -> [-w,w] x [h,-h]
 * <p>Note that the Y axix points downwards.</p>
 * @param {Number} x point x coordinate.
 * @param {Number} y point y coordinate.
 * @param {Number} n window size.
 * @returns {Array<Number>} transformed point.
 */
function mapToViewport(x, y, n = 5) {
    return [((x + n / 2) * w) / n, ((-y + n / 2) * h) / n];
}

/**
 * Returns the coordinates of the vertex at index i.
 * @param {Number} i vertex index.
 * @returns {Array<Number>} vertex coordinates.
 */
function getVertex(i) {
    let j = (i % numPoints) * 2;
    return [vertices[j], vertices[j + 1]];
}

function draw(ctx,angle,vertice,gradiente) {
   let vertexIndex = vertice
   ctx.fillStyle = "rgba(0, 204, 204, 1)";
   ctx.rect(0, 0, w, h);
   ctx.fill();
   let [x, y] = mapToViewport(...getVertex(vertexIndex));
   ctx.translate(x,y) // transladar
   ctx.rotate(-angle*(Math.PI/180)); // rotacionar, sentido anti-horario, com tx de dois graus por frame
   ctx.translate(-x,-y) // transladar 
   ctx.beginPath();
   for (let i = 0; i < numPoints; i++) {
    if (i == 3 || i == 4) continue;
    let [x, y] = mapToViewport(...getVertex(i).map((v) => v ));
    if (i == 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
}
  ctx.closePath();
  ctx.strokeStyle = "gray"; //definindo a cor da borda
  ctx.lineWidth = 10; //definindo a largura da borda
  ctx.stroke();
  ctx.fillStyle = gradiente; //definindo o preenchimento do quadrado com o gradiente
  ctx.fill();
  
  for (let j = 0; j < numPoints; j++) {
    if(j===1 && vertice == 1){
      let [a, b] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.rect(a-6, b-6, 8, 8);
      ctx.fillStyle = "#00FF00";
      ctx.fill();
      ctx.closePath();}
    if(j===3 && vertice == 3){
      let [c, d] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.rect(c-2, d-6, 8, 8);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();}
    if(j===4 && vertice == 4){
      let [e, f] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.rect(e-6, f-2, 8, 8);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();}
    if(j===5 && vertice == 5){
      let [h, i] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.rect(h-2, i-2, 8, 8);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();}
    }

   for (let j = 0; j < numPoints; j++) {
    if(j===1 && vertice != 1){
      let [a, b] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.arc(a, b,3,0, Math.PI*2,false);
      ctx.fillStyle = "#00FF00";
      ctx.fill();
      ctx.closePath();}
    if(j===3 && vertice != 3){
      let [c, d] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.arc(c, d,3,0, Math.PI*2,false);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();}
    if(j===4 && vertice != 4){
      let [e, f] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.arc(e, f,3,0, Math.PI*2,false);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();}
    if(j===5 && vertice != 5){
      let [h, i] = mapToViewport(...getVertex(j));
      ctx.beginPath();
      ctx.arc(h, i,3,0, Math.PI*2,false);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();}
    }
}

function mainEntrance() {
  // retrieve <canvas> element
   var canvasElement = document.querySelector('#theCanvas');
   var ctx = canvasElement.getContext("2d");
   let vertice = 3
   w = canvasElement.width;
   h = canvasElement.height;
   let [a, b] = mapToViewport(...getVertex(1));
   let [c, d] = mapToViewport(...getVertex(3));
   let [e, f] = mapToViewport(...getVertex(4));
   let [m, n] = mapToViewport(...getVertex(5));
   var grad1 = ctx.createLinearGradient(a,b,m,n);
      grad1.addColorStop(0,'#00FF00');
      grad1.addColorStop(1,'white');
   var grad2 = ctx.createLinearGradient(c,d,e,f);
      grad2.addColorStop(0,'red');
      grad2.addColorStop(1,'blue');
  var grad = grad2
  document.addEventListener("keydown", (event) => { //manipulador de teclado
      console.log(event.key);
      switch (event.key) {
        case "b": //blue
          vertice = 4;
          grad = grad2;
          break;
        case "r": //red
          vertice = 3;
          grad = grad2;
          break;
        case "g": //green
          vertice = 1;
          grad = grad1;
          break;
        case "w": //white
          vertice = 5;
          grad = grad1;
          break;
      }
    });
   var runanimation = (() => {
       //Taxa de variação do angulo
       var angle = 2.0;
       return () => {
           draw(ctx, angle,vertice,grad);
          // request that the browser calls runanimation() again "as soon as it can"
           requestAnimationFrame(runanimation);
       };
   })();
    // draw!
   runanimation();
}