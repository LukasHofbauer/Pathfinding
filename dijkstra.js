dijkstra = function() {

  this.smallestNode = function() {
    current = openSet[0];
    for (j = 0; j < openSet.length; j++){
      if(openSet[j].costSoFar < current.costSoFar){
        current = openSet[j];
      }
    }
  }

  this.remove = function() {
    var index = openSet.indexOf(current);
    openSet.splice(index, 1);
    closedSet.push(current);
    cells[current.node].set = "closed";
  }

  this.setCheck = function(){
    endNodeSet = cells[endNode].set;
    if(endNodeSet === "open"){
      for(i=0; i<openSet.length; i++){
        if(endNode==openSet[i].node){
          if(endNodeCost<openSet[i].costSoFar){
            openSet[i].costSoFar = endNodeCost;
            openSet[i].connection = current;
          }
          break;
        }
      }
    }
  }

  this.returnPath = function() {
    var pathNode = current;
    path.push(pathNode);
    while (pathNode.node != start) {
      path.push(pathNode.connection);
      pathNode=pathNode.connection;
      }
    console.log(path);
  }

  this.iterate = function() {
    if(openSet.length > 0 && done == false){
      this.smallestNode();   //sets smallest Node from Open to current
      this.remove();     //removes current from open and puts it in closed

      if (current.node == end){		//checks if the end was found
          console.log("Done!")
          this.returnPath();
          done = true;
          p = new showPath(path);
      }else{
        connections = graph[current.node];        //array of the connections to the current Node
        for(j=0; j<connections.length; j++){      //execute the following for each connection
          endNode = connections[j].toNode;
          endNodeCost = current.costSoFar + connections[j].cost;
          endNodeSet = "undef"

          this.setCheck();      //checks if the node is open and if we need to update it

            if (endNodeSet === "undef") {   //if true this is a unvisited node and we create a record
              endNodeRecord = new NodeRecord(endNode, current, endNodeCost, 0);
              cells[endNode].set = "open";
              openSet.push(endNodeRecord);
            }
          }
        }

    } else if (openSet.length == 0){	//in this case there is no solution
      dijkstra = false;
      console.log("no solution");
	    }
    }
}
