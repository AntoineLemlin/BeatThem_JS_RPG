//Use this script to generate your character
function Person(name, race, item) {
  this.name = name;
  this.race = race;
  this.item = item;
  this.currenthealth = 100;
  this.maxHealth = 100;

  if(this.race === "Orc"){
      this.maxHealth = this.maxHealth + 40
      addLog(this.name, "has 40 health extra")
  }

  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;

  this.heal = function () {
    let healing = Math.floor(Math.random() * this.maxHealing) + this.min;

    if (item == "Staff") {
      healing = healing + (healing / 100) * 20;
      addLog(this.name, "healed with 20% bonus")
    }

    if (this.currenthealth + healing > this.maxHealth) {
      this.currenthealth = 100;
    } else {
      this.currenthealth += healing;
    }
  };

  this.damage = function () {
    let random = Math.floor(Math.random() * this.maxDamage) + 1;

    if (this.item === "Sword") {
      random = random + (random / 100) * 30;
    }

    if (this.item === "Bow") {
        if(getPercentage() <= 30){
            random = random * 2
            addLog(this.name, "aimed pefectly (damage x2)")
        }
      }
    return random;
  };

  this.totalDamage = this.damage();

  this.displayChar = function () {
    return `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`;
  };
}
