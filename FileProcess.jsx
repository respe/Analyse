
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
                // write end-anlyse file
                var endFile = new File(outputFolder.toString()+"/fin analyse.txt");
                endFile.open('w');
                endFile.write(numPart+"#"+partFrameCount);
                endFile.close();
                //
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
            markers = AEHelper.getCompMarkers(mainComp);

            partProcess = PartProcess(fileProcess);
            partprocess.start(premiereComp, partIndex, numPart);
        }

        

        return fileProcess;
	}