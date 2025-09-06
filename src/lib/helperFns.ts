export async function wait(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const ID_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
export function idMaker(length = 12) {
    return Array(length)
        .fill(0)
        .map((_) => ID_CHARS.split("")[Math.round(Math.random() * ID_CHARS.length)])
        .join("");
}
