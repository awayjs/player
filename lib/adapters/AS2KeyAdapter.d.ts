export declare class AS2KeyAdapter {
    private static _keys;
    private static _key;
    private static _char;
    static _listeners: Array<any>;
    private static _addListeners;
    static addListener(listener: any): void;
    static removeListener(listener: any): void;
    static isDown(code: number): boolean;
    static getCode(): number;
    static getAscii(): number;
    /**
     * Constant associated with the key code value for the Backspace key (8).
     */
    static BACKSPACE: number;
    /**
     * Constant associated with the key code value for the Caps Lock key (20).
     */
    static CAPSLOCK: number;
    /**
     * Constant associated with the key code value for the Control key (17).
     */
    static CONTROL: number;
    /**
     * Constant associated with the key code value for the Delete key (46).
     */
    static DELETEKEY: number;
    /**
     * Constant associated with the key code value for the Down Arrow key (40).
     */
    static DOWN: number;
    /**
     * Constant associated with the key code value for the End key (35).
     */
    static END: number;
    /**
     * Constant associated with the key code value for the Enter key (13).
     */
    static ENTER: number;
    /**
     * Constant associated with the key code value for the Escape key (27).
     */
    static ESCAPE: number;
    /**
     * Constant associated with the key code value for the Home key (36).
     */
    static HOME: number;
    /**
     * Constant associated with the key code value for the Insert key (45).
     */
    static INSERT: number;
    /**
     * Constant associated with the key code value for the Left Arrow key (37).
     */
    static LEFT: number;
    /**
     * Constant associated with the key code value for the Page Down key (34).
     */
    static PGDN: number;
    /**
     * Constant associated with the key code value for the Page Up key (33).
     */
    static PGUP: number;
    /**
     * Constant associated with the key code value for the Right Arrow key (39).
     */
    static RIGHT: number;
    /**
     * Constant associated with the key code value for the Shift key (16).
     */
    static SHIFT: number;
    /**
     * Constant associated with the key code value for the Spacebar (32).
     */
    static SPACE: number;
    /**
     * Constant associated with the key code value for the Tab key (9).
     */
    static TAB: number;
    /**
     * Constant associated with the key code value for the Up Arrow key (38).
     */
    static UP: number;
    private static _onKeyDown(event);
    private static _onKeyUp(event);
}
