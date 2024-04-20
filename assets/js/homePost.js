
const newPostForm = $('#new-post-form');
const newCommentForm = $('.new-comment-form');

//moethod to submit form data for new post using ajax
newPostForm.submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/posts/create',
        data: newPostForm.serialize(), //seralize convert form data to json format
        success: function(data){
            console.log(data);
            let newPost = newPostDom(data.data.post);
            $('#posts-lists-container>ul').prepend(newPost); //this prepend function will append at the starting of the list
            deletePost($(' .delete-post-button', newPost)); // Pass the delete button as a context to the deletePost function //to add delete button in post dynamically
            new Noty({
                theme: 'relax',
                text: data.data.success,
                type:'success',
                layout: 'topRight',
                timeout: 1500,
            }).show();
            document.querySelector('#post-content').value = "";
        },
        error: function(err){
            console.log(err.responseText);
        }
    });
});
// console.log('hello');


//method to create a post in DOM
let newPostDom = function(post){
    console.log(post);
    return $(`
    <li id="post-${post._id}">
        <p>
            <small>

                    <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>

            </small>
            ${post.content}<br>
            <small>Posted by: ${post.user.name}</small>   
        </p>
        <div class="post-comment">
  
                <form action="/comments/create" method="POST" class="new-comment-form">
                    <input type="text" name="content"  id="comment-content" placeholder="Add your comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>

    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">

                </ul>
            </div>
            
        </div>
    </li>`);
}


//method to delete post from DOM
let deletePost = function(deleteLink){//because we are passing only the tag link
    $(deleteLink).click(function(e){
        e.preventDefault();
        
        $.ajax({
            type: 'GET',
            url: $(this).prop('href'), // Use $(this) instead of $(deleteLink)
            success: function(data){
                console.log(`#post-${data.data.post_id}`);
                $(`#post-${data.data.post_id}`).remove();
                console.log('DOM')
                new Noty({
                    theme: 'relax',
                    text: data.data.success,
                    type:'success',
                    layout: 'topRight',
                    timeout: 1500,
                }).show();
            },
            error: function(err){
                console.log(err.responseText);
            }
        });
    });

}

$(document).ready(function(){
    $('.delete-post-button').each(function(){
        deletePost($(this));
    });
}); //for all other remaining posts

//method to submit comment form using ajax
newCommentForm.submit(function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/comments/create',
        data: $(this).serialize(),
        success: function(data){
            let newComment = newCommentDOM(data.data.comment);
            console.log(`#post-comments-${data.data.comment.post}`);
            $(`#post-comments-${data.data.comment.post}`).prepend(newComment); //this prepend function will append at the starting of the list
            deleteComment($(' .delete-comment-button', newComment));
            new Noty({
                theme: 'relax',
                text: data.data.success,
                type:'success',
                layout: 'topRight',
                timeout: 1500,
            }).show();
            document.querySelector('#comment-content').value = "";
        },
        error: function(err){
            console.log(err.responseText);
        }
    });
});

// method to create comment in DOM
const newCommentDOM = function(comment){
    console.log(comment);
    return $(`<li id="comment-${comment._id}">
    <p>
        <small>

                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>

        </small>
        ${comment.content}<br>
        <small>Commented by: ${comment.user.name}</small> 
    </p>
</li>`);
}


//method to delete post from DOM
let deleteComment = function(deleteLink){//because we are passing only the tag link
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: $(this).prop('href'), // Use $(this) instead of $(deleteLink)
            success: function(data){
                console.log(`#comment-${data.data.commentId}`);
                $(`#comment-${data.data.commentId}`).remove();
                console.log('DOM')
                new Noty({
                    theme: 'relax',
                    text: data.data.success,
                    type:'success',
                    layout: 'topRight',
                    timeout: 1500,
                }).show();
            },
            error: function(err){
                console.log(err.responseText);
            }
        });
    });

}

$(document).ready(function(){
    $('.delete-comment-button').each(function(){
        deleteComment($(this));
    });
}); //for all other remaining Comment

