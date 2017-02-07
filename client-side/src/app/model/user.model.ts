export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    _fullName: string;
    set fullName(value) {
        this._fullName = value;
    }
    get fullName(): string {
        return this._fullName;
    }
}