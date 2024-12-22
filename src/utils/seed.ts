import connection from "../config/connection.js";
import { User, Thought } from "../models/index.js";
import { users, thoughts } from "./data.js";

connection.once('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to the database');

    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.db?.dropCollection('users');
    }

    let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
        await connection.db?.dropCollection('thoughts');
    }
    
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
