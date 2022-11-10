'use strict';
class Pizza{
  constructor(size, type){
    this.price = 0;
    this.extraIngredients = [];
    for (let sizes in Pizza.allowedSizes){
      if (Pizza.allowedSizes[sizes] === size){
        this.size = size;
        if (size === 'SMALL'){
          this.price += 50;
        } else if (size === 'MEDIUM'){
          this.price += 75;
        } else if (size === 'LARGE'){
          this.price += 100;
        }
        break
      } 
    }
    if (this.size === undefined){
      throw new PizzaException('Invalid size')
    }
    if (type === undefined){
      throw new PizzaException('Required two arguments, given: 1')
    } else {
      for (let types in Pizza.allowedTypes){
        if (Pizza.allowedTypes[types] === type){
          this.type = type;
          if (type === 'VEGGIE'){
            this.price += 50;
          } else if (type === 'MARGHERITA'){
            this.price += 60;
          } else if (type === 'PEPPERONI'){
            this.price += 70;
          }
          break
        }
      }
      if (this.type === undefined){
        throw new PizzaException('Invalid type')
      }
    }
  }
  addExtraIngredient(ingr, ...rest){
    let oldLength = this.extraIngredients.length
    let newLength = this.extraIngredients.length
    if (rest.length > 0){
      throw new PizzaException('You can only add one ingredient')
    }
    for (let alreadyExistingIngr of this.extraIngredients){
      if (alreadyExistingIngr === ingr){
        throw new PizzaException('Duplicate ingredient')
      }
    }
    for (let ingrs in Pizza.allowedExtraIngredients){
      if (Pizza.allowedExtraIngredients[ingrs] === ingr){
        this.extraIngredients.push(ingr)
        newLength += 1;
        if (ingr === 'TOMATOES'){
          this.price += 5;
        } else if (ingr === 'CHEESE'){
          this.price += 7;
        } else if (ingr === 'MEAT'){
          this.price += 9;
        }
        break
      }
    }
    if(oldLength === newLength){
      throw new PizzaException('Invalid ingredient')
    }
  }
  removeExtraIngredient(ingr, ...rest){
    let oldLength = this.extraIngredients.length
    let newLength = this.extraIngredients.length
    let flag = true;
    if (rest.length > 0){
      throw new PizzaException('You can only remove one ingredient')
    }
    for (let ingrs in Pizza.allowedExtraIngredients){
      if(Pizza.allowedExtraIngredients[ingrs] === ingr){
        flag = false;
      }
    }
    if (flag){
      throw new PizzaException('Can not remove invalid ingredient')
    }
    for (let alreadyExistingIngr of this.extraIngredients){
      if (alreadyExistingIngr === ingr){
        newLength -= 1;
        let index = this.extraIngredients.indexOf(alreadyExistingIngr)
        this.extraIngredients.splice(index, 1)
        if(alreadyExistingIngr === 'TOMATOES'){
          this.price -= 5;
        } else if (alreadyExistingIngr === 'CHEESE'){
          this.price -= 7;
        } else if (alreadyExistingIngr === 'MEAT'){
          this.price -= 9;
        }
      }
    }
    if (oldLength === newLength){
      throw new PizzaException('You can not remove ingredient that was not yet added')
    }
  }
  getSize(){
    return this.size;
  }
  getPrice(){
    return this.price;
  }
  getExtraIngredients(){
    return this.extraIngredients;
  }
  getPizzaInfo(){
return `Size: ${this.size}, type: ${this.type}; extra ingredients: ${this.extraIngredients}; price: ${this.price}UAH.`
  }
}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = 'SMALL'
Pizza.SIZE_M = 'MEDIUM'
Pizza.SIZE_L = 'LARGE'

Pizza.TYPE_VEGGIE = 'VEGGIE'
Pizza.TYPE_MARGHERITA = 'MARGHERITA'
Pizza.TYPE_PEPPERONI = 'PEPPERONI'

Pizza.EXTRA_TOMATOES = 'TOMATOES'
Pizza.EXTRA_CHEESE = 'CHEESE'
Pizza.EXTRA_MEAT = 'MEAT'

/* Allowed properties */
Pizza.allowedSizes = {
    SIZE_S : 'SMALL',
    SIZE_M : 'MEDIUM',
    SIZE_L : 'LARGE'
}
Pizza.allowedTypes = {
    TYPE_VEGGIE : 'VEGGIE',
    TYPE_MARGHERITA : 'MARGHERITA',
    TYPE_PEPPERONI : 'PEPPERONI'
}
Pizza.allowedExtraIngredients = {
    EXTRA_TOMATOES : 'TOMATOES',
    EXTRA_CHEESE : 'CHEESE',
    EXTRA_MEAT : 'MEAT'
}

class PizzaException{
  constructor(message){
    this.log = message;
  }
}

let pizza = new Pizza(Pizza.SIZE_L, Pizza.S);





/* It should work */ 
// small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_CORN); // => Invalid ingredient
