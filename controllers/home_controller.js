const Post = require('../models/posts.js');
const User = require('../models/user.js');
//shows posts in home and shows user posted
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);


    //**************this function do not shows user info****************
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
    // });  

    //**********populate the user****************using promises**** but it is little bit complex
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user',
    //     }
    // })
    // .exec()
    // .then(posts => {
    //     User.find({})
    //     .then(users => {
    //         res.render('home', {
    //             title: 'Codial | Home',
    //             posts: posts,
    //             allUsers: users,
    //         });
    //     })
    //     .catch(err => {
    //         // Handle error
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     });
    // })
    // .catch(err => {
    //     // Handle error
    //     console.error(err);
    //     res.status(500).send('Internal Server Error');
    // });
    

    try{
        let posts =  await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            options: { sort: { createdAt: -1 } }, // Sort comments in descending order of creation dat
            populate: {
                path: 'user',
            }
        })

        let user = await User.find({});

        res.render('home', {
            title: 'Codial | Home',
            posts: posts,
            allUsers: user,
        });
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }



};

// module.exports.actionName = function(req,res){}