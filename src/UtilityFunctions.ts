/**
 *
 * @param str the line to split
 * @returns an array of words, where each word element contains its first character's index in the line, the word itself, its last character's index in the line, and a number representing the type of word
 */
function splitStringToWords(str: string): Array<[number, string, number, number]> {
    if (str.length === 0) return [[0, "", 0, 3]]; // empty line
    let words: Array<[number, string, number, number]> = [];
    let currentWord = "";
    let currentWordStartIndex = 0;
    let getWordType = (char: string): 0 | 1 | 2 | 3 => {
        if (/[\w0-9]/.test(char)) return 0;
        else if (/\s/.test(char)) return 2;
        else return 1;
    };
    let currentWordType: 0 | 1 | 2 | 3 = getWordType(str[0]); // 0 for letter, 1 for symbol, 2 for space, 3 for empty
    let charArr = str.split("");
    charArr.forEach((char, ind) => {
        switch (currentWordType) {
            case 0:
                if (/[\w0-9]/.test(char)) {
                    currentWord += char;
                } else {
                    words.push([currentWordStartIndex, currentWord, ind - 1, 0]);
                    currentWord = char;
                    currentWordStartIndex = ind;
                    currentWordType = getWordType(char);
                }
                break;
            case 1:
                if (/[^\w\s0-9]/.test(char)) {
                    currentWord += char;
                } else {
                    words.push([currentWordStartIndex, currentWord, ind - 1, 1]);
                    currentWord = char;
                    currentWordStartIndex = ind;
                    currentWordType = getWordType(char);
                }
                break;
            case 2:
                if (/\s/.test(char)) {
                    currentWord += char;
                } else {
                    words.push([currentWordStartIndex, currentWord, ind - 1, 2]);
                    currentWord = char;
                    currentWordStartIndex = ind;
                    currentWordType = getWordType(char);
                }
        }
        if (ind === charArr.length - 1) {
            words.push([currentWordStartIndex, currentWord, ind, currentWordType]);
            return;
        }
    });
    return words;
}

let UtilityFunctions = {
    splitStringToWords,
};
export default UtilityFunctions;
