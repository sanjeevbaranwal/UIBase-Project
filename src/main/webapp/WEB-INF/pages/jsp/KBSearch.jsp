<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
	  <title>Demo Genie</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	  <link rel="stylesheet" href="resources/css/zurichstyle.css"> 
	  <link rel="stylesheet" href="resources/css/custom.css">
	  <script src="resources/bootstrap/js/jquery.min.js"></script>
	  <script src="resources/bootstrap/js/bootstrap.min.js"></script>
	  <script src="resources/js/KBSearch.js"></script>
	  <script src="resources/js/jquery-1.9.0.min.js"></script>
	  <script src="resources/js/jquery-ui.js"></script>
	  <script src="resources/js/validator.js"></script>
	</head>
	<body onload="pageOnLoad()" bgcolor="#9BA9B5">
		<div id="dialog" title="My Dialog Title"></div>
		<centre>
		<table width="100%" height="100%" border="0" cellspacing="0"
			id="maintable" cellpadding="0" class="bodybackground"
			bgcolor="#317DC8">
			<!--  Header view -->
			<tr id="headerRow" class="headerGradient">
				<td><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img
					id="imgLogo"> <font face="verdana" color="#003E7C" size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie
				</font> <font face="verdana" color="#003E7C" size="3">Knowledge Base Search </font>
				<p></td>
				<td align="left" width="50%">
					<c:if test="${pageContext.request.userPrincipal.name != null}">
					<font face="verdana" color="#003E7C"  size="3">
						Welcome : ${pageContext.request.userPrincipal.name} |</font> <a
						href="<c:url value="j_spring_security_logout" />"  >
						<font face="verdana" color="Red"  size="2">Logout</font>
						</a>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</c:if> 
				</td>
			</tr>
			<tr>
				<td id="menuheader" colspan=2 class="headerGradientmenu">
					<font face="verdana" color="#FFFFFF" size="2">&nbsp;&nbsp;&nbsp;&nbsp;
						<a href="#" onclick="parent.location='admin'" style="color: #FFFFFF"><i>Back to admin</i> </a>
					</font>
				</td>
			</tr>
			
			<tr>
				<td>
					<div class="container" id="inputData">
			            <div class="row">
			                <div class="col-lg-8 col-lg-offset-2">
			                        <div class="messages"></div>
			                        <div class="controls">
			                            <div class="row">
			                                <!-- <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_name">Application Type *</label>
			                                        <input id="form_name" type="text" name="name" class="form-control" placeholder="Please enter application type *" required="required" data-error="Application type is required.">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div> -->
			                                <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_category">Category *</label>
			                                        <input id="form_category" type="text" name="category" class="form-control" placeholder="Please enter your category *"  data-error="Category is required.">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div>
			                            </div>
			                        
			                            <div class="row">
			                                <!-- <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_name">Application Type *</label>
			                                        <input id="form_name" type="text" name="name" class="form-control" placeholder="Please enter application type *" required="required" data-error="Application type is required.">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div> -->
			                                <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_question">Question *</label>
			                                        <input id="form_question" type="text" name="question" class="form-control" placeholder="Please enter your question *"  data-error="Question is required.">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div>
			                            </div>
			                            <div class="row">
			                                <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_fileurl">Url/File *</label>
			                                        <input id="form_fileurl" type="text" name="fileurl" class="form-control" placeholder="Please enter Url or file path *"  data-error="Valid Url or file path is required.">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div>
			                                <!-- <div class="col-md-6">
			                                    <div class="form-group">
			                                        <label for="form_phone">Other</label>
			                                        <input id="form_phone" type="tel" name="phone" class="form-control" placeholder="Please enter other details">
			                                        <div class="help-block with-errors"></div>
			                                    </div>
			                                </div> -->
			                            </div>
			                            <div class="row">
			                                <div class="col-md-12">
			                                    <input type="submit" class="btn btn-success btn-send" value="Search" onclick="applySearch()">
			                                </div>
			                            </div>
			                        </div>
			                </div><!-- /.8 -->
			            </div> <!-- /.row-->
			        </div> <!-- /.container-->
		        </td>
			</tr>
			<!--  footer view -->
			<tr class="headerGradient">
				<td colspan=2 align="center"><font face="verdana"
					color="#003E7C" size="2"> CAREERS | TERMS AND CONDITIONS |
						KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font></td>
			</tr>
		</table>
		<input type="hidden" id="rowcount">
	</body>
</html>