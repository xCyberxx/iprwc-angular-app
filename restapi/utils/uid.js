exports.createID = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (let i = 0; i < 11; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}