import { AS2MovieClipAdapter } from "../adapters/AS2MovieClipAdapter";
export declare class AS2SoundAdapter {
    private _target;
    private _soundProps;
    private _loop;
    private _name;
    private _id;
    private _playing;
    private _volume;
    private static _globalSoundProps;
    private static _soundIDCnt;
    private _onGlobalChangeDelegate;
    constructor(target: AS2MovieClipAdapter);
    attachSound(id: string): void;
    getPan(): number;
    setPan(value: number): void;
    getVolume(): number;
    setVolume(value: number): void;
    start(offsetInSeconds?: number, loops?: number): void;
    stop(linkageID?: string): void;
    readonly position: number;
    readonly duration: number;
    readonly id3: Object;
    private onGlobalChange(event);
    private updateVolume();
}
export default AS2SoundAdapter;
