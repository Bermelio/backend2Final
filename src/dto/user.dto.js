class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.full_name = `${user.first_name} ${user.last_name}`;
    this.cart = user.cart ? user.cart._id : null;
  }
}

class UserPublicDTO {
  constructor(user) {
    this.id = user._id;
    this.full_name = `${user.first_name} ${user.last_name}`;
    this.role = user.role;
  }
}

class UserAuthDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}

export { UserDTO, UserPublicDTO, UserAuthDTO };
export default UserDTO;