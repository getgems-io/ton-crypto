"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = require("./sha256");
// Test Vectors
// https://www.di-mgt.com.au/sha_testvectors.html
const VECTORS = [
    { value: 'abc', output: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' },
    { value: '', output: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { value: 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq', output: '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1' }
];
describe('sha256', () => {
    it('should process test vectors', async () => {
        for (let vec of VECTORS) {
            let expected = Buffer.from(vec.output, 'hex');
            let res = await (0, sha256_1.sha256)(vec.value);
            expect(res).toEqual(expected);
            res = await (0, sha256_1.sha256)(Buffer.from(vec.value, 'utf-8'));
            expect(res).toEqual(expected);
        }
    });
    it('should process test vectors for fallback', async () => {
        for (let vec of VECTORS) {
            let expected = Buffer.from(vec.output, 'hex');
            let res = await (0, sha256_1.sha256_fallback)(vec.value);
            expect(res).toEqual(expected);
            res = await (0, sha256_1.sha256_fallback)(Buffer.from(vec.value, 'utf-8'));
            expect(res).toEqual(expected);
        }
    });
});
