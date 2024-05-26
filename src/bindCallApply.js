///////////////////////////////////////////////////   Call method
const helloUbject = {
    getString: function(name) {
      return `Hello my name is ${name}`
    }
  }
  
  const nameArray = ['pet9', 'vac9', 'sasha'];
   
  const printNames = function (nameArray) {                                 //Hello my name is pet9
    nameArray.forEach((name) => console.log(`${this.getString(name)}`));   // Hello my name is vac9
  }                                                                       // Hello my name is sasha
  
  printNames.call(helloUbject, nameArray);
  
  //////////////////////
  
  const helloUbject = {
    getString: function(name) {
      return `Hello my name is ${name}`
    }
  }
  
  const nameArray = ['pet9', 'vac9', 'sasha'];
  
  const printNames = function (pet9, vac9, sasha) {
    console.log(`${this.getString(pet9)}`); // Hello my name is pet9,vac9,sasha
    console.log(`${this.getString(vac9)}`); //Hello my name is undefined
    console.log(`${this.getString(sasha)}`); //Hello my name is undefined
  }
  
  printNames.call(helloUbject, nameArray);
  
  //////////////////////////////////////////////// Apply method
  
  const helloUbject = {
    getString: function(name) {
      return `Hello my name is ${name}`
    }
  }
  
  const nameArray = ['pet9', 'vac9', 'sasha'];
  
  const printNames = function (pet9, vac9, sasha) {
    console.log(`${this.getString(pet9)}`); // Hello my name is pet9,vac9,sasha
    console.log(`${this.getString(vac9)}`); //Hello my name is Hello my name is vac9
    console.log(`${this.getString(sasha)}`); //Hello my name is Hello my name is sasha
  }
  
  printNames.apply(helloUbject, nameArray);
  
  ///////////////////////////////////////////// Bind method
  
  const helloUbject = {
    getString: function(name) {
      return `Hello my name is ${name}`;
    }
  }
  
  const nameArray = ['pet9', 'vac9', 'sasha'];
  
  const printNames = function (nameArray) {
    nameArray.forEach((name) => console.log(this.getString(name)));
  }
  
  printNames.bind(helloUbject)(nameArray);