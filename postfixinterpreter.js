//import libraries
const readline = require('readline');

//postfix interpreter class
class PostFixInterpreter {
    constructor() {

        //include the collection and stack updateVariable
        this.collection = [];
        this.stack = [];
        this.symbolCounter = 0;
    }

    //include the evaluatePostfixExp function that recieves one parameter
    evaluatePostfixExp(inputExp) {
        console.log(`Expression being evaluated: "${inputExp}"`);
        const expTokens = inputExp.split(' ');

        let hasOperator = false;

        for (let i = 0; i < expTokens.length; i++) {
            const token = expTokens[i];
            console.log(`Token: "${token}"`);

            //checks if the token already exists
            if (token.match(/^[A-Z]$/)) { 
                const value = this.collection[token];

                if (value === undefined) {
                    console.log(`\nSymbol "${token}" not found, pushing 0\n`);
                    this.stack.push(0);

                } else {
                    //if the symbol has already been found then push that value into the stack
                    console.log(`\nSymbol "${token}" found, pushing ${value}\n`);
                    this.stack.push(value);
                }

                //checks if there are any arithmetic operators
            } else if (['+', '-', '*', '/', '%', '^'].includes(token)) {
                const operand1 = this.stack.pop();
                const operand2 = this.stack.pop();

                //checks if there are enough operators to evaluate the expression
                if (operand1 === undefined || operand2 === undefined) {
                    throw new Error(`\n\nInsufficient operands for operator: ${token}\n\n`);
                }

                console.log(`\n\nPopped operands: ${operand2}, ${operand1}\n\n`);
                hasOperator = true;

                //when the token has been detected then verify what kind of operator it is
                switch (token) {

                    //for this case if the addition operator has been inserted then addition will be executed
                    case '+':
                        this.stack.push(operand2 + operand1);
                        console.log(`\n\nPerformed addition: ${operand2} + ${operand1} = ${operand2 + operand1}\n\n`);
                        break;

                    case '-':
                        this.stack.push(operand2 - operand1);
                        console.log(`\n\nPerformed subtraction: ${operand2} - ${operand1} = ${operand2 - operand1}\n\n`);
                        break;

                    case '*':
                        this.stack.push(operand2 * operand1);
                        console.log(`\n\nPerformed multiplication: ${operand2} * ${operand1} = ${operand2 * operand1}\n\n`);
                        break;

                    case '/':
                        if (operand1 === 0) {
                            throw new Error(`\n\nDivision by zero error\n\n`);
                        }

                        this.stack.push(operand2 / operand1);
                        console.log(`\n\nPerformed division: ${operand2} / ${operand1} = ${operand2 / operand1}\n\n`);
                        break;

                    case '%':
                        this.stack.push(operand2 % operand1);
                        console.log(`\n\nPerformed modulus: ${operand2} % ${operand1} = ${operand2 % operand1}\n\n`);
                        break;

                    case '^':
                        this.stack.push(Math.pow(operand2, operand1));
                        console.log(`\n\nPerformed exponentiation: ${operand2} ^ ${operand1} = ${Math.pow(operand2, operand1)}\n\n`);
                        break;

                    default:
                        throw new Error(`\n\nInvalid operator: ${token}\n\n`);
                }

            //this checks if the user only requests to update a value
            } else if (token === '=') {

                const updateVariable = expTokens[i - 2];
                const value = this.stack.pop();
                this.updateSymbolTable(updateVariable, value);

                //if the variable that was selected has been updated successfully
                console.log(`${updateVariable} has been updated successfully!`);
            } else {

                const num = parseFloat(token);
                if (!isNaN(num) && this.isValidNumber(num)) {
                    this.stack.push(num);
                    console.log(`\nPushed number: ${num}\n`);

                } else {

                    //this verifies if the number that has been inserted is between -100 and 100 value range
                    console.log(`\nInvalid number: ${token}. Only values between -100 and 100 are allowed.\n`);
                }
            }

            //returns the current values in the stack
            console.log(`\nCurrent stack: ${JSON.stringify(this.stack)}\n`);
        }

        const result = this.stack.pop();

        //if the operator is present then return the final result of the expression
        if (hasOperator) {
            console.log(`\nFinal result: ${result}\n`);
        }
        console.log(`\nFinal stack: ${JSON.stringify(this.stack)}\n`);
        
        return result;
    }

    //this function updates existing variables inserted by the user
    updateSymbolTable(symbol, value) {

        //verifies that the variable that the user has inserted is from A to Z
        if (/^[A-Z]$/.test(symbol)) {

            //this verifies if the value that was inserted is between -100 and 100 by calling the isValidNumber function
            if (this.isValidNumber(value)) {

                if(this.symbolCounter < 1000){

                    this.collection[symbol] = value;
                    this.symbolCounter++;

                    //returns a print to display that the new value has been inserted into the table
                    console.log(`\nUpdate status: \nAssigned: ${symbol} = ${value} successfully.`);
                    console.log(`\nCurrent size of symbol table is " ${this.symbolCounter} "`);
                }else{
                    console.log("\nUpdate status: Update failed.");
                    console.log(`The symbol table is full, the current number of symbols in the table are " ${this.symbolCounter} "`);
                } 
            }
            else {
                console.log(`\nInvalid value: ${value}. Only values between -100 and 100 are allowed.\n`);
            }
        } else {

            //checks that the variable that was entered is A to Z
            console.log(`\nInvalid variable name: ${symbol}. Only letters A-Z are allowed.\n`);
        }
    }

