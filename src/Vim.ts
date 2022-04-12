import Cursor from "./Cursor";
import CursorPos from "./CursorPos";
import KeyToken from "./KeyToken";
import Token from "./TokenType";
import VimMode from "./VimModeEnum";
import VimText from "./VimTextType";

/**
 * @class Vim
 * @classdesc Vim is the primary class which processes everything
 */
export default class Vim {
    /** The text of the vim objects */
    text: VimText;
    /** The current mode */
    mode: VimMode;
    /** The cursor object */
    cursor: Cursor;
    /** Is vim waiting for a token to continue an existing key combo */
    waitingForToken: boolean;
    /** Existing key combo, if waiting */
    keyCombo: Token[];
    /** Callback for when text modified */
    textUpdateCallback: (text: string, cursorPos: CursorPos) => void;

    /**
     *
     * @param text - the text to initialise the Vim object with
     * @param mode - the vim mode to initialise the Vim object with
     */
    constructor(text?: string, mode?: VimMode) {
        this.text = this.textToVimText(text || "");
        this.mode = mode || VimMode.Normal;
        this.cursor = new Cursor(this);
        this.waitingForToken = false;
        this.keyCombo = [];
        this.textUpdateCallback = (text: string, cursorPos: CursorPos) => {};
    }

    /**
     * @description Feeds tokens to the Vim object to be processed.
     * @param input - the array of tokens to be processed
     */
    feed(input: Token[]): void {
        input.forEach((token: Token) => {
            this.processToken(token);
        });
    }

    /**
     * @internal
     * @param text
     * @returns text as VimText
     */
    textToVimText(text: string): VimText {
        return text.split("\n").map((line: string) => {
            if (line[line.length - 1] === "\r") {
                return line.slice(0, -1);
            }
            return line;
        });
    }

    /**
     *
     * @returns the text object as a single string
     */
    getText(): string {
        return this.text.join("\n");
    }

    /**
     * @private
     * @param token
     */
    private processToken(token: Token): void {
        // Check if token is escape first as it only does a handful of things
        if (token === KeyToken.Escape) {
            if (this.waitingForToken) {
                this.waitingForToken = false;
                this.keyCombo = [];
            } else this.mode = VimMode.Normal;
            return;
        }
        switch (this.mode) {
            case VimMode.Normal:
                this.processNormal(token);
                break;
            case VimMode.Insert:
                this.processInsert(token);
                break;
            case VimMode.Visual:
                this.processVisual(token);
                break;
            case VimMode.VisualLine:
                this.processVisualLine(token);
                break;
            case VimMode.VisualBlock:
                this.processVisualBlock(token);
                break;
        }
    }

    /**
     * @private
     * @param token
     */
    private processNormal(token: Token): void {
        switch (token) {
            // Check for changing mode
            case "i":
                this.mode = VimMode.Insert;
                break;
            case "v":
                this.mode = VimMode.Visual;
                break;
            case "V":
                this.mode = VimMode.VisualLine;
                break;
            case KeyToken.Ctrl_V:
                this.mode = VimMode.VisualBlock;

            // Check for movement
            case "h":
                this.cursor.left();
                break;
            case "j":
                this.cursor.down();
                break;
            case "k":
                this.cursor.up();
                break;
            case "l":
                this.cursor.right();
                break;
            case "w":
                this.cursor.wordRight();
                break;
            case "b":
                this.cursor.wordLeft();
                break;
            case "e":
                this.cursor.wordEndRight();
                break;
        }
    }

    /**
     * @private
     * @param token
     */
    private processInsert(token: Token): void {
        if (!this.isKeyToken(token)) {
            // insert character
            this.text[this.cursor.pos.y] =
                this.text[this.cursor.pos.y].slice(0, this.cursor.pos.x) +
                token +
                this.text[this.cursor.pos.y].slice(this.cursor.pos.x);
            this.cursor.right();
            // callback after text updated
            this.textUpdateCallback(this.getText(), this.cursor.pos);
        }
    }

    /**
     * @private
     * @param token
     */
    private processVisual(token: Token): void {}

    /**
     * @private
     * @param token
     */
    private processVisualLine(token: Token): void {}

    /**
     * @private
     * @param token
     */
    private processVisualBlock(token: Token): void {}

    /**
     *
     * @param callback - the callback to be called when the text is updated
     * @returns this
     */
    onUpdateText(callback: (text: string, cursorPos: CursorPos) => void): Vim {
        this.textUpdateCallback = callback;
        return this;
    }

    isKeyToken(token: Token): token is KeyToken {
        return typeof token === "number"; // KeyToken is enum so will have a JS type of number
    }
}
