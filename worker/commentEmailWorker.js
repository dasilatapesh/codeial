const queue =  require('../config/kue');

const commentMailer = require('../mailers/commentMailer');

queue.process('emails', function(job,done){
    console.log('Working job', job.data); //to check it is working
    commentMailer.newComment(job.data);
    done();
});

module.exports = queue;