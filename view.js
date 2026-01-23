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
  console.log(`=== AutoComplete Trie Console ===
          Type 'help' for commands`);

  while (true) {
    const input = prompt().trim().toLowerCase();
    const [action, word] = input.split(" ");

    if (action === "exit") {
      return;
    }

    if (!validateWord(action)) {
      printMessage(false, `${action} action is invalid!`);
      continue;
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
        break;

      default:
        printMessage(false, `${action} is not a command!`);
        break;
    }
  }
};

const printMessage = (success, info) => {
  console.log(success ? `✓ ${info}\n` : `✗  ${info}\n`);
};

const validateWord = (word) => /^[a-zA-Z]+$/.test(word);

const checkInput = (word) => {
  if (!word) return null;

  if (!validateWord(word)) {
    printMessage(false, `${word} word is invalid!`);
    return null;
  }

  return word;
};

module.exports = { printHelp, actionsMenu, printMessage };

//TODO: CHECK FLOW, need to understand further about complete actions.
