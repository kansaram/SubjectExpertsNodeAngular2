const mongoose = require('mongoose'),
    Experts = require('../models/subjectExperts'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
    connection = null;
    

class dbExpertsSeeder{
    init() {
        mongoose.connection.db.listCollections({name: 'experts'})
                .next((err, collinfo) => {
                    Experts.find({},  function(err, docs){
                        if (err) {
                            console.log(err);
                            return;
                        }
                        docs.forEach(function(doc, index) { 
                       //     console.log(index + " key: " + doc.firstName);
                        });
                    });
                    Experts.count((err, custsCount) => {
                        console.log("Count "+ custsCount);
                    });
                //    this.seed();
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }

    seed() {

        console.log('Seeding Experts data....');
        //Experts
        var expertsName = 
        [
            "Albert,Einstein",
            "Aishwarya,RaiBacchan",
            "Sri Sri,RaviShankar",
            "Bill,Gates",
            "Kalpana,Chawla",
            "Michael,Phelps",
            "Swami,Vivekananda",
            "Sachin, Tendulkar"
        ];
        
        var subject = 
        [
            "Scientist",
            "Actor",
            "Spiritual Guru",
            "Software Giant",
            "Astronaut",
            "Olympiard",
            "Spiritual Guru",
            "Sports"
        ];

        var country = 
        [
            "Isreal",
            "India",
            "India",
            "USA",
            "India",
            "USA",
            "India",
            "India"
        ];
        Experts.remove({});

        var l = expertsName.length,
        i;
        

        for(i = 0; i < l; i++){
            var name = expertsName[i].split(',');
            console.log("first Name "+ name[0] + " last name "+ name[1] + " Subject "+subject[i]);
            var experts = new Experts({
                'firstName': name[0],
                'lastName' : name[1],
                'subject' : subject[i],
                'country' : country[i]
            });
      

            experts.save((err, exp) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted expert: ' + exp.firstName + ' ' + exp.lastName);
                }
            });
        }
    }
}

module.exports = new dbExpertsSeeder();