export class User{
    constructor(username,password,admin=true){
        this.username = username;
        this.password = password;
        this.admin = admin;
    }

    getUsername(){
        return this.username;
    }

    getAdmin(){
        return this.admin;
    }
}