import { WaveAudio } from "@awayjs/core/lib/audio/WaveAudio";
import { AssetBase } from "@awayjs/core/lib/library/AssetBase";
export declare class AS2MCSoundProps extends AssetBase {
    private _volume;
    private _pan;
    private _changeEvent;
    private _audio;
    constructor();
    dispose(): void;
    volume: number;
    pan: number;
    audio: WaveAudio;
}
