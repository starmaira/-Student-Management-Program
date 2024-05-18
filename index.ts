#! /usr/bin/env node                     
 
 import inquirer from "inquirer";

const randomNumber:number =Math.floor(10000 + Math.random() * 90000)          //five digit ID code without points//

let myBalance :number= 0

let answer = await inquirer.prompt
(
  [ {
        name:"student",
        type:"input",
        message:"Enter Student Name Please:",
        validate: function(value){
            if (value.trim()!== ""){
                return true;
            }
            return"please enter a non-empty value."
        }
    },
    {
        name:"courses",
        type:"list",
        message:"Select Your Courses To Be Enrolled:",
        choices:["Math","English","Science","Computer","Biology"]
    }
  ]
);

const tuitionFee :{[key:string]:number}= {    //defining object type in which key values are in string as well as in number//
    "Math":5000,
    "English":6000,
    "Science":7000,
    "Computer":8000,
    "Biology":9000
}

console.log(`\ntuition Fee:${tuitionFee[answer.courses]}\n`);
// myBalance = myBalance + tuitionFee[answer.courses];
console.log(`\nYour Balance:${myBalance}\n`);
console.log(`\nYour Student ID:${randomNumber}\n`);

let paymentType= await inquirer.prompt

  (  [
        {
            name:"payment",
            type:"list",
            message:"Select Your Payment Methode:",
            choices:["Cash","Debit Card","Jazzcash","Bank transfer"]
        },
        {
            name:"amount",
            type:"input",
            message:"Enter Your Amount:",
            validate: function(value){                      ///validation is used when user enter empty value and its not accepted here//
                if (value.trim()!== ""){
                    return true;
                }
                return"please enter a non-empty value."
            }
        }
    ]
);

console.log(`\nYou select payment type ${paymentType.payment}`);

let newBalance = parseFloat(myBalance+paymentType.amount);  ///to mix the answers in differenr types such as adding amounts in which one is in string type and other is in number type so calculation will be impossible then use this one//

console.log(`\nYour Balance:${newBalance}\n`);

const tuitionfees = tuitionFee[answer.courses];
const paidamount = parseFloat(paymentType.amount);

if (paidamount>= tuitionfees){
    console.log(`congratulations you have succefully enrolled in ${answer.courses}\n`);

 let info = await inquirer.prompt
 ([{
    name:"select",
    type:"list",
    message:"What do you want to do next?",
    choices:["View Status","Exit"],
    }
])
if(info.select === "View Status"){
    console.log("\n****************STATUS****************\n")
    console.log(`\nYour Balance:${paidamount-tuitionfees }\n`);
    console.log(`\nYour Student ID:${randomNumber}\n`);
    console.log(`\nYour Course:${answer.courses}\n`);
    console.log(`\nYour Payment Type:${paymentType.payment}\n`);
    console.log(`\nYour Payment Amount:${paymentType.amount}\n`);
    console.log(`\nYour Payment Status:Paid\n`);
    
}else{
    console.log(`\nExiting student management system \n Thank You for Enrolling in ${answer.courses}\n`);
    console.log(`\nHave a nice day\n`);
}

} else{console.log(`\ninvalid amount for the course ${answer.courses}\n`)}
