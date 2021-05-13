const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let numAttempts;

  const askLimit = () => {
      rl.question("Pick a number of attempts: ", (pick) => {
          if (pick <= 0 || (/[a-zA-Z]/).test(pick)) {
              console.log("Invalid number! Please pick a number greater than zero!");
              return askLimit();
          } else {
          numAttempts = Number(pick);
          console.log("You have " + numAttempts + " attempts");
        askRange();
          }
      });
  }

  askLimit();

  let secretNumber;

  const askRange = () => {
    rl.question("Enter a minimum number: ", (minNum) => {
        if (minNum < 1 || (/[a-zA-Z]/).test(minNum)) {
            console.log("Invalid number! Please pick a number greater than zero!");
            return askRange();
        }
        rl.question("Enter a maximum number: ", (maxNum) => {
            if (maxNum < 1 || (/[a-zA-Z]/).test(maxNum)) {
                console.log("Invalid number! Please pick a number greater than zero!");
                return askRange();
            }
            console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`);
            secretNumber = randomInRange(Number(minNum), Number(maxNum));
            askGuess();
        });
    });
}



  function askGuess() {
  rl.question("Enter a guess: ", (answer) => {
      if ((/[a-zA-Z]/).test(answer)) {
        console.log("Invalid number!");
        return askGuess();
    }
      numAttempts--;
    if (numAttempts < 1) {
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
