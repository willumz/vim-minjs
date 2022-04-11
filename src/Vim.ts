import CursorPos from "./CursorPos";
import KeyToken from "./KeyToken";
import Token from "./TokenType";
import VimMode from "./VimModeEnum";

/**
 * @class Vim
 * @classdesc Vim is the primary class which processes everything
 */
export default class Vim {
    text: string;
    mode: VimMode;

    /**
     *
     * @param text - the text to initialise the Vim object with
     * @param mode - the vim mode to initialise the Vim object with
     */
    constructor(text?: string, mode?: VimMode) {
        this.text = text || "";
        this.mode = mode || VimMode.Normal;
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
     * @private
     * @param token
     */
    private processToken(token: Token): void {
        // Check if token is escape first as that only ever does one thing
        if (token === KeyToken.Escape) {
            this.mode = VimMode.Normal;
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
        }
    }

    /**
     * @private
     * @param token
     */
    private processNormal(token: Token): void {
        switch (token) {
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
        }
    }

    /**
     * @private
     * @param token
     */
    private processInsert(token: Token): void {}

    /**
     * @private
     * @param token
     */
    private processVisual(token: Token): void {}

    /**
     *
     * @param callback - the callback to be called when the text is updated
     * @returns this
     */
    onUpdateText(callback: (text: string, cursorPos: CursorPos) => void): Vim {
        return this;
    }
}
