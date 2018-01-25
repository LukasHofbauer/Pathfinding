var cols =15;
var rows =15;

canvaswidth  = 800;
canvasheight = 800;

var cellwidth = canvaswidth/cols;
var cellheight = canvasheight/rows;

var cells = [];
var graph = [];
var walls = [36, 66, 81, 92,93,94,95,96];

var start = 0;
var end = 224;

var astar = false;
var dijkstra = false;
var done = false;
var astr;
var d;
var p;
var alg;



function startGame() {
    PathfindingArea.start();
    alg = new setupAlgorithm();
    console.log(alg);
    var h = 0;
    for (j = 0; j < rows; j++){
        for (i = 0; i < cols; i++){
          if(j*cols+i == walls[h]){
              cells [j*cols+i] = new cell(i, j, true);
              h++
          }else if(j*cols+i == start || j*cols+i == end){
            cells [j*cols+i] = new cell(i, j, false);
          } else {
              cells [j*cols+i] = new cell(i, j, false);
          }
        }
    }
    console.log(cells)
    createGraph();
}



var PathfindingArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvaswidth;
        this.canvas.height = canvasheight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(PathfindingUpdate, 10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}




function cell(i, j, wall){
    this.i = i;
    this.j = j;
    this.spot = this.j*cols+this.i;
    this.x = this.i*cellwidth;
    this.y = this.j*cellheight;
    this.wall = wall;
    this.set = "undef";
    ctx = PathfindingArea.context;


    this.draw = function() {
      if(this.set == "open"){
        ctx.fillStyle="#BBBBBB";
        ctx.fillRect(this.x, this.y, cellwidth, cellheight);
        ctx.fillStyle="#000000";
        ctx.font = "20px Arial";
        ctx.fillText(this.spot,this.x+5,this.y+20);
      }else if(this.set == "closed"){
        ctx.fillStyle="#444444";
        ctx.fillRect(this.x, this.y, cellwidth, cellheight);
        ctx.fillStyle="#FFFFFF";
        ctx.font = "20px Arial";
        ctx.fillText(this.spot,this.x+5,this.y+20);
      }else if(this.wall == true){
        ctx.fillStyle="#000000";
        ctx.fillRect(this.x, this.y, cellwidth, cellheight);
        ctx.fillStyle="#FFFFFF";
        ctx.font = "20px Arial";
        ctx.fillText(this.spot,this.x+5,this.y+20);
      }else{
        ctx.fillStyle="#000000";
        ctx.font = "20px Arial";
        ctx.fillText(this.spot,this.x+5,this.y+20);
      }
      ctx.strokeStyle="#000000";
      ctx.lineWidth="3";
      ctx.strokeRect(this.x, this.y, cellwidth, cellheight);
    }

}


function createGraph(){
  for (i = 0; i < cells.length; i++){
    graph[i] = [];
    var j = 0;
      if (cells[i].wall == true){

      }else {
        if(cells[i].j >0 && cells[i-cols].wall == false){        //über der zelle ist platz und ist keine Wand
            graph[i][j] = new connection(1, i, i-cols);
            j++;
        }
        if(cells[i].i > 0 && cells[i-1].wall == false){      //linksdaneben ist platz
            graph[i][j] = new connection(1, i, i-1);
            j++;
        }
        if(cells[i].i < cols-1 && cells[i+1].wall == false){    //rechts ist platz
            graph[i][j] = new connection(1, i, i+1);
            j++;
        }
        if(cells[i].j < rows-1 && cells[i+cols].wall == false){        //unter ter zelle ist Platz und keine Wand
            graph[i][j] = new connection(1, i, i+cols);
            j++;
        }


        if(cells[i].i > 0 && cells[i].j > 0 && cells[i-cols-1].wall == false){        //linksüber der zelle ist platz und ist keine Wand
            graph[i][j] = new connection(Math.sqrt(2), i, i-cols-1);
            j++;
        }
        if(cells[i].i < cols-1 && cells[i].j > 0 && cells[i-cols+1].wall == false){        //rechtsüber der zelle ist platz und ist keine Wand
            graph[i][j] = new connection(Math.sqrt(2), i, i-cols+1);
            j++;
        }
        if(cells[i].i > 0 && cells[i].j < rows-1 && cells[i+cols-1].wall == false){        //linksunten der zelle ist platz und ist keine Wand
            graph[i][j] = new connection(Math.sqrt(2), i, i+cols-1);
            j++;
        }
        if(cells[i].i < cols-1 && cells[i].j < rows-1 && cells[i+cols+1].wall == false){        //rechtsunten der zelle ist platz und ist keine Wand
            graph[i][j] = new connection(Math.sqrt(2), i, i+cols+1);
            j++;
        }


      }
  }

}

function connection(cost, fromNode, toNode){
    this.cost = cost;
    this.fromNode = fromNode;
    this.toNode = toNode;

}

function PathfindingUpdate() {
    PathfindingArea.clear();
    if (dijkstra == true){
      console.log("hi")
      d.iterate();
    }else if(astar == true){
      astr.iterate();
    }


    for (i = 0; i < cols; i++){
        for (j = 0; j < rows; j++){
          cells[j*cols+i].draw();
        }
    }
    ctx.strokeStyle="#00FF00";
    ctx.lineWidth="5";
    ctx.strokeRect(cells[start].x+5, cells[start].y+5, cellwidth-10, cellheight-10);
    ctx.strokeStyle="#FF0000";
    ctx.lineWidth="5";
    ctx.strokeRect(cells[end].x+4, cells[end].y+4, cellwidth-8, cellheight-8);


    if (done == true) {
      p.draw();
    }
}
