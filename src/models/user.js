export default class User {
    static instance = this.instance == null ? new User() : this.instance;
    static userId;
    static topStyle;
    static leftStyle;

    getUserId() {
      return this.userId;
    }

    setUserId(value) {
      this.userId = value;
    }

    getTopStyle() {
      return this.topStyle;
    }

    setTopStyle(value) {
      this.topStyle = value;
    }

    getLeftStyle() {
      return this.leftStyle;
    }

    setLeftStyle(value) {
      this.leftStyle = value;
    }

    getUserObject() {
      const user = {
        userId: parseInt(this.userId),
        topStyle: this.topStyle,
        leftStyle:this.leftStyle
      };

      return user;
    }
}
