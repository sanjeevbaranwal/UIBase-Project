document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");

function pageOnLoad(){
	loadConfig();
	var h=window.innerHeight-115;
	$("#inputData").height( (h/10)*10);
}

function applySearch(){
	var question=$('#form_question').val();
	var fileurl=$('#form_fileurl').val();
	var category=$('#form_category').val();
	if(validateInput(question, fileurl, category)){
		doSearch(question, fileurl, category);
	}
}

function doSearch(question, fileurl, category){
	parent.location='KBSearchResults?param1='+question+'&param2='+encodeURIComponent(fileurl)+'&param3='+category;
	return;
}

function validateInput(question, fileurl, category){
	if(category == ''){
		alert('Please provide category.');
		return false;
	}
	if(question == '' && fileurl == ''){
		alert('Please provide: \n - question or \n - url/file or \n - question & url/file both.');
		return false;
	}
	return true;
}