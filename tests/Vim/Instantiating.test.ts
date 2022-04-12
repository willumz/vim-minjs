import Vim, { VimMode } from "../../src";

test("instantiate with nothing", () => {
    const vim = new Vim();
    expect(vim).toBeDefined();
    expect(vim.text).toEqual([""]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("instantiate with single line text", () => {
    const vim = new Vim("hello there how are you?");
    expect(vim).toBeDefined();
    expect(vim.text).toEqual(["hello there how are you?"]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("instantiate with multi line text", () => {
    const vim = new Vim("hello there\nhow are you?");
    expect(vim).toBeDefined();
    expect(vim.text).toEqual(["hello there", "how are you?"]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("instantiate with multi line text and carriage return", () => {
    const vim = new Vim("hello there\r\nhow are you?");
    expect(vim).toBeDefined();
    expect(vim.text).toEqual(["hello there", "how are you?"]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("instantiate with multi line text where a line is blank", () => {
    const vim = new Vim("hello there\n\nhow are you?");
    expect(vim).toBeDefined();
    expect(vim.text).toEqual(["hello there", "", "how are you?"]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("instantiate with multi line text where a line is blank and has a carriage return", () => {
    const vim = new Vim("hello there\r\n\r\nhow are you?");
    expect(vim).toBeDefined();
    expect(vim.text).toEqual(["hello there", "", "how are you?"]);
    expect(vim.mode).toBe(VimMode.Normal);
});

test("cursor position begins at 0,0", () => {
    const vim = new Vim("hello there\nhow are you?");
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});
