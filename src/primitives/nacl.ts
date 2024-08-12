/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    crypto_sign_BYTES,
    crypto_sign_detached,
    crypto_sign_PUBLICKEYBYTES,
    crypto_sign_SECRETKEYBYTES,
    crypto_sign_seed_keypair,
    crypto_sign_SEEDBYTES, crypto_sign_verify_detached
} from 'sodium-native';
import nacl from 'tweetnacl';

export type KeyPair = {
    publicKey: Buffer;
    secretKey: Buffer;
}

export function keyPairFromSecretKey(secretKey: Buffer): KeyPair {
    if (secretKey.length !== crypto_sign_SECRETKEYBYTES) {
        throw new Error('bad secret key size');
    }

    let publicKey = secretKey.subarray(crypto_sign_PUBLICKEYBYTES, crypto_sign_SECRETKEYBYTES);
    return {
        publicKey,
        secretKey,
    }
}

export function keyPairFromSeed(seed: Buffer): KeyPair {
    if (seed.length !== crypto_sign_SEEDBYTES) {
        throw new Error('bad seed size');
    }
    let publicKey = Buffer.alloc(crypto_sign_PUBLICKEYBYTES);
    let secretKey = Buffer.alloc(crypto_sign_SECRETKEYBYTES);

    crypto_sign_seed_keypair(publicKey, secretKey, seed);

    return {
        publicKey,
        secretKey,
    }
}

export function sign(data: Buffer, secretKey: Buffer): Buffer {
    let signature = Buffer.alloc(crypto_sign_BYTES);

    crypto_sign_detached(signature, data, secretKey);

    return signature
}

export function signVerify(data: Buffer, signature: Buffer, publicKey: Buffer) {
    return crypto_sign_verify_detached(signature, data, publicKey)
}

export function sealBox(data: Buffer, nonce: Buffer, key: Buffer) {
    return Buffer.from(nacl.secretbox(data, nonce, key));
}

export function openBox(data: Buffer, nonce: Buffer, key: Buffer) {
    let res = nacl.secretbox.open(data, nonce, key);
    if (!res) {
        return null;
    }
    return Buffer.from(res);
}
