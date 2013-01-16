    function PartProcess(fileProcess)
	{
		var partProcess;
        var folder;

        var index = 0;
        var isLastPart = false;
        var numPart;
        var compDuration;

        var isStabing = true;

        var taskID;

        var mainComp;
        var stabComp;
        var fxComp;
        var cutComp;
        var stabLayer;
        var fxLayer;
        var cutLayer;

        var  markers;

        var timerDelay = 60000;

        // create comp, add layer
        // decoupe part
        // ajust layer
        // set marker
        // // return partie de comp avec marqueur

        // Public
        partProcess.start = function(comp, index, numPart, markers){
            mainComp = comp;
            index = index;
            numPart = numPart;
            markers = markers;
            processPart();
        }

        partProcess.onStabComplete= function(){
            onStabComplete();
        }

        partProcess.checkStabProgress = function(){
            checkStabProgress();
        }

        // Private
        function processPart()
        {
            isLastPart = (index == numPart-1);

            // duration = partLength ou temps restant..  // TODO : ou currentFootage.duration si pas multipart ?
            compDuration = isLastPart ? currentFootage.duration-(numPart-1)*partLength : partLength;
            
            setFolder();

            setComps();

            // Optic
            opticProcess(fxLayer);
            
             // Stab
            stabProcess(stabLayer);

            if(isStabing){
                // Run Timer
                taskID = app.scheduleTask("process.getPartProcess().checkStabProgress();", timerDelay, false);
            }else{
                onStabComplete();
            }
        }

        function setFolder()
        {
        	part.folder = new Folder(fileJob.folder+"/part"+index+"-"+numPart);
            part.folder.create();
        }

        function setComps()
        {
            cutComp = app.project.items.addComp(fileName+"_CUT"+index, 1280, 840, 1, compDuration, 30);
            cutComp.openInViewer();
            // add layer
            cutComp.layers.add(currentFootage);
        
            // Precompose
            stabComp = cutComp.layers.precompose([1], fileName+"_STAB"+index, true);

            // Precompose
            fxComp = stabComp.layers.precompose([1], fileName+"_FX"+index, true);
            
            fxLayer = fxComp.layer(1);
            stabLayer = stabComp.layer(1);
            cutLayer = cutComp.layer(1);

            stabComp.openInViewer();
        }

        function opticProcess(layer)
        {
            // Add Effect
            layer.Effects.addProperty("ADBE Optics Compensation");
            layer.Effects.property(1).property(1).setValue(87);
            layer.Effects.property(1).property(2).setValue(1);
            layer.Effects.property(1).property(3).setValue(3);
            layer.Effects.property(1).property(5).setValue(1);
        }

        function stabProcess(layer)
        {
            // Add Effect
            layer.Effects.addProperty("ADBE SubspaceStabilizer");
            layer.Effects.property(1).property(5).setValue(4);
            layer.Effects.property(1).property(9).setValue(4);
            layer.Effects.property(1).property(17).setValue(1);
            layer.Effects.property(1).property(18).setValue(2);
            // select effect
            stabComp.layer(1).Effects.property(1).selected = true;
        }


        function onStabComplete()
        {
            splitOnMarkers(cutLayer, markers);
            render();
        }

        function checkStabProgress()
        {
            // select effects
            stabComp.openInViewer();
            stabComp.layer(1).Effects.property(1).selected = true;

            var effect = stabComp.layer(1).Effects.property(1);
            var label = effect.property(2).name;
            var label2 = effect.property(3).name;

            if(label == "" && label2 == stabWord ){
                taskID = app.scheduleTask("process.getPartProcess().onStabComplete()", timerDelay, false);
            }else{
                taskID = app.scheduleTask("process.getPartProcess().checkStabProgress()", timerDelay, false);
            }
        }

        function splitOnMarkers(pLayer, pMarkers){
            var comp = pLayer.containingComp;
            var mainLayer = pLayer;
            var numMarkers = pMarkers.length;
            var mark;
            var layer;
            var markIn;
            var markOut;
            var hasMarker = false;
            for (var i=0; i<numMarkers-1; i++)
            {
                markIn = pMarkers[i]-partIndex*partLength;
                markOut = pMarkers[i+1]-partIndex*partLength;
                if(markOut < 0) continue;
                if(markIn < 0) markIn = 0;

                if(markOut>comp.duration){
                    markOut = comp.duration;
                    layer = subLayer(mainLayer, markIn, markOut);
                    if(!(i%2)) layer.stretch = 25;
                    break;
                }
                layer = subLayer(mainLayer, markIn, markOut);
                if(!(i%2)) layer.stretch = 25;
                hasMarker = true;
            }
            
            if(hasMarker){
                mainLayer.remove();
                arrangeLayers(comp);
                comp.workAreaDuration = layer.outPoint;
            }
        }

	    function saveProject()
        {
            if(isSaving){
                app.project.save(new File(filejob.folder.toString()+"/"+fileName+"_p"+partIndex+".aep"));
            }
        }

        function render()
        {
            //Lancer le rendu
            var myRenderQueue = app.project.renderQueue;
            var myQueueItem = myRenderQueue.items.add(cutComp);
            myQueueItem.applyTemplate("MultiMachine");

            var myOM = myQueueItem.outputModule(1);
            myOM.applyTemplate("tga");
            myOM.file = new File(part.folder.toString()+"/"+fileName+"_"+partIndex+"_[#####].tga");
            
            createBat();
            
            saveProject();
            
            if(isRendering){
                myRenderQueue.render();
            }

            fileProcess.nextPart();
        }

        function createBat()
        {
            var outputDir = decodeURI(part.folder.toString());
            var sceneFile = decodeURI(fileJob.folder.toString())+"/"+fileName+"_p"+partIndex+".aep";

            var videoFilename = fileName+"_"+partIndex+"_[#####].tga";
            var jobId = fileName+"_"+partIndex;
            var endFrame = Math.ceil(cutComp.workAreaDuration*FRAME_RATE)-1;
            var cmd = '"c:\\Program Files (x86)\\SquidNetSoftware\\SquidNet\\squidnet.exe" --submit --template AE --appPath $APP(AFTER-EFFECTS) --renderIndex 1 --startFrame 0 --stepFrame 1 --priority 12 --multiProcess ';
            cmd += '--useAllCores --sceneFile "'+ sceneFile +'" --outputDir "'+ outputDir +'" --videoFilename "'+ videoFilename +'" --jobId "'+ jobId +'" --endFrame '+endFrame+' --framePerSlice 1050 --compAction leave --sceneName "'+fileName+'"  --username "RemiE"';

            // run command line
            system.callSystem(cmd);

            // save command line to .bat
            var batFile = new File(outputFolder.toString()+"/"+fileName+"_"+partIndex+'.bat');
            batFile.open('w');
            batFile.write(cmd);
            batFile.close();
        }

        return partProcess;
	}