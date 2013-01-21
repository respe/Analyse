/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   FX Process
*   params : fileList
*/

            if(control.isCurrentFile){
                process.start();
            }else{
                process.start(palette.fileList);
            }
            
function MainProcess()
{
    var process = new Object();
    var fileProcess;
    var aepFile = app.project.file;

    var outputPath = '//CSV_BACKUP/main_raid5/CSV/Squid/aep';
/* TEST */outputPath = '/D/test'; 
    var outputFolder = new Folder(outputPath);

    var jobFolder;
    var partFolder;

    var filesList = [];

    var partLength = 180;
    var stabWord = "Stabilisation";

    var index = 0;
    var numFiles = 0;
    var currentFile;

    var partIndex = 0;

    // Public

    process.getFileProcess = function(){
        return fileProcess;
    }

    process.getPartProcess = function(){
        return fileProcess.getPartProcess();
    }

    process.init = function()
    {
        if (!app.project) {
            app.newProject();
        }

        if(app.isoLanguage == "en_US"){
            process.stabWord = "Stabilization";
        }
    }

    process.setPartIndex = function(value){
        partIndex = value;
    }


        
    process.start = function(files){
        filesList = files;
        index = 0;
        numFiles = filesList.length;

        var ext = getExtension(filesList[index].name);
        if(ext == "aep"){
            analyseSequence();
        }else{
            processFile(files[index]);
        }

        startJob();
    }

    process.nextFile = function(){
        index ++;
        startJob();
    }

    // Private
    function startJob(){
        currentFile = filesList[index];
        app.open(currentFile);
        startFile();
    }

    function startFile(){
        fileProcess = FileProcess(process);
        fileProcess.setPartIndex(partIndex);
        fileProcess.start();
        palette.infoLabel = "process : "+filesList.length+" file(s) \n current :"+currentFile;
    }

    function getExtension(filename){
        var dot_index = filename.lastIndexOf('.');
        return filename.substring(dot_index);
    }

    return process;
}