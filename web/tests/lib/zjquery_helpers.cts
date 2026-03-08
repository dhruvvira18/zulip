/* eslint-disable @typescript-eslint/no-require-imports */
import type ZJQuery from "./zjquery.cjs";

const $: typeof ZJQuery = require("./zjquery.cjs");

export type JQueryMock = {
    [index: number]: {
        remove: () => void;
        [key: string]: any;
    };
    length: number;
    find: (selector: string) => JQueryMock;
    text: (() => string) & ((content: string) => JQueryMock);
    set_find_results: (selector: string, elements: any[]) => void;
} & Iterable<any>;

function create_mock(name: string): JQueryMock {
    return $.create(name) as unknown as JQueryMock;
}

module.exports = {
    create_mock,
};
