export const loginConfig = {
  username: "userName",
  password: "password",
};

export const changePasswordConfig = {
  userId: "id",
  password: "oldPassword",
  new_password: "newPassword",
  new_password_again: "confirmPassword",
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
  allUsers: "UsersApi/UserListPagination",
  changePassword: "UsersApi/UserChangePassword",
};
