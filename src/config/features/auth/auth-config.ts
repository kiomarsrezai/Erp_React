export const loginConfig = {
  username: "userName",
  password: "password",
};

export const changePasswordConfig = {
  password: "password",
  new_password: "new_password",
};

export const saveLicenseConfig = {
  id: "id",
  lisence: "lisence",
};

export const forgetPasswordConfig = {
  phone: "phone",
};

export const AUTH_URLS = {
  login: "UsersApi/SignIn",
  setLicense: "UsersApi/Savelicense",
  userByTocken: "UsersApi/GetUserByTocken",
  allUsers: "UsersApi",
};
