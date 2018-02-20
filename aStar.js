astar = function() {
  var slider = document.getElementById("slider");
  var slidervalue = slider.value
  this.smallestNode = function() {
    current = openSet[0];   //sets first entry of open set to current
    for (j = 0; j < openSet.length; j++){
      if(openSet[j].costSoFar + openSet[j].heuristic < current.costSoFar + current.heuristic){
        current = openSet[j]; //if costSoFar+heuristic is smaller then current it = current
      }
    }
  }

  this.heuristic = function() {
    a = cells[endNode].i-cells[end].i;//hoizontal distance from end
    b = cells[endNode].j-cells[end].j;//vertical distance from end
	  aa = Math.sqrt(a*a); //value of a
	  bb = Math.sqrt(b*b); //value of b
	  heuristic = 0; //heuristic starts at 0
	  //heuristic = Math.sqrt(a*a+b*b)

	  while (aa >0 && bb > 0){ //while there is vertical and horizontal dist between them
		    aa-- //remove 1 from horizontal distance
		    bb-- //remove 1 from vertical distance
		    heuristic += Math.sqrt(2); // add sqrt of 2 to the heuristic
	  }
	  while (aa > 0) { //while there is horizontal dist between them
		    aa-- //remove 1 from horizontal distance
		    heuristic += 1; //add 1 to the heuristic
	  }
	  while (bb > 0) { //while there is vertical dist between them
		    bb-- //remove 1 from vertical distance
        heuristic += 1; //add 1 to the heuristic
	  }

	  heuristic = heuristic*slidervalue;
  }

  this.setCheck = function(){
    endNodeSet = cells[endNode].set; //gets variable
    if(endNodeSet == "closed"){ //if closed run closedCheck
      this.closedCheck();
    }
    if(endNodeSet == "open"){  //if open run openCheck
      this.openCheck();
    }
  }

  this.closedCheck = function(){
    for(i=0; i<closedSet.length; i++){ //loops through closedSet
      if(endNode==closedSet[i].node){ //finds node
        if(endNodeCost < closedSet[i].costSoFar){ //if new values are better
          unclosedNode = closedSet[i];
          closedSet.splice(unclosedNode, 1); //removes from closedSet
          openSet.push(unclosedNode); //adds to openSet
          cells[endNode].set = "open"; //sets as open
          endNodeSet = cells[endNode].set;
        }
        break;
      }
    }
  }

  this.openCheck = function(){
    for(i=0; i < openSet.length; i++){ //loops through openSet
      if(endNode==openSet[i].node){ //finds node
        if(endNodeCost<openSet[i].costSoFar){ // if values are better
          openSet[i].costSoFar = endNodeCost; //update vaules
          openSet[i].connection = current;
        }
        break;
      }
    }
  }

  this.remove = function() {
    var index = openSet.indexOf(current);
    openSet.splice(index, 1); //removes current from open
    closedSet.push(current); //adds it to closed
    cells[current.node].set = "closed";
  }

  this.returnPath = function() {
    var pathNode = current;
    path.push(pathNode); //
    while (pathNode.node != start) {
      path.push(pathNode.connection);
      pathNode=pathNode.connection;
      }
    console.log(path);
    apfad.innerHTML = "Pfadl&auml;nge: " +  Math.round(path[0].costSoFar * 100) / 100;
    aknoten.innerHTML = "Knoten im Pfad: " + path.length;
    ageschlossen.innerHTML = "Geschlossene Knoten: " + closedSet.length;
    aoffen.innerHTML = "Offene Knoten: " + openSet.length;
  }

  this.iterate = function() {
    if(openSet.length > 0 && done == false){

      this.smallestNode();   //sets smallest Node from Open to current
      this.remove();     //removes current from open and puts it in closed


     if (current.node == end){
        done = "solution";
		console.log(done);
		this.returnPath();
        p = new showPath(path);
      }else{
        connections = graph[current.node];        //array of the connections to the current Node
        for(j=0; j<connections.length; j++){      //execute the following for each connection
          endNode = connections[j].toNode;
          endNodeCost = current.costSoFar + connections[j].cost;
          endNodeSet = "undef";

          this.setCheck();                         //checks if the node is open and if we need to update it

          if (endNodeSet == "undef") {     //if true this is a unvisited node and we create a record
            this.heuristic();

            endNodeRecord = new NodeRecord(endNode, current, endNodeCost, heuristic);
            cells[endNode].set = "open";
            openSet.push(endNodeRecord);
          }
        }
      }
	}
    else if (openSet.length == 0 && done == false){	//in this case there is no solution
      dijkstra = false;
      console.log("no solution");
    }
  }
}
