class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
        admin = true;
    }

    getUsername(){
        return this.username;
    }

    getAdmin(){
        return this.admin;
    }
}