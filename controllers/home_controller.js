const Post = require('../models/posts.js');

//shows posts in home and shows user posted
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // Post.find({})
    // .then((posts) => {
    //     return res.render('home', {
    //         title: 'Codial | Home',
    //         posts: posts,
    //     });
    // })
    // .catch((err) => {
    //     console.log(err);
    //     return res.redirect('back');
    // }); //this function do not shows user info 

    //populate the user
    Post.find({}).populate('user').exec()
    .then(posts => {
        res.render('home', {
            title: 'Codial | Home',
            posts: posts,
        });
    })
    .catch(err => {
        // Handle error
        console.error(err);
        res.status(500).send('Internal Server Error');
    });


};

// module.exports.actionName = function(req,res){}