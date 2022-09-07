module.exports = class MsgController {
  constructor(app, commands) {
    this.commands = commands;
    this.app = app;
  }

  async handle(msg) {
    if (this.commands.verify(msg)) {
      this.commands.handle();
    }
    if (this.app.verify(msg)) {
      await this.app.handle();
    }
  }
};
