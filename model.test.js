const AutoCompleteTrie = module.require("/model");

describe("AutoCompleteTrie", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie("");
  });

  test("should initialize correctly", () => {
    expect(trie.value).toBe("");
    expect(trie.children).toEqual({});
    expect(trie.endOfWord).toBe(false);
  });

  describe("addWord", () => {
    test("should add a word to the trie", () => {
      trie.addWord("cat");
      expect(trie.children["c"]).toBeDefined();
      expect(trie.children["c"].children["a"]).toBeDefined();
      expect(trie.children["c"].children["a"].children["t"]).toBeDefined();
      expect(trie.children["c"].children["a"].children["t"].endOfWord).toBe(true);
    });

    test("should add multiple words", () => {
      trie.addWord("cat");
      trie.addWord("car");
      expect(trie.children["c"].children["a"].children["t"].endOfWord).toBe(true);
      expect(trie.children["c"].children["a"].children["r"].endOfWord).toBe(true);
    });
  });

  describe("findWord", () => {
    beforeEach(() => {
      trie.addWord("cat");
    });

    test("should return true for an existing word", () => {
      expect(trie.findWord("cat")).toBe(true);
    });

    test("should return false for a non-existing word", () => {
      expect(trie.findWord("dog")).toBe(false);
    });

    test("should return false for a prefix that is not a word", () => {
      expect(trie.findWord("ca")).toBe(false);
    });

    test("should return true for a word that is also a prefix of another", () => {
      trie.addWord("catch");
      expect(trie.findWord("cat")).toBe(true);
      expect(trie.findWord("catch")).toBe(true);
    });
  });

  describe("predictWords", () => {
    beforeEach(() => {
      trie.addWord("cat");
      trie.addWord("car");
      trie.addWord("carpet");
      trie.addWord("dog");
    });

    test("should return all words starting with a prefix", () => {
      const predictions = trie.predictWords("ca");
      expect(predictions).toEqual(expect.arrayContaining(["cat", "car", "carpet"]));
      expect(predictions.length).toBe(3);
    });

    test("should return empty array if no words start with prefix", () => {
      expect(trie.predictWords("z")).toEqual([]);
    });

    test("should handle exact matches as part of predictions", () => {
      const predictions = trie.predictWords("cat");
      expect(predictions).toEqual(expect.arrayContaining(["cat"]));
    });

    test("should return correct words for deeper prefix", () => {
      const predictions = trie.predictWords("carp");
      expect(predictions).toEqual(["carpet"]);
    });
  });
});
