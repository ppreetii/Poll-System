const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

class Password {
    static async toHash(password) {
        try {
            const salt = randomBytes(8).toString('hex');
            const buffer = await scryptAsync(password, salt, 64);

            return `${buffer.toString('hex')}.${salt}`;
        } catch (error) {
            throw new Error(`Error hashing password: ${error.message}`);
        }
    }

    static async compare(storedPassword, suppliedPassword) {
        try {
            const [hashedPassword, salt] = storedPassword.split('.');
            const buffer = await scryptAsync(suppliedPassword, salt, 64);

            return buffer.toString('hex') === hashedPassword;
        } catch (error) {
            throw new Error(`Error comparing passwords: ${error.message}`);
        }
    }
}

module.exports = Password;
