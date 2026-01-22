class AutoCompleteTrie {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endOfWord;
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
}

//value of root node is " "
let trie = new AutoCompleteTrie(" ");

trie.addWord("run");
trie.addWord("running");
