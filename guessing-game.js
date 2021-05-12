const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let numAttempts;

  const askLimit = () => {
      rl.question("Pick a number of attempts: ", (pick) => {
          if (pick <= 0) {
              console.log("Invalid number! Please pick a number greater than zero!");
              return askLimit();
          }
          console.log("You have " + pick + " attempts");
        numAttempts = Number(pick);
        askRange();
      });
  }

  askLimit();

  let secretNumber;

  const askRange = () => {
    rl.question("Enter a minimum number: ", (minNum) => {
        rl.question("Enter a maximum number: ", (maxNum) => {
            console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`);
            secretNumber = randomInRange(Number(minNum), Number(maxNum));
            askGuess();
        });
    });
}



  function askGuess() {
  rl.question("Enter a guess: ", (answer) => {
      numAttempts--;
    if (numAttempts === 0) {
       console.log("You Lose! The secret number is: " + secretNumber + ".");
       return rl.close();
    }
    else if (checkGuess(Number(answer)) !== true) {
    askGuess();
    } else {
        console.log("You win! The secret number is: " + secretNumber + ".");
        rl.close();
    }
  });
}




const randomInRange = (min, max) => {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}



const checkGuess = (num) => {

    if (num > secretNumber && numAttempts > 1) {
        console.log("Too high!");
        console.log("You have " + numAttempts + " attempts left!");
        return false;
    } else if (num < secretNumber && numAttempts > 1) {
        console.log("Too low!");
        console.log("You have " + numAttempts + " attempts left!");
        return false;
    }  else if (num > secretNumber && numAttempts === 1) {
        console.log("Too high!");
        console.log("You have " + numAttempts + " attempt left. This is your final guess!!");
        return false;
    } else if (num < secretNumber && numAttempts === 1) {
        console.log("Too low!");
        console.log("You have " + numAttempts + " attempt left. This is your final guess!!");
        return false;
    } else if (num === secretNumber) {
        console.log("Correct!");
        return true;
    }
}
