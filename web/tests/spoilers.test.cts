/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-assertions */

/** @type {typeof import("node:assert/strict")} */
const assert = require("node:assert/strict");

/** @type {typeof import("./lib/test.cjs")} */
const {noop, run_test} = require("./lib/test.cjs");

/** @type {typeof import("./lib/zjquery_helpers.cts")} */
const {create_mock} = require("./lib/zjquery_helpers.cts");

/** @type {typeof import("../src/spoilers.ts")} */
const spoilers = require("../src/spoilers.ts");

/** @type {(title: string) => import("./lib/zjquery_helpers.cts").JQueryMock} */
const get_spoiler_elem = (title) => {
    const $block = create_mock(`block-${title}`);
    const $header = create_mock(`header-${title}`);
    const $content = create_mock(`content-${title}`);
    if ($content[0]) {
        $content[0].remove = noop;
    }
    $header.text(title);
    $block.set_find_results(".spoiler-header", [$header[0]]);
    $block.set_find_results(".spoiler-content", [$content[0]]);
    return $block;
};

run_test("hide spoilers in notifications", () => {
    const $root = create_mock("root element");
    const $spoiler_1 = get_spoiler_elem("this is the title");
    const $spoiler_2 = get_spoiler_elem("");
    $root.set_find_results(".spoiler-block", [$spoiler_1[0], $spoiler_2[0]]);

    spoilers.hide_spoilers_in_notification($root as unknown as JQuery);

    assert.equal($spoiler_1.find(".spoiler-header").text(), "this is the title (…)");
    assert.equal($spoiler_2.find(".spoiler-header").text(), "(…)");
});
