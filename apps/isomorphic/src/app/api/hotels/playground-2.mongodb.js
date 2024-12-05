// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('staychain');

// Create a new document in the collection.
db.getCollection("hotels").insertOne({
  data: {
    name: "Nobile Suítes Gran Lumni",
    contact: {
      number: "1-800-222-8888",
      email: "email@example.com",
    },
    rooms: [
      {
        name: "Deluxe Queen Room",
        people: 2,
        size: 35,
        beds: 2,
        bathrooms: 1,
        price: 48.25,
        available: true,
      },
      {
        name: "Deluxe King Room",
        people: 2,
        size: 35,
        beds: 2,
        bathrooms: 1,
        price: 48.25,
        available: true,
      },
    ],
  },
});
