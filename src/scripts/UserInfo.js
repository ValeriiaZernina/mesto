export class UserInfo {
  constructor(nameSelector, infoSelector) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(infoSelector);
  }
  getUserInfo() {
      const userInfo = {
          profileName: this._name.textContent,
          profileInfo: this._info.textContent
      };

      return userInfo;
  }
  setUserInfo(name, about) {
      this._name.textContent = name;
      this._info.textContent = about;
  }
}