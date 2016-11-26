// function add(a, b) {
//     return a + b;
// }
//
// console.log(add(3, 1));
//
// let toAdd = [9, 3];
//
// // Spread operator
// console.log(add(...toAdd));

// let groupA = ['Paul', 'Lee'];
// let groupB = ['Garrosh'];
// let final = [...groupB, 3, ...groupA];
// console.log(final);

let person = ['John', 22222];
let personTwo = ['Party', -222];

function greet(name, age) {
    console.log('Hi ' + name + ' you are ' + age);
}
greet(...person);
greet(...personTwo);

let names = ['Zerian', 'Lefrep'];
let final = ['Andrew', ...names];

final.forEach((name) => {
    console.log('Hi ' + name);
});