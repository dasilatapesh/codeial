module.exports.profile = function(req, res){
    res.end('<h1>Users Profile</h1>');
}

module.exports.posts = function(req, res){
    res.end('<h1>Users Posts</h1>');
}

module.exports.likes = function(req, res){
    res.end('<h1>Users Likes</h1>');
}