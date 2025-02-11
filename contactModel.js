const db = require('./database');

const addContact = (name, email, phone, address, callback)=>{
    db.run(
        `INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)`,
        [name, email, phone, address],
        function(err){
            callback(err, {id: this.lastID, name, email, phone, address});
        }
    )
}

//get all contacts
const getContacts = (callback) => {
    db.all(`SELECT * FROM contacts`, [], (err, rows) => {
        callback(err, rows);
    });
};

//get contact by id
const getContactById = (id, callback) => {
    db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
        callback(err, row);
    });
};

//delete contact
const deleteContact = (id, callback) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, [id], function (err) {
        callback(err, { deletedRows: this.changes });
    });
};

module.exports = { addContact, getContacts, getContactById, deleteContact };