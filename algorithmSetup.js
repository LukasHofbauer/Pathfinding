setupAlgorithm = function() {
  var StartRecord = new NodeRecord(start, null, 0);
  path = [];
  openSet = [];
  closedSet = [];
  openSet.push(StartRecord);
}



function NodeRecord(node, connection, costSoFar, heuristic){
this.node = node;
this.connection = connection;
this.costSoFar = costSoFar;
this.heuristic = heuristic;
}

startDijkstra = function(){
  d = new dijkstra();
  dijkstra = true;

}

startAStar = function(){
    astr = new astar();
    astar = true;
}

function showPath(path) {
  this.path = path;

  this.draw = function() {
    ctx = PathfindingArea.context;
    var startPointX = cells[this.path[0].node].x+cellwidth/2;
    var startPointY = cells[this.path[0].node].y+cellheight/2;

    ctx.beginPath();
    ctx.lineWidth="5";
    ctx.strokeStyle="green";
    ctx.moveTo(startPointX,startPointY);

    for(i=1; i<this.path.length; i++) {
      var endPointX = cells[this.path[i].node].x+cellwidth/2;
      var endPointY = cells[this.path[i].node].y+cellheight/2;
      ctx.lineTo(endPointX,endPointY);
    }
    ctx.stroke();
  }
}
