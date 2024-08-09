"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveSymmetricPath = exports.deriveSymmetricHardenedKey = exports.getSymmetricMasterKeyFromSeed = void 0;
const hmac_sha512_1 = require("../primitives/hmac_sha512");
const SYMMETRIC_SEED = 'Symmetric key seed';
async function getSymmetricMasterKeyFromSeed(seed) {
    const I = await (0, hmac_sha512_1.hmac_sha512)(SYMMETRIC_SEED, seed);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);
    return {
        key: IL,
        chainCode: IR,
    };
}
exports.getSymmetricMasterKeyFromSeed = getSymmetricMasterKeyFromSeed;
;
async function deriveSymmetricHardenedKey(parent, offset) {
    // Prepare data
    const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(offset)]);
    // Derive key
    const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);
    return {
        key: IL,
        chainCode: IR,
    };
}
exports.deriveSymmetricHardenedKey = deriveSymmetricHardenedKey;
async function deriveSymmetricPath(seed, path) {
    let state = await getSymmetricMasterKeyFromSeed(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveSymmetricHardenedKey(state, index);
    }
    return state.key;
}
exports.deriveSymmetricPath = deriveSymmetricPath;
