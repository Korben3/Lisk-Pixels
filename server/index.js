const { Application, genesisBlockDevnet, configDevnet } = require("lisk-sdk");

const { CreateBoardTransaction } = require("./transactions");
const { SetPixelTransaction } = require("./transactions");

configDevnet.app.label = "Lisk_Pixels";
configDevnet.app.version = "3.0.0";
configDevnet.components.storage.password = "password";
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet);

app.registerTransaction(SetPixelTransaction);
app.registerTransaction(CreateBoardTransaction);

app
  .run()
  .then(() => app.logger.info("App started..."))
  .catch((error) => {
    console.error("Faced error in application", error);
    process.exit(1);
  });
