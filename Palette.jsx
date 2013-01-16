/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   PALETTE
*
*/
function Palette(thisObj)
{

    // This function adds a new script-launching button to the palette
    function addButton(palette, buttonRect, buttonLabel, buttonFunctionName)
    {
        var newButton = palette.add("button", buttonRect, buttonLabel);

        newButton.onClick = buttonFunctionName;
        return newButton;
    }

    // Create and show a floating palette
    var my_palette = new Window("palette","FX Process Manager");

    my_palette.DEFAULT_IMPORT_FOLDER = '//CSV_BACKUP/main_raid5/CSV/Gopro';
    my_palette.fileList = [];
    my_palette.fileIndex = 0;

    // check box : current open file or browse file
    my_palette.currentFileCb = my_palette.add('checkbox', undefined, 'Process open file');
    
    my_palette.add('statictext', undefined, 'Job type :');
    my_palette.jobTypeList = my_palette.add('DropDownList', undefined, ['File', 'Folder']);
    
    my_palette.searchLabel = my_palette.add('statictext', undefined, 'File :');
    my_palette.folderInput = my_palette.add('edittext', undefined, '<browse file>', { characters: 30 }); // TODO ? input with current folder
    my_palette.browseBtn = addButton(my_palette, undefined, "...", thisObj.onBrowse);

    my_palette.add('statictext', undefined, 'Part index :');
    my_palette.partIndexInput = my_palette.add('edittext', undefined, partIndex, { characters: 2 });
    
    my_palette.fileCount = my_palette.add('statictext', undefined, 'file count : '+my_palette.fileList.length);
    my_palette.showListBtn = addButton(my_palette, undefined, "Show List", thisObj.showList);

    my_palette.startBtn = addButton(my_palette, undefined, "Start", thisObj.onStart);

    my_palette.jobTypeList.selection = 0;
    my_palette.partIndexInput.text = 0;

    my_palette.infoLabel = palette.add('statictext', undefined, "");

    /**
    * Event Listeners
    *
    */
    my_palette.jobTypeList.onChange = function(){
        my_palette.folderInput.text = (my_palette.jobTypeList.selection==0)?"<browse file>":"<browse folder>";
        my_palette.searchLabel.text = (my_palette.jobTypeList.selection==0)?"File":"Folder";
    }

    my_palette.currentFileCb.onClick = function(){
        if(my_palette.currentFileCb.value == true){
            my_palette.jobTypeList.enabled = false;
            my_palette.folderInput.enabled = false;
            my_palette.browsBtn.enabled = false;
        }else{
            my_palette.jobTypeList.enabled = true;
            my_palette.folderInput.enabled = true;
            my_palette.browsBtn.enabled = true;
        }
    }



    my_palette.show();

    return my_palette;
}

function onBrowse(){
    if(palette.jobTypeList.selection == 0){
        palette.fileList = [selectFile()];
    }else{
        palette.fileList = selectFolder();
    }
    palette.fileCount.text = 'file count : '+palette.fileList.length;
}

function selectFolder(){
    var inputFolder = new Folder(palette.DEFAULT_IMPORT_FOLDER);
    inputFolder = inputFolder.selectDlg("Import items from folder...");        
    palette.folderInput.text = inputFolder.toString();
    return inputFolder.getFiles("*.mp4");
}

function selectFile(){
    var file = File.openDialog("Select files", "*.mp4; *.aep", true);
    palette.folderInput.text = file.toString();
    return file;
}

function getWorkingFolder(){
    return inputFolder.toString();
}

function onStart(){
    $.writeln("startBtn");
    var alert = "-- START --\n part : "+palette.partIndexInput.text+"\n files : "+palette.fileList+"("+palette.fileList.length+")\n process open file : "+palette.currentFileCb.value;
    $.writeln(alert);
    var status = BridgeTalk.getStatus("aftereffects");
    $.writeln("AE status : "+status);
    if(status == "ISNOTRUNNING"){
        if(palette.currentFileCb.value){
            alert("aucune instance d'After Effects en cours");
        }else{
//            aftereffects.open(palette.fileList);
        }
    }else if(status == "IDLE"){
        palette.startBtn.enabled = false;
        startProcess();
    }
}

function startProcess(){
    process = MainProcess();
    process.setPartIndex(palette.partIndexInput.text);
    if(palette.currentFileCb.value){
        process.start();
    }else{
        process.start(palette.fileList);
    }
}

function showList(){
    alert(palette.fileList.join("\n"));
}

/*    // work on open aep file ?
    if(palette.currentFileCb.value){
        
    }else{
        var inputObject = File(palette.folderInput.text);
        if((palette.jobTypeList.selection == 0 && inputObject instanceof File && inputObject.exists) || (palette.jobTypeList.selection == 1 && inputObject instanceof Folder && inputObject.exists)){
            
        }else{
            alert('Sélectionne un fichier ou un dossier valide à traiter');
            return;
        }
    }
    
    process.startFile();*/



var palette = Palette(this);


// #include "../include/lib.jsxinc"