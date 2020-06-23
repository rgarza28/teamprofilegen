// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, photo) {
        this.photo = photo;
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPhoto() {
        return this.photo;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;