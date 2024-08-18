import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client()
            .setEndpoint(config.endpoint) // Your API Endpoint
            .setProject(config.projectid); // Your project ID

        const account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                return this.Login({email,password});

            } else {
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }

    async Login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default AuthService;