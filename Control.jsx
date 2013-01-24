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
            palette.startBtn.enabled = false;
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

    /**
    * Event Function
    *
    */
    palette.partIndexInput.onChange = partIndexInputChange;
    palette.jobTypeList.onChange = jobTypeChange;
    palette.currentFileCb.onClick = selectCurrentFileCb;
    palette.startBtn.onClick = runProcess;
    palette.browseBtn.onClick = browse;
    palette.showListBtn.onClick = showList;

    function partIndexInputChange(){
        model.setPartIndex(palette.partIndexInput.text);
    }

    function jobTypeChange(){
        model.setJobType(palette.jobTypeList.selection)
    }

    function selectCurrentFileCb(){
        if(palette.currentFileCb.value == true){
            palette.jobTypeList.enabled = false;
            palette.folderInput.enabled = false;
            palette.browsBtn.enabled = false;
        }else{
            palette.jobTypeList.enabled = true;
            palette.folderInput.enabled = true;
            palette.browsBtn.enabled = true;
        }
    }

    function browse(){
        if(palette.jobTypeList.selection == 0){
            addFile(selectFile());
        }else{
            addFolder(selectFolder());
        }
    }

    function showList(){
        alert(model.getFileList());
    }


    /**
    * Function
    *
    */
    function selectFolder(){
        var inputFolder = new Folder(palette.DEFAULT_IMPORT_FOLDER);
        inputFolder = inputFolder.selectDlg("Import items from folder...");
        return inputFolder;
    }

    function selectFile(){
        var file = File.openDialog("Select files", "*.mp4; *.aep", true);
        return file;
    }


}

#include "Palette.jsx"
#include "MainProcess.jsx"
#include "FileProcess.jsx"
#include "PartProcess.jsx"