export class LoginInfo {
    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
    constructor(public firstName: string, public lastName: string, public email: string, public token: string) {

    }
}