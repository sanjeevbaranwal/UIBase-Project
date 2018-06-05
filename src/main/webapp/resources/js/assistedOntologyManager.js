document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
/* document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>"); */
document.writeln("<script type='text/javascript' src='resources/js/nicEdit.js'></script>");
var myurl = localStorage.getItem( 'globalCEUrl');
function showChangePasswordModal(event){
	event.preventDefault();
	//$('#myModal').css('display','block');
	$("#mynewModal").fadeIn(600);
	$('#currentPassword').css('border','');
	$('#currentPassAlert').hide();
	$('#newPassword').css('border','');
	$('#newPassAlert').hide(); 
	$('#confirmPassword').css('border','');
	$('#confirmPassAlert').hide();
}
function closePasswordModel(event){
	event.preventDefault();
	//$('#myModal').css('display','none');
	$("#mynewModal").fadeOut(600);
}


var jsonData = '';
var superClassesJson = '';
var expandFlag = false;
var inputCategory = '';
var categoryNode = '';
var transactionId = '';
var inputText = '';
var questionNode = '';
//var parentNode ="";
$(document).ready(function(){
	//First call the tree data to create data object completely.
	inputCategory = getURLParameter('param1');
	inputCategory = decodeURIComponent(inputCategory);
	transactionId = getURLParameter('param2');
	inputText = getURLParameter('param3');
	inputText = decodeURIComponent(inputText);
	questionNode = getURLParameter('param4');
	if('None of the above' != inputCategory) {
		getAllSuperClasses(inputCategory);
	}
	populateAllTreeNodeData();
	setTimeout(function(){
		createTreeView(expandFlag);
	}, 3000);
	onLoaddialog1Hide();
});

function onLoaddialog1Hide(){
	 $("#dialog1").dialog({
		autoOpen : false,
	dialogClass : 'myTitleClass'
	 }); 
}

/**
 * This function is used when you want to load the childs on click on + button.
 * */
function populateTreeNodeData(nodeName) {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'getResolutionForSubClasses/' + nodeName;
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : '',
		cache : false,
		beforeSend : function(xhr) {
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
			jsonData = response;
			expandFlag = true;
			//createTreeView(expandFlag);
		},
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	});
}

function getAllSuperClasses(nodeName) {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'getAllSuperClasses/' + nodeName;
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : '',
		cache : false,
		beforeSend : function(xhr) {
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
			superClassesJson = response;			
		},
		error : function(xhr, status, error) {
			//alert(xhr.responseText);
		}
	});
}

function checkSuperClass(nodeName)
{
	var isFound = false;
	if(superClassesJson!='')
	{
		var obj1 = JSON.parse(superClassesJson);
		for(var k=0; k<obj1.length;k++)
		{
			if(obj1[k] == nodeName)
			isFound = true;
		}
	}
	
	return isFound;
}
/**
 * This function is used when you want to load the all the childs at a time.
 * */
function populateAllTreeNodeData() {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'fetchTreeData/base';
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : '',
		cache : false,
		beforeSend : function(xhr) {
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
			//var resVal = JSON.stringify(response);
			jsonData = response;
			expandFlag = true;
			//createTreeView(expandFlag);
		},
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	});
}
function PlaceHolderChange(){
	var placeHolderValue=$("#categoryName_id").val();
	$("#definitionName_id").attr("placeholder", "Type Definition of "+placeHolderValue);
}

/**
 * This function is used to create a tree view.
 * */
function createTreeView(expandFlag) {
	var activeNode;
	var isFolder = false;

	$("#btnClose").click(function(e) {
		HideDialog();
		e.preventDefault();
	});

	$("#btnSubmit").click(
		function(e) {
			var name = document.getElementById("namearea").value;
			if (isFolder)
				activeNode.createChildNode(name, true, 'resources/images/blue_key.png', null, 'context1');
			else
				activeNode.createChildNode(name, true, 'resources/images/key_green.png', null, 'context1');
			HideDialog();
	});

	//Initializing Tree Context Menu Structure
	var contex_menu = {
			'context1' : {
				elements : [ {
					text : 'Add SubCategory',
					icon : 'resources/images/blue_key.png',
					action : function(node) {
					 parentNode=node.text;
						//alert(parentNode);
						$('#expandTreeCategory').html('<div style="width: 99%;height: 99%;float: right;border: solid 1px black;"> <div style="width: 98%;height: 98%;float: right;margin-left: -19%;border= solid 1px grey;"> <table id="def" style="height:100%;width: 99%;"> <tbody> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Sub Category Name</font><div><br> <textarea placeholder="Sub Category Name" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="categoryName_id" onkeyup="PlaceHolderChange();"/> </td> </tr> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Definition</font></div><br><textarea placeholder="Type definition of....." style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="definitionName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">identifier</font></div><textarea placeholder="identifier" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="identifierName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">nameToShow</font></div><textarea placeholder="nameToShow" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="nameToShowName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">specialCaseKeys</font></div><textarea placeholder="specialCaseKeys" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="specialCaseKeysName_id"/> </td> </tr> <tr> <td> <button type="submit" onclick="AddCategorysubmitfunction()" style="border-radius: 6px; float:right;background: #3885D2;color: white;font-size: 15px;border: 1px solid black; height:40px; width:120px">Submit</button> </td> </tr> </tbody> </table> </div> </div>');
						$('#expandTree').hide();
						$('#editClassDetails').hide();
						$('#expandTreeCategory').show();
						//alert(node.text+".................!");
					}/*,text : 'Delete Category',
					icon : 'resources/images/blue_key.png',
					action : function(node) {
					 parentNode=node.text;
						deleteCategory();
					} ,
					submenu : {
						elements : [ {
							text : 'Toggle Node',
							icon : 'resources/images/leaf.png',
							action : function(node) {
								node.toggleNode();
							}
						}, {
							text : 'Expand Node',
							icon : 'resources/images/leaf.png',
							action : function(node) {
								node.expandNode();
							}
						}, {
							text : 'Collapse Node',
							icon : 'resources/images/leaf.png',
							action : function(node) {
								node.collapseNode();
							}
						}, {
							text : 'Expand Subtree',
							icon : 'resources/images/tree.png',
							action : function(node) {
								node.expandSubtree();
							}
						}, {
							text : 'Collapse Subtree',
							icon : 'resources/images/tree.png',
							action : function(node) {
								node.collapseSubtree();
							}
						}, {
							text : 'Delete Node',
							icon : 'resources/images/delete.png',
							action : function(node) {
								node.removeNode();
							}
						}, ]
					} */
				}/*,  {
					text : 'Child Actions',
					icon : 'resources/images/blue_key.png',
					action : function(node) {
					},
					submenu : {
						elements : [ {
							text : 'Create TypeFolder',
							icon : 'resources/images/add1.png',
							action : function(node) {
								document.getElementById("namearea").value = "";
								ShowDialog(true);
								activeNode = node;
								isFolder = true;
							}
						}, {
							text : 'Create TypeLink',
							icon : 'resources/images/add1.png',
							action : function(node) {
								document.getElementById("namearea").value = "";
								ShowDialog(true);
								activeNode = node;
								isFolder = false;
							}
						}, {
							text : 'Delete Child Nodes',
							icon : 'resources/images/delete.png',
							action : function(node) {
								node.removeChildNodes();
							}
						} ]
					}
				}  */]
			}
		};

	//Creating the tree
	tree = createTree('div_tree', 'white', contex_menu);
	div_log = document.getElementById('div_log');

	//Setting custom events
	tree.nodeBeforeOpenEvent = function(node) {
		div_log.innerHTML += node.text + ': Before expand event<br/>';
	}

	tree.nodeAfterOpenEvent = function(node) {
		div_log.innerHTML += node.text + ': After expand event<br/>';
	}

	tree.nodeBeforeCloseEvent = function(node) {
		div_log.innerHTML += node.text + ': Before collapse event<br/>';
	}
	
	//alert('In function before create tree - jsondata is - ' + jsonData);
	var obj = JSON.parse(jsonData);
	
	//If you want to exapnd tree at load then make expandFlag to true.
	node1 = tree.createNode('Categories', expandFlag, 'resources/images/star.png', null, null, 'context1');
	//alert(obj['1']["children"]);
	//var childs = obj['1']["children"].split(',');
	
	//obj[key] - from where it consider it as root.
	var childs = obj['Categories']["children"].split(',');
	if (childs[0] != "") {
		for (var i = 0; i < childs.length; i++) {
				var superClassFound  =false;
			if('None of the above' != inputCategory)
			{
				superClassFound = checkSuperClass(obj[childs[i]]["text"]);
			}			
			if(superClassFound)
				node2 = node1.createChildNode(obj[childs[i]]["text"], true,	'resources/images/blue_key.png', null, 'context1');
			else
				node2 = node1.createChildNode(obj[childs[i]]["text"], false,	'resources/images/blue_key.png', null, 'context1');
		
			if(inputCategory == obj[childs[i]]["text"]){
				categoryNode = node2;
			}
			var subchilds = obj[childs[i]]["children"].split(',');
			if (subchilds[0] != "") {
				renderChildrens(obj, node2, subchilds);
			}
		}
	}
	//Rendering the tree
	tree.drawTree();
	if('None of the above' != inputCategory){
		if('Categories' != inputCategory){
		tree.entityDetailsOfNode(categoryNode);
		tree.detailsOfNode(categoryNode);
		tree.selectNode(categoryNode);
		}
		//image2
		$('#progressImage').attr('src','resources/images/2.png');
		if((questionNode != null && questionNode !='' && questionNode != 'undefined')){
			editEntiryByQuestionNode(questionNode);
			//image3
			$('#progressImage').attr('src','resources/images/3.png');
		}
	}else {
		//image1
		$('#progressImage').attr('src','resources/images/1.png');
	}
	$("#divLoading").hide();
}

function renderChildrens(obj, pnode, childs) {
	for (var i = 0; i < childs.length; i++) {
		var superClassFound  =false;
		if('None of the above' != inputCategory)
		{
			superClassFound = checkSuperClass(obj[childs[i]]["text"]);
		}
		if(superClassFound)
			cnode = pnode.createChildNode(obj[childs[i]]["text"], true,	'resources/images/blue_key.png', null, 'context1');	
		else		
			cnode = pnode.createChildNode(obj[childs[i]]["text"], false,	'resources/images/blue_key.png', null, 'context1');	
	
		if(inputCategory == obj[childs[i]]["text"]){
			categoryNode = cnode;
		}
		var sub = obj[childs[i]]["children"].split(',');
		if (sub[0] != "")
			renderChildrens(obj, cnode, sub);
	}
}

function ShowDialog(modal) {
	$("#overlay").show();
	$("#dialog").fadeIn(300);

	if (modal) {
		$("#overlay").unbind("click");
	} else {
		$("#overlay").click(function(e) {
			HideDialog();
		});
	}
}

function HideDialog() {
	$("#overlay").hide();
	$("#dialog").fadeOut(300);
}

var finalNodeArray = new Array();

function submitCategories() {
	var parent = document.getElementById("div_tree");
	var startNode = parent.childNodes[0].childNodes[0].childNodes[2];
	var childs = startNode.childNodes;
	for (var i = 0; i < childs.length; i++) {
		var child = childs[i];
		var name = child.childNodes[1].childNodes[1].text;

		var parentsubchilds = child.childNodes[2].childNodes;
		var childsStr = "";
		for (var j = 0; j < parentsubchilds.length; j++) {
			var parsubchild = parentsubchilds[j];
			childsStr = childsStr + parsubchild.childNodes[1].childNodes[1].text + ",";
		}
		finalNodeArray[finalNodeArray.length] = "{'id':'" + name + "','Parent':'Categories'," + "children:'" + childsStr + "'}";
	}

	for (var k = 0; k < childs.length; k++) {
		var child = childs[k];
		addChildrens(child.childNodes[2], child.childNodes[2].parentNode.childNodes[1].childNodes[1].text);
	}
	//alert(finalNodeArray.length);
}

function addChildrens(node, parentName) {
	var subchilds = node.childNodes;
	for (var i = 0; i < subchilds.length; i++) {
		var subchild = subchilds[i];
		var name = subchild.childNodes[1].childNodes[1].text;
		var parentsubchilds = subchild.childNodes[2].childNodes;
		var childsStr = "";
		for (var j = 0; j < parentsubchilds.length; j++) {
			var parsubchild = parentsubchilds[j];
			childsStr = childsStr + parsubchild.childNodes[1].childNodes[1].text + ",";

		}

		finalNodeArray[finalNodeArray.length] = "{'id':'" + name + "','Parent':'" + parentName + "'," + "children:'" + childsStr + "'}";
		addChildrens(subchild.childNodes[2], subchild.childNodes[2].parentNode.childNodes[1].childNodes[1].text);
	}
}

function setScreenValuesOntologyManager() {
	/*alert("here");*/
	loadConfig();
	var h = window.innerHeight - 115;
	var w = ((window.innerWidth / 10) * 3)

	$("#headerRow").height(85);
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height((h / 10) * 9);
	$("#tabRow").width(w);
	//$("#tabRow1").height($("#tabRow").height() + 5);
	//$("#tabRow1").width($("#tabRow").width() - 10);
	$("#sltbl").height($("#tabRow").height() - 50);
	$("#sltbl").width($("#tabRow").width() - 10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("height", '75%');
	/*  $("#dialog").dialog({
		autoOpen : false,
	dialogClass : 'myTitleClass'
	 }); */
	setTimeout(function() {
		//loadUserProfilerValuesOntologyManager();

	}, 1000);
}


function showDebitButton(){
	$('#debitButton').removeAttr("style");
}

function showexpandTree(){
	$('#expandTree').show();
	//$('#table_left').show();
	
	//$('#expandTree').attr("style", "width:100%;height:425px;");
}

function clickeditfunction(){
	var init_def= $('#definition_initial').text();
	var init_identifier= $('#identifier_initial').text();
	var init_nameToShow= $('#nameToShow_initial').text();
	var init_specialCaseKeys= $('#specialCaseKeys_initial').text();
	$("#expandTree").hide();
	$('#editClassDetails').html('<div style="width: 99%;height: 99%;float: right;border: solid 1px grey;font-family: Verdana, sans-serif;"> <div style="width: 98%;height: 98%;float: right;margin-left: -19%;border= solid 1px grey;"> <table id="def" style="height:100%;width: 99%;"> <tbody> <tr> <td style="width: 90%;"> <p style="color:mediumblue;"> <font>Definition</font></p><textarea placeholder="definition" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="3" cols="30" id="definition_id"/> </td> <td></td> </tr> <tr> <td> <p> <font style="color:mediumblue;">Identifier</font></p><textarea placeholder="identifier" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="identifier_id"/> </td> </tr> <tr style="display : none"> <td style="border-bottom : 1px solid black;"> <p> <font>nameToShow</font></p> <textarea placeholder="nameToShow" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="nameToShow_id"/> </td> </tr> <tr style="display : none"> <td style="border-bottom : 1px solid black;"> <p> <font>specialCaseKeys</font></p> <textarea placeholder="specialCaseKeys" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="specialCaseKeys_id"/> </td> </tr> <tr> <td> <button type="submit" onclick="clicksubmitfunction()" style="border-radius: 6px; float:right;background: #3885D2;color: white;font-size: 15px;border: 1px solid black; height:35px; width:130px;">Submit</button> </td> </tr> </tbody> </table> </div> </div>');
	$('#definition_id').val(init_def);
	$('#identifier_id').val(init_identifier);
	$('#nameToShow_id').val(init_nameToShow);
	$('#specialCaseKeys_id').val(init_specialCaseKeys);
	$('#editClassDetails').show();
	
}

function clicksubmitfunction(){
	var def= $('#definition_id').val();
	var identifier= $('#identifier_id').val();
	var nameToShow= $('#nameToShow_id').val();
	var specialCaseKeys= $('#specialCaseKeys_id').val();
	$('#expandTree').html('<div  style="width: 99%; height: 100%; float: right;"> <div id="expandTreetop" style="height: 35%;width: 100%;float : top;border : 1px solid;overflow-y : auto; "> <table id="def" style="height:100%; width:99%"> <tbody> <tr> <td style="width: 90%;font-size:15px;" class="heading_Def" > <font>Definition</font> </td> <td> <input id="Edit_id" type="image" src="resources/images/editIcon.png" onclick="clickeditfunction()" alt="Submit" style="float:right;height: 32px;" title="Click here to Edit fields"> </td> </tr> <tr style=" border-bottom: solid 1px; overflow:scroll;"> <td  id="definition_initial"style=" border-bottom: solid 1px grey;">  definition1 </td> </tr> <tr> <td style="font-size:15px;" class="heading_Def" > <font>Identifier</font> </td> </tr> <tr> <td id="identifier_initial"  style="/*border-bottom: solid 1px grey;*/" >identifier </td> </tr> <tr style="display:none;"> <td style="/* border-bottom : 1px solid black; */" class="heading_Def"> <font>nameToShow</font> </td> </tr> <tr style="display:none;"> <td id="nameToShow_initial"style="border-bottom: solid 1px grey;"> nameToShow </td> </tr> <tr style="display:none;"> <td class="heading_Def"> <font>specialCaseKeys</font> </td> </tr> <tr style="display:none;"> <td id="specialCaseKeys_initial"> specialCaseKeys</td> </tr> </tbody> </table> </div> <div id="expandTreebottom" style="height: 64%;width: 100%;float : bottom;border : 1px solid;margin-top: 3px;overflow-y : auto;"> <div style="width: 100%;height:100%;float: left;"> <table id="table_entitytitle" style="width: 100%;"> <tbody> <tr style="width:100%;background-color: steelblue;height: 29px;"> <td style="width: 100%; background-color:#3885D2;"> <div style="float: left; width: 20%;height: 23px;font-size: 15px; color:white; padding-left: 2px;padding-top: 2px;">Entities</div> </td> </tr> </tbody> </table> <div/> <table id="table_entitybody" style="width: 50%;margin-left: 4%;margin-right: 0px;"> <tbody> <tr style="width: 622px;/* background-color: steelblue; */height: 25px;"> <td  id="entity1_id"style="width: 70%;background-color: #3885D2;padding-left: 7px;color: white;">Entity1</td> <td style=" width: 10%; "> <img id="editimage"  onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> <td style=" width: 10%; "> <img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> </tr> <tr style="width:100%;/* background-color: #3885D2; */height: 25px;"> <td id="entity2_id"style="width: 70%;background-color: #3885D2;/* padding-left: 1px; */padding-left: 7px;">Entity2</td> <td style=" width: 10%; "> <img id="editimage"  onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> <td style=" width: 10%; "> <img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> </tr> <tr style="width:100%;/* background-color: steelblue; */height: 25px;"> <td style="width: 70%;"> <br> <button type="submit" onclick="EditEntityfunction()" style="float: left;height: 30px;width: 40%;border-radius: 6px;background: #3885D2;color: white;font-size: 15px; border: 1px solid black;">Add New Entity</button> </td> </tr> </tbody> </table> </div> </div> </div>');
	
	$("#table_entitybody").empty();
	$('#table_entitybody').append(tdata);
	
	
	var json= {"className":parentNode,
	"definition":def,
	"identifiers":identifier,
	"nameToShow":nameToShow,
	"specialCaseKeys":specialCaseKeys,
	"userId": $('#loginusername').val(),
	"transactionId":transactionId
	          }
	//alert(JSON.stringify(json));
	
	$.ajax({
		url: myurl+"updateOntologyClass",
		type: 'POST',        
		data: JSON.stringify(json), 
		cache:false,
		beforeSend: function(xhr) {  
			xhr.setRequestHeader("Accept", "text/plain");  
			xhr.setRequestHeader("Content-Type", "application/json");  
		},       
		success:function(response){ 
		
		//alert(response+"..... inside success");
			$('#editClassDetails').hide();
		    $("#expandTree").show();
		    //$("#expandTreetop").show(); 
			$("#definition_initial").text(def);
			$("#identifier_initial").text(identifier);
			$("#nameToShow_initial").text(nameToShow);
			$("#specialCaseKeys_initial").text(specialCaseKeys);
			
		},
		error : function(xhr, status, error) {
			//alert(xhr.responseText);
		}
	}); 
}
/**
 * Edit existing entity
 * */	
var isExistingQuestion = false;
function EditEntityfunction(id) {
	//var newtext='';
	var str=id;
	str = str.slice(str.length-1, str.length);
	var EditEntityNo="entityNumber"+str;
	var EditEntityNumber=$("#"+EditEntityNo).text();
	return editEntiryByQuestionNode(EditEntityNumber);
}

function editEntiryByQuestionNode(questionNodeValue){
	var tempURL = myurl+"getQueAttributesByQueName/"+questionNodeValue+",base";
	$.ajax({
		url: tempURL,
		type: 'POST',        
		data: '', 
		cache:false,
		beforeSend: function(xhr) {  
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},       
		success:function(response){ 
			response=JSON.parse(response);
			//alert(response.questionDescription);
			$("#newapp_id").val(response.isOfApplication);
			$("#newapp_id").attr("readonly", "readonly"); 
			$('#newque_id').val(response.questionNodeName);
			$("#newque_id").attr("readonly", "readonly"); 
			$('#noun_id').val(response.nouns);
			$('#verb_id').val(response.verbs);
			$('#datarequired_id').val(response.dataRequired);
			$('#userprofiler_id').val(response.userProfilerDataRequired);
			$('#adjective_id').val(response.adjective);
			$('#jbpmfilename_id').val(response.jbpmFilePath);
			$('#mandatoryassertions_id').val(response.mandatoryAssertions);
			if((questionNode != null && questionNode !='' && questionNode != undefined)){
				$('#questiondescrption_id').val(response.questionVariations);
			}else {
				$('#questiondescrption_id').val(inputText +", "+ response.questionVariations);
			}
			$('#answer_id').val(response.answerDescription); 
			var answerArea = new nicEditor({maxHeight : 85,fullPanel : true}).panelInstance('answer_id');
			$('.nicEdit-main').css("font-size","14px"); 
			$('.nicEdit-main').css("font-family","calibri"); 
			isExistingQuestion = true;
		},
		error : function(xhr, status, error) {
			$("#newapp_id").val(id);
			$("#newapp_id").attr("readonly", "readonly");
		}
	}); 
	
	$("#OntologyTree").hide();
	var newText = '';
	
	newText += '<center><table border="0" width="100%" cellspacing="4" cellpadding="4" ';
	newText += '<tr height="5px"> </tr>';
	newText += '<tr bgcolor="#F1F1F1" style="background-color: #3885D2; color: white;">';
	//  	htmlText += '<td width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';		  	
	newText += '<td width="15%"><font face="arial" size="2"  ><b>Category</font></td>';
	newText += '<td width="30%"><font face="arial" size="2"  ><b>Entity Type</font></td>';
	newText += '<td width="55%"><font face="arial" size="2" ><b>Available Options for Ontology Manager</font></td>';
	newText += '</tr>';
	newText += '<tr bgcolor="#FFFFFF">'; 
	
	newText += '<td valign="top" style="width : 15%;"><table> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text" placeholder="Application Name" id="newapp_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"></td></tr> </tbody> </table> </td>';
	newText += '<td valign="top" style="width : 30%;"><table style="width : 100%;"> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text"  placeholder="Question Name" id ="newque_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"/> </td></tr> </tbody> </table> </td>';
	newText += '<td style="width : 55%"> <table> <tbody> <tr> <tr> <td valign="top" colspan="2">Sample Questions <font size="2px">(Add "," separated 5 questions)</font> </td> </tr> <tr> <td colspan="2" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Sample Questions" style="resize :none;width:465px;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="questiondescrption_id"/> </td> <td colspan="2" rowspan="1.5"align="left" style=" padding-left: 20px;align-items: left;"> <div> <div style="float: left;"> <img id="addquelogo" src="resources/images/addque.jpg" style="width: 23px;margin-top: 8px; display:none;/* margin-left: 10px; */" title="Click Here to add Question" alt="Multiple Question"> </div> <div style="float: left;"> </div> </div> </div> </td> </tr> <td valign="top">Expected Answer</td> <tr> <td colspan="5" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Expectd Answer" id="answer_id"  style=" resize :none;width:672px;height:85px;font-family: calibri;font-size: 15px;" rows="3" cols="30" id="questiondescrption_id"/> </td> </tr> <td valign="top" style="display:none;">Noun</td> <td valign="top" style="display:none;">Verb</td> <td valign="top" style="display:none;">Data Required</td> </tr> <tr style="display:none;"> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Noun" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="noun_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Verb" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="verb_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Data Required" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="datarequired_id"/> </td> </tr> <tr height="5px"> </tr> <tr height="5px"> </tr> <tr> <td valign="top" style="display:none;">User Profiler</td> <td valign="top" style="display:none;">Adjective</td> <td valign="top" style="display:none;">Mandatory Assertions</td> </tr> <tr> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="User Profiler" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="userprofiler_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="Adjective" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="adjective_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="Mandatory Assertions" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="mandatoryassertions_id"/> </td> </tr> <tr height="5px"> </tr> <tr style="display:none;"> <td valign="top">JBPM File Name</td> <tr> <tr> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="JBPM File Name" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="jbpmfilename_id"/> </td> <td style="padding-left:0.2cm" colspan="2"> <div style="float:left; padding-right:96px">'
	newText += '<button type="button" class="btn btn-primary" id="submitontology_id" onclick="addArticle() "style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;" > Update </button> </div> <div> <button type="button" class="btn btn-primary" id="goBackId" onclick="GoBack()" style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;" >Back</button> </div> </td> </tr> </tbody> </table> </td>';
	newText += '</tr>';
    $("#addNewEntityOntologyTree").html(newText);
	$("#addNewEntityOntologyTree").show();
	 //loadAppNames();
	return true;
}

function AddEntityfunction(id) {
	//var newtext='';
	$('#progressImage').attr('src','resources/images/3.png')
	
	var str=id;
	str = str.slice(str.length-1, str.length);
	var EditEntityNo="entityNumber"+str;
	var EditEntityNumber=$("#"+EditEntityNo).text();
	var tempURL = myurl+"getQueAttributesByQueName/"+EditEntityNumber+",base";
	$.ajax({
		url: tempURL,
		type: 'POST',        
		data: '', 
		cache:false,
		beforeSend: function(xhr) {  
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},       
		success:function(response){ 
			response=JSON.parse(response);
			//alert(response.questionDescription);
			$("#newapp_id").val(response.isOfApplication);
			$("#newapp_id").attr("readonly", "readonly"); 
			$('#newque_id').val(response.questionNodeName);
			$("#newque_id").attr("readonly", "readonly"); 
			$('#noun_id').val(response.nouns);
			$('#verb_id').val(response.verbs);
			$('#datarequired_id').val(response.dataRequired);
			$('#userprofiler_id').val(response.userProfilerDataRequired);
			$('#adjective_id').val(response.adjective);
			$('#jbpmfilename_id').val(response.jbpmFilePath);
			$('#mandatoryassertions_id').val(response.mandatoryAssertions);
			$('#questiondescrption_id').val(inputText +", "+ response.questionVariations);
			$('#answer_id').val(response.answerDescription); 
			isExistingQuestion = true;
		},
		error : function(xhr, status, error) {
			//alert(xhr.responseText+"inside error");
			$("#newapp_id").val(id);
			$("#newapp_id").attr("readonly", "readonly");
			$('#questiondescrption_id').val(inputText);
		}
	}); 
		
	$("#OntologyTree").hide();
	var newText = '';
	newText += '<center><table border="0" width="100%" cellspacing="4" cellpadding="4" ';
	newText += '<tr height="5px"> </tr>';
	newText += '<tr bgcolor="#F1F1F1" style="background-color: #3885D2; color: white;">';
	//  	htmlText += '<td width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';		  	
	newText += '<td width="15%"><font face="arial" size="2"  ><b>Category</font></td>';
	newText += '<td width="30%"><font face="arial" size="2"  ><b>Entity Type</font></td>';
	newText += '<td width="55%"><font face="arial" size="2" ><b>Available Options for Ontology Manager</font></td>';
	newText += '</tr>';
	newText += '<tr bgcolor="#FFFFFF">'; 
	
	newText += '<td valign="top" style="width : 15%;"><table> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text" placeholder="Application Name" id="newapp_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"></td></tr> </tbody> </table> </td>';
	newText += '<td valign="top" style="width : 30%;"><table style="width : 100%;"> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text"  placeholder="Question Name" id ="newque_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"/> </td></tr> </tbody> </table> </td>';
	newText += '<td style="width : 55%"> <table style="width:100%"> <tbody> <tr> <td valign="top" colspan="2">Sample Questions <font size="2px">(Add "," separated 5 questions)</font> </td> </tr> <tr> <td colspan="2" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Sample Questions" style="resize :none;width:100%;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="questiondescrption_id"/> </td> <td colspan="2" rowspan="1.5"align="left" style=" padding-left: 20px;align-items: left; display:none; "> <div> <div style="float: left;"> <img id="addquelogo" src="resources/images/addque.jpg" style="width: 23px;margin-top: 8px; display:none;/* margin-left: 10px; */" title="Click Here to add Question" alt="Multiple Question"> </div> <div style="float: left;"> <button onclick="processUserUtteranceForNLPData()" style="height: 35px;width: 120px;/* padding-top: 6px; */ margin-left:20px;text-align: center; background-color: #3885D2;color: white;border-radius:5px">Process Question </button> </div> </div> </div> </td> </tr> <td colspan="2" valign="top">Expected Answer</td> <tr> <td colspan="2" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Expected Answer" id="answer_id"  style=" resize :none;width:800px;height:85px;font-family: calibri;font-size: 15px;" rows="3" cols="30" id="questiondescrption_id"/> </td> </tr> <tr style="display:none;"> <td valign="top">Noun</td> <td valign="top">Verb</td> <td valign="top">Data Required</td> </tr> <tr style="display:none;"> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Noun" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="noun_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Verb" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="verb_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Data Required" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="datarequired_id"/> </td> </tr> <tr height="5px"> </tr> <tr height="5px"> </tr> <tr> <td valign="top" style="display:none;">User Profiler</td> <td valign="top" style="display:none;">JBPM File Name</td> <td valign="top" style="display:none;">Adjective</td> <td valign="top" style="display:none;">Mandatory assertions</td> </tr> <tr> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="User Profiler" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="userprofiler_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="JBPM File Name" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="jbpmfilename_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="Adjective" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="adjective_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="Mandatory Assertions" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="mandatoryassertions_id"/> </td> </tr> <tr height="5px"> </tr> <tr> <td width="0" style="padding-top:0cm" > <div style="padding-right:96px"> <button type="button" class="btn btn-primary" id="submitontology_id" onclick="processUserUtteranceForNLPData() "style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;" > Create </button> </div> </td> <td style="padding-left:0.2cm"> <div style="padding-top: 5px;"> <button type="button" class="btn btn-primary" id="goBackId" onclick="GoBack()" style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;" >Back</button> </div> </td> </tr> </tbody> </table> </td>';
	newText += '</tr>';
     $("#addNewEntityOntologyTree").html(newText);
	 var answerArea = new nicEditor({maxHeight : 85,fullPanel : true}).panelInstance('answer_id');
	 $('.nicEdit-main').css("font-size","14px"); 
	$('.nicEdit-main').css("font-family","calibri"); 
	 $("#addNewEntityOntologyTree").show();	  
	 //loadAppNames();
	return true;
		
}
	
function ViewEntityfunction(id) {
	//var newtext='';
	var str=id;
	str = str.slice(str.length-1, str.length);
	var EditEntityNo="entityNumber"+str;
	var EditEntityNumber=$("#"+EditEntityNo).text();
	var tempURL = myurl+"getQueAttributesByQueName/"+EditEntityNumber+ ",base";
	$.ajax({
		url: tempURL,
		type: 'POST',        
		data: '', 
		cache:false,
		beforeSend: function(xhr) {  
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},       
		success:function(response){ 
		//alert(response);
			response=JSON.parse(response);
			
			//alert(response.questionDescription);
			$("#newapp_id").val(response.isOfApplication);
			$("#newapp_id").attr("readonly", "readonly"); 
			
			$('#newque_id').val(response.questionNodeName);
			$("#newque_id").attr("readonly", "readonly"); 
			
			$('#noun_id').val(response.nouns);
			$("#noun_id").attr("readonly", "readonly"); 
			
			$('#verb_id').val(response.verbs);
			$("#verb_id").attr("readonly", "readonly");
			
			$('#datarequired_id').val(response.dataRequired);
			$("#datarequired_id").attr("readonly", "readonly");
			
			$('#userprofiler_id').val(response.userProfilerDataRequired);
			$("#userprofiler_id").attr("readonly", "readonly");
			
			$('#adjective_id').val(response.adjective);
			$("#adjective_id").attr("readonly", "readonly");
			
			$('#mandatoryassertions_id').val(response.mandatoryAssertions);
			$("#mandatoryassertions_id").attr("readonly", "readonly");
			
			$('#questiondescrption_id').val(response.questionVariations);
			$("#questiondescrption_id").attr("readonly", "readonly");
			
			$('#answer_id').val(response.answerDescription); 
			$("#answer_id").attr("readonly", "readonly");
			var answerArea = new nicEditor({maxHeight : 85,fullPanel : true}).panelInstance('answer_id');
			$('.nicEdit-main').attr('contenteditable','false');
			$('.nicEdit-main').css("font-size","14px"); 
			$('.nicEdit-main').css("font-family","calibri"); 
			
			$('#jbpmfilename_id').val(response.jbpmFilePath);
			$("#jbpmfilename_id").attr("readonly", "readonly");
			isExistingQuestion = true;
		},
		error : function(xhr, status, error) {
			//alert(xhr.responseText+"inside error");
			$("#newapp_id").val(id);
			$("#newapp_id").attr("readonly", "readonly");
		}
	}); 
		
	$("#OntologyTree").hide();
	var newText = '';
	newText += '<center><table border="0" width="100%" cellspacing="4" cellpadding="4" ';
	newText += '<tr height="5px"> </tr>';
	newText += '<tr bgcolor="#F1F1F1" style="background-color: #3885D2; color: white;">';
	//  	htmlText += '<td width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';		  	
	newText += '<td width="15%"><font face="arial" size="2"  ><b>Category</font></td>';
	newText += '<td width="30%"><font face="arial" size="2"  ><b>Entity Type</font></td>';
	newText += '<td width="55%"><font face="arial" size="2"  ><b>Available Options for Ontology Manager</font></td>';
	newText += '</tr>';
	newText += '<tr bgcolor="#FFFFFF">'; 
	
	newText += '<td valign="top" style="width : 15%;"><table> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text" placeholder="Application Name" id="newapp_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"></td></tr> </tbody> </table> </td>';
	newText += '<td valign="top" style="width : 30%;"><table style="width : 100%;"> <tbody><tr><td width="0" style="padding-top:0cm" rowspan="1.5"> <input type="text"  placeholder="Question Name" id ="newque_id" style="width:98%;height: 25px;font-size:18px;font-family: calibri;"/> </td></tr> </tbody> </table> </td>';
	newText += '<td style="width : 55%"> <table> <tbody> <tr> <tr> <td valign="top" colspan="2">Sample Questions <font size="2px">(Add "," separated 5 questions)</font> </td> </tr> <tr> <td colspan="2" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Sample Questions" style="resize :none;width:465px;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="questiondescrption_id"/> </td> <td colspan="2" rowspan="1.5"align="left" style=" padding-left: 20px;align-items: left;"> <div> <div style="float: left;"> <img id="addquelogo" src="resources/images/addque.jpg" style="width: 23px;margin-top: 8px; display:none;/* margin-left: 10px; */" title="Click Here to add Question" alt="Multiple Question"> </div> <div style="float: left;"> <button onclick="processUserUtteranceForNLPData()" style="height: 35px;width: 120px;/* padding-top: 6px; */ margin-left:20px;text-align: center; background-color: #3885D2;color: white;border-radius:5px;display:none;">Process Question </button> </div> </div> </div> </td> </tr> <td valign="top">Expected Answer</td> <tr> <td colspan="5" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Expected Answer" id="answer_id"  style=" resize :none;width:672px;height:85px;font-family: calibri;font-size: 15px;" rows="3" cols="30" id="questiondescrption_id"/> </td> </tr> <td valign="top" style="display:none;">Noun</td> <td valign="top" style="display:none;">Verb</td> <td valign="top" style="display:none;">Data Required</td> </tr> <tr style="display:none;"> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea placeholder="Noun" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="noun_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Verb" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="verb_id"/> </td> <td width="0" style="padding-top:0cm" rowspan="1.5"> <textarea  placeholder="Data Required" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="datarequired_id"/> </td> </tr> <tr height="5px"> </tr> <tr height="5px"> </tr> <tr> <td valign="top" style="display:none;">User Profiler</td> <td valign="top" style="display:none;">Adjective</td> <td valign="top" style="display:none;">Mandatory assertions</td> </tr> <tr> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="User Profiler" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="userprofiler_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea  placeholder="Adjective" style=" resize :none;font-family: calibri;font-size: 15px;"rows="2" cols="30" id="adjective_id"/> </td> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="Mandatory assertions" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="mandatoryassertions_id"/> </td> </tr> <tr height="5px"> </tr> <tr> <td valign="top" style="display:none;">JBPM File Name</td> <tr> <tr> <td width="0" style="padding-top:0cm; display:none;" rowspan="1.5"> <textarea placeholder="JBPM File Name" style=" resize :none;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="jbpmfilename_id"/> </td> <td style="padding-left:0.2cm" colspan="2"> <div style="float:left; padding-right:96px"> <button type="button" class="btn btn-primary" id="submitontology_id" onclick="addArticle() "style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;display:none;" > Create Ontology</button> </div> <div> <button type="button" class="btn btn-primary" id="goBackId" onclick="GoBack()" style=" width: 135px; height: 35px; background-color: #3885D2;color: white;border-radius:5px;" >Back</button> </div> </td> </tr> </tbody> </table> </td>';
	newText += '</tr>';
     $("#addNewEntityOntologyTree").html(newText);
	 $("#addNewEntityOntologyTree").show();
	 //loadAppNames();
	return true;
		
}
	
function GoBack(){
	
	$('#progressImage').attr('src','resources/images/2.png');
	$("#addNewEntityOntologyTree").hide();
	$("#OntologyTree").show();
}

function color_change(id) {
	$(id).css("background-color", "white");
}	
	
function addArticle() {
	//var selectedOption = $('#appSelect').val();
	//var ans = $('#answer_id').val();
	var nicInstance = nicEditors.findEditor('answer_id');
	var ans = nicInstance.getContent();
	//alert(ans);
	var noun = $('#noun_id').val();
	var verb = $('#verb_id').val();
	var data_req = $('#datarequired_id').val();
	var user_profiler = $('#userprofiler_id').val();
	var adjective = $('#adjective_id').val();
	var mandatory_ass = $('#mandatoryassertions_id').val();
	var ques_descip = $('#questiondescrption_id').val();
	var selectedApplication = $('#newapp_id').val();
	var selectedQuestion = $('#newque_id').val();
	var jbpmfilepath= 'NA' ;//$('#jbpmfilename_id').val();
	
	if (ans == '' || noun == '' || verb == '' || data_req == ''
			|| user_profiler == '' || adjective == '' || mandatory_ass == ''
			|| ques_descip == '' || selectedQuestion == '') {
		alert('Please fill all the mandatory fields of ontology manager');
		if (ans == '') {
			$('#answer_id').css("background-color", "#E8E8E8 ");
			$('#answer_id').click(function() {
				color_change('#answer_id');
			});
		}

		if (noun == '') {
			$('#noun_id').css("background-color", "#E8E8E8 ");
			$('#noun_id').click(function() {
				color_change('#noun_id');
			});
		}

		if (verb == '')	{
			$('#verb_id').css("background-color", "#E8E8E8 ");
			$('#verb_id').click(function() {
				color_change('#verb_id');
			});
		}

		if (data_req == '') {
			$('#datarequired_id').css("background-color", "#E8E8E8 ");
			$('#datarequired_id').click(function() {
				color_change('#datarequired_id');
			});
		}

		if (user_profiler == '') {
			$('#userprofiler_id').css("background-color", "#E8E8E8 ");
			$('#userprofiler_id').click(function() {
				color_change('#userprofiler_id');
			});
		}

		if (adjective == '') {
			$('#adjective_id').css("background-color", "#E8E8E8 ");
			$('#adjective_id').click(function() {
				color_change('#adjective_id');
			});
		}

		if (mandatory_ass == '') {
			$('#mandatoryassertions_id').css("background-color", "#E8E8E8 ");
			$('#mandatoryassertions_id').click(function() {
				color_change('#mandatoryassertions_id');
			});
		}

		if (ques_descip == '') {
			$('#questiondescrption_id').css("background-color", "#E8E8E8 ");
			$('#questiondescrption_id').click(function() {
				color_change('#questiondescrption_id');
			});
		}
        
		return;
	}
	 if (jbpmfilepath == '') {
		$('#jbpmfilename_id').val('NA');
	}

	var newApplication= false;
	var newQuestion = isExistingQuestion == true ? false : true;
	//alert('isExistingQuestion = '+isExistingQuestion);
	/*var appNames = $('#appSelect').val().split(":");
	for (var count = 0; count < appNames.length; count++) {
		if (appNames[count].trim().length > 0
				&& appNames[count].trim() == $('#appSelect').val().trim()) {
			newApplication = false;
			break;
		}
	}*/
	var singleQuestionName = '';
	var questionVariation = $('#questiondescrption_id').val();
	var questionNames = $('#questiondescrption_id').val().split(",");
	for (var count = 0; count < questionNames.length; count++) {
		singleQuestionName = questionNames[count];
		break;
	}
	var questionDescription = singleQuestionName.trim().replace(/ /g, "_");//'this is question'//$('#questionDescription').val().trim().replace(/ /g, "_");
	var tempQuestionDescription = singleQuestionName.trim();

	var nouns = ',' + $('#noun_id').val().trim().replace(/ /g, ",") + ',';
	var verbs = ',' + $('#verb_id').val().trim().replace(/ /g, ",") + ',';
	if ($('#verb_id').val() == '') {
		verbs = 'NA';
	}
	
	var dataRequired = $('#datarequired_id').val().trim().replace(/ /g, "_");
	var isOfApplication=$('#newapp_id').val();
	var answerDescription = ans.trim();
	var mandatoryAssertions = $('#mandatoryassertions_id').val().trim().replace(/ /g, ",");
	var adjective = $('#adjective_id').val().trim().replace(/ /g, ",");
	var hasAnswer= 'ans_' + questionDescription; //'ans_test_node5';
	var followUpDescription = "Are you talking about " + tempQuestionDescription ; //'testing fd5';
	var isOfQuestion= $('#newque_id').val().trim().replace(/ /g, "_");    //'test_node_qnn5';
	var questionNodeName = isOfQuestion; //'test_node_qnn5';
	var answerNodeName = 'ans_' + questionNodeName; //'ans_test_node5';
	var followUpNodeName = 'FU_' + questionNodeName; //'FU_test_node5';
	var hasFollowUpQuestion=followUpNodeName;
	var fileid = "ranjit@123";
	var fileName = "BaseOntology";
	var createdDate = new Date();
	var userProfilerDataRequired = $('#userprofiler_id').val();
	
	if ($('#mandatoryassertions_id').val().trim() == '') {
		mandatoryAssertions = 'NA';
	}else {
		var tempmandatoryAssertions = '';
		var wordsArray = $('#mandatoryassertions_id').val().trim().replace(
				/,/g, " ").split(' ');
		for (var i = 0; i < wordsArray.length; i++) {
			if (wordsArray[i].trim().length > 0) {
				tempmandatoryAssertions += ',' + wordsArray[i];
			}
		}
		tempmandatoryAssertions += ',';
		mandatoryAssertions = tempmandatoryAssertions;
	}
	if ($('#datarequired_id').val().trim() == '') {
		dataRequired = 'NA';
	} else {
		var tempdataRequired = '';
		var wordsArray = $('#datarequired_id').val().trim().replace(/,/g, " ")
				.split(' ');
		for (var i = 0; i < wordsArray.length; i++) {
			if (wordsArray[i].trim().length > 0) {
				tempdataRequired += ',' + wordsArray[i];
			}
		}
		dataRequired = tempdataRequired.substring(1);
	}

	answerDescription = answerDescription.replace(/(?:\r\n|\r|\n)/g, '<br />');
	if(answerDescription.indexOf("Did you get the information you are looking for") == -1)
		answerDescription += '<br/><br/> Did you get the information you are looking for? (Yes / No)';

	questionDescription = tempQuestionDescription;
	var json = {
		"fileId" : fileid,
		"fileName" : fileName,
		"createdDate" : createdDate,
		"questionDescription" : questionDescription,
		"nouns" : nouns,
		"verbs" : verbs,
		"dataRequired" : dataRequired,
		"mandatoryAssertions" : mandatoryAssertions,
		"adjective" : adjective,
		"isOfApplication" : isOfApplication,
		"hasAnswer" : hasAnswer,
		"hasFollowUpQuestion" : hasFollowUpQuestion,
		"followUpDescription" : followUpDescription,
		"answerDescription" : answerDescription,
		"isOfQuestion" : isOfQuestion,
		"questionNodeName" : questionNodeName,
		"answerNodeName" : answerNodeName,
		"followUpNodeName" : followUpNodeName,
		"newApplication" : newApplication,
		"newQuestion" : newQuestion,
		"userProfilerDataRequired" : userProfilerDataRequired,
		"questionVariations": questionVariation,
		"jbpmFilePath":jbpmfilepath,
		"userId": $('#loginusername').val(),
		"transactionId":transactionId
	}
	//alert(JSON.stringify(json));
	$.ajax({
		url : myurl+"modifyOntologyNode",
		type : 'POST',
		data : JSON.stringify(json),
		cache : false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "text/plain");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		success : function(response) {
			var msgToShow='Data updated successfully';
			$("#dialog1").dialog('open');
			$('.ui-dialog-titlebar-close').hide();
			ChangeMessageForUpdate(msgToShow,transactionId);
			//AutoCloseDialogBox(4000);
			/*alert(response);
			$('#answer_id').val('');
			$('#newque_id').val('');
			$('#newapp_id').val('');
			$('#noun_id').val('');
			$('#verb_id').val('');
			$('#datarequired_id').val('');
			$('#userprofiler_id').val('');
			$('#adjective_id').val('');
			$('#mandatoryassertions_id').val('');
			$('#questiondescrption_id').val('');
			$('#jbpmfilename_id').val('');
			$('#newque_id').attr("style", "display:none");
			$('#newapp_id').attr("style", "display:none");
			
			
			updateStatusForAssistedLearning(transactionId);
			window.location.href = "assistedOntologyManager?param1="+encodeURIComponent(inputCategory)+"&param2="+transactionId+"&param3="+encodeURIComponent(inputText)+"&param4="+questionNode;
		*/},
		error : function(xhr, status, error) {
			$('#answer_id').val('');
			$('#newque_id').val('');
			$('#newapp_id').val('');
			$('#noun_id').val('');
			$('#verb_id').val('');
			$('#datarequired_id').val('');
			$('#userprofiler_id').val('');
			$('#adjective_id').val('');
			$('#mandatoryassertions_id').val('');
			$('#questiondescrption_id').val('');
			$('#jbpmfilename_id').val('');
			$('#newque_id').attr("style", "display:none");
			$('#newapp_id').attr("style", "display:none");
			//loadAppNames();
			$("#dialog").dialog('open');
			//Change content on the fly
			ChangeMessage("Error Connecting to Service! Please try again later.");
			//Auto Close JQueryUI Dialog Box
			AutoCloseDialogBox(4000);
		}
	});
}

function processUserUtteranceForNLPData(){
	//enableAllInputs();
	var inputData = $('#questiondescrption_id').val();
	var tempURL = myurl+'getNounVerbMandatoryAssertion/'+JSON.stringify(inputData);
	$.ajax({
        url: tempURL,
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
            //xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
			//alert(response+" !!!!!!!!!!!!!!!!!!")
        	//$('#divLoading').hide();
        	//var resVal = JSON.stringify(response);
			//alert(resVal);
        	var obj = JSON.parse(response);
        	var nouns = obj.nouns;
        	var verbs = obj.verbs;
        	var manwords = obj.mandatoryAssertions;
        	//$('#noun_id').val(nouns); 
            if(nouns!='') $('#noun_id').val(nouns);   
 			 else   $('#noun_id').val("NA");
			//$('#verb_id').val(verbs); 
        	if(verbs!='') $('#verb_id').val(verbs);   
 			 else   $('#verb_id').val("NA");  	
			 
        	$('#mandatoryassertions_id').val(manwords);
			$('#datarequired_id').val('NA');
			$('#userprofiler_id').val('NA');
			$('#adjective_id').val('NA');
			addArticle();
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}

function AddCategorysubmitfunction(){
	
	$('#progressImage').attr('src','resources/images/2.png')
	if($('#categoryName_id').val()=='' || $('#definitionName_id').val()=='') {
		alert("Fill all fields");
        if ($('#categoryName_id').val()=='') {
		$('#categoryName_id').css("background-color", "#E8E8E8 ");
		$('#categoryName_id').click(function() {
			color_change('#categoryName_id');
		}); }
		
		 if ($('#definitionName_id').val()=='') {
		$('#definitionName_id').css("background-color", "#E8E8E8 ");
		$('#definitionName_id').click(function() {
			color_change('#definitionName_id');
		 }); }
		
	}else {
		var init_Name=$("#categoryName_id").val();
		init_Name = init_Name.trim().replace(/ /g, "_");
		//init_Name.replace(' ','_');
		var init_def= $('#definitionName_id').val();
		var finalValWidoutChar=$("#categoryName_id").val().trim().replace(/["~!@#$%^&*\(\)_+=`{}\[\]\|\\:;'<>,.\/?"\- \t\r\n]+/g, ' ').trim();
		var init_identifier= finalValWidoutChar;
		var init_nameToShow= finalValWidoutChar;
		var init_specialCaseKeys= finalValWidoutChar;
		var json={"className" : init_Name,
				"identifiers" : init_identifier,
				"nameToShow" : init_nameToShow,
				"definition" : init_def,
				"specialCaseKeys" : init_specialCaseKeys,
				"parent" : parentNode}
		$.ajax({
			url : myurl+"addNewClassInOntology",
			type : 'POST',
			data : JSON.stringify(json),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "text/plain");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				alert('Category added successfully.');
				//window.location.reload();
				inputCategory = init_Name;
				window.location.href = "assistedOntologyManager?param1="+encodeURIComponent(inputCategory)+"&param2="+transactionId+"&param3="+encodeURIComponent(inputText)+"&param4="+questionNode;

			},
			error : function(xhr, status, error) {
				alert(error);
			}
		});
	}	
}

function ChangeMessage(Message) {
	$("#dialog").dialog({
		width : 250
	});
	$("#dialog").dialog({
		height : 100
	});
	$("#dialog").dialog("option", "title", 'AssistedLearning');
	$("#dialog").css("background-color", "white");
	$("#dialog").html(
			'<font face="verdana" color="#A6A6A6"  size="2">' + Message
					+ '</font>');
					$('#dialog').dialog('option', 'position', 'center');
}
function ChangeMessageForUpdate(Message,transactionId) {
	$("#dialog1").dialog({
		width : 250
	});
	$("#dialog1").dialog({
		height : 100
	});
	$("#dialog1").dialog("option", "title", 'AssistedLearning');
	$("#dialog1").css("background-color", "white");
	$("#dialog1").html(
			'<font face="verdana" color="black"  size="2">' + Message
					+ '</font><div style="margin-top:2%;"><button type="submit" onclick="addArticleAlertClose(transactionId);" style="border-radius: 6px;">OK</button></div>');
}
function addArticleAlertClose(transactionId){
		$('#answer_id').val('');
			$('#newque_id').val('');
			$('#newapp_id').val('');
			$('#noun_id').val('');
			$('#verb_id').val('');
			$('#datarequired_id').val('');
			$('#userprofiler_id').val('');
			$('#adjective_id').val('');
			$('#mandatoryassertions_id').val('');
			$('#questiondescrption_id').val('');
			$('#jbpmfilename_id').val('');
			$('#newque_id').attr("style", "display:none");
			$('#newapp_id').attr("style", "display:none");
			
			
			updateStatusForAssistedLearning(transactionId);
			window.location.href = "assistedOntologyManager?param1="+encodeURIComponent(inputCategory)+"&param2="+transactionId+"&param3="+encodeURIComponent(inputText)+"&param4="+questionNode;
		
}

function updateStatusForAssistedLearning(transactionId){
	var tempURL = myurl+'updateStatusForLearning?trId='+transactionId;
	$.ajax({
        url: tempURL,
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
            //xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
			
        },
		error : function(xhr, status, error) {
			//alert(xhr.responseText);
		}
	 });
}