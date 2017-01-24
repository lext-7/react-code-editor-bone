export const extMap = {
    '.json': {
        mime: 'application/json',
        mode: 'json',
    },
    '.txt': {
        mime: 'text/plain',
        mode: 'text',
    },
    '.html': {
        mime: 'text/html',
        mode: 'html',
    },
    '.js': {
        mime: 'application/x-javascript',
        mode: 'javascript',
    },
    '.css': {
        mime: 'text/css',
        mode: 'css',
    },
    '.xml': {
        mime: 'application/xml',
        mode: 'xml',
    },
    '.md': {
        mime: '.md',
        mode: 'markdown',
    },
};


export const modeList = [];

export const modeMap = {};

for (const ext in extMap) {
    if (Object.prototype.hasOwnProperty.call(extMap, ext)) {
        const extItem = extMap[ext];
        modeList.push({
            mode: extItem.mode,
            ext,
        });
        modeMap[extItem.mode] = {
            ext,
            mime: extItem.mime,
        };
    }
}

export default function (extOrMode) {
    const isExt = extOrMode[0] === '.';
    const map = isExt ? extMap : modeMap;
    let value = map[extOrMode];
    if (!value) {
        value = map[isExt ? '.txt' : 'text'];
    }
    return value;
}
