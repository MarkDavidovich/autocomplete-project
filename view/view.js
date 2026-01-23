const prompt = require("prompt-sync")();

const printHelp = () => {
  console.log(
    `Commands: 
            add <word>          - Add word to dictionary
            find <word>         - Check if word exists
            complete <prefix>   - Get completions
            help                - Show help menu
            exit                - Quit program
            `,
  );
};

const actionsMenu = () => {
  const input = prompt().trim().toLowerCase();
  const [action, word] = input.split(" ");

  if (action === "exit") {
    return { action: "exit" };
  }

  if (!checkInput(action)) {
    printMessage(false, `${action} action is invalid!`);
    return null;
  }

  switch (action) {
    case "add":
    case "find":
    case "complete":
      const cleanWord = checkInput(word);
      if (cleanWord) return { action, word: cleanWord };
      break;
    case "help":
      printHelp();
      return null;
    default:
      printMessage(false, `${action} is not a command!`);
      return null;
  }
};

const printStartMessage = () => {
  console.log(`=== AutoComplete Trie Console ===
          Type 'help' for commands`);
};

const printExitMessage = () => {
  console.log(`Goodbye!`);
};

const printMessage = (success, info) => {
  console.log(success ? `✓ ${info}\n` : `✗  ${info}\n`);
};

const validateWord = (word) => /^[a-zA-Z]+$/.test(word).trim(word);

const checkInput = (word) => {
  if (!word) return null;

  if (!validateWord(word)) {
    printMessage(false, `${word} word is invalid!`);
    return null;
  }

  return word;
};

module.exports = { printHelp, actionsMenu, printMessage, printStartMessage, printExitMessage };
