const arr = ['Ania', 'Agnieszka', 'Basia', 'Ula', 'Zosia'];
let users = [];
arr.forEach(el => users.push(el.toUpperCase()));
// export default users; 

console.log(`Names: ${users}`);

const firstLetter = () => users.map(el => el.charAt(0));
