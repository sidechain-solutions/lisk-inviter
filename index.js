const { Application, genesisBlockDevnet, configDevnet } = require("lisk-sdk");
const { EventTransaction, CheckinTransaction } = require("./transactions/index");

configDevnet.app.label = "lisk-inviter";
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(EventTransaction);
app.registerTransaction(CheckinTransaction);

app
  .run()
  .then(() => app.logger.info("App started..."))
  .catch(error => {
    console.error("Faced error in application", error);
    process.exit(1);
  });
