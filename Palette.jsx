/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   PALETTE
*   
*   Display graphic UI Control
*/

function Palette(control)
{
    // Create and show a floating palette
    var palette = new Window("palette","FX Process Manager");

    // Display Elements
    var currentFileCb =     palette.add('checkbox', undefined, 'Process open file');
    
                            palette.add('statictext', undefined, 'Job type :');
    var jobTypeList =       palette.add('DropDownList', undefined, ['File', 'Folder']);
                            jobTypeList.selection = 0;

    var searchLabel =       palette.add('statictext', undefined, 'File :');
    var folderInput =       palette.add('edittext', undefined, '<browse file>', { characters: 30 }); // TODO ? input with current folder

    var browseBtn   =       palette.add('button', undefined, "...");

                            palette.add('statictext', undefined, 'Part index :');
    var partIndexInput =    palette.add('edittext', undefined, this.partIndex, { characters: 2 });
    
    var fileCount   =       palette.add('statictext', undefined, 'file count : '+this.fileList.length);
    var showListBtn =       palette.add('button', undefined, "Show List");

    var startBtn    =       palette.add('button', undefined, "Start");

    var infoLabel   =       palette.add('statictext', undefined, "info : ");


    /**
    * Event Function
    *
    */
    partIndexInput.onChange = partIndexInputChange;
    jobTypeList.onChange = jobTypeChange;
    currentFileCb.onClick = selectCurrentFileCb;
    startBtn.onClick = start;
    browseBtn.onClick = browse;
    showListBtn.onClick = showList;

    function partIndexInputChange(){
        control.setPartIndex(partIndexInput.text);
    }

    function jobTypeChange(){
        control.setJobType(jobTypeList.selection)
    }

    function selectCurrentFileCb(){
        control.isCurrentFile = currentFileCb.value;
        if(currentFileCb.value == true){
            jobTypeList.enabled = false;
            folderInput.enabled = false;
            browsBtn.enabled = false;
        }else{
            jobTypeList.enabled = true;
            folderInput.enabled = true;
            browsBtn.enabled = true;
        }
    }

    function start(){
        control.start();
    }

    function browse(){
        control.clearFiles();
        if(jobTypeList.selection == 0){
            control.addFile(selectFile());
        }else{
            control.addFolder(selectFolder());
        }
    }

    function showList(){
        alert(control.getFiles());
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

    palette.show();

    return this;
}