/**  ----------------------------------------------------------------------------------------------------------------------------------------------------------
*   PALETTE
*   
*   Display graphic UI Control
*/

function Palette()
{
    // Create and show a floating palette
    var palette = new Window("palette","FX Process Manager");

    // Display Elements
    palette.currentFileCb =     palette.add('checkbox', undefined, 'Process open file');
                                
                                palette.add('statictext', undefined, 'Job type :');
    palette.jobTypeList =       palette.add('DropDownList', undefined, ['File', 'Folder']);
                                jobTypeList.selection = 0;

    palette.searchLabel =       palette.add('statictext', undefined, 'File :');
    palette.folderInput =       palette.add('edittext', undefined, '<browse file>', { characters: 30 }); // TODO ? input with current folder

    palette.browseBtn   =       palette.add('button', undefined, "...");

                                palette.add('statictext', undefined, 'Part index :');
    palette.partIndexInput =    palette.add('edittext', undefined, this.partIndex, { characters: 2 });
    
    palette.fileCount   =       palette.add('statictext', undefined, 'file count : '+this.fileList.length);
    palette.showListBtn =       palette.add('button', undefined, "Show List");

    palette.startBtn    =       palette.add('button', undefined, "Start");

    palette.infoLabel   =       palette.add('statictext', undefined, "info : ");

    palette.show();

    return palette;
}