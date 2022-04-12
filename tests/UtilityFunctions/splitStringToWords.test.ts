import { assert } from "console";
import { UtilityFunctions as UF } from "../../src";

test("first word is 'hi'", () => {
    let words = UF.splitStringToWords("hi there how are you?");
    expect(words[0][1]).toBe("hi");
});

test("last word is 'you'", () => {
    let words = UF.splitStringToWords("hi there how are you?");
    expect(words[words.length - 1][1]).toBe("?");
});

test("second word is ' '", () => {
    let words = UF.splitStringToWords("hi there how are you?");
    expect(words[1][1]).toBe(" ");
});

test("complex line splits correctly", () => {
    let correctWords = ["function", " ", "testFunc1", "(", "string", "):", " ", "void", " ", "{"];
    let words = UF.splitStringToWords(correctWords.join(""));
    expect(words.map(x => x[1])).toEqual(correctWords);
});

test("complex line indexes correct", () => {
    let correctWords = ["function", " ", "testFunc1", "(", "string", "):", " ", "void", " ", "{"];
    let indexes = [0, 8, 9, 18, 19, 25, 27, 28, 32, 33];
    let words = UF.splitStringToWords(correctWords.join(""));
    expect(words.map(x => x[0])).toEqual(indexes);
});

test("complex line end indexes correct", () => {
    let correctWords = ["function", " ", "testFunc1", "(", "string", "):", " ", "void", " ", "{"];
    let indexes = [7, 8, 17, 18, 24, 26, 27, 31, 32, 33];
    let words = UF.splitStringToWords(correctWords.join(""));
    expect(words.map(x => x[2])).toEqual(indexes);
});

test("empty line returns empty word", () => {
    let words = UF.splitStringToWords("");
    expect(words.length).toBe(1);
    expect(words[0][1]).toBe("");
    expect(words[0][0]).toBe(0);
    expect(words[0][2]).toBe(0);
});
