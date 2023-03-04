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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mediaService_1 = __importDefault(require("../services/mediaService"));
const searchMediaQuerySchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    type: zod_1.z.enum(["movie", "series", "episode"]).optional(),
    year: zod_1.z
        .preprocess((y) => parseInt(zod_1.z.string().parse(y)), zod_1.z.number())
        .optional(),
    page: zod_1.z
        .preprocess((p) => parseInt(zod_1.z.string().parse(p)), zod_1.z.number())
        .optional(),
});
const searchMedia = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParams = searchMediaQuerySchema.parse(req.query);
        const results = yield mediaService_1.default.searchMedia(queryParams);
        resp.json(results);
    }
    catch (e) {
        resp.status(500);
        if (e.constructor.name === "ZodError") {
            resp.json(e);
            return;
        }
        resp.json({
            error: e.message,
        });
    }
});
exports.default = {
    searchMedia,
};
