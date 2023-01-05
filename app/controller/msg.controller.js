module.exports = class MsgController {
  constructor(app, commands) {
    this.commands = commands;
    this.app = app;
  }

  async handle(msg) {
    await this.app.handle();
  }
};
