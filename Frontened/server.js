/*
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customers'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/form', (req, res) => {
    res.json({ message: 'This is a CORS-enabled response.' });
});

app.post('/customers', (req, res) => {
    const sql = "INSERT INTO form (name, email, Address) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.Address
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.json({ message: 'Data inserted successfully', data });
    });
});


/*DATABASE
app.post('/transactions', (req, res) => {
    const sql = "INSERT INTO transactions (subtotal, discount, tax, grand_total) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.subtotal,
        req.body.discount,
        req.body.tax,
        req.body.grand_total
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.json({ message: 'Transaction recorded successfully', data });
    });
});



app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
*/
/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customers'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Endpoint to store transaction details
app.post('/transactions', (req, res) => {
    const sql = "INSERT INTO transactions (subtotal, discount, tax, grand_total) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.subtotal,
        req.body.discount,
        req.body.tax,
        req.body.grand_total
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.json({ message: 'Transaction recorded successfully', data });
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3002');
});
*/

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customers'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Endpoint to store transaction details
app.post('/transactions', (req, res) => {
    const { subtotal, discount, tax, grand_total, items } = req.body;
    const sqlTransaction = "INSERT INTO transactions (subtotal, discount, tax, grand_total) VALUES (?, ?, ?, ?)";
    const valuesTransaction = [subtotal, discount, tax, grand_total];
    
    db.query(sqlTransaction, valuesTransaction, (err, data) => {
        if (err) {
            console.error('Error inserting transaction data:', err);
            return res.status(500).json({ message: 'Error inserting transaction data' });
        }

        const transactionId = data.insertId;

        const sqlTransaction = "INSERT INTO transactions (transaction_id, name, price) VALUES ?";
        const valuesTransaction = items.map(item => [transactionId, item.name, item.price]);

        db.query(sqlTransaction, [valuesTransaction], (err, data) => {
            if (err) {
                console.error('Error inserting transaction items data:', err);
                return res.status(500).json({ message: 'Error inserting transaction items data' });
            }
            res.json({ message: 'Transaction recorded successfully', transactionId });
        });
    });
});

/*Discounts*/
app.post('/discounts', (req, res) => {
    const { discount_percentage, notes } = req.body;
    const sql = "INSERT INTO discounts (discount_percentage, notes) VALUES (?, ?)";
    const values = [discount_percentage, notes];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting discount data:', err);
            return res.status(500).json({ message: 'Error inserting discount data' });
        }
        res.json({ message: 'Discount recorded successfully', data });
    });
});
/*payments*/
app.post('/payments', (req, res) => {
    const { payment_type, amount_paid, change_due } = req.body;
    const sql = "INSERT INTO payments (payment_type, amount_paid, change_due) VALUES (?, ?, ?)";
    const values = [payment_type, amount_paid, change_due];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting payment data:', err);
            return res.status(500).json({ message: 'Error inserting payment data' });
        }
        res.json({ message: 'Payment recorded successfully', data });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3002');
});
