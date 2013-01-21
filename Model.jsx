/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   Model
*   
*   
*/
function Model()
{

    var data = {
                "menu":
                {
                    "id": "file",
                    "value": "File",
                    "popup":
                    {
                        "menuitem":
                        [
                            { "value": "New", "onclick": "CreateNewDoc()" },
                            { "value": "Open", "onclick": "OpenDoc()" },
                            { "value": "Close", "onclick": "CloseDoc()" }
                        ]
                    }
                }

    this.DEFAULT_IMPORT_FOLDER = '//CSV_BACKUP/main_raid5/CSV/Gopro';
    outputFolder = '//CSV_BACKUP/main_raid5/CSV/Squid/aep'
    squidNetCommand = 
    fileList  = [];
    fileIndex = 0;

    partIndex = 0;
    partFrameCount = 5400;

    function setPartIndex(p)
    {
        partIndex = p;
    }

    function setJobType(p){
        jobType = p;
        palette.folderInput.text = (jobType==0)?"<browse file>":"<browse folder>";
        palette.searchLabel.text = (jobType==0)?"File":"Folder";
    }

    function setFileList(p)
    {
        fileList = p;
        palette.folderInput.text = fileList.toString();
        palette.fileCount.text = 'file count : '+fileList.length;
    }
}