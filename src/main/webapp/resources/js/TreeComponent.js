///// Creating the tree component
// p_div: ID of the div where the tree will be rendered;
// p_backColor: Background color of the region where the tree is being rendered;
// p_contextMenu: Object containing all the context menus. Set null for no context menu;
var tdata= '';
var parentNode ="";
function createTree(p_div,p_backColor,p_contextMenu) {
	var tree = {
		name: 'tree',
		div: p_div,
		ulElement: null,
		childNodes: [],
		backcolor: p_backColor,
		contextMenu: p_contextMenu,
		selectedNode: null,
		nodeCounter: 0,
		contextMenuDiv: null,
		rendered: false,
		///// Creating a new node
		// p_text: Text displayed on the node;
		// p_expanded: True or false, indicating wether the node starts expanded or not;
		// p_icon: Relative path to the icon displayed with the node. Set null if the node has no icon;
		// p_parentNode: Reference to the parent node. Set null to create the node on the root;
		// p_tag: Tag is used to store additional information on the node. All node attributes are visible when programming events and context menu actions;
		// p_contextmenu: Name of the context menu, which is one of the attributes of the p_contextMenu object created with the tree;
		createNode: function(p_text,p_expanded, p_icon, p_parentNode,p_tag,p_contextmenu) {
			v_tree = this;
			node = {
				id: 'node_' + this.nodeCounter,
				text: p_text,
				icon: p_icon,
				parent: p_parentNode,
				expanded : p_expanded,
				childNodes : [],
				tag : p_tag,
				contextMenu: p_contextmenu,
				elementLi: null,
				///// Removing the node and all its children
				removeNode: function() { v_tree.removeNode(this); },
				///// Expanding or collapsing the node, depending on the expanded value
				toggleNode: function(p_event) { v_tree.toggleNode(this); },
				///// Expanding the node
				expandNode: function(p_event) { v_tree.expandNode(this); },
				///// Expanding the node and its children recursively
				expandSubtree: function() { v_tree.expandSubtree(this); },
				///// Changing the node text
				// p_text: New text;
				setText: function(p_text) { v_tree.setText(this,p_text); },
				///// Collapsing the node
				collapseNode: function() { v_tree.collapseNode(this); },
				///// Collapsing the node and its children recursively
				collapseSubtree: function() { v_tree.collapseSubtree(this); },
				///// Deleting all child nodes
				removeChildNodes: function() { v_tree.removeChildNodes(this); },
				///// Creating a new child node;
				// p_text: Text displayed;
				// p_expanded: True or false, indicating wether the node starts expanded or not;
				// p_icon: Icon;
				// p_tag: Tag;
				// p_contextmenu: Context Menu;
				createChildNode: function(p_text,p_expanded,p_icon,p_tag,p_contextmenu) { return v_tree.createNode(p_text,p_expanded,p_icon,this,p_tag,p_contextmenu); }
			}

			this.nodeCounter++;

			if (this.rendered) {
				if (p_parentNode==undefined) {
					this.drawNode(this.ulElement,node);
					this.adjustLines(this.ulElement,false);
				}
				else {
					var v_ul = p_parentNode.elementLi.getElementsByTagName("ul")[0];
					if (p_parentNode.childNodes.length==0) {
						if (p_parentNode.expanded) {
						p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'block';
						v_img = p_parentNode.elementLi.getElementsByTagName("img")[0];
						v_img.style.visibility = "visible";
						v_img.src = 'resources/images/collapse.png';
						v_img.id = 'toggle_off';
						}
						else {
							p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'none';
							v_img = p_parentNode.elementLi.getElementsByTagName("img")[0];
							v_img.style.visibility = "visible";
							v_img.src = 'resources/images/expand.png';
							v_img.id = 'toggle_on';
						}
					}
					this.drawNode(v_ul,node);
					this.adjustLines(v_ul,false);
				}
			}

			if (p_parentNode==undefined) {
				this.childNodes.push(node);
				node.parent=this;
			}
			else
				p_parentNode.childNodes.push(node);

			return node;
		},
		///// Render the tree;
		drawTree: function() {

			this.rendered = true;

			var div_tree = document.getElementById(this.div);
			div_tree.innerHTML = '';

			ulElement = createSimpleElement('ul',this.name,'tree');
			this.ulElement = ulElement;

			for (var i=0; i<this.childNodes.length; i++) {
				this.drawNode(ulElement,this.childNodes[i]);
			}

			div_tree.appendChild(ulElement);

      this.adjustLines(document.getElementById(this.name),true);

		},
		///// Drawing the node. This function is used when drawing the Tree and should not be called directly;
		// p_ulElement: Reference to the UL tag element where the node should be created;
		// p_node: Reference to the node object;
		drawNode: function(p_ulElement,p_node) {

			v_tree = this;

			var v_icon = null;

			if (p_node.icon!=null)
				v_icon = createImgElement(null,'icon_tree',p_node.icon);

			var v_li = document.createElement('li');
			p_node.elementLi = v_li;

			var v_span = createSimpleElement('span',null,'node');

			var v_exp_col = null;

			if (p_node.childNodes.length == 0) {
				v_exp_col = createImgElement('toggle_off','exp_col','resources/images/collapse.png');
				v_exp_col.style.visibility = "hidden";
			}
			else {
				if (p_node.expanded) {
					v_exp_col = createImgElement('toggle_off','exp_col','resources/images/collapse.png');
				}
				else {
					v_exp_col = createImgElement('toggle_on','exp_col','resources/images/expand.png');
				}
			}

			v_span.ondblclick = function() {
				v_tree.doubleClickNode(p_node);
			};

			v_exp_col.onclick = function() {
				v_tree.toggleNode(p_node);
			};

			v_span.onclick = function() {
				v_tree.selectNode(p_node);
				v_tree.detailsOfNode(p_node);
				v_tree.entityDetailsOfNode(p_node);
				v_tree.selectCategory(p_node);
			};

			v_span.oncontextmenu = function(e) {
				v_tree.selectNode(p_node);
				v_tree.nodeContextMenu(e,p_node);
			};

			if (v_icon!=undefined)
				v_span.appendChild(v_icon);

				v_a = createSimpleElement('a',null,null);
				v_a.innerHTML=p_node.text;
				v_span.appendChild(v_a);
				v_li.appendChild(v_exp_col);
				v_li.appendChild(v_span);

			p_ulElement.appendChild(v_li);

			var v_ul = createSimpleElement('ul','ul_' + p_node.id,null);
			v_li.appendChild(v_ul);

			if (p_node.childNodes.length > 0) {

				if (!p_node.expanded)
					v_ul.style.display = 'none';

				for (var i=0; i<p_node.childNodes.length; i++) {
					this.drawNode(v_ul,p_node.childNodes[i]);
				}
			}
		},
		///// Changing node text
		// p_node: Reference to the node that will have its text updated;
		// p_text: New text;
		setText: function(p_node,p_text) {
			p_node.elementLi.getElementsByTagName('span')[0].lastChild.innerHTML = p_text;
			p_node.text = p_text;
		},
		///// Expanding all tree nodes
		expandTree: function() {
			for (var i=0; i<this.childNodes.length; i++) {
				if (this.childNodes[i].childNodes.length>0) {
					this.expandSubtree(this.childNodes[i]);
				}
			}
		},
		///// Expanding all nodes inside the subtree that have parameter 'p_node' as root
		// p_node: Subtree root;
		expandSubtree: function(p_node) {
			this.expandNode(p_node);
			for (var i=0; i<p_node.childNodes.length; i++) {
				if (p_node.childNodes[i].childNodes.length>0) {
					this.expandSubtree(p_node.childNodes[i]);
				}
			}
		},
		///// Collapsing all tree nodes
		collapseTree: function() {
			for (var i=0; i<this.childNodes.length; i++) {
				if (this.childNodes[i].childNodes.length>0) {
					this.collapseSubtree(this.childNodes[i]);
				}
			}
		},
		///// Collapsing all nodes inside the subtree that have parameter 'p_node' as root
		// p_node: Subtree root;
		collapseSubtree: function(p_node) {
			this.collapseNode(p_node);
			for (var i=0; i<p_node.childNodes.length; i++) {
				if (p_node.childNodes[i].childNodes.length>0) {
					this.collapseSubtree(p_node.childNodes[i]);
				}
			}
		},
		
		///// Expanding node
		// p_node: Reference to the node;
		expandNode: function(p_node) {
			if (p_node.childNodes.length>0 && p_node.expanded==false) {
				if (this.nodeBeforeOpenEvent!=undefined)
					this.nodeBeforeOpenEvent(p_node);

				var img=p_node.elementLi.getElementsByTagName("img")[0];

				p_node.expanded = true;

				img.id="toggle_off";
				img.src = 'resources/images/collapse.png';
				elem_ul = img.parentElement.getElementsByTagName("ul")[0];
				elem_ul.style.display = 'block';

				if (this.nodeAfterOpenEvent!=undefined)
					this.nodeAfterOpenEvent(p_node);
expandNodeName = p_node.text;
				
				//Call this function when you want to load the childs on click of +
				//populateTreeNodeData(expandNodeName);
			}
		},
		///// Collapsing node
		// p_node: Reference to the node;
		collapseNode: function(p_node) {
			if (p_node.childNodes.length>0 && p_node.expanded==true) {
				var img=p_node.elementLi.getElementsByTagName("img")[0];

				p_node.expanded = false;
				if (this.nodeBeforeCloseEvent!=undefined)
					this.nodeBeforeCloseEvent(p_node);

				img.id="toggle_on";
				img.src = 'resources/images/expand.png';
				elem_ul = img.parentElement.getElementsByTagName("ul")[0];
				elem_ul.style.display = 'none';

			}
		},
		///// Toggling node
		// p_node: Reference to the node;
		toggleNode: function(p_node) {
			if (p_node.childNodes.length>0) {
				if (p_node.expanded)
					p_node.collapseNode();
				else
					p_node.expandNode();
			}
		},
		///// Double clicking node
		// p_node: Reference to the node;
		doubleClickNode: function(p_node) {
			alert(p_node.text);
			//this.toggleNode(p_node);
		},
		///// Selecting node
		// p_node: Reference to the node;
		selectNode: function(p_node) {
			var span = p_node.elementLi.getElementsByTagName("span")[0];
			span.className = 'node_selected';
			if (this.selectedNode!=null && this.selectedNode!=p_node)
				this.selectedNode.elementLi.getElementsByTagName("span")[0].className = 'node';
			this.selectedNode = p_node;
			parentNode=p_node.text;
		},
		/* selectCategory:function(p_node){
			var span = p_node.elementLi.getElementsByTagName("span")[0];
			span.className = 'node_selected';
			
			parentNode=p_node.text;
			//selectedCategoryName(p_node);
			//alert(parentNode);
		}, */
		//Node details
		detailsOfNode: function(p_node){
		 parentNode = p_node.text;
			var tempURL = myurl +"getClassProperties/"+parentNode+",base";
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
					//$("#expandTree").html('');
					//var html='<div id="expandTreetop" style="height: 55%;width: 100%;float : top;border : 1px solid; display : none;"> <table id="def" style="height:100%; width:99%"> <tbody> <tr> <td style="width: 90%;"> <a href="#">definition</a> &nbsp;&nbsp;[type="string"] </td> <td> <input id="Edit_id" type="image" src="resources/images/editIcon.png" onclick="clickeditfunction()" alt="Submit" style="float:right;height: 32px;" title="Click here to Edit fields"> </td> </tr> <tr style=" border-bottom: solid 1px; overflow:scroll;"> <td  id="definition_initial"style=" border-bottom: solid 1px grey;">  definition1 </td> </tr> <tr> <td style="/* border-bottom : 1px solid black; */"> <a href="#">identifier</a> &nbsp;&nbsp;[type="string"] </td> </tr> <tr> <td id="identifier_initial" style="border-bottom: solid 1px grey;">identifier </td> </tr> <tr> <td style="/* border-bottom : 1px solid black; */"> <a href="#">nameToShow</a> &nbsp;&nbsp;[type="string"] </td> </tr> <tr> <td id="nameToShow_initial"style="border-bottom: solid 1px grey;"> nameToShow </td> </tr> <tr> <td> <a href="#">specialCaseKeys</a> &nbsp;&nbsp;[type="string"] </td> </tr> <tr> <td id="specialCaseKeys_initial"> specialCaseKeys</td> </tr> </tbody> </table> </div> <div id="expandTreebottom" style="height: 44%;width: 100%;float : bottom;border : 1px solid;margin-top: 3px; display : none;"> <div id="divLoadingBottom" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;"> <p style="position: absolute; color: White; top: 50%; left: 45%; "> Please wait... <img src="resources/images/ajax-loader.gif"> </p> </div> <div style="width: 100%;/*height:100%;*/float: left;"> <table id="table_entitytitle" style="width: 100%;"> <tbody> <tr style="width:100%;background-color: steelblue;height: 29px;"> <td style="width: 100%;"> <div style="float: left;background-color: lightsteelblue;width: 20%;height: 23px;/* padding-right: 112px; *//* margin-right: 20%; */padding-left: 7px;padding-top: 2px;">Entities</div> </td> </tr> </tbody> </table> </div> <table id="table_entitybody" style="width: 50%;margin-left: 4%;margin-right: 0px;"> <tbody> <tr style="width: 622px;/* background-color: steelblue; */height: 25px;"> <td id="entity1_id" style="width: 70%;background-color: steelblue;padding-left: 7px;color: white;">Entity1</td> <td style=" width: 10%; "> <img id="editimage" onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> <td style=" width: 10%; "> <img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> </tr> <tr style="width:100%;/* background-color: steelblue; */height: 25px;"> <td  id="entity2_id" style="width: 70%;background-color: lightsteelblue;/* padding-left: 1px; */padding-left: 7px;">Entity2</td> <td style=" width: 10%; "> <img id="editimage" onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> <td style=" width: 10%; "> <img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> </tr> <tr style="width:100%;/* background-color: steelblue; */height: 25px;"> <td style="width: 70%;"> <br> <button type="submit"  onclick="AddEntityfunction()" style="float: left;height: 100%;width: 40%;border-radius: 6px;background: #0d94ca;color: white;font-size: 15px; border: 1px solid black;">Add New</button> </td> </tr> </tbody> </table> </div>';
					//$("#expandTree").html(html);
					//alert(response+" inside success");
					$("#definition_initial").text(response.definition);
					$("#identifier_initial").text(response.identifiers);
					$("#nameToShow_initial").text(response.nameToShow);
					$("#specialCaseKeys_initial").text(response.specialCaseKeys);
					$("#expandTree").show();
					$("#expandTreetop").show();
					$('#expandTreeCategory').hide();
					$("#editClassDetails").hide();
					//$("#expandTreebottom").show();
				},
				error : function(xhr, status, error) {
					alert(xhr.responseText);
				}
			}); 
			//alert(p_node.text+" on first click");
		},
		
		//Entity details
		
		entityDetailsOfNode: function(p_node){
			 parentNode = p_node.text;
			// alert(parentNode);
			var tempURL = myurl +"getAllQUestionsOfaClass/"+parentNode+",base";
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
					//alert(response+" inside success");
					$("#table_entitybody").empty();
					//var entityarray = response.split(",");
					tdata= '';
					var length=response.length;
					
					for(var i=0;i<length;i++)
					{												
					 tdata +='<tr><td id='+('entityNumber'+i)+' style="width: 95%;background-color: #3885D2;padding-left: 7px;color: white;">'+response[i]+'</td><td style=" width: 10%; "> <img id='+('EntityEditimage'+i)+' onclick="EditEntityfunction(this.id)" src="resources/images/editIcon.png" style="height: 30px;" title="Click Here to Edit "> </td> <td style=" width: 10%; "> <img  id='+('EntityViewImage'+i)+' onclick="ViewEntityfunction(this.id)" src="resources/images/viewIcon.png" style="height: 27px;" title="Click Here to View "> </td><td style=" width: 10%;"> <img  id='+('EntityDeleteImage'+i)+' style="height:30px;" onclick="deleteEntityfunction(this.id)" src="resources/images/deleteIcon1.png"  title="Click Here to delete "> </td> </tr>';												
					}	
					tdata += '<tr><td style="width: 70%;"> <br> <button type="submit" id='+(parentNode)+' onclick="AddEntityfunction(this.id)" style="float: left;height: 100%;width: 40%;border-radius: 6px;background: #3885D2;color: white;font-size: 15px; border: 1px solid black;">Add New Entity</button> </td></tr>';
					$('#table_entitybody').append(tdata);
					//$("#expandTreetop").show();
					$("#divLoadingBottom").hide();
					$("#expandTreebottom").show();
				},
				error : function(xhr, status, error) {
					alert(xhr.responseText);
				}
			}); 
			//alert(p_node.text+" on first click");
		},
		///// Deleting node
		// p_node: Reference to the node;
		removeNode: function(p_node) {
			var index = p_node.parent.childNodes.indexOf(p_node);

			if (p_node.elementLi.className=="last" && index!=0) {
				p_node.parent.childNodes[index-1].elementLi.className += "last";
				p_node.parent.childNodes[index-1].elementLi.style.backgroundColor = this.backcolor;
			}

			p_node.elementLi.parentNode.removeChild(p_node.elementLi);
			p_node.parent.childNodes.splice(index, 1);

			if (p_node.parent.childNodes.length==0) {
				var v_img = p_node.parent.elementLi.getElementsByTagName("img")[0];
				v_img.style.visibility = "hidden";
			}

		},
		///// Deleting all node children
		// p_node: Reference to the node;
		removeChildNodes: function(p_node) {

			if (p_node.childNodes.length>0) {
				var v_ul = p_node.elementLi.getElementsByTagName("ul")[0];

				var v_img = p_node.elementLi.getElementsByTagName("img")[0];
				v_img.style.visibility = "hidden";

				p_node.childNodes = [];
				v_ul.innerHTML = "";
			}
		},
		///// Rendering context menu when mouse right button is pressed over a node. This function should no be called directly
		// p_event: Event triggered when right clicking;
		// p_node: Reference to the node;
		nodeContextMenu: function(p_event,p_node) {
			if (p_event.button==2) {
				p_event.preventDefault();
				p_event.stopPropagation();
				if (p_node.contextMenu!=undefined) {

					v_tree = this;

					var v_menu = this.contextMenu[p_node.contextMenu];

					var v_div;
					if (this.contextMenuDiv==null) {
						v_div = createSimpleElement('ul','ul_cm','menu');
						document.body.appendChild(v_div);
					}
					else
						v_div = this.contextMenuDiv;

					v_div.innerHTML = '';

					var v_left = p_event.pageX-5;
					var v_right = p_event.pageY-5;

					v_div.style.display = 'block';
					v_div.style.position = 'absolute';
					v_div.style.left = v_left + 'px';
					v_div.style.top = v_right + 'px';

					for (var i=0; i<v_menu.elements.length; i++) (function(i){

						var v_li = createSimpleElement('li',null,null);

						var v_span = createSimpleElement('span',null,null);
						v_span.onclick = function () {  v_menu.elements[i].action(p_node) };

						var v_a = createSimpleElement('a',null,null);
						var v_ul = createSimpleElement('ul',null,'sub-menu');

						v_a.appendChild(document.createTextNode(v_menu.elements[i].text));

						v_li.appendChild(v_span);

						if (v_menu.elements[i].icon!=undefined) {
							var v_img = createImgElement('null','null',v_menu.elements[i].icon);
							v_li.appendChild(v_img);
						}

						v_li.appendChild(v_a);
						v_li.appendChild(v_ul);
						v_div.appendChild(v_li);

						if (v_menu.elements[i].submenu!=undefined) {
							var v_span_more = createSimpleElement('div',null,null);
							v_span_more.appendChild(createImgElement(null,'menu_img','resources/images/right.png'));
							v_li.appendChild(v_span_more);
							v_tree.contextMenuLi(v_menu.elements[i].submenu,v_ul,p_node);
						}

					})(i);

					this.contextMenuDiv = v_div;

				}
			}
		},
		///// Recursive function called when rendering context menu submenus. This function should no be called directly
		// p_submenu: Reference to the submenu object;
		// p_ul: Reference to the UL tag;
		// p_node: Reference to the node;
		contextMenuLi : function(p_submenu,p_ul,p_node) {

			v_tree = this;

			for (var i=0; i<p_submenu.elements.length; i++) (function(i){

				var v_li = createSimpleElement('li',null,null);

				var v_span = createSimpleElement('span',null,null);
				v_span.onclick = function () {  p_submenu.elements[i].action(p_node) };

				var v_a = createSimpleElement('a',null,null);
				var v_ul = createSimpleElement('ul',null,'sub-menu');

				v_a.appendChild(document.createTextNode(p_submenu.elements[i].text));

				v_li.appendChild(v_span);

				if (p_submenu.elements[i].icon!=undefined) {
					var v_img = createImgElement('null','null',p_submenu.elements[i].icon);
					v_li.appendChild(v_img);
				}

				v_li.appendChild(v_a);
				v_li.appendChild(v_ul);
				p_ul.appendChild(v_li);

				if (p_submenu.elements[i].p_submenu!=undefined) {
					var v_span_more = createSimpleElement('div',null,null);
					v_span_more.appendChild(createImgElement(null,'menu_img','resources/images/right.png'));
					v_li.appendChild(v_span_more);
					v_tree.contextMenuLi(p_submenu.elements[i].p_submenu,v_ul,p_node);
				}

			})(i);
		},
		///// Adjusting tree dotted lines. This function should not be called directly
		// p_node: Reference to the node;
		adjustLines: function(p_ul,p_recursive) {
			var tree = p_ul;

      var lists = [];

			if (tree.childNodes.length>0) {
				lists = [ tree ];

				if (p_recursive) {
		      for (var i = 0; i < tree.getElementsByTagName("ul").length; i++) {
						var check_ul = tree.getElementsByTagName("ul")[i];
						if (check_ul.childNodes.length!=0)
		        	lists[lists.length] = check_ul;
					}
				}

			}

      for (var i = 0; i < lists.length; i++) {
        var item = lists[i].lastChild;

        while (!item.tagName || item.tagName.toLowerCase() != "li") {
     	  item = item.previousSibling;
				}

        item.className += "last";
				item.style.backgroundColor = this.backcolor;

				item = item.previousSibling;

				if (item!=null)
					if (item.tagName.toLowerCase() == "li") {
						item.className = "";
						item.style.backgroundColor = 'transparent';
					}
      }
		}
	}

	window.onclick = function() {
		if (tree.contextMenuDiv!=null)
			tree.contextMenuDiv.style.display = 'none';
	}

	return tree;
}

// Helper Functions

//Create a HTML element specified by parameter 'p_type'
function createSimpleElement(p_type,p_id,p_class) {
	element = document.createElement(p_type);
	if (p_id!=undefined)
		element.id = p_id;
	if (p_class!=undefined)
		element.className = p_class;
	return element;
}

//Create img element
function createImgElement(p_id,p_class,p_src) {
	element = document.createElement('img');
	if (p_id!=undefined)
		element.id = p_id;
	if (p_class!=undefined)
		element.className = p_class;
	if (p_src!=undefined)
		element.src = p_src;
	return element;
}

