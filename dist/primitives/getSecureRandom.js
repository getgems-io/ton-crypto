"use strict";
/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecureRandomNumberSync = exports.getSecureRandomNumber = exports.getSecureRandomWordsSync = exports.getSecureRandomWords = exports.getSecureRandomBytesSync = exports.getSecureRandomBytes = void 0;
const crypto = __importStar(require("node:crypto"));
async function getSecureRandomBytes(size) {
    return crypto.randomBytes(size);
}
exports.getSecureRandomBytes = getSecureRandomBytes;
function getSecureRandomBytesSync(size) {
    return crypto.randomBytes(size);
}
exports.getSecureRandomBytesSync = getSecureRandomBytesSync;
async function getSecureRandomWords(size) {
    return getSecureRandomWordsSync(size);
}
exports.getSecureRandomWords = getSecureRandomWords;
function getSecureRandomWordsSync(size) {
    let res = new Uint16Array(size);
    crypto.randomFillSync(res);
    return res;
}
exports.getSecureRandomWordsSync = getSecureRandomWordsSync;
async function getSecureRandomNumber(min, max) {
    return getSecureRandomNumberSync(min, max);
}
exports.getSecureRandomNumber = getSecureRandomNumber;
function getSecureRandomNumberSync(min, max) {
    if (max > 9007199254740991) {
        throw new Error('Range is too large');
    }
    return crypto.randomInt(min, max);
}
exports.getSecureRandomNumberSync = getSecureRandomNumberSync;
