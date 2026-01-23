const { printHelp, actionsMenu, printMessage, printStartMessage, printExitMessage } = module.require("./view/view");
const AutoCompleteTrie = module.require("./model/model");

const trie = new AutoCompleteTrie(" ");

const run = () => {
  printStartMessage();
  while (true) {
    const userInput = actionsMenu();

    if (!userInput) continue;

    if (userInput.action === "exit") {
      printExitMessage();
      break;
    }

    switch (userInput.action) {
      case "add":
        const newWord = trie.addWord(userInput.word);
        if (!newWord) {
          printMessage(false, ` "${userInput.word}" already exists in dictionary`);
          break;
        }
        printMessage(true, ` Added "${userInput.word}" to dictonary`);
        break;
      case "find":
        const hasFoundWord = trie.findWord(userInput.word);
        if (!hasFoundWord) {
          printMessage(false, ` "${userInput.word}" not found in dictionary`);
          break;
        }
        printMessage(true, ` "${userInput.word}" exists in dictionary`);
        break;
      case "complete":
        const wordList = trie.predictWords(userInput.word);
        if (wordList === null || wordList.length === 0) {
          printMessage(false, ` No suggestions for "${userInput.word}"`);
          break;
        }
        printMessage(true, ` Suggestion for "${userInput.word}": ${wordList.join(", ")} `);
        break;
    }
  }
};

run();
