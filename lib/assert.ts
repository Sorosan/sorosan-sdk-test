export class Assert {
    static equal(a: any, b: any) {
        if (a !== b) {
            throw new Error(`Expected ${a} to equal ${b}`);
        }
    }

    static notEqual(a: any, b: any) {
        if (a === b) {
            throw new Error(`Expected ${a} to not equal ${b}`);
        }
    }

    static isTrue(a: any) {
        if (!a) {
            throw new Error(`Expected ${a} to be true`);
        }
    }

    static isFalse(a: any) {
        if (a) {
            throw new Error(`Expected ${a} to be false`);
        }
    }
    

    static isNull(a: any) {
        if (a !== null) {
            throw new Error(`Expected ${a} to be null`);
        }
    }

    static isNotNull(a: any) {
        if (a === null) {
            throw new Error(`Expected ${a} to not be null`);
        }
    }

    static isUndefined(a: any) {
        if (a !== undefined) {
            throw new Error(`Expected ${a} to be undefined`);
        }
    }

    static isNotUndefined(a: any) {
        if (a === undefined) {
            throw new Error(`Expected ${a} to not be undefined`);
        }
    }

    static isObject(a: any) {
        if (typeof a !== "object") {
            throw new Error(`Expected ${a} to be an object`);
        }
    }

    static isNotObject(a: any) {
        if (typeof a === "object") {
            throw new Error(`Expected ${a} to not be an object`);
        }
    }

    static isArray(a: any) {
        if (!Array.isArray(a)) {
            throw new Error(`Expected ${a} to be an array`);
        }
    }

    static isNotArray(a: any) {
        if (Array.isArray(a)) {
            throw new Error(`Expected ${a} to not be an array`);
        }
    }

    static isString(a: any) {
        if (typeof a !== "string") {
            throw new Error(`Expected ${a} to be a string`);
        }
    }

    static isNotString(a: any) {
        if (typeof a === "string") {
            throw new Error(`Expected ${a} to not be a string`);
        }
    }

    static isNumber(a: any) {
        if (typeof a !== "number") {
            throw new Error(`Expected ${a} to be a number`);
        }
    }

    static isNotNumber(a: any) {
        if (typeof a === "number") {
            throw new Error(`Expected ${a} to not be a number`);
        }
    }

    static isFunction(a: any) {
        if (typeof a !== "function") {
            throw new Error(`Expected ${a} to be a function`);
        }
    }

    static isNotFunction(a: any) {
        if (typeof a === "function") {
            throw new Error(`Expected ${a} to not be a function`);
        }
    }


    static throws(a: any) {
        if (typeof a !== "function") {
            throw new Error(`Expected ${a} to be a function`);
        }

        try {
            a();
        } catch (e) {
            return;
        }

        throw new Error(`Expected ${a} to throw an error`);
    }

    static doesNotThrow(a: any) {
        if (typeof a !== "function") {
            throw new Error(`Expected ${a} to be a function`);
        }

        try {
            a();
        } catch (e) {
            throw new Error(`Expected ${a} to not throw an error`);
        }
    }

    static throwsAsync(fn: any) {
        return new Promise<void>((resolve, reject) => {
            const asyncWrapper = async () => {
                try {
                    await fn();
                    reject(new Error('Expected the function to throw an error.'));
                } catch (error) {
                    resolve();
                }
            };
    
            asyncWrapper();
        });
    }

    static doesNotThrowAsync(fn: any) {
        return new Promise<void>((resolve, reject) => {
            const asyncWrapper = async () => {
                try {
                    await fn();
                    resolve(); // No error was thrown, so resolve the promise.
                } catch (error) {
                    reject(new Error('Expected the function not to throw an error, but it did.'));
                }
            };
    
            asyncWrapper();
        });
    }
}