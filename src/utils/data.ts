export const users = [
    {
        username: "alice123",
        email: "alice@example.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "bob456",
        email: "bob@example.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "charlie789",
        email: "charlie@example.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "dave101",
        email: "dave@example.com",
        thoughts: [],
        friends: [],
    },
    {
        username: "eve202",
        email: "eve@example.com",
        thoughts: [],
        friends: [],
    },
];

export const thoughts = [
    {
        thoughtText: "I love to code!",
        username: "alice123",
        reactions: [],
    },
    {
        thoughtText: "I love to eat!",
        username: "bob456",
        reactions: [],
    },
    {
        thoughtText: "I love to sleep!",
        username: "charlie789",
        reactions: [],
    },
    {
        thoughtText: "I love to read!",
        username: "dave101",
        reactions: [],
    },
    {
        thoughtText: "I love to play video games!",
        username: "eve202",
        reactions: [],
    },
];

// Get a random item given an array
const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () =>
  `${getRandomArrItem(users)} ${getRandomArrItem(users)}`;

const getRandomThoughts = (int: number) => {
    const thoughtArr = [];
    for (let i = 0; i < int; i++) {
        thoughtArr.push(getRandomArrItem(thoughts));
    }
    return thoughtArr;
}

export { getRandomUser, getRandomThoughts, getRandomArrItem };
