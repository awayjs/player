import { AS2SymbolAdapter } from "../adapters/AS2SymbolAdapter";
export declare class AS2ColorAdapter {
    private _symbol;
    private _target;
    private _rgb;
    private _transform;
    constructor(symbol: AS2SymbolAdapter);
    getRGB(): number;
    setRGB(value: number): void;
    getTransform(): any;
    setTransform(value: any): void;
}
