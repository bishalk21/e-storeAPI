import bcrypt from 'bcryptjs';

const saltRound = 10;
export const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, saltRound)
}

// login, password compare
export const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword)    
}