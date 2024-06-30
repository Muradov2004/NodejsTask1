const bcrypt = require("bcrypt");
const saltRounds = 10;

const encryptString = async (myPlaintextPassword) => {
  try {
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

const compareString = async (myPlaintextPassword, hash) => {
    try {
      const result = await bcrypt.compare(myPlaintextPassword, hash);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

module.exports = {
  encryptString,
  compareString,
};
