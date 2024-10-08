"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const symmetric_1 = require("./symmetric");
const testVectors = [{
        id: 0,
        seed: 'c76c4ac4f4e4a00d6b274d5c39c700bb4a7ddc04fbc6f78e85ca75007b5b495f74a9043eeb77bdd53aa6fc3a0e31462270316fa04b8c19114c8798706cd02ac8',
        key: 'dbf12b44133eaab506a740f6565cc117228cbf1dd70635cfa8ddfdc9af734756',
        paths: [{
                path: ['SLIP-0021'],
                key: '1d065e3ac1bbe5c7fad32cf2305f7d709dc070d672044a19e610c77cdf33de0d',
            }, {
                path: ['SLIP-0021', 'Master encryption key'],
                key: 'ea163130e35bbafdf5ddee97a17b39cef2be4b4f390180d65b54cf05c6a82fde',
            }, {
                path: ['SLIP-0021', 'Authentication key'],
                key: '47194e938ab24cc82bfa25f6486ed54bebe79c40ae2a5a32ea6db294d81861a6',
            }]
    }];
describe('symmetric', () => {
    for (let tv of testVectors) {
        it('should match root key #' + tv.id, async () => {
            let res = await (0, symmetric_1.getSymmetricMasterKeyFromSeed)(Buffer.from(tv.seed, 'hex'));
            expect(res.key.toString('hex')).toEqual(tv.key);
        });
        for (let p of tv.paths) {
            it('should derive chain #' + tv.id + ' for path m/' + p.path.map((v) => `"${v}"`).join('/'), async () => {
                let state = await (0, symmetric_1.getSymmetricMasterKeyFromSeed)(Buffer.from(tv.seed, 'hex'));
                let remainig = [...p.path];
                while (remainig.length > 0) {
                    let index = remainig[0];
                    remainig = remainig.slice(1);
                    state = await (0, symmetric_1.deriveSymmetricHardenedKey)(state, index);
                }
                expect(state.key.toString('hex')).toEqual(p.key);
            });
        }
        for (let p of tv.paths) {
            it('should derive full path #' + tv.id + ' for path m/' + p.path.map((v) => `"${v}"`).join('/'), async () => {
                let derived = await (0, symmetric_1.deriveSymmetricPath)(Buffer.from(tv.seed, 'hex'), p.path);
                expect(derived.toString('hex')).toEqual(p.key);
            });
        }
    }
});
