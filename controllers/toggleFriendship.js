const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.toggleFriend = async(req, res) => {
    try {
        let addedFriend = true;
        //find user who is sending friend req
        const fromUser = await User.findById(req.user._id);
        //find user to whom req sent
        const toUser = await User.findById(req.params.id);

        //check if already a friend 
        let alreadyFriend = await Friendship.findOne({
            $or: [
                { fromUser: fromUser, toUser: toUser },
                { fromUser: toUser, toUser: fromUser }
            ]
        });

        //if already friend return
        if(alreadyFriend){
            console.log('FreiendShip Removed-->',alreadyFriend);
            addedFriend = false;

            toUser.friendship.pull(alreadyFriend);
            toUser.save();

            fromUser.friendship.pull(alreadyFriend);
            fromUser.save();

            await alreadyFriend.deleteOne();
            req.flash('success','Friend removed sucessfully.');
        }else{
            //if not friend create friedship
            const friendship = await Friendship.create({
                fromUser: fromUser,
                toUser: toUser,
            });

            //push in array of friendship of both 
            fromUser.friendship.push(friendship);
            fromUser.save();
            toUser.friendship.push(friendship);
            toUser.save(); 
            req.flash('success','Friend added sucessfully.');           
        }

        //return response
        return res.status(200).json({
            message: 'Success',
            data: {
                addedFriend: addedFriend,
                success: req.flash('success'),
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}


// Controller to check friendship status
module.exports.checkFriendshipStatus = async (req, res) => {
    try {
        // Find the users involved
        const fromUser = await User.findById(req.user._id);
        const toUser = await User.findById(req.params.id);

        // Check if there's a friendship between them
        const existingFriendship = await Friendship.findOne({
            $or: [
                { fromUser: fromUser, toUser: toUser },
                { fromUser: toUser, toUser: fromUser }
            ]
        });

        // Determine if they are friends
        const isFriend = !!existingFriendship; //converts to boolean

        // Return the status
        return res.status(200).json({
            message: 'Success',
            data: {
                isFriend: isFriend,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};