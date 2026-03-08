/* eslint-disable @typescript-eslint/no-explicit-any */

// Loosen Mongoose types for JS-style code
declare module "mongoose" {
    interface Model<T> {
        find(filter?: any, projection?: any, options?: any): any;
        findOne(filter?: any, projection?: any, options?: any): any;
        findById(id: any, projection?: any, options?: any): any;
        findOneAndDelete(filter?: any, options?: any): any;
        findOneAndUpdate(filter?: any, update?: any, options?: any): any;
        create(doc: any): any;
    }
}

// Declare untyped modules
declare module "bcrypt";
declare module "sql-formatter" {
    export function format(query: string, options?: any): string;
}
declare module "diff" {
    export function diffLines(oldStr: string, newStr: string): any[];
}
declare module "html-to-image" {
    export function toPng(node: HTMLElement, options?: any): Promise<string>;
}
