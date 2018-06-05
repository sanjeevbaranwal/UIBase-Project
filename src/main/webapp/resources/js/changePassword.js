document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
function setScreenValues(){
	loadConfig();
	var h=window.innerHeight-125;
	var w=((window.innerWidth/10 )*4)

	$("#headerRow").height(85);		
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height( (h/10)*9);
	$("#tabRow").width(w);
	$("#sltbl").height( $("#tabRow").height()-10);
	$("#sltbl").width($("#tabRow").width()-10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("height", '60%');
		
}
function onLoadFunction(){
	//$('#password_modal').css('display','blok');
	setScreenValues();
	
}
function setScreenValuesforLogin(){
	var h=window.innerHeight-100;//50;
	var w=((window.innerWidth/10 )*3)

	$("#headerRow").height(85);		
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height( (h/10)*8);
	$("#tabRow").width(w);
	$("#tabRow1").height( $("#tabRow").height()-10);
	$("#tabRow1").width($("#tabRow").width()-10);
	$("#sltbl").height( $("#tabRow").height()-10);
	$("#sltbl").width($("#tabRow").width()-10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("width", 150);
}
function saveChanges(){
	var currentPassword=$('#currentPassword').val();
	var newPassword=$('#newPassword').val();
	var cofirmPasswordVal=$('#confirmPassword').val();
	
	$('#currentPassword').css('border','');
	$('#currentPassAlert').hide();
	$('#newPassword').css('border','');
	$('#newPassAlert').hide(); 
	$('#confirmPassword').css('border','');
	$('#confirmPassAlert').hide();
	
	if(currentPassword=='' || newPassword=='' || cofirmPasswordVal==''){
		if(currentPassword==''){
			$('#currentPassword').css('border','1px solid red');
			$('#currentPassAlert').show();
		}
		if(newPassword==''){
			$('#newPassword').css('border','1px solid red');
			$('#newPassAlert').show();
		}
		if(cofirmPasswordVal==''){
			$('#confirmPassword').css('border','1px solid red');
			$('#confirmPassAlert').empty();
			$('#confirmPassAlert').append('<span style="color:red;">Please fill the confirm password</span>');
			$('#confirmPassAlert').show();
		}
		//alert('empty');
	}
	else if(newPassword!=cofirmPasswordVal){
			$('#newPassword').css('border','');
			$('#newPassAlert').hide();
		
			$('#newPassword').css('border','1px solid red');
			$('#confirmPassword').css('border','1px solid red');
			$('#confirmPassAlert').empty();
			$('#confirmPassAlert').append('<span style="color:red;">Your new and confirm passwords dont match</span>');
			$('#confirmPassAlert').show();
		
	}
	else{
		$('#divLoading').show();
		var username=$('#loginusername').val();
		changePassAjax(username,currentPassword,newPassword);
		
		/*$('#divLoading').show();
		alert('successfully changes password');
		 $('#newPassword').css('border','');
		  setTimeout(function(){ 
		   $('#divLoading').hide();
		   parent.location="login";
		 }, 2000);*/
	}
	
}
function changePassAjax(username,currentPassword,newPassword){
	//var json={"username",username,"currPass",null,"newPass",newPassword};
	var json = {"username": username,"currPass" : currentPassword,"newPass" :newPassword};
	var tempURL=myurl+"changePassword";
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : JSON.stringify(json),
		dataType: "json",
		cache : false,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Accept", "application/json");  
			xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
				$('#newPassword').css('border','');
				setTimeout(function(){ 
					alert('successfully changed your password please login with your new credentials');
					$('#divLoading').hide();
					parent.location="j_spring_security_logout";
					return;
					}, 2000);
				},
		error : function(xhr, status, error) {
			
				if(xhr.responseText=='wrong password'){
					$('#currentPassword').css('border','1px solid red');
					//$('#confirmPassword').css('border','1px solid red');
					$('#confirmPassAlert').empty();
					$('#confirmPassAlert').append('<span style="color:red;">Please check your Old password</span>');
					$('#confirmPassAlert').show();
					$('#divLoading').hide();
				}
				//alert(xhr.responseText);
				else if(xhr.responseText=='same password'){
					$('#currentPassword').css('border','1px solid red');
					$('#newPassword').css('border','1px solid red');
					$('#confirmPassAlert').empty();
					$('#confirmPassAlert').append('<span style="color:red;">Your current and new password are same please change</span>');
					$('#confirmPassAlert').show();
					$('#divLoading').hide();
					$('#confirmPassword').val('');
				}
				else{
					$('#newPassword').css('border','');
					setTimeout(function(){ 
						alert('successfully changed your password please login with your new credentials');
						$('#divLoading').hide();
						parent.location="j_spring_security_logout";
						return;
					}, 2000);
				}
			}
	});	
}
$(function() {
    $('#currentPassword').on('click', function() {
       $('#currentPassword').css('border','');
	   $('#currentPassAlert').hide();
    });
	$('#newPassword').on('click', function() {
       $('#newPassword').css('border','');
	   $('#newPassAlert').hide();
    });
	$('#confirmPassword').on('click', function() {
       $('#confirmPassword').css('border','');
	   $('#confirmPassAlert').hide();
    });
});
