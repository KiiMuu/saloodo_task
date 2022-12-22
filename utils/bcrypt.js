import bcrypt from 'bcrypt';

const hashPassword = async password => {
	return bcrypt.hash(password, 12);
};

const comparePasswords = async (password, userPassword) => {
	return bcrypt.compare(password, userPassword);
};

export { hashPassword, comparePasswords };
