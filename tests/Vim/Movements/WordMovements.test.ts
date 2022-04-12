import Vim from "../../../src";

test("try moving left one word (before) when cursor at first word", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 3;
    vim.feed(["b"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("try moving right one word (after) when cursor at last word", () => {
    const vim = new Vim("hello there");
    vim.cursor.pos.x = 8;
    console.log(vim);
    vim.feed(["e"]);
    expect(vim.cursor.pos).toEqual({ x: 10, y: 0 });
});

test("move one word right (before)", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 3;
    vim.feed(["w"]);
    expect(vim.cursor.pos).toEqual({ x: 6, y: 0 });
});

test("move one word left (before)", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 6;
    vim.feed(["b"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("move to beginning of current word", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 8;
    vim.feed(["b"]);
    expect(vim.cursor.pos).toEqual({ x: 6, y: 0 });
});

test("move to end of current word", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 8;
    vim.feed(["e"]);
    expect(vim.cursor.pos).toEqual({ x: 10, y: 0 });
});

test("move one word right (after)", () => {
    const vim = new Vim("hello there how are you?");
    vim.cursor.pos.x = 4;
    vim.feed(["e"]);
    expect(vim.cursor.pos).toEqual({ x: 10, y: 0 });
});

test("move one word right (before) to next line", () => {
    const vim = new Vim("hello there\nhow are you?");
    vim.cursor.pos.x = 6;
    vim.feed(["w"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 1 });
});

test("move one word left (before) to previous line", () => {
    const vim = new Vim("hello there\nhow are you?");
    vim.cursor.pos.y = 1;
    vim.feed(["b"]);
    expect(vim.cursor.pos).toEqual({ x: 6, y: 0 });
});

test("move one word right (after) to next line", () => {
    const vim = new Vim("hello there\nhow are you?");
    vim.cursor.pos.x = 10;
    vim.feed(["e"]);
    expect(vim.cursor.pos).toEqual({ x: 2, y: 1 });
});
