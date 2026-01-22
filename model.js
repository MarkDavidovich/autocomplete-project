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
}

//! don't forget to toLowerCase();
let trie = new AutoCompleteTrie(" ");

trie.addWord("run");
trie.addWord("running");

console.log(trie.findWord("run"));
console.log(trie.findWord("ru"));
