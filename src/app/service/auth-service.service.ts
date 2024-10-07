import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Registration } from "../models/Registration.model";
import { Login } from "../models/Login.model";
import { TokenResponse } from "../models/TokenResponse.model";
import { jwtDecode } from 'jwt-decode'
import { Router } from "@angular/router";




@Injectable({ providedIn: 'root' })
export class AuthService {
    sub: string = '';
    isAuthenticated: boolean = false;
    token: string = '';

    emptyLogin: Login = {
        email: '',
        password: ''
    }

    emptyRegister: Registration = {
        username: '',
        email: '',
        password: ''

    }

    constructor(
        public httpService: HttpClient,
        private router: Router) {

    }

    handleLogin(token: string) {
        return new Promise<void>(resolve => {
            localStorage.setItem("token", token);
            let tokenInfo: any = jwtDecode(token)
            console.log(tokenInfo);
            this.sub = tokenInfo['sub'];
            this.token = token;
            this.isAuthenticated = true
            resolve();

        })

    }

    logOut() {
        localStorage.setItem("token", "");
        this.sub = '';
        this.token = '';
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
    }

    postRegister(register: Registration) {
        return this.httpService.post("register", register)
    }
    postLogin(login: Login) {
        return this.httpService.post<TokenResponse>("login", login)
    }

    getRefreshToken() {
        return this.httpService.get<TokenResponse>("refresh")
    }

}





























