"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pbkdf2_sha512_sync = exports.pbkdf2_sha512 = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
function pbkdf2_sha512(key, salt, iterations, keyLen) {
    return new Promise((resolve, reject) => node_crypto_1.default.pbkdf2(key, salt, iterations, keyLen, 'sha512', (error, derivedKey) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(derivedKey);
        }
    }));
}
exports.pbkdf2_sha512 = pbkdf2_sha512;
function pbkdf2_sha512_sync(key, salt, iterations, keyLen) {
    return node_crypto_1.default.pbkdf2Sync(key, salt, iterations, keyLen, 'sha512');
}
exports.pbkdf2_sha512_sync = pbkdf2_sha512_sync;
