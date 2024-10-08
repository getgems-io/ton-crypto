"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mnemonic_1 = require("../mnemonic/mnemonic");
const mnemonics_1 = require("./mnemonics");
const testVectors = [{
        id: 0,
        seed: 'aWyXi7Singg64DJfwlU9JRfZsFMRSgQfJamUOSZl8ggllunSb8ocgqL/ydbxrrfEQP22p3SFn3lzbEv4dnJbng==',
        root: [
            "stock",
            "spin",
            "miss",
            "term",
            "actual",
            "auto",
            "ozone",
            "mass",
            "labor",
            "middle",
            "grab",
            "task",
            "cool",
            "tenant",
            "close",
            "invest",
            "common",
            "hire",
            "aware",
            "valley",
            "scene",
            "seven",
            "observe",
            "trend"
        ],
        paths: [{
                path: [0],
                mnemonics: [
                    'crush', 'guitar', 'depth',
                    'metal', 'social', 'pause',
                    'angle', 'spread', 'real',
                    'sphere', 'garbage', 'crime',
                    'device', 'ostrich', 'keep',
                    'embody', 'fire', 'plug',
                    'water', 'stand', 'execute',
                    'race', 'cattle', 'capable'
                ]
            }, {
                path: [1],
                mnemonics: [
                    'crouch', 'insane', 'sure',
                    'nation', 'wage', 'scout',
                    'valley', 'mechanic', 'coffee',
                    'jewel', 'coast', 'symptom',
                    'volume', 'review', 'civil',
                    'glare', 'illness', 'luggage',
                    'hobby', 'cream', 'cable',
                    'budget', 'ribbon', 'assist'
                ]
            }, {
                path: [2],
                mnemonics: [
                    'envelope', 'daring', 'shell',
                    'sniff', 'nature', 'change',
                    'grocery', 'hand', 'notable',
                    'spare', 'solve', 'height',
                    'trust', 'violin', 'unfold',
                    'taxi', 'fire', 'acquire',
                    'strong', 'shoulder', 'hurry',
                    'thrive', 'can', 'bean'
                ]
            }, {
                path: [0, 0],
                mnemonics: [
                    'shed', 'modify', 'tomorrow',
                    'average', 'pond', 'drive',
                    'hip', 'candy', 'sphere',
                    'net', 'canyon', 'enjoy',
                    'capital', 'people', 'daughter',
                    'problem', 'poet', 'copy',
                    'shrug', 'ill', 'wet',
                    'arrest', 'list', 'planet'
                ]
            }, {
                path: [0, 10, 1000000000],
                mnemonics: [
                    'venture', 'december', 'exile',
                    'shell', 'venture', 'chaos',
                    'edge', 'fiber', 'core',
                    'woman', 'glance', 'length',
                    'token', 'sunset', 'cost',
                    'ankle', 'bird', 'pudding',
                    'power', 'minimum', 'conduct',
                    'release', 'easy', 'giraffe'
                ]
            }]
    }];
describe('mnemonics', () => {
    for (let tv of testVectors) {
        it('should match test vector seed #' + tv.id, async () => {
            // Check seed
            expect(await (0, mnemonic_1.mnemonicValidate)(tv.root)).toBe(true);
            let seed = await (0, mnemonic_1.mnemonicToHDSeed)(tv.root);
            expect(seed.toString('base64')).toMatch(tv.seed);
        });
        for (let p of tv.paths) {
            it('should match test vector #' + tv.id + ' m/' + p.path.map((v) => v + '\'').join('/'), async () => {
                let seed = await (0, mnemonic_1.mnemonicToHDSeed)(tv.root);
                let derived = await (0, mnemonics_1.deriveMnemonicsPath)(seed, p.path);
                expect(await (0, mnemonic_1.mnemonicValidate)(derived)).toBe(true);
                expect(derived).toEqual(p.mnemonics);
            });
        }
    }
});
