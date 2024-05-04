const fs = require('fs');
const DATA_FILE = './data/restaurant.json';

module.exports = function(app) {
    // Read all reservations with possible filters
    app.get('/reservations', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                res.status(500).send('Error reading data file.');
                return;
            }
            let reservations = JSON.parse(data);

            // Apply filters
            if (req.query.price) {
                reservations = reservations.filter(r => r.price <= req.query.price);
            }
            if (req.query.location) {
                reservations = reservations.filter(r => r.location.includes(req.query.location));
            }
            if (req.query.rating) {
                reservations = reservations.filter(r => r.rating >= parseFloat(req.query.rating));
            }
            if (req.query.name) {
                reservations = reservations.filter(r => r.name.toLowerCase().includes(req.query.name.toLowerCase()));
            }
            res.send(reservations);
        });
    });

    // Create a reservation
    app.post('/reservations', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                res.status(500).send('Error reading data file.');
                return;
            }
            let reservations = JSON.parse(data);
            const newReservation = { id: reservations.length + 1, ...req.body };
            reservations.push(newReservation);

            fs.writeFile(DATA_FILE, JSON.stringify(reservations, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error saving data.');
                    return;
                }
                res.status(201).send(newReservation);
            });
        });
    });

    // Delete a reservation
    app.delete('/reservations/:id', (req, res) => {
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                res.status(500).send('Error reading data file.');
                return;
            }
            let reservations = JSON.parse(data);
            reservations = reservations.filter(r => r.id !== parseInt(req.params.id));

            fs.writeFile(DATA_FILE, JSON.stringify(reservations, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error saving data.');
                    return;
                }
                res.status(204).send();
            });
        });
    });
};