export declare class AS2SharedObjectAdapter {
    data: Object;
    private _object_name;
    constructor(name: string);
    static getLocal(name: string, localPath?: string, secure?: boolean): AS2SharedObjectAdapter;
    flush(): void;
}
