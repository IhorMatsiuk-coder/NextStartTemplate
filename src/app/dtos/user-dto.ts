class UserDto {
  email;
  id;
  isActivated;
  userRole;

  constructor(model: any) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.userRole = model.userRole;
  }
}

export default UserDto;
