const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Experts = require('../models/subjectExperts');

class ExpertsRepository{
    //get all the experts
    getExperts(callback){
        console.log('*** ExpertsRepository.getExperts');
        Experts.count((err, exepertsCount) => {
            let count = exepertsCount;
            console.log(`Experts count: ${count}`);

            Experts.find({}, (err, experts) => {
                if (err) { 
                    console.log(`*** ExpertsRepository.getExperts error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    experts: experts
                });
            });

        });
    }
    getPagedExperts(skip, top, callback) {
        console.log('*** ExpertsRepository.getPagedExperts');
        Experts.count((err, expertsCount) => {
            let count = expertsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Experts.find({})
                    .sort({country: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, experts) => {
                        if (err) { 
                            console.log(`*** ExpertsRepository.getPagedExperts error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            experts: experts
                        });
                    });
            });
    }

    getExpert(id, callback) {
        console.log('*** ExpertsRepository.getExpert');
        Experts.findById(id, (err, expert) => {
            if (err) { 
                console.log(`*** ExpertsRepository.getExpert error: ${err}`); 
                return callback(err); 
            }
            callback(null, expert);
        });
    }

    insertExpert(body, callback) {
        console.log('*** ExpertsRepository.insertExpert');
        let expert = new Experts();
          console.log(body);

        expert.firstName = body.firstName;
        expert.lastName = body.lastName;
        expert.subject = body.subject;
        expert.country = body.country;
        
        expert.save((err, expert) => {
            if (err) { 
                console.log(`*** CustomersRepository insertCustomer error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, expert);
        });
    }

    updateExpert(id, body, callback) {
        console.log('*** ExpertsRepository.editExpert');
        
        Experts.findById(id, (err, expert)  => {
            if (err) { 
                console.log(`*** ExpertsRepository.editExpert error: ${err}`); 
                return callback(err); 
            }

            expert.firstName = body.firstName || expert.firstName;
            expert.lastName = body.lastName || expert.lastName;
            expert.subject = body.subject || expert.subject;
            expert.country = body.country || expert.country;
           
            expert.save((err, expert) => {
                if (err) { 
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, expert);
            });

        });
    }

    // delete a expert
    deleteExpert(id, callback) {
        console.log('*** ExpertsRepository.deleteExpert');
        Experts.remove({ '_id': id }, (err, expert) => {
            if (err) { 
                console.log(`*** ExpertsRepository.deleteExpert error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, expert);
        });
    }

}

module.exports = new ExpertsRepository();

