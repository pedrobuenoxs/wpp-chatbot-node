module.exports = class MsgController {
  constructor(app, commands) {
    this.commands = commands;
    this.app = app;
  }

  async handle(msg) {
    // if (this.commands.verify(msg)) {
    //   console.log("not implemented");
    // }
    if (this.app.verify(msg)) {
      await this.app.handle();
    }
  }
};