    //this function deletes existing variables that the user has entered previously
    deleteSymbol(symbol) {
        if (this.collection.hasOwnProperty(symbol)) {
            delete this.collection[symbol];
            this.symbolCounter--;
            console.log(`\nDelete status: \n${symbol} has been deleted successfully.\n`);
            console.log(`The current number of symbols in the table are " ${this.symbolCounter} "`);
        } else {
            console.log(`\nDelete status: \nSymbol "${symbol}" not found. Delete operation failed.\n`);
        }
    }

    //this function allows the user to search for existing symbols in the table
    searchSymbolHash(symbol) {
        if (this.collection.hasOwnProperty(symbol)) {
            console.log("\nSearch status: \nSymbol has been found successfully.");
            return this.collection[symbol];
            
        } else {
            return "\nSearch status: \nSymbol was not found. Search operation has failed\n";
        }
    }

    //this function verifies whether the input from the user for variable values are between -100 and 100
    isValidNumber(num) {
        return num >= -100 && num <= 100;
    }
}

//this assigns the postfixinterpreter class to a variable
const interpreter = new PostFixInterpreter();

//this assigns the userInput variable to be able to take in user input in the console
const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//this function retrieves the user input
function getUserInput() {

    //this prints is created to have a user friendly GUI for easy and efficient access to the postfix program features
    console.log("==============================================================================");
    console.log("\nWelcome to my postfix evaluator application! \n\nHere are a list of items that you can do with this application \n");
    console.log("\nMenu: \n\n(1) Postfix expression evaluator \n(2) View symbol table \n(3) Search symbol table \n(4) Update symbol table \n(5) Delete symbol table \n(6) Help \n(7) About postfix \n(8) Exit \n");
    console.log("==============================================================================\n\n");
    //from the menu provided to the user a selection is inserted into the command line
    userInput.question('Please enter your selection here: ', (selection) => {

        //depending on what the user has selected the program will respond accordingly
        switch (selection) {
            case '1':

                //some users do not know how to enter a postfix expression so the program will ask if the user knows how to enter
                userInput.question('Do you know how to enter a postfix expression?\n\nPlease enter (yes / no) : ', (postfixBool) => {
                    if (postfixBool === "yes") {
                        console.log("\nThe available operators are ' + , - , * , / , % , ^ '\n");
                        userInput.question('Enter a postfix expression (or "exit" to quit): ', (inputExp) => {
                            if (inputExp !== "exit") {
                                try {
                                    const result = interpreter.evaluatePostfixExp(inputExp);
                                    if (inputExp.includes('+') || inputExp.includes('-') || inputExp.includes('*') || inputExp.includes('/') || inputExp.includes('%') || inputExp.includes('^')) {
                                        console.log(`This is your expression: ${inputExp}`);
                                        console.log(`Result: ${result} \n\n`);
                                    }
                                } catch (error) {
                                    console.log(error.message);
                                }
                            }
                            getUserInput(); // Return to the main menu
                        });
                    } else if (postfixBool === "no") {
                        console.log("\nPlease refer to the help page from the menu selection.");
                        getUserInput(); // Display the menu
                    } else {
                        console.log("\nPlease enter a valid value! Please try again.");
                        getUserInput();
                    }
                });
                break;

            //view existing symbol table    
            case '2':
                console.log("\nSymbol table: ");
                for(const [symbol, value] of Object.entries(interpreter.collection)){
                    console.log(`{"${symbol} = ${value}"}`);
                }
                console.log("\n\n")
                getUserInput();
                break;
            
            //search for existing symbols
            case '3':
                userInput.question('Enter the symbol to search: ', (symbol) => {
                    const result = interpreter.searchSymbolHash(symbol);
                    console.log(`\nSearch result: \nSymbol: ${symbol} \nValue: ${result} \n\n`);
                    getUserInput();
                });
                break;

            //update existing symbols in the table    
            case '4':
                userInput.question('Enter the symbol and value to update (e.g., A 10): ', (input) => {
                    const [symbol, value] = input.split(' ');
                    interpreter.updateSymbolTable(symbol, parseFloat(value));
                    getUserInput();
                });
                break;

           //delete existing symbols in the table
            case '5':
                userInput.question('Enter the symbol to delete: ', (symbol) => {
                    interpreter.deleteSymbol(symbol);
                    getUserInput();
                });
                break;

            //help page
            case '6':
                console.log("\nHelp page\n\nPostfix expression can be entered like this: \n" +
                            "' A 10 = B 20 = A B + '\n\n" +
                            "If you wanted to update your value in the symbol table you can insert as such: \n" +
                            "' A 20 '\n\n");
                getUserInput();
                break;

            //allow the user know about postfix program
            case '7':
                console.log("\nWhat is Postfix?\n\n"+
                "Postfix is a Reverse Polish notation (RPN), or some might refer to it as Polish postfix notation.\n"+
                "It is a mathematical notation in which operators follow their operands, as compared to prefix or Polish notation\n"+
                "In which operators precede their operands. The notation does not need any parentheses for as long as each operator\n"+
                "has a fixed number of operands. The term postfix notation desribes the general scheme in computer sciences.\n\n\n"+
                "Explanation :\n\n"+
                "In reverse polish notation, the operators follow their operands. For example, if you wanted to add 3 to 4, the expression is :\n\n"+
                "'3 4 +'\n\n"+
                "As compared to the infix notation '3 + 4'. The conventional notation expression '3 - 4 + 5' is inserted as '3 4 - 5 +' in\n "+
                "reverse polish notation. 4 is first subtracted from 3. then 5 is added to it.\n\n");
                getUserInput();
                break;

            //exit and end the program session
            case '8':
                console.log("\nThank you for using my application, have a nice day! \n\n");
                userInput.close();
                break;

            //if the user has inserted a value that is not between 1 to 8
            default:
                console.log("\nInvalid choice. Please try again. \n\n");
                getUserInput();
                break;
        }
    });
}

getUserInput();
