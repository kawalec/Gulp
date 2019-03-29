const arr = ['Ania', 'Agnieszka', 'Basia', 'Ula', 'Zosia'];
let users = [];
arr.forEach(el => users.push(el.toUpperCase()));
// export default users; 

console.log(`Names: ${users}`);

const firstLetter = () => users.map(el => el.charAt(0));

// import users from './app.js';

console.log('Gulp works...!');

// console.log(`Names: ${users}`);

// const firstLetter = () => users.map(el => el.charAt(0));
console.log(firstLetter);