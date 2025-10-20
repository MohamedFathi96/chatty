/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
    // Create users collection
    await db.createCollection('users');

    // Create indexes for users collection
    await db.collection('users').createIndex(
        { email: 1 },
        { unique: true, name: 'email_unique' }
    );

};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
    // Drop the users collection (this will also remove all indexes)
    await db.collection('users').drop();
};
