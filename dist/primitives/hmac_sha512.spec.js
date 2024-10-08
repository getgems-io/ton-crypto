"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hmac_sha512_1 = require("./hmac_sha512");
// Test Vectors
// https://datatracker.ietf.org/doc/html/rfc4231
const VECTORS = [
    {
        key: Buffer.from('Jefe', 'utf-8'),
        data: Buffer.from('7768617420646f2079612077616e7420666f72206e6f7468696e673f', 'hex'),
        output: Buffer.from('164b7a7bfcf819e2e395fbe73b56e0a387bd64222e831fd610270cd7ea2505549758bf75c05a994a6d034f65f8f0e6fdcaeab1a34d4a6b4b636e070a38bce737', 'hex')
    },
    {
        key: Buffer.from('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b', 'hex'),
        data: Buffer.from('4869205468657265', 'hex'),
        output: Buffer.from('87aa7cdea5ef619d4ff0b4241a1d6cb02379f4e2ce4ec2787ad0b30545e17cdedaa833b7d6b8a702038b274eaea3f4e4be9d914eeb61f1702e696c203a126854', 'hex')
    },
    {
        key: Buffer.from('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'hex'),
        data: Buffer.from('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'hex'),
        output: Buffer.from('fa73b0089d56a284efb0f0756c890be9b1b5dbdd8ee81a3655f83e33b2279d39bf3e848279a722c806b485a47e67c807b946a337bee8942674278859e13292fb', 'hex')
    }
];
describe('hmac_sha512', () => {
    it('should process test vectors', async () => {
        for (let vec of VECTORS) {
            let res = await (0, hmac_sha512_1.hmac_sha512)(vec.key, vec.data);
            expect(res).toEqual(vec.output);
        }
    });
    it('should process test vectors fallback', async () => {
        for (let vec of VECTORS) {
            let res = await (0, hmac_sha512_1.hmac_sha512_fallback)(vec.key, vec.data);
            expect(res).toEqual(vec.output);
        }
    });
});
