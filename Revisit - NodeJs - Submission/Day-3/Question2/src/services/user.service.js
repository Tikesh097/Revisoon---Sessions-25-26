let users = [];

exports.getAllUsers = () => {
  return users;
};

exports.createUser = (user) => {
  const newUser = {
    id: users.length + 1,
    ...user
  };
  users.push(newUser);
  return newUser;
};
