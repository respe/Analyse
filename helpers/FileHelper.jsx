var FileHelper = function(){

}

// public static methods:
	FileHelper.getExtension = function(filename){
	    var dot_index = filename.lastIndexOf('.');
	    return filename.substring(dot_index);
	}