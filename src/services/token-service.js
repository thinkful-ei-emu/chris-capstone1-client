import config from '../config';

const TokenService = {
    saveAuthToken(token, user_name) {
        window.localStorage.setItem(config.TOKEN_KEY, token);
        window.localStorage.setItem(config.USER_NAME,user_name);
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    getUserName() {
        return window.localStorage.getItem(config.USER_NAME);
    },
    clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY);
        window.localStorage.removeItem(config.USER_NAME);
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },
}

export default TokenService;