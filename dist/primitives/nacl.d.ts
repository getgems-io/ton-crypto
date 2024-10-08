/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
export type KeyPair = {
    publicKey: Buffer;
    secretKey: Buffer;
};
export declare function keyPairFromSecretKey(secretKey: Buffer): KeyPair;
export declare function keyPairFromSeed(seed: Buffer): KeyPair;
export declare function sign(data: Buffer, secretKey: Buffer): Buffer;
export declare function signVerify(data: Buffer, signature: Buffer, publicKey: Buffer): boolean;
export declare function sealBox(data: Buffer, nonce: Buffer, key: Buffer): Buffer;
export declare function openBox(ciphertext: Buffer, nonce: Buffer, key: Buffer): Buffer | null;
