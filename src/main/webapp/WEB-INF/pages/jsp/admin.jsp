<!doctype html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>

<html lang="en">
<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<title>NgGenie Support</title>
		
		
		<!-- <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script> -->  
		<link rel="stylesheet" href="resources/css/style.css">  
		<!------------  for chart------------ -->
		<script type="text/javascript" src="resources/js/canvasjs.min.js"></script> 
		<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> -->
		<!-- <script src="//cdn.jsdelivr.net/excanvas/r3/excanvas.js" type="text/javascript"></script>
		<script src="//cdn.jsdelivr.net/chart.js/0./Chart.js" type="text/javascript"></script> -->
		<!------------ Including jQuery Date UI with CSS -------------->
		<!-- <script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script> --> 
		<!-- <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css"> -->
		<link rel="stylesheet" href="resources/css/jquery-ui.css">
		<link rel="stylesheet" href="resources/css/admin.css">
		<script src="resources/js/jquery-1.12.4.min.js"></script>
		<script src="resources/js/jquery-ui.js"></script>
		<!-- <script src="resources/js/jquery.min.js"></script> -->
		<script src="resources/js/admin.js"></script>	
		<!-- <script src="resources/js/jquery-1.11.3.js"></script> -->
		<script src="resources/js/Chart.js"></script>	
		<script src="resources/js/excanvas.js"></script>
		<script src="resources/js/RGraph.common.core.js"></script>
		<script src="resources/js/RGraph.common.dynamic.js"></script>
		<script src="resources/js/RGraph.line.js"></script>
		<script src="resources/js/moment.js"></script>		
		
<!-- 		<script src="resources/js/jquery-1.11.3.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="resources/js/jquery-ui.js"></script>
   -->
  
		
		

</head>


<body onload="setScreenValues()"  bgcolor="#9BA9B5">

<sec:authorize access="hasRole('ROLE_ADMIN')">
<form:form commandName="messageBean" method="post" action="" >
<center>
<table width="90%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#317DC8" >
	<!--  Header view -->
	<tr id="headerRow" class="headerGradient" >
		<td>
		<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<img id="imgLogo">	
			<font face="verdana" color="#003E7C"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;Genie </font>
			<font face="verdana" color="#003E7C"  size="3">Dash board </font><p>
			
		</td>
		<td align="right">
			 	<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3">
						Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
						href="<c:url value="j_spring_security_logout" />" > 
						<font face="verdana" color="Red"  size="2">Logout</font>
						</a>
					</font>
			
				</c:if> 
				<!--  
				&nbsp;&nbsp;&nbsp;&nbsp;
				<br>
				 <font face="verdana" color="#88BFFB"  size="3">
				 Choose your period 
				 <input type="text" name="selected_from_date" id="fromdatepicker"/> to 
 				 <input type="text" name="selected_to_date" id="todatepicker" />
				 <select name="combo" id="combo"></select>		&nbsp;&nbsp;&nbsp;&nbsp; 		
 				 <input type="button" class="red" name="viewReportBtn" value="View" id="viewReportBtn" onclick="viewReport()"/> 
 				 &nbsp;&nbsp;&nbsp;
 				 </font>-->
		</td>
	</tr>
	<tr>
	<td id="menuheader" colspan=2 class="headerGradientmenu">
		<font face="verdana" color="#FFFFFF"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; Home | 
		  <a  href="#"  onclick="parent.location='assistedLearning'" style="color:#FFFFFF ">Assisted Learning</a>
		| <a  href="#"  onclick="parent.location='adminExpertLearning'" style="color:#FFFFFF ">Expert Knowledge Approval</a>
		| <a  href="#"  onclick="parent.location='addKB'" style="color:#FFFFFF ">  Knowledge Creation</a>
		| <a  href="#"  onclick="parent.location='KBManager'" style="color:#FFFFFF ">  Manage Knowledge </a>
		| <a  href="#"  onclick="parent.location='KBSearch'" style="color:#FFFFFF ">  Knowledge Search</a>
		| <a  href="#"  onclick="parent.location='feedBack'" style="color:#FFFFFF ">  User FeedBack</a>
		| <a  href="#"  onclick="parent.location='userProfilerAdmin'" style="color:#FFFFFF ">  User Profiler Admin</a>
		| <a  href="#"  onclick="parent.location='projectontologymanager'" style="color:#FFFFFF ">Project Ontology Manager</a>
		| <a  href="#"  onclick="parent.location='ontologymanager'" style="color:#FFFFFF "> Ontology Manager</a>
		</font> 
	</td>
	</tr>

	<tr>
		<td id="chartHeader1">
			<font face="verdana" color="#FFFFFF"  size="3">
				&nbsp;&nbsp;&nbsp;&nbsp;
				Genie's Performance
				</font>
		</td>
		<td id="chartHeader2">
			<font face="verdana" color="#FFFFFF"  size="3">
				 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
				 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
				 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				 Top 20 Frequently Asked Queries
				 </font>
		</td>
	</tr>
	<!--  Chart view -->
	<tr id="chartRow" >
		<td align="center"  colspan=2> 

			<table border="0" id="chartRowInnerTable" cellspacing="3">
				<tr>
					<td  id="chart1" class="chartCss" BGCOLOR="#FFFFFF"  >
						<table border=0 width="95%" height="95%">
							<tr>
								<td>
									<table border=0 width="95%" height="95%">
										<tr>
											<td colspan=2>
												<!-- <font face="verdana" color="#2c2c2c"  size="3">Total queries</font> -->
												<div id=totalqueries></div>
											</td>
										</tr>
										<tr>
											<td bgcolor="#7FFF55" align="center">
												<!-- <font face="verdana" color="#23A722"  size="3">Satisfied </font> -->
												<a href="#" onclick="showTotal('YES')" style="text-decoration: none;"> <div id=satisfied></div></a>
											</td>
											<td  bgcolor="#B4B4B4"  align="center">
											   <!--  <font face="verdana" color="#FC4E46"  size="3">Un Satisfied </font>  -->
											   <a href="#" onclick="showTotal('NO')" style="text-decoration: none;"> <div id=unsatisfied></div></a>
											</td>
											<td  bgcolor="#FFFAAA"  align="center" style="display:none">
											    <!-- <font face="verdana" color="#D2D2D2"  size="3">Not Answered </font>  -->
											    <a href="#" onclick="showTotal('NA')" style="text-decoration: none;"><div id=NA></div></a>
											</td>		
										</tr>
										<tr>
											<td colspan=3>
												<!-- <font face="verdana" color="#23A722"  size="3">Success rate </font> -->
												<div id=srate></div>
											</td>
										</tr>
									</table>
								
								</td>
								<td>
									 <div id="chartContainer" style="height: 260px; width: 610px;">
								
								     <canvas id="cvs" width="600" height="250">[No canvas support]</canvas><br />
									<!--  	<table border="0" cellpadding="0" cellspacing="0">
												    <tr>
												        <td>
												            <div id="dvChart">
												            </div>
												        </td>
												        <td>
												            <div id="dvLegend">
												            </div>
												        </td>
												    </tr>
												</table> -->
										</div>		
								</td>
								<td>
									<table border=0 width="95%" height="95%">
										<tr>
											<td colspan=2>
												<!-- <font face="verdana" color="#2c2c2c"  size="3">Total queries</font> -->
												<div id=totalsentiments></div>
											</td>
										</tr>
										<tr>
											<td bgcolor="#7FFF55" align="center">
												<!-- <font face="verdana" color="#23A722"  size="3">Satisfied </font> -->
												<a href="#" onclick="showTotal('SYES')" style="text-decoration: none;"> <div id=sensatisfied></div></a>
											</td>
											<td  bgcolor="#B4B4B4"  align="center">
											   <!--  <font face="verdana" color="#FC4E46"  size="3">Un Satisfied </font>  -->
											   <a href="#" onclick="showTotal('SNO')" style="text-decoration: none;"> <div id=senunsatisfied></div></a>
											</td>
											<td  bgcolor="#FFFAAA"  align="center">
											    <!-- <font face="verdana" color="#D2D2D2"  size="3">Not Answered </font>  -->
											    <a href="#" onclick="showTotal('SNA')" style="text-decoration: none;"><div id=senNA></div></a>
											</td>
											
										</tr>
										<tr>
											<td colspan=3>
												<!-- <font face="verdana" color="#23A722"  size="3">Success rate </font> -->
												<div id=sensrate></div>
											</td>
										</tr>
									</table>
								
								</td>
							</tr>							
						</table>
									
					</td>
					<td  id="chart2" class="chartCss" BGCOLOR="#FFFFFF">
						
						<div id="faqtable" style=" overflow-y: scroll;"></div>
					</td>
				</tr>
			</table>
		
		</td>	
		
		
	</tr>
	
	<!--  tab view -->
	<tr>
		<td colspan=2>
			<table>
				<tr>
					<td>
						<font face="verdana" color="#FFFFFF" size="3">&nbsp;&nbsp;&nbsp;&nbsp; Latest queries view :			</font>
	
					</td>
				<td>
					 <input type="text" name="quantity" id="quantity" style="width:50px; text-align:right;"/> <font face="verdana" color="#FFFFFF" size="3">record/s</font>
				</td>
				<td>
					<input type="button" class="red" name="viewReportBtn" value="View" id="latestButton" onclick="loadLatestQueries()"/> 			
					&nbsp;&nbsp;&nbsp;<span id="errmsg"></span>

				</td>
				</tr>
			</table>


			
		</td>
	</tr>
	<tr id="tabRow" >
		<td colspan=2>
		<table border="0" cellspacing="7" width="100%">
			<tr>
				<td id="tabRow1" class="chartCss" BGCOLOR="#FFFFFF" >
					<div id="latestTable" style=" overflow-y: scroll;"></div> 	
					 
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
 <div id="dialog" title="" ></div>
 <div id="chatdialog" title="" ></div>
 <div id="totaldialog" title="" ></div>

 </center>
</form:form> 

</sec:authorize>
</body>
</html>