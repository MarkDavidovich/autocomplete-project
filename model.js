class AutoCompleteTrie {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
    let currentNode = this;

    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new AutoCompleteTrie(char);
        console.log("Created a new node!", char);
      }
      currentNode = currentNode.children[char];
    }
    currentNode.endOfWord = true;
    ("finished, endOfWord is", currentNode.endOfWord);
  }

  findWord(word) {
    let currentNode = this;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
        console.log(currentNode.value);
      } else {
        return false;
      }
    }
    return currentNode.endOfWord;
  }

  predictWords(prefix) {}

  _getRemainingTree(prefix, node = this) {
    let currentNode = node;
    for (let char of prefix) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      }
    }
    return currentNode;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWOrd) {
      allWords.push(prefix);
    }

    for (let char in node.children) {
      let childNode = node.children[char];

      this._allWordsHelper(prefix + char, childNode, allWords);
    }
  }
}

//! don't forget to toLowerCase();
let trie = new AutoCompleteTrie(" ");

trie.addWord("run");
trie.addWord("running");

console.log(trie.findWord("run"));
console.log(trie.findWord("ru"));
