/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   CONTROL
*   
*   
*/

function Control()
{
	var control = this;
	var palette = new Palette(control);
	var model = new Model(palette);

	var process;

	isCurrentFile = false;

	function runProcess()
	{
        var status = BridgeTalk.getStatus("aftereffects");
        $.writeln("-- START --\n part : "+partIndexInput.text+"\nAE status : "+status);

        if(status == "ISNOTRUNNING"){
            if(model.currentFile){
                alert("aucune instance d'After Effects en cours");
            }else{
            	// TODO if isnot running : open first in filelist
            	var file = model.fileList[model.fileIndex];
            	var ext = getExtension(file.name);
        		if(ext == "aep"){
            		aftereffects.open(file);
            	}else{
            		aftereffects.open([]]);
            	}
            }
        }else if(status == "IDLE"){
            palette.startBtn.enabled = false;
            process = MainProcess(model);
            process.start();
        }
    }

    control.addFile(p)
    {
    	var fileList;
    	if(p == Folder) fileList = p.getFiles("*.mp4")
        if(p == File) fileList = [p];
    	model.setFileList(fileList);
    }

    control.clearFiles()
    {
    	model.setFileList();
    }

    control.setPartIndex(){

    }

}

#include "Palette.jsx"
#include "MainProcess.jsx"
#include "FileProcess.jsx"
#include "PartProcess.jsx"