const expertsRepo = require('../../../lib/expertsRepository'),
     util = require('util');

class ExpertsController{
    constructor(router){
        router.get('/',this.getExperts.bind(this));
        router.get('/:id', this.getExpert.bind(this));
        router.get('/page/:skip/:top', this.getExpertsPage.bind(this));
        router.post('/', this.insertExpert.bind(this));
        router.put('/:id', this.updateExpert.bind(this));
        router.delete('/:id', this.deleteExpert.bind(this));
    }
    getExperts(req, res) {
        console.log('*** getExperts');
        expertsRepo.getExperts((err, data) => {
            if (err) {
                console.log('*** getExperts error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getExperts ok');
                res.json(data.experts);
            }
        });
    }

    getExpertsPage(req, res) {
        console.log('*** getExpertsPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        expertsRepo.getPagedExperts(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getExpertsPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getExpertsPage ok');
                res.json(data.experts);
            }
        });
    }
    
    getExpert(req, res) {
        console.log('*** getExpert');
        const id = req.params.id;
        console.log(id);

        expertsRepo.getExpert(id, (err, expert) => {
            if (err) {
                console.log('*** getExpert error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getExpert ok');
                res.json(expert);
            }
        });
    }

    insertExpert(req, res) {
        console.log('*** insertExpert');
        
        expertsRepo.insertExpert(req.body, (err, expert) => {
            if (err) {
                console.log('*** expertsRepo.insertExpert error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', expert: null});
            } else {
                console.log('*** insertExpert ok');
                res.json({ status: true, error: null, expert: expert });
            }
        });
    }
        
    updateExpert(req, res) {
        console.log('*** updateExpert');
        console.log('*** req.body');
        console.log(req.body);

        if (!req.body) {
            throw new Error('Expert required');
        }

        expertsRepo.updateExpert(req.params.id, req.body, (err, expert) => {
            if (err) {
                console.log('*** updateExpert error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', expert: null });
            } else {
                console.log('*** updateExpert ok');
                res.json({ status: true, error: null, expert: expert });
            }
        });
    }

    deleteExpert(req, res) {
        console.log('*** deleteExpert');

        expertsRepo.deleteExpert(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteExpert error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteExpert ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = ExpertsController;