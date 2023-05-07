const buffer = Buffer.from('changeToBuffer!');

console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
console.log(Buffer.concat(array).toString());
console.log(Buffer.alloc(5));

