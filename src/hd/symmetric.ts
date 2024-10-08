/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { hmac_sha512_sync } from "../primitives/hmac_sha512";
import { HDKeysState } from "./state";

const SYMMETRIC_SEED = 'Symmetric key seed';

export async function getSymmetricMasterKeyFromSeed(seed: Buffer): Promise<HDKeysState> {
    return getSymmetricMasterKeyFromSeedSync(seed)
}

export function getSymmetricMasterKeyFromSeedSync(seed: Buffer): HDKeysState {
    const I = hmac_sha512_sync(SYMMETRIC_SEED, seed);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);

    return {
        key: IL,
        chainCode: IR,
    }
}

export async function deriveSymmetricHardenedKey(parent: HDKeysState, offset: string): Promise<HDKeysState> {
    return deriveSymmetricHardenedKeySync(parent, offset)
}

export function deriveSymmetricHardenedKeySync(parent: HDKeysState, offset: string): HDKeysState {
    // Prepare data
    const data = Buffer.concat([Buffer.alloc(1, 0), Buffer.from(offset)]);

    // Derive key
    const I = hmac_sha512_sync(parent.chainCode, data);
    const IL = I.slice(32);
    const IR = I.slice(0, 32);

    return {
        key: IL,
        chainCode: IR,
    }
}

export async function deriveSymmetricPath(seed: Buffer, path: string[]) {
    return deriveSymmetricPathSync(seed, path)
}

export function deriveSymmetricPathSync(seed: Buffer, path: string[]) {
    let state = getSymmetricMasterKeyFromSeedSync(seed);
    let remaining = [...path];
    while (remaining.length > 0) {
        let index = remaining[0];
        remaining = remaining.slice(1);
        state = deriveSymmetricHardenedKeySync(state, index);
    }

    return state.key
}
