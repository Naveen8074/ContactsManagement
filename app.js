require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const contactModel = require('./contactModel');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Route to get all contacts
app.get('/contacts', (req, res) => {
    contactModel.getContacts((err, contacts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(contacts);
    });
});

// Route to add a new contact
app.post('/contacts', (req, res) => {
    const { name, email, phone, address } = req.body;
    contactModel.addContact(name, email, phone, address, (err, contact) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(contact);
    });
});

// Route to get a contact by ID
app.get('/contacts/:id', (req, res) => {
    contactModel.getContactById(req.params.id, (err, contact) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    });
});

// Route to delete a contact
app.delete('/contacts/:id', (req, res) => {
    contactModel.deleteContact(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contact deleted', result });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server running at http://localhost:3000');
});
