"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const utils_1 = require("../utils");
const buildUrl = (params) => {
    const url = new URL("http://www.omdbapi.com");
    if (params.title) {
        url.searchParams.append("s", params.title);
    }
    if (params.type) {
        url.searchParams.append("type", params.type);
    }
    if (params.year) {
        url.searchParams.append("y", params.year.toString());
    }
    if (params.page) {
        url.searchParams.append("page", params.page.toString());
    }
    url.searchParams.append("apikey", process.env.OMDB_API_KEY);
    return url.href;
};
const searchMedia = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsKey = (0, utils_1.keyFromParams)("search", params);
    const cachedResults = yield index_1.redisClient.get(paramsKey);
    if (cachedResults) {
        return JSON.parse(cachedResults);
    }
    const data = yield fetch(buildUrl(params)).then((response) => response.json());
    if (data.Response === "False") {
        return {
            results: [],
            totalResults: 0,
        };
    }
    const response = {
        results: data.Search,
        totalResults: parseInt(data.totalResults),
    };
    yield index_1.redisClient.set(paramsKey, JSON.stringify(response));
    yield index_1.redisClient.expire(paramsKey, 60 * 60 * 24);
    return response;
});
exports.default = {
    searchMedia,
};
