import Vim from "../../../src";

let testText = "hello there\nhow are you?\nI'm doing well\nthanks for asking";
let splitText = testText.split("\n");

test("try to move left when at beginning of line", () => {
    const vim = new Vim(testText);
    vim.feed(["h"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("try to move right when at end of line", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.x = splitText[0].length - 1;
    vim.feed(["l"]);
    expect(vim.cursor.pos).toEqual({ x: splitText[0].length - 1, y: 0 });
});

test("try to move up when at beginning of text", () => {
    const vim = new Vim(testText);
    vim.feed(["k"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("try to move down when at end of text", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.y = splitText.length - 1;
    vim.feed(["j"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: splitText.length - 1 });
});

test("move left once", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.x = 1;
    vim.feed(["h"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("move right once", () => {
    const vim = new Vim(testText);
    vim.feed(["l"]);
    expect(vim.cursor.pos).toEqual({ x: 1, y: 0 });
});

test("move up once", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.y = 1;
    vim.feed(["k"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("move down once", () => {
    const vim = new Vim(testText);
    vim.feed(["j"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 1 });
});

test("move left twice", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.x = 2;
    vim.feed(["h", "h"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("move right twice", () => {
    const vim = new Vim(testText);
    vim.feed(["l", "l"]);
    expect(vim.cursor.pos).toEqual({ x: 2, y: 0 });
});

test("move up twice", () => {
    const vim = new Vim(testText);
    vim.cursor.pos.y = 2;
    vim.feed(["k", "k"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 0 });
});

test("move down twice", () => {
    const vim = new Vim(testText);
    vim.feed(["j", "j"]);
    expect(vim.cursor.pos).toEqual({ x: 0, y: 2 });
});

test("move down from end of longer line to shorter line", () => {
    const vim = new Vim("hello there\nhi");
    vim.cursor.pos.y = 0;
    vim.cursor.pos.x = 10;
    vim.feed(["j"]);
    expect(vim.cursor.pos).toEqual({ x: 1, y: 1 });
});

test("move up from end of longer line to shorter line", () => {
    const vim = new Vim("hi\nhello there");
    vim.cursor.pos.y = 1;
    vim.cursor.pos.x = 10;
    vim.feed(["k"]);
    expect(vim.cursor.pos).toEqual({ x: 1, y: 0 });
});
