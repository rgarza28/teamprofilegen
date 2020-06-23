const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = member => [
    {
        type: "input",
        name: "picture",
        message: `Add ${member}'s picture?`
    },
    {
        type: "input",
        name: "name",
        message: `What is your ${member}'s name?`
    },
    {
        type: "input",
        name: "id",
        message: `What is your ${member}'s id?`
    },
    {
        type: "input",
        name: "email",
        message: `What is your ${member}'s email?`
    }

];


const allMembers = [];
const idArr = [];

const team = () => {
    const newManager = async () => {
        const res = await inquirer.prompt
            ([...questions("manager"),
            {
                type: "input",
                name: "officeNumber",
                message: `What is your Manager's office number?`
            }
            ]);

        const { name, id, email, picture, officeNumber } = res;
        const manager = new Manager(name, id, email, picture, officeNumber);

        allMembers.push(manager);
        idArr.push(id);

        newTeam();

    };

    const newEngineer = async () => {
        const res = await inquirer.prompt
            ([...questions("engineer"),
            {
                type: "input",
                name: "github",
                message: `What is your Engineer's Github Username?`
            }

            ]);

        const { name, id, email, photo, github } = res;
        const engineer = new Engineer(name, id, email, photo, github);

        allMembers.push(engineer);
        idArr.push(id);

        newTeam();
    };

    const newIntern = async () => {
        const res = await inquirer.prompt
            ([...questions("intern"),
            {
                type: "input",
                name: "school",
                message: `What is the name of your Intern's school?`
            }
            ]);

        const { name, id, email, photo, school } = res;
        const intern = new Intern(name, id, email, photo, school);

        allMembers.push(intern);
        idArr.push(id);

        newTeam()
    };


    const newTeam = async () => {
        const res = await inquirer.prompt([
            {
                type: "list",
                name: "chooseMember",
                message: `Who would you like to add now?`,
                choices: ["Engineer", "Intern", "I am done, no one else to add"]
            }
        ]);

        switch (res.chooseMember) {
            case "Engineer":
                newEngineer();
                break;

            case "Intern":
                newIntern();
                break;

            default:
                fs.writeFileSync(outputPath, render(allMembers), "utf-8");
                break;
        }
    };

    newManager();
};

team();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
