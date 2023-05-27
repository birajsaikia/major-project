{   
    console.log('hiiiiBiraj')
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data)
                   let newPost = newPostDom(data.data.post);
                   $('#post-list-container>ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    

    createPost();
}

let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
    <p>
         ${ post.content}
        <small>
        ${ post.user.name}
        </small>
       
        <small>
            <a class="delate-post-button" href="/posts/destroy/${ post.id}">X</a>
        </small>
        
        <div class="post-comment">
            
            <form action="/comments/create" method="post">
                
                <input type="text" name="content" placeholder="enter comment">
                <input type="hidden" name="post" value="${ post._id}">
                <input type="submit" value="submit">
            </form>
        
        </div>
        <div class="post-comment-list">
            <ul id="post-comment-${ post._id}">
              
           </ul>
        </div>
    </p>
    </li>`)
}