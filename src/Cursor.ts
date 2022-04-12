import CursorPos from "./CursorPos";
import UF from "./UtilityFunctions";
import Vim from "./Vim";

/**
 * Cursor which handles movement of cursor etc.
 */
export default class Cursor {
    vim: Vim;
    pos: CursorPos;

    /**
     *
     * @param parent The vim object this cursor belongs to
     */
    constructor(parent: Vim, pos: CursorPos = { x: 0, y: 0 }) {
        this.vim = parent;
        this.pos = pos;
    }

    /**
     * Check and correct cursor position if it is out of bounds
     */
    checkFloatingCursor() {
        // Check if cursor is floating
        if (this.pos.x > this.vim.text[this.pos.y].length - 1) {
            this.pos.x = this.vim.text[this.pos.y].length - 1;
        }
    }

    /**
     * Move cursor left
     * @param times The number of times to move the cursor
     */
    left(times: number = 1) {
        // Move left by times (or as many as possible)
        this.pos.x -= Math.min(times, this.pos.x);
    }

    /**
     * Move cursor right
     * @param times The number of times to move the cursor
     */
    right(times: number = 1) {
        // Move right by times (or as many as possible)
        this.pos.x += Math.min(times, this.vim.text[this.pos.y].length - (this.pos.x + 1));
    }

    /**
     * Move cursor up
     * @param times The number of times to move the cursor
     */
    up(times: number = 1) {
        // Move up by times (or as many as possible)
        this.pos.y -= Math.min(times, this.pos.y);
        this.checkFloatingCursor();
    }

    /**
     * Move cursor down
     * @param times The number of times to move the cursor
     */
    down(times: number = 1) {
        // Move down by times (or as many as possible)
        this.pos.y += Math.min(times, this.vim.text.length - (this.pos.y + 1));
        this.checkFloatingCursor();
    }

    /**
     * Move cursor right by words (before word)
     * @param times The number of words to move the cursor
     */
    wordRight(times: number = 1) {
        // Move right by times (or as many as possible)
        let words = UF.splitStringToWords(this.vim.text[this.pos.y]);
        words = words.filter(word => word[3] !== 2);
        let wordIndex = 0; // get index of word cursor is currently at
        words.forEach((word, ind) => {
            if (word[0] <= this.pos.x) {
                wordIndex = ind;
            }
        });
        if (wordIndex === words.length - 1) {
            // load next line
            if (this.pos.y !== this.vim.text.length - 1) {
                words = words.concat(UF.splitStringToWords(this.vim.text[this.pos.y + 1]));
                this.pos.y++;
            } else return;
        }
        for (let i = 0; i < times; i++) {
            if (wordIndex === words.length - 1) {
                // load next line
                if (this.pos.y !== this.vim.text.length - 1) {
                    words = words.concat(UF.splitStringToWords(this.vim.text[this.pos.y + 1]));
                    this.pos.y++;
                    wordIndex++;
                } else break; // no more words
            } else {
                wordIndex++;
            }
        }
        this.pos.x = words[wordIndex][0];
    }

    /**
     * Move cursor left by words (before word)
     * @param times The number of words to move the cursor
     */
    wordLeft(times: number = 1) {
        // Move left by times (or as many as possible)
        let words = UF.splitStringToWords(this.vim.text[this.pos.y]);
        words = words.filter(word => word[3] !== 2);
        let wordIndex = 0; // get index of word cursor is currently at
        words.forEach((word, ind) => {
            if (word[0] <= this.pos.x) {
                wordIndex = ind;
            }
        });
        if (times > 0 && this.pos.x > words[wordIndex][0]) wordIndex++; // cursor in middle of word so as far as algorithm is concerned it is on the following word
        if (wordIndex === 0) {
            // load previous line
            if (this.pos.y !== 0) {
                let newWords = UF.splitStringToWords(this.vim.text[this.pos.y - 1]);
                words = newWords.concat(words);
                wordIndex += newWords.length;
                this.pos.y--;
            }
        }
        for (let i = 0; i < times; i++) {
            if (wordIndex === 0) {
                // load previous line
                if (this.pos.y !== 0) {
                    let newWords = UF.splitStringToWords(this.vim.text[this.pos.y - 1]);
                    words = newWords.concat(words);
                    wordIndex += newWords.length;
                    this.pos.y--;
                    wordIndex--;
                } else break; // no more words
            } else {
                wordIndex--;
            }
        }
        this.pos.x = words[wordIndex][0];
    }

    /**
     * Move cursor right by words (after word)
     * @param times The number of words to move the cursor
     */
    wordEndRight(times: number = 1) {
        // Move right by times (or as many as possible)
        let words = UF.splitStringToWords(this.vim.text[this.pos.y]);
        words = words.filter(word => word[3] !== 2);
        let wordIndex = 0; // get index of word cursor is currently at
        words.forEach((word, ind) => {
            if (word[0] <= this.pos.x) {
                wordIndex = ind;
            }
        });
        if (times > 0 && this.pos.x < words[wordIndex][2]) wordIndex--; // cursor in middle of word so as far as algorithm is concerned it is on the previous word
        if (wordIndex === words.length - 1) {
            // load next line
            if (this.pos.y !== this.vim.text.length - 1) {
                words = words.concat(UF.splitStringToWords(this.vim.text[this.pos.y + 1]));
                this.pos.y++;
            }
        }
        for (let i = 0; i < times; i++) {
            if (wordIndex === words.length - 1) {
                // load next line
                if (this.pos.y !== this.vim.text.length - 1) {
                    words = words.concat(UF.splitStringToWords(this.vim.text[this.pos.y + 1]));
                    this.pos.y++;
                    wordIndex++;
                } else break; // no more words
            } else {
                wordIndex++;
            }
        }
        this.pos.x = words[wordIndex][2];
    }
}
