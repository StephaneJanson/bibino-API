const bcrypt = require('bcrypt');
require('dotenv').config();
const client = require('../app/config/db');

// here we create an administrator user. You can update with your data
async function create() {
    const myPassword = 'my unencrypted password';

    const myEncryptedPassword = bcrypt.hashSync(myPassword, 10);

    const query = {
        text: 'INSERT INTO user_account (alias, date_of_birth, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [
            'My username',
            'my birth date',
            'my email',
            myEncryptedPassword,
            2,
        ],
    };
    const savedUser = await client.query(query);
    console.log('User created');
    const user = savedUser.rows[0];

    return {
        user,
    };
}

create();
