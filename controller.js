const { printHelp, actionsMenu, printMessage, printStartMessage, printExitMessage } = module.require("/view");
const AutoCompleteTrie = module.require("/model");

const trie = new AutoCompleteTrie(" ");

const run = () => {
  printStartMessage();
  while (true) {
    const userInput = actionsMenu();

    if (!input) continue;

    if (userInput.action === "exit") {
      printExitMessage();
      break;
    }

    switch (userInput.action) {
      case "add":
        //
        break;
      case "find":
        //
        break;
      case "complete":
        //
        break;
    }
  }
};
