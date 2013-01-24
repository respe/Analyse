/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   Model
*   
*   
*/
function Model()
{
    DEFAULT_IMPORT_PATH = '//CSV_BACKUP/main_raid5/CSV/Gopro';
    DEFAULT_OUTPUT_PATH = '//CSV_BACKUP/main_raid5/CSV/Squid/aep'

    fileList  = [];
    fileIndex = 0;

    partIndex = 0;
    partFrameCount = 5400;


    function getFileList()
    {
        return fileList;
    }
    function setFileList(p)
    {
        fileList = p;
    }


    function getSquidCommand(sceneFile, outputDir, videoFilename, jobId, endFrame, fileName)
    {
        return '"c:\\Program Files (x86)\\SquidNetSoftware\\SquidNet\\squidnet.exe" --submit --template AE --appPath $APP(AFTER-EFFECTS) --renderIndex 1 --startFrame 0 --stepFrame 1 --priority 12 --multiProcess --useAllCores --sceneFile "'+ sceneFile +'" --outputDir "'+ outputDir +'" --videoFilename "'+ videoFilename +'" --jobId "'+ jobId +'" --endFrame '+endFrame+' --framePerSlice 1050 --compAction leave --sceneName "'+fileName+'" --username "RemiE"';
    }


    function getPartIndex()
    {
        return partIndex;
    }
    function setPartIndex(p)
    {
        partIndex = p;
    }

    function getJobType()
    {
        return jobType;
    }
    function setJobType(p){
        jobType = p;
        palette.folderInput.text = (jobType==0)?"<browse file>":"<browse folder>";
        palette.searchLabel.text = (jobType==0)?"File":"Folder";
    }
}