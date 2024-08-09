"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveEd25519Path = exports.deriveED25519HardenedKey = exports.getED25519MasterKeyFromSeed = void 0;
const hmac_sha512_1 = require("../primitives/hmac_sha512");
const ED25519_CURVE = 'ed25519 seed';
const HARDENED_OFFSET = 0x80000000;
async function getED25519MasterKeyFromSeed(seed) {
    const I = await (0, hmac_sha512_1.hmac_sha512)(ED25519_CURVE, seed);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
exports.getED25519MasterKeyFromSeed = getED25519MasterKeyFromSeed;
;
async function deriveED25519HardenedKey(parent, index) {
    if (index >= HARDENED_OFFSET) {
        throw Error('Key index must be less than offset');
    }
    // Key Derive Path: 0x00 + parent.key + index;
    const indexBuffer = Buffer.alloc(4);
    indexBuffer.writeUInt32BE(index + HARDENED_OFFSET, 0);
    const data = Buffer.concat([Buffer.alloc(1, 0), parent.key, indexBuffer]);
    // Derive key
    const I = await (0, hmac_sha512_1.hmac_sha512)(parent.chainCode, data);
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR,
    };
}
exports.deriveED25519HardenedKey = deriveED25519HardenedKey;
;
async function deriveEd25519Path(seed, path) {
    let state = await getED25519MasterKeyFromSeed(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = await deriveED25519HardenedKey(state, index);
    }
    return state.key;
}
exports.deriveEd25519Path = deriveEd25519Path;
