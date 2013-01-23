var AEHelper = function(){

}

// public static methods:
    AEHelper.getCompMarkers = function(comp){
        var tempNull = comp.layers.addNull(comp.duration);
        var tempPos = tempNull.property("ADBE Transform Group").property("ADBE Position");
        tempPos.expression = "x = thisComp.marker.numKeys;[x,0];";
        var result = tempPos.value[0];
        var markers  =[];
        for (x = 1; x <= result; x++) {
            tempPos.expression = "x = thisComp.marker.key(" + x + ").time;[x,0];";
            markers.push(tempPos.value[0]);
        }
        tempNull.remove();
        return markers;
    }