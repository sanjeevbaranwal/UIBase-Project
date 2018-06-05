<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@page import="com.wipro.configuration.ConfigReader" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<cfheader name="Access-Control-Allow-Origin" value="*">
	  <title>NgGenie-Ontology Manager</title>
	  <% String project = (String)session.getAttribute("project"); %>
	  <link rel="stylesheet" href="resources/css/zurichstyle.css">  
	  <script src="resources/bootstrap/js/jquery.min.js"></script>
	  <script src="resources/bootstrap/js/bootstrap.min.js"></script>
	   <script src="resources/js/jquery-1.9.0.min.js"></script>
	 <script src="resources/js/jquery-ui.js"></script>
		<!--<script src="resources/js/treeJquery/jquery.min.js" type="text/javascript"></script>-->
		<script src="resources/js/jquery-3.2.1.js" type="text/javascript"></script>
		<!--<script src="resources/js/treeJquery/jquery-ui.js" type="text/javascript"></script>-->
        <script src="resources/js/jquery-3.2.1.min.js" type="text/javascript"></script>	
        <script src="resources/js/ProjectOntologyManager.js"></script>
        <!-- <script src="resources/js/OntologyManager.js"></script>	 -->
	 <script src="resources/js/ProjectTreeComponent.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="resources/css/TreeComponent.css">
		<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/Example.css">

	</head>
	<body onload="setScreenValuesOntologyManager()" bgcolor="#9BA9B5">		
	<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">
	<p style="position: absolute; color: White; top: 50%; left: 45%; ">
	Please wait...
	<img src="resources/images/ajax-loader.gif">
	</p>
   </div>
		<!--<div id="dialog" title="My Dialog Title"></div>-->
		<table width="98%" height="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient" >
				<td>
				<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		
					<img id="imgLogo">			
					<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;Genie </font>
					<font face="verdana" color="#003E7C"  size="3">Project Ontology Manager </font><p>					
				</td>
				<td align="right">
				 
					<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3">
						Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
						href="<c:url value="j_spring_security_logout" />" > 
						<font face="verdana" color="Red"  size="2">Logout</font>
						</a>
					</font> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<!-- -->
			
				</c:if> 
				</td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu">
					<font face="verdana" color="#FFFFFF"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; <a  href="#"  onclick="parent.location='admin'" style="color:#FFFFFF "><i>Back to admin</i> </a>&nbsp;&nbsp;&nbsp;&nbsp; <a  href="#"  onclick="downloadExcel();" style="color:#FFFFFF "><i>Download Excel</i> </a></font> 
				</td>
			</tr>
			<tr id="tabRow" >
				<td colspan=2>
				<table border="0" cellspacing="7" width="100%">
					<tr>
						<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" >
							<div id="sltbl" style=" overflow-y: hidden; height : 100%; width : 100%;">
							<center> <table border="0" width="100%" cellspacing="4" cellpadding="4"> <tr height="5px"> </tr> <tr bgcolor="#F1F1F1"> </tr> <tr bgcolor="#FFFFFF"> <td> 
								<div id="OntologyTree" style="height: 427px;width: 99%;/* border : 1px solid black; */"> 
								`<div style="width : 20%;height : 100%;float:left;overflow:auto;/* border-right: 1px solid; */border: 1px solid;"> 
									<div id="dialog" class="web_dialog">
        <table style="width: 100%; border: 0px;" cellpadding="3" cellspacing="0">
            <tr>
                <td class="web_dialog_title">Category Addition</td>
                <td class="web_dialog_title align_right">
                    <a href="#" id="btnClose">Close</a>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="2" style="padding-left: 15px;">
                    <b>Please enter the name</b>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="padding-left: 15px;">
                    <div id="brands">
                        <textarea id="namearea" name="message" ></textarea>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <input id="btnSubmit" type="button" value="Submit" />
                </td>
            </tr>
        </table>
    </div>

		<div id="div_log" style="display:none"></div>
		<div id="div_tree"></div>
		
							</div> 
							<div id="expandTree" style="width: 79%; height: 100%; float: right; font:12.5px Verdana, sans-serif;" > 
								
								<div id="expandTreetop" style="height: 35%;width: 100%;float : top;border : 1px solid; display : none; overflow-y : auto;">
									<table id="def" style="height:100%; width:99%"> 
										<tbody> 
											<tr> 
												<td style="width: 90%;font-size:15px;" class="heading_Def" >
													<font>Definition</font>
												</td> 
												<td> 
													<input id="Edit_id" type="image" src="resources/images/editIcon.png" onclick="clickeditfunction()" alt="Submit" style="float:right;height: 32px;" title="Click here to Edit fields">
												</td> 
											</tr> 
											<tr style=" border-bottom: solid 1px; overflow:scroll;"> 
												<td  id="definition_initial"style=" border-bottom: solid 1px grey;">  Definition1
												</td> 
											</tr> 
											<tr> 
												<td style="font-size:15px;" class="heading_Def"> 
													<font>Identifier</font>
												</td> 
											</tr> 
											<tr> 
												<td id="identifier_initial"  style="/*border-bottom: solid 1px grey;*/" >Identifier </td> 
											</tr> 
											<tr style="display:none;"> 
												<td style="/* border-bottom : 1px solid black; */" class="heading_Def"> 
													<font>nameToShow</font> 
												</td> 
											</tr> 
											<tr style="display:none;"> 
												<td id="nameToShow_initial"style="border-bottom: solid 1px grey;"> nameToShow
												</td> 
											</tr> 
											<tr style="display:none;"> 
												<td class="heading_Def"> 
													<font>specialCaseKeys</font> 
												</td> 
											</tr> 
											<tr style="display:none;">
												<td id="specialCaseKeys_initial"> specialCaseKeys</td> 
											</tr> 
										</tbody> 
									</table> 
								</div> 
								<div id="expandTreebottom" style="height: 64%;width: 100%;float : bottom;border : 1px solid;margin-top: 3px; display : none; overflow-y : auto;"> 
								
								
									<div style="width: 100%;/*height:100%;*/float: left; padding-top:8px;"> 
									<table id="table_entitytitle" style="width: 100%;"> 
										<tbody> 
											<tr style="width:100%;background-color: #3885D2;height: 29px;"> 
												<td style="width: 100%;"> 
													<div style="float: left;background-color: #3885D2;width: 20%;height: 23px;padding-left: 2px;padding-top: 2px; font-size:15px; color:white;">Entities</div> 
												</td> 
											</tr> 
										</tbody> 
									</table> 
									</div> 
									<table id="table_entitybody" style="width: 50%;margin-left: 4%;margin-right: 0px;"> 
										<tbody> 
											<tr style="width: 622px;/* background-color: steelblue; */height: 25px;"> 
												<td id="entity1_id" style="width: 70%;background-color: #3885D2;padding-left: 7px;color: white;">Entity1</td>
												 <td style=" width: 10%; "> 
												 	<img id="editimage" onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> 
												 <td style=" width: 10%; "> 
												 	<img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> 
											</tr> 
											<tr style="width:100%;/* background-color: steelblue; */height: 25px;"> 
												<td  id="entity2_id" style="width: 70%;background-color: #3885D2;/* padding-left: 1px; */padding-left: 7px;">Entity2</td> 
												<td style=" width: 10%; "> <img id="editimage" onclick="EditEntityfunction()" src="resources/images/editIcon.png" style="width: 45%;margin-left: 20%;/* align-content: center; */" title="Click Here to Edit "> </td> 
												<td style=" width: 10%; "> <img id="viewimage" src="resources/images/viewIcon.png" style="width: 36%;height: 8%;margin-left: -38%;/* align-content: center; */" title="Click Here to View "> </td> 
											</tr> 
											<tr style="width:100%;/* background-color: steelblue; */height: 25px;"> 
												<td style="width: 70%;"> <br> 
													<button type="submit"  onclick="AddEntityfunction()" style="float: left;height: 100%;width: 40%;border-radius: 6px;background: #0d94ca;color: white;font-size: 15px; border: 1px solid black;">Add New Entity</button> 
												</td> 
											</tr> 
										</tbody> 
									</table> 
								</div> 
							</div>
								<div id="expandTreeCategory" style="width: 79%; height: 100%; float: right; overflow-y : auto; display: none"></div>
								<div id="editClassDetails" style="width: 79%; height: 100%; float: right; overflow-y : auto; display: none"></div>
						</div> 
						<div id="addNewEntityOntologyTree" style="height: 427px;width: 99%; display:none;"></div>
					</div> 
				</td> 
			</tr> 
		</table>
							</div> 	
						</td>	
					</tr>
				</table>
				</td>
			</tr>
				<!--  footer view -->
			<tr class="headerGradient" >
				<td colspan=2 align="center">
					<font face="verdana" color="#003E7C"  size="2"> CAREERS | TERMS AND CONDITIONS | KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font>
				</td>	
			</tr>			
		</table>	
		<input type="hidden" id="rowcount">
		<input type="hidden" id="projectVal" value="<%=project%>" />
		
	</body>
</html>