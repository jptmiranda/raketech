"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyFromParams = void 0;
const keyFromParams = (type, params) => {
    let key = [];
    new Map(Object.entries(params)).forEach((v, k) => {
        key.push(`${k}=${v}`);
    });
    return `${type}:${key.join("&")}`;
};
exports.keyFromParams = keyFromParams;
