export function randomPick<T>(array: T[]) : T {
    return array[Math.floor(Math.random() * array.length)];
}


export function randomString(possible: string, length: number) : string {
    let text = "";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


export function randomDigitString(length: number) : string {
    return randomString("0123456789", length);
}

export function getNumberFixedLength(number: number, length: number): string {
    let str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}