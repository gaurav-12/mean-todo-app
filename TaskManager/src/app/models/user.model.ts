export class User {
    _id: String;
    fullName: String;

    // Below fields will be use ful to parse the response but will not be saved locally
    email?: String;
    password?: String;
}