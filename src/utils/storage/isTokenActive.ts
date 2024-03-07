export const isTokenActive = (token : string | null) => {
    if (!token) {
        return false;
    }

    try {

        console.log(token);

        const tokenData = JSON.parse(atob(token.split('.')[1]));

        console.log('tokenData');

        if (tokenData.exp) {
            const expirationTime = tokenData.exp * 1000;
            return expirationTime > Date.now();
        } else {
            return true;
        }
    } catch (error) {
        console.error('Помилка при обробці токена:', error);
        return false;
    }
};
