class MakeFriend {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleFriend();
        // Retrieve initial friendship status when the page loads
        this.retrieveFriendshipStatus();
    }

    toggleFriend() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            // AJAX request to toggle friend status
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function (data) {
                console.log(data);
                // Update button text or handle friend status
                if (data.data.addedFriend === true) {
                    $(self).text('Unfriend');
                } else{
                    $(self).text('Make Friend');
                }
                // Update button text or handle friend status
                new Noty({
                    theme: 'relax',
                    text: data.data.success,
                    type:'success',
                    layout: 'topRight',
                    timeout: 1500,
                }).show();
            })
            .fail(function (errData) {
                console.log('Error in completing the request');
            });
        });
    }


    retrieveFriendshipStatus() {
        const self = this;
        // AJAX request to retrieve current friendship status
        $.ajax({
            type: 'GET',
            url: "/friendship/checkFriendshipStatus/"+ $(this.toggler).data('profile-id'), // Assuming this endpoint returns current friendship status
        })
        .done(function (data) {
            console.log(data);
            // Update button text based on retrieved status
            self.updateButtonText(data.data.isFriend);
        })
        .fail(function (errData) {
            console.log('Error in retrieving friendship status');
        });
    }

    updateButtonText(isFriend) {
        if (isFriend) {
            $(this.toggler).text('Unfriend');
        } else {
            $(this.toggler).text('Make Friend');
        }
    }
}

// Function to initialize MakeFriend class
function initializeMakeFriend() {
    const makeFriendButtons = $('.make-friend-btn');
    makeFriendButtons.each(function () {
        new MakeFriend(this);
    });
}

// Document ready event listener
$(document).ready(function () {
    initializeMakeFriend();
});