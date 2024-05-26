// Variable vs property

const object = {
    message: 'Hello',

    getMessage() {
        const message = 'Bye';
        return this.message;
    },

    getSecondMessage: function() {
        const message = 'Even';
        return this.message;
    }
}

console.log(object.getMessage()) // Hello
console.log(object.getSecondMessage()) // Hello

// Cat name 

function Pet(name) {
    this.name = name;
    
    this.getName = () => this.name;
}

const cat = new Pet('Sima');

console.log(cat.getName()); // Sima

const {getName} = cat;

console.log(getName()); // Sima

// Delay

const msg = 'world';

const obj = {
  msg: 'hello', 

  logMsg() {
    console.log(this.msg);
  }
}

setTimeout(obj.logMsg, 1000) // world

// Two methods

const object = {
    who: 'World',
  
    greet() {
      return `Hello, ${this.who}`;
    },
  
    farewall: () => {
      return `Goodbye, ${this.who}`;
    }
  };
  
  console.log(object.greet()); // Hello World
  console.log(object.farewall()); // Goodbye undefined

//Tricky length

var length = 4;
function callback() {
  console.log(this.length); // 4
}

const object = {
  length: 5,
  method(callback) {
    callback();
  }
};

object.method(callback, 1, 2);

//Calling arguments

var length = 4;
function callback() {
  console.log(this.length); // 3, cause this of "arguments"
}

const object = {
  length: 5,
  method() {
    arguments[0]();
  }
};

object.method(callback, 1, 2);