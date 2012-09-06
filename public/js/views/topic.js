jQuery(document).ready(function() {
	var tc = new TopicController();
	
	$('#reply-form').ajaxForm({
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') tc.onPostSuccess(responseText);
		}
	});
	$('abbr.timeago').timeago();
	
	socket.on('newPost', function(post) {
		if(post.topic._id == $('.topicid').val())
		{
			$('section.posts').append("<section class = 'post' id = 'post-"+ post._id+"'><div class = 'row'><div class = 'span9 offset3'><small>Posted <abbr id = 'timestamp-"+ post._id+"'  class = 'timeago' title = '"+post.postedOn +"'>" +post.postedOn +"</abbr></small></div></div><div class = 'row'><div class = 'span3'><ul class = 'user-details'><li class = 'user-name'>"+ post.author.username + "</li><li class = 'user-avatar'><img src = 'http://placehold.it/140x140' class = 'img-polaroid'></li></ul></div><div class = 'span9'><div class = 'post-body'>"+ post.body +"</div></div></div><div class = 'row'><div class = 'span12 post-actions'><span class = 'pull-right'><button class = 'btn' type='button'><i class = 'icon-comment'></i> Reply</button></div></div></section>").children('section#post-'+post._id).effect('highlight', {}, 1000);
			$('abbr#timestamp-'+ post._id).timeago();
		}
	});
});

window.onbeforeunload = function (e) {
	socket.emit('leavingTopic', {topic: $('.topicid').val()});
};