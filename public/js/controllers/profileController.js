
function ProfileController()
{	
	
// bind event listeners to button clicks //
	var that = this;
	
// handle user logout //	
	$('#btn-logout').click(function(){ that.attemptLogout(); });
	
// confirm account deletion //	
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});	
	
// handle account deletion //	
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });
	
	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;	
		$.ajax({ 
			url: '/profile/delete/',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});	
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/profile/",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}		
		});
	}	
	
	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });				
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);		
	}
}

ProfileController.prototype.onVerifySentSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });				
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('A verification email has been sent to your account. Please click the link provided in that email to verify your account.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
