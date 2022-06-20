export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector, handlerEditProfile) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(infoSelector);
      this._avatar = document.querySelector(avatarSelector);
      this._handlerEditProfile = handlerEditProfile;
  }
  getUserInfo() {
      const userInfo = {
          profileName: this._name.textContent,
          profileInfo: this._info.textContent,
          avatar: this._avatar.src
      };

      return userInfo;
  }

  getId() {
      return this._id;
  }

  setUserInfo(name, about) {
      this._handlerEditProfile(name, about);
      this._name.textContent = name;
      this._info.textContent = about;
  }

  setUserData(data) {
      this._name.textContent = data.name;
      this._info.textContent = data.about;
      this._avatar.src = data.avatar;
      this._id = data._id;
  }

  setAvatar(avatar) {
      this._avatar.src = avatar;
  }
}