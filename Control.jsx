/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   CONTROL
*   
*   
*/

function Control()
{
	var control = this;
	var palette = Palette();
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
            process = MainProcess(model);
            process.start();
        }
    }

    function addFile(p)
    {
        model.setFileList(p);
        updateFileList();
    }

    function addFolder(p)
    {
        model.setFileList(p.getFiles("*.mp4"));
        updateFileList();
    }

    control.clearFiles()
    {
    	model.setFileList();
    }



   function updateFileList()
    {
        palette.folderInput.text = model.fileList.toString();
        palette.fileCount.text = 'file count : '+model.fileList.length;
    }

}

#include "Palette.jsx"
#include "MainProcess.jsx"
#include "FileProcess.jsx"
#include "PartProcess.jsx"