import bcrypt from 'bcrypt';

const password = 'test1234';
const saltRounds = 10;

const hashPassword = async () => {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log('Use this hash in your database:\n', hashed);
};

hashPassword();
