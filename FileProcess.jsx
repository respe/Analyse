
	function FileProcess(mainProcess)
	{
        var fileProcess;
        var partProcess;

        var folder;

        var fileName = "";
        var premiereComp;

        var partIndex = 0;
        var numPart = 0;

        var markers = [];

        // public
        fileProcess.start = function(){
            processFile();
        }

        fileProcess.setPartIndex = function(value){
            partIndex = value;
        }

        fileProcess.getPartProcess = function(){
            return partProcess;
        }

        fileProcess.nextPart = function(){
            if(!lastPart){
                partIndex++;
                partProcess = PartProcess(fileProcess);
                partprocess.start(premiereComp, partIndex, numPart);
            }else{
                mainProcess.nextFile();
            }
        }

        // private
        function processFile(){
            premiereComp = app.project.item(1);

            // rename File
            fileName = fileReName(premiereComp.name);

            // create folder
            folder = new Folder(outputFolder+"/"+fileName);
            folder.create();

            // definit nombre de partition du footage
            numPart = Math.ceil(currentFootage.duration/partLength);

            // enregistre marqueurs
            markers = getCompMarkers(mainComp);

            partProcess = PartProcess(fileProcess);
            partprocess.start(premiereComp, partIndex, numPart);
        }

        function getCompMarkers(comp){
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

        return fileProcess;
	}