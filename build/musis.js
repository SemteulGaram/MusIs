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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var path_1 = __importDefault(require("path"));
var TEMPLATE_FILENAME = 'musis-template.html';
var PLACEHOLDER = '<div class="musis"></div>';
var DEFAULT_TEMPLATE = "<!DOCTYPE HTML>\n<html>\n  <head>\n    <title>MusIs</title>\n    <meta charset=\"UTF-8\" />\n    <style>\n      .musis_playlist, .musis_audio {\n        background: #666;\n        width: 400px;\n        padding: 20px;\n      }\n\n      .musis_playlist {\n        display: none;\n      }\n\n      .musis_playlist a {\n        color: #eeeedd;\n        background: #333;\n        padding: 5px;\n        display: block;\n      }\n\n      .musis_playlist a:hover {\n        text-decoration: none;\n      }\n\n      .musis_playlist .musis_active {\n        color: #5DB0E6;\n        text-decoration: none;\n      }\n    </style>\n    <script>\n      function musisRegister(audio, playlist) {\n        audio.volume = 1.0\n        audio.play()\n        \n        var current = 0;  \n        const tracks = playlist.querySelectorAll('li a')\n        const len = tracks.length\n      \n        for (var i = 0; i < tracks.length; i++) {\n          tracks[i].addEventListener('click', (function (i, event) {\n            event.preventDefault()\n            run(i)\n          }).bind(this, i))\n        }\n\n        audio.addEventListener('ended', function (event) {\n          current++;\n          if (current == len) {\n            current = 0;\n          }\n\n          run(current);\n        });\n\n        function run (index, stop) {\n          current = index\n          audio.src = tracks[index].dataset.file;\n          const currentActive = playlist.querySelector('.musis_active')\n          if (currentActive) currentActive.classList.remove('musis_active')\n          tracks[index].classList.add('musis_active')\n          audio.load();\n          if (!stop) audio.play();\n        }\n\n        run(0, true)\n      }\n    </script>\n  </head>\n  <body>\n    <div class=\"musis\"></div>\n  </body>\n</html>\n";
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
var fsp = fs_1.default.promises;
function q1(_recursive) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            rl.question('확장자 입력.(예시: mp3) 그만 입력하려면 엔터>', function (answer) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!answer) return [3 /*break*/, 5];
                            if (!_recursive) return [3 /*break*/, 2];
                            _recursive.push(answer);
                            _a = resolve;
                            return [4 /*yield*/, q1(_recursive)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                        case 2:
                            _b = resolve;
                            return [4 /*yield*/, q1([answer])];
                        case 3: return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            resolve(_recursive || []);
                            _c.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (err) {
            reject(err);
        }
    });
}
function q2(cwd, _recursive) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var subdir = '';
        try {
            rl.question('음악 스캔할 하위 폴더 이름. 그만 입력하려면 엔터>', function (answer) { return __awaiter(_this, void 0, void 0, function () {
                var stat, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!answer) return [3 /*break*/, 6];
                            return [4 /*yield*/, fsp.lstat(subdir = path_1.default.join(cwd, answer))];
                        case 1:
                            stat = _c.sent();
                            if (!stat.isDirectory())
                                throw new Error('폴더가 아님: ' + subdir);
                            if (!_recursive) return [3 /*break*/, 3];
                            _recursive.push(answer);
                            _a = resolve;
                            return [4 /*yield*/, q2(cwd, _recursive)];
                        case 2: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                        case 3:
                            _b = resolve;
                            return [4 /*yield*/, q2(cwd, [answer])];
                        case 4: return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            resolve(_recursive || []);
                            _c.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                reject(new Error('존재하지 않는 폴더: ' + subdir));
            }
            else {
                reject(err);
            }
        }
    });
}
function checkExtension(fileName, extensionArray) {
    var e_1, _a;
    var split = fileName.split('.');
    var last = split[split.length - 1].toLowerCase();
    try {
        for (var extensionArray_1 = __values(extensionArray), extensionArray_1_1 = extensionArray_1.next(); !extensionArray_1_1.done; extensionArray_1_1 = extensionArray_1.next()) {
            var ext = extensionArray_1_1.value;
            if (last === ext.toLowerCase()) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (extensionArray_1_1 && !extensionArray_1_1.done && (_a = extensionArray_1.return)) _a.call(extensionArray_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
function dirToHtml(cwd, subdir, exts) {
    return __awaiter(this, void 0, void 0, function () {
        var subcwd, files, filesNameFilter, filesTypeFilter, _path, _stat, filesNameFilter_1, filesNameFilter_1_1, file, e_2_1, hash, source, filesTypeFilter_1, filesTypeFilter_1_1, music;
        var e_2, _a, e_3, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    subcwd = path_1.default.join(cwd, subdir);
                    // 파일 읽기
                    console.log('파일 읽어들이는 중...');
                    return [4 /*yield*/, fsp.readdir(subcwd)];
                case 1:
                    files = _c.sent();
                    console.log('폴더안의 총 파일 갯수: ' + files.length);
                    filesNameFilter = files.filter(function (v) { return checkExtension(v, exts); });
                    console.log('확장자에 맞는 파일 갯수: ' + filesNameFilter.length);
                    filesTypeFilter = [];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, 8, 9]);
                    filesNameFilter_1 = __values(filesNameFilter), filesNameFilter_1_1 = filesNameFilter_1.next();
                    _c.label = 3;
                case 3:
                    if (!!filesNameFilter_1_1.done) return [3 /*break*/, 6];
                    file = filesNameFilter_1_1.value;
                    _path = path_1.default.join(subcwd, file);
                    return [4 /*yield*/, fsp.lstat(_path)];
                case 4:
                    _stat = _c.sent();
                    if (_stat.isFile())
                        filesTypeFilter.push(file);
                    _c.label = 5;
                case 5:
                    filesNameFilter_1_1 = filesNameFilter_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (filesNameFilter_1_1 && !filesNameFilter_1_1.done && (_a = filesNameFilter_1.return)) _a.call(filesNameFilter_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9:
                    console.log('폴더 제외 후 갯수: ' + filesTypeFilter.length);
                    if (filesTypeFilter.length === 0) {
                        console.error('찾은 파일 갯수 0. 무시됨');
                        return [2 /*return*/, 3];
                    }
                    console.log('HTML 빌드 중...');
                    hash = parseInt('' + (Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0');
                    source = "\n    <p class=\"musis_title musis_title_" + hash + "\">" + subdir + "</p>\n    <audio class=\"musis_audio musis_audio_" + hash + "\" controls></audio>\n    <ul class=\"musis_playlist musis_playlist_" + hash + "\">";
                    try {
                        for (filesTypeFilter_1 = __values(filesTypeFilter), filesTypeFilter_1_1 = filesTypeFilter_1.next(); !filesTypeFilter_1_1.done; filesTypeFilter_1_1 = filesTypeFilter_1.next()) {
                            music = filesTypeFilter_1_1.value;
                            source += "\n      <li>\n        <a data-file=\"" + path_1.default.join(subdir, music) + "\" href=\"#\">" + music + "</a>\n      </li>";
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (filesTypeFilter_1_1 && !filesTypeFilter_1_1.done && (_b = filesTypeFilter_1.return)) _b.call(filesTypeFilter_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    source += "\n    </ul>\n    <script>\n      musisRegister(document.querySelector('.musis_audio_" + hash + "'), document.querySelector('.musis_playlist_" + hash + "'))\n    </script>";
                    return [2 /*return*/, source];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var cwd, template, templateFile, err_1, subdirs, exts, sources, result, subdirs_1, subdirs_1_1, subdir, e_4_1, html;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cwd = path_1.default.resolve('.');
                    console.log('현재 폴더: ' + cwd);
                    templateFile = path_1.default.join(cwd, TEMPLATE_FILENAME);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fsp.readFile(templateFile, 'utf-8')];
                case 2:
                    template = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    if (err_1.code === 'ENOENT') {
                        fsp.writeFile(templateFile, DEFAULT_TEMPLATE, 'utf-8');
                        console.log("\uD15C\uD50C\uB9BF \uC0C8\uB85C \uC0DD\uC131(" + TEMPLATE_FILENAME + ") \uC6D0\uD558\uB294 \uB300\uB85C \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5");
                        console.log('이후 프로그램 재시작');
                        console.log("\n(\uC8FC\uC758: \"" + PLACEHOLDER + "\" \uD0DC\uADF8 \uD3B8\uC9D1 \uAE08\uC9C0)");
                        return [2 /*return*/, 10];
                    }
                    else {
                        throw err_1;
                    }
                    return [3 /*break*/, 4];
                case 4:
                    // 템플릿 유효성 확인
                    if (template.indexOf(PLACEHOLDER) === -1) {
                        console.error("\uD15C\uD50C\uB9BF\uC5D0\uC11C \"" + PLACEHOLDER + "\" \uD0DC\uADF8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC74C");
                        return [2 /*return*/, 10];
                    }
                    return [4 /*yield*/, q2(cwd)
                        // 확장자
                    ];
                case 5:
                    subdirs = _b.sent();
                    return [4 /*yield*/, q1()];
                case 6:
                    exts = _b.sent();
                    if (exts.length === 0) {
                        console.error('아무 확장자도 입력하지 않았으므로 무시');
                        return [2 /*return*/, 3];
                    }
                    else {
                        console.log('입력된 확장자:', exts);
                    }
                    sources = '';
                    result = 0;
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 12, 13, 14]);
                    subdirs_1 = __values(subdirs), subdirs_1_1 = subdirs_1.next();
                    _b.label = 8;
                case 8:
                    if (!!subdirs_1_1.done) return [3 /*break*/, 11];
                    subdir = subdirs_1_1.value;
                    return [4 /*yield*/, dirToHtml(cwd, subdir, exts)];
                case 9:
                    result = _b.sent();
                    if (typeof result === 'number')
                        return [2 /*return*/, result];
                    sources += result;
                    _b.label = 10;
                case 10:
                    subdirs_1_1 = subdirs_1.next();
                    return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (subdirs_1_1 && !subdirs_1_1.done && (_a = subdirs_1.return)) _a.call(subdirs_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 14:
                    console.log('HTML 파일 생성 중...');
                    html = template.replace(PLACEHOLDER, sources);
                    return [4 /*yield*/, fsp.writeFile("MusIs.html", html, 'utf-8')];
                case 15:
                    _b.sent();
                    console.log('성공');
                    return [2 /*return*/, 3];
            }
        });
    });
}
main().then(function (timeout) {
    console.log('=종료=');
    console.log("\uCF58\uC194 " + timeout + "\uCD08 \uD6C4 \uB2EB\uD798...");
    setTimeout(function () {
        process.exit(0);
    }, timeout * 1000);
}).catch(function (err) {
    console.error(err);
    console.error('=치명적 에러=');
    console.error('콘솔 10초 후 닫힘...');
    setTimeout(function () {
        process.exit(0);
    }, 10000);
});
