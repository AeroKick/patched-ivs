
/**
 * Represents a contiguous range of playable media.
 * @public
 */
export declare interface BufferRange {
    /**
     * The start of the buffered range, in seconds.
     */
    start: number;
    /**
     * The end of the buffered range, in seconds.
     */
    end: number;
}

export declare interface CaptureEventMap {




}

/**
 * Creates a {@link MediaPlayer} instance.
 * @throws Throws an Error if WebAssembly is not supported by the browser. Check {@link isPlayerSupported} to determine support beforehand,
 * or wrap in a try/catch block to prevent uncaught exceptions.
 * @param config - Player configuration options
 * @public
 */
export declare function create(config: PlayerConfig): MediaPlayer;

/**
 * Cue interface.
 * @public
 */
export declare interface Cue {
    type: 'TextCue' | 'TextMetadataCue' | 'AdCue' | 'StreamSourceCue';
    /** The time when the cue should be displayed. */
    startTime: number;
    /** The time when the cue should be cleared. */
    endTime: number;
}

/**
 * An enumeration detailing the type of an error.
 * @public
 */
export declare enum ErrorType {
    /** A generic error occurred. */
    GENERIC = "Error",
    /** A method or feature is not supported. */
    NOT_SUPPORTED = "ErrorNotSupported",
    /** There is no source for the player to play. */
    NO_SOURCE = "ErrorNoSource",
    /** Data or input is invalid. */
    INVALID_DATA = "ErrorInvalidData",
    /** The player or an internal object is in an invalid state. */
    INVALID_STATE = "ErrorInvalidState",
    /** A method parameter is invalid. */
    INVALID_PARAMETER = "ErrorInvalidParameter",
    /** The player timed out on an operation. */
    TIMEOUT = "ErrorTimeout",
    /** There is a network error. */
    NETWORK = "ErrorNetwork",
    /** There is a network I/O failure. */
    NETWORK_IO = "ErrorNetworkIO",
    /** A network resource is not authorized. */
    AUTHORIZATION = "ErrorAuthorization",
    /**
     * The stream is not available. The accompanying HTTP status code can help identify why the stream is unavailable.
     * If the status code is 429, the concurrent-viewers limit was reached. If the status code is 404, the stream
     * does not exist or is offline.
     */
    NOT_AVAILABLE = "ErrorNotAvailable"
}

/**
 * Returns the version of the player.
 * @returns The semantic version of the player.
 * @public
 */
export declare function getVersion(): string;

/**
 * A boolean indicating whether the player is supported by the browser. The player is only supported in environments
 * which support WebAssembly (WASM).
 */
export declare const isPlayerSupported: boolean;

/**
 * An enumeration of the available log levels.
 * Use with {@link Player.setLogLevel} to change the player logging level.
 */
export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}

/**
 * A class implementing the {@link Player} interface. Do not instantiate this class directly; instead, use the factory
 * {@link create} function.
 * @public
 */
export declare class MediaPlayer implements Player {






    addEventListener<K extends keyof PlayerEventMap>(name: K, fn: (payload: PlayerEventMap[K]) => void): void;
    attachHTMLVideoElement(videoElement: HTMLVideoElement): void;
    delete(): void;

    isAutoplay(): boolean;
    isAutoQualityMode(): boolean;


    getBufferDuration(): number;
    getBuffered(): BufferRange;



    getDisplayHeight(): number;
    getDisplayWidth(): number;

    getDuration(): number;

    getHTMLVideoElement(): HTMLVideoElement;
    getLiveLatency(): number;


    getPlaybackRate(): number;
    getPosition(): number;
    getQualities(): Quality[];
    getQuality(): Quality;

    getSessionId(): string | undefined;

    getState(): PlayerState;
    getVersion(): string;




    getVolume(): number;
    isLiveLowLatency(): boolean;

    isMuted(): boolean;
    isPaused(): boolean;


    load(path: string, mediaType?: string): void;
    pause(): void;
    play(): void;
    removeEventListener<K extends keyof PlayerEventMap>(name: K, fn: (payload: PlayerEventMap[K]) => void): void;
    seekTo(time: number): void;


    setAutoMaxQuality(quality: Quality): void;
    setAutoMaxBitrate(bitrate: number): void;
    setAutoMaxVideoSize(width: number, height: number): void;
    setAutoplay(enabled: boolean): void;

    setAutoQualityMode(enable: boolean): void;





    setInitialBufferDuration(duration: number): void;
    setLiveLowLatencyEnabled(enable: boolean): void;


    setLogLevel(level: LogLevel): void;

    setMuted(mute: boolean): void;
    setPlaybackRate(rate: number): void;

    setQuality(quality: Quality, adaptive?: boolean): void;
    setRebufferToLive(enable: boolean): void;

    setVolume(volume: number): void;


    setRequestCredentials(credentials: RequestCredentials): void;

}

/**
 * An enumeration of available timed metadata events. Metadata events are fired when the playhead passes the start time of the metadata cue.
 *
 * Listen to events with {@link Player.addEventListener}
 * @event
 */
export declare enum MetadataEventType {
    /**
     * Indicates that ID3 metadata has been parsed.
     * @param payload - `Object[]` - List of ID3 keys and values
     * @event
     */
    ID3 = "MetaID3",
    /**
     * @deprecated
     * Use {@link PlayerEventType.TEXT_CUE} instead.
     * @param payload - `Object` Caption info
     * @event
     */
    CAPTION = "MetaCaption"
}

/**
 * An enumeration of available ID3 metadata types.
 */
export declare enum MetadataID3Type {
    /**
     * Indicates HTTP sourced, out of band ID3 metadata
     */
    METADATA_ID = "metadata.live-video.net",
    /**
     * Indicates RTMP sourced, in band ID3 metadata
     */
    INBAND_METADATA_ID = "inband.metadata.live-video.net"
}

/**
 * Maps {@link MetadataEventType} event names to their payload values.
 * All metadata events return `void`.
 */
declare interface MetadataPayloadMap {
    [MetadataEventType.ID3]: Record<string, string>;
    [MetadataEventType.CAPTION]: Record<string, string>;
}

/**
 * An interface describing the API of the media player.
 * Create a player instance with the {@link create} function. The player's APIs are generally
 * asynchronous when setting and synchronous when getting. Listen to events via
 * {@link Player.addEventListener} for state updates.
 */
export declare interface Player {
    /**
     * Adds an event listener to the player.
     * PlayerEventMap is a computed type which maps event names to their payloads.
     *
     * Remove listeners with {@link Player.removeEventListener}.
     * @param name - The name of the event. Available events include {@link PlayerState} events and
     * {@link PlayerEventType} events.
     * @param fn - The handler function.
     */
    addEventListener<K extends keyof PlayerEventMap>(name: K, fn: (payload: PlayerEventMap[K]) => void): void;
    /**
     * Removes an event listener from the player.
     * PlayerEventMap is a computed type which maps event names to their payloads.
     * @param name - The name of the event. Available events include {@link PlayerState} events and
     * {@link PlayerEventType} events.
     * @param fn - The handler function.
     */
    removeEventListener<K extends keyof PlayerEventMap>(name: K, fn: (payload: PlayerEventMap[K]) => void): void;
    /**
     * Gets the video element in use.
     * @returns The video element in use.
     */
    getHTMLVideoElement(): HTMLVideoElement;
    /**
     * Attaches a video element (tag) to be used for playback. This replaces any video element in use. This is
     * optional; if it is not called, the Player creates and uses a video element.
     * @param videoElement - The video element to attach.
     */
    attachHTMLVideoElement(videoElement: HTMLVideoElement): void;
    /**
     * Removes the player instance and stops playback. After deletion, the player no longer emits events or responds
     * to API calls.
     */
    delete(): void;






    /**
     * Gets the version of the player.
     * @returns The semantic version of the player.
     */
    getVersion(): string;



    /**
     * Loads the specified stream and prepares the player for playback. On success, the player state changes to
     * {@link PlayerState.READY}. On failure, this invokes the {@link PlayerEventType.ERROR} listener.
     * @param path - The URL of the stream to load.
     * @param mediaType - Media type of the content if known; for example, 'video/mp4' or 'application/x-mpegURL'. If
     * not provided, the type is inferred from the path.
     */
    load(path: string, mediaType?: string): void;
    /**
     * Gets whether the player is paused.
     * @returns True if the player is paused, otherwise false.
     * This flag reflects pauses initiated by the user, autoplay failure, and error handling.
     */
    isPaused(): boolean;
    /**
     * Pauses playback of the current stream or fails if no stream is loaded. On failure invokes the
     * onError listener method.
     *
     * If you resume the stream with play, the position may be different than where it paused, depending on the
     * type of media being played.
     */
    pause(): void;
    /**
     * Starts or resumes playback of the stream, if no stream is loaded indicates intent to
     * play and the player will automatically play on a subsequent load call. On success, depending on the type of
     * stream, the player state changes to {@link PlayerState.BUFFERING} and then {@link PlayerState.PLAYING}, or just
     * {@link PlayerState.PLAYING}. On failure, this invokes the {@link PlayerEventType.ERROR} listener. This does not
     * need to be called if autoplay is enabled.
     */
    play(): void;
    /**
     * Seeks to a specified time in the stream and begins playing at that position if play() was
     * called. If no stream is loaded the seek will be be deferred until load is called. On success,
     * depending on the type of stream, the player state changes to {@link PlayerState.BUFFERING} and then
     * {@link PlayerState.PLAYING}, or just {@link PlayerState.PLAYING}. On failure, this invokes the
     * {@link PlayerEventType.ERROR} listener.
     * @param time - The position to seek to, in seconds.
     */
    seekTo(time: number): void;

    /**
     * Gets whether the player is muted.
     * @returns True if the player is muted, false otherwise.
     */
    isMuted(): boolean;
    /**
     * Mutes or unmutes the player.
     * @param mute - True to mute the player, false to unmute.
     */
    setMuted(mute: boolean): void;
    /**
     * Gets the player's volume level.
     * @returns The volume level of the player, between 0.0f and 1.0f.
     */
    getVolume(): number;
    /**
     * Sets the playback volume of the audio track, for the current stream or the next stream that is loaded.
     * @param volume - The volume to be set. Valid values: in the range 0.0f to 1.0f.
     */
    setVolume(volume: number): void;
    /**
     * Gets the quality that the player is using. On iOS mobile (iPhone) browsers,
     * this API will return an empty Quality object. The reason is that underlying Safari browser manages the playback entirely
     * and does not provide any way to access the available qualities.
     * @returns The current quality of the source.
     */
    getQuality(): Quality;
    /**
     * @returns Set of available {@link Quality} objects from the loaded source or empty if none are currently
     * available. The qualities will be available after the {@link PlayerState.READY} state has been entered.
     * This set contains the qualities that can be used with {@link Player.setQuality}. Note that this set will
     * contain only qualities capable of being played on the current device and not all those
     * present in the source stream. On iOS mobile (iPhone) browsers,
     * this API will return an empty array. The reason is that underlying Safari browser manages the playback entirely
     * and does not provide any way to access the available qualities.
     */
    getQualities(): Quality[];
    /**
     * Sets the quality the player should use for playback. On success, this
     * invokes the {@link PlayerEventType.QUALITY_CHANGED} listener. This
     * call disables adaptive bitrate (ABR) streaming. This call has
     * no effect when the HTMLVideoElement's `controls` attribute is present.
     * @param quality - A valid quality entry from {@link Player.getQualities}.
     * @param adaptive - True for an adaptive quality change; that is, to change quality smoothly at the end of the
     * current buffer. False to change quality immediately.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     */
    setQuality(quality: Quality, adaptive?: boolean): void;
    /**
     * Sets the initial (minimum) buffer duration required to start playback.
     * If a value outside the allowable range is used, the current value is maintained.
     * Defaults to 1s in low latency mode, 2s otherwise.
     * Lowering this value may increase rebuffering.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     *
     * @param duration - Buffer duration in seconds. The allowable range is 0.1 to 5
     */
    setInitialBufferDuration(duration: number): void;
    /**
     * Gets whether autoplay is enabled. Defaults to false.
     * @returns True if autoplay is enabled, false otherwise.
     */
    isAutoplay(): boolean;
    /**
     * Enables or disables playback autoplay. Defaults to false.
     * @param enabled - True to enable autoplay, false otherwise.
     */
    setAutoplay(enabled: boolean): void;

    /**
     * Gets the playback rate.
     * @returns The playback of the rate of the player.
     */
    getPlaybackRate(): number;
    /**
     * Sets the stream playback rate.
     * @param rate - Playback rate to set. Valid values: in the range [0.25, 2.0].
     */
    setPlaybackRate(rate: number): void;


    /**
     * Gets the state of the player.
     * @returns The current state of the player.
     */
    getState(): PlayerState;
    /**
     * Gets the playback position.
     * @returns The current position of the player, in seconds.
     * When the player is rendering via MediaSourceExtensions, the starting position is 0.
     * Otherwise, the starting position is relative to the current duration of the stream.
     */
    getPosition(): number;


    /**
     * Gets the duration of the currently loaded media stream.
     * @returns The duration of the stream in seconds for video on demand content, and Infinity for live streams.
     */
    getDuration(): number;


    /**
     * Enables skipping to the live edge on a rebuffer. Note this can cause video content
     * and content associated with it such as timed metadata to be skipped.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @param enable - True to enable, false otherwise.
     */
    setRebufferToLive(enable: boolean): void;
    /**
     * Sets the Request.credentials property used when the player makes HTTP requests.
     * Possible values are "include" | "omit" | "same-origin" from the JavaScript fetch API.
     * The default value used is "same-origin".
     * This can be used for credentialed playback of IVS recordings (e.g. via CloudFront if configured) but not for IVS live streams.
     * @param credentials - "include" | "omit" | "same-origin"
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     */
    setRequestCredentials(credentials: RequestCredentials): void;


    /**
     * Gets the ID of the playback session.
     * @returns A unique identifier ID of the current play session, or undefined if the session is not yet known.
     * The ID is known after the player enters the {@link PlayerState.READY} state. This session identifier can be
     * shared with support or displayed in an user interface to help troubleshoot or diagnose playback issues with the
     * currently playing stream.
     */
    getSessionId(): string | undefined;

    /**
     * Gets whether the Adaptive Bitrate (ABR) streaming algorithm is enabled. The maximum quality is controlled by
     * {@link Player.setAutoMaxQuality}.
     * @returns True if ABR is enabled, false otherwise.
     */
    isAutoQualityMode(): boolean;
    /**
     * Enables or disables the Adaptive Bitrate (ABR) streaming algorithm. Note the maximum quality is controlled by
     * {@link Player.setAutoMaxQuality}. The player chooses the quality to play based on current network and device
     * conditions. By default, the player starts in this mode. This mode is implicitly disabled by a call to
     * {@link Player.setQuality}.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @param enable - True to enable ABR, false to disable.
     */
    setAutoQualityMode(enable: boolean): void;

    /**
     * Sets the maximum quality the player is allowed to auto-switch up to (if ABR is enabled) using the input
     * quality's bitrate value. This allows you to control resource usage. The {@link Quality} you provide here
     * is applied to the current stream. If you load a new stream, call this again after {@link PlayerState.READY}.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @param quality - The maximum quality to use for ABR.
     */
    setAutoMaxQuality(quality: Quality): void;

    /**
     * Sets the maximum video display size of the player. This prevents the player from auto-switching to qualities
     * above the specified resolution when ABR is enabled.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @param width - The display width.
     * @param height - The display height.
     */
    setAutoMaxVideoSize(width: number, height: number): void;

    /**
     * For a live stream, returns the latency from the server to the player. Note: For non-live streams, this value is not meaningful.
     * @returns the latency in seconds.
     */
    getLiveLatency(): number;
    /**
     * Gets whether low-latency live streaming is enabled.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @returns True if low-latency streaming is enabled on both the server and the client, false otherwise.
     */
    isLiveLowLatency(): boolean;
    /**
     * Enables low-latency playback for live streams configured to support it. Changing this value during playback
     * restarts the stream.
     *
     * This API is not supported on iOS mobile (iPhone) browsers.
     * @param enable - True to enable, false to disable. Default: true.
     */
    setLiveLowLatencyEnabled(enable: boolean): void;

    /**
     * Sets the log level for the player.
     * @param level - The log level to set. Default: {@link LogLevel.ERROR}.
     */
    setLogLevel(level: LogLevel): void;
    /**
     * Gets the currently buffered range.
     * @returns The buffered range which the playhead is within.
     */
    getBuffered(): BufferRange;


    /**
     * Gets the buffer length ahead of the current playback position.
     * @returns The duration, in seconds, from the playhead to the end of the buffer.
     */
    getBufferDuration(): number;








    /**
     * Gets the `clientHeight` of the underyling HTMLMediaElement.
     * @returns The `clientHeight` property of the active video element.
     */
    getDisplayHeight(): number;
    /**
     * Gets the `clientWidth` of the underyling HTMLMediaElement.
     * @returns The `clientWidth` property of the active video element.
     */
    getDisplayWidth(): number;

}

/**
 * An interface describing the available configuration options for a new player instance.
 * @public
 */
export declare interface PlayerConfig {
    /**
     *  URL where the amazon-ivs-wasmworker.min.js file is hosted. This option is only supported by the NPM distribution
     *  of the player.
     */
    wasmWorker: string;
    /**
     * URL where the amazon-ivs-wasmworker.min.wasm file is hosted. This option is only supported by the NPM
     * distribution of the player.
     */
    wasmBinary: string;

    /**
     * @deprecated
     * This can be set after construction using {@link Player.setLogLevel}.
     */
    logLevel?: LogLevel;






    /**
     * Contains details about the service worker configuration.
     */
    serviceWorker?: ServiceWorkerConfig;
}

/**
 * An interface describing the payload of the {@link PlayerEventType.ERROR} event. The interface
 * has properties that can uniquely identify the error.
 *
 * Some valuable errors to handle:
 * * source: MasterPlaylist type: {@link ErrorType.AUTHORIZATION} code: 403 - This is a private stream and viewer authorization is missing or invalid.
 * * source: MasterPlaylist type: {@link ErrorType.NOT_AVAILABLE} code: 429 - The concurrent-viewers limit has been reached. See [Amazon IVS Service Quotas](https://docs.aws.amazon.com/ivs/latest/userguide/SQ.html).
 * * source: MasterPlaylist type: {@link ErrorType.NOT_AVAILABLE} code: 404 - The stream is invalid (e.g., the playback URL is incorrect) or not online.
 * @public
 */
export declare interface PlayerError {
    /** The source component within the player that generated the error. */
    source: string;
    /** The result code for the error. */
    type: ErrorType;
    /**
     * A code representing the specific error condition. The code values depend on the
     * source and result types. For example, if source is "Segment", the result is
     * {@link ErrorType.NETWORK}, and the code value is 400, this indicates that an HTTP 400
     * error occurred while trying to download a video segment.
     */
    code: number;
    /** A message describing the error. */
    message: string;
}

/**
 * A type representing the signature of a player event listener. This can be used by TypeScript implementations in order
 * to safely type event listeners.
 */
export declare type PlayerEventListener<K extends keyof PlayerEventMap> = (event: PlayerEventMap[K]) => void;

/**
 * A type mapping player event listener names to their handler function signatures. This can be used by TypeScript
 * implementations in order to safely type event listeners.
 */
export declare type PlayerEventMap = PlayerEventTypeMap & StatePayloadMap & MetadataPayloadMap & RemotePlayerMap & CaptureEventMap;

/**
 * @internal
 * Public events sent from the MediaPlayer. These are listened to internally,
 * but can also be publicly consumed with `addEventListener` All events are
 * currently emitted from the WebMediaPlayer in the worker. The getters that
 * are updated with each event are listed below. The payloads are currently not
 * publicly exposed, but contain the internal state change information.
 */
/**
 * An enumeration describing general events sent from the {@link Player}.
 *
 * To listen to events, use {@link Player.addEventListener}.
 * @public
 * @event
 */
export declare enum PlayerEventType {
    /**
     * Indicates that the player was created.
     * @updated {@link Player.getVersion}
     * @param payload - `void`
     * @event
     */
    INITIALIZED = "PlayerInitialized",
    /**
     * Indicates that the playing quality changed from either a user action or an internal adaptive-quality switch.
     * @updated {@link Player.getQuality}
     * @param payload - {@link Quality}
     * @event
     */
    QUALITY_CHANGED = "PlayerQualityChanged",
    /**
     * Indicates that source duration changed (or is available for the first time). This can occur after the
     * {@link PlayerState.READY} state, to indicate a change in the duration of the media.
     * This value can be set to Infinity or a large integer (`1 << 30`) for streams of unknown or indefinite length.
     * @updated {@link Player.getDuration}
     * @param payload - `number` The updated duration, in seconds.
     * @event
     */
    DURATION_CHANGED = "PlayerDurationChanged",
    /**
     * Indicates that the player volume changed. Volume value can be between 0 and 1, inclusive.
     * @updated {@link Player.getVolume}
     * @param payload - `number` The updated volume, between 0.0f and 1.0f.
     * @event
     */
    VOLUME_CHANGED = "PlayerVolumeChanged",
    /**
     * Indicates that the player was muted or unmuted.
     * @updated {@link Player.isMuted}
     * @param payload - `void`
     * @event
     */
    MUTED_CHANGED = "PlayerMutedChanged",
    /**
     * Indicates that the playback rate changed.
     * @updated {@link Player.getPlaybackRate}
     * @param payload - `number` The updated playback rate.
     * @event
     */
    PLAYBACK_RATE_CHANGED = "PlayerPlaybackRateChanged",
    /**
     * Indicates that the player is buffering from a previous {@link PlayerState.PLAYING} state.
     * Excludes user actions such as seeking, starting, or resuming the stream.
     * @param payload - `void`
     * @event
     */
    REBUFFERING = "PlayerRebuffering",
    /**
     * Indicates that the browser blocked unmuted playback.
     * This behavior is based on the user's policy and can occur if the play request was made without a user gesture.
     * To start playback, mute and play or wait for a user gesture.
     * @param payload - `void`
     * @event
     */
    AUDIO_BLOCKED = "PlayerAudioBlocked",
    /**
     * Indicates that playback is blocked from autoplaying; that is, without a user gesture. This event can fire when
     * autoplay with sound is blocked or all autoplay is blocked. To start playback, mute and play, or wait for a user
     * gesture.
     * @param payload - `void`
     * @event
     */
    PLAYBACK_BLOCKED = "PlayerPlaybackBlocked",
    /**
     * Indicates that an error occurred. Errors are fatal and stop playback of the stream. The
     * player moves into {@link PlayerState.IDLE} on fatal errors.
     * @param payload - {@link PlayerError}
     * @event
     */
    ERROR = "PlayerError",


    /**
     * Indicates that the player position changed.
     * @updated {@link Player.getPosition}
     * @param payload - `number` The updated position of the player, in seconds.
     * @event
     */
    TIME_UPDATE = "PlayerTimeUpdate",
    /**
     * Indicates that the buffer size changed. This can be caused by an addition to or removal from the buffer.
     * @updated {@link Player.getPosition} {@link Player.getBufferDuration} {@link Player.getBuffered}
     * @param payload - `void`
     * @event
     */
    BUFFER_UPDATE = "PlayerBufferUpdate",
    /**
     * Indicates that the player seeked to a given position (as requested by {@link Player.seekTo}).
     * @updated {@link Player.getPosition}
     * @param payload - `number` The position where the seek completed, in seconds.
     * @event
     */
    SEEK_COMPLETED = "PlayerSeekCompleted",




    /**
     * Indicates that a text cue was parsed from the stream.
     * @param payload - {@link TextCue}
     * @event
     */
    TEXT_CUE = "PlayerTextCue",
    /**
     * Indicates that text metadata cues were parsed from the stream.
     * @param payload - {@link TextMetadataCue}
     * @event
     */
    TEXT_METADATA_CUE = "PlayerTextMetadataCue",


    /**
     * Indicates that a playback unavailable event occurred.
     * @param payload - `void`
     * @event
     */
    NETWORK_UNAVAILABLE = "PlayerNetworkUnavailable",


}

declare interface PlayerEventTypeMap {



    [PlayerEventType.AUDIO_BLOCKED]: void;
    [PlayerEventType.BUFFER_UPDATE]: void;
    [PlayerEventType.DURATION_CHANGED]: number;
    [PlayerEventType.ERROR]: PlayerError;
    [PlayerEventType.INITIALIZED]: void;

    [PlayerEventType.MUTED_CHANGED]: void;
    [PlayerEventType.NETWORK_UNAVAILABLE]: void;
    [PlayerEventType.PLAYBACK_BLOCKED]: void;
    [PlayerEventType.PLAYBACK_RATE_CHANGED]: number;
    [PlayerEventType.QUALITY_CHANGED]: Quality;
    [PlayerEventType.REBUFFERING]: void;

    [PlayerEventType.SEEK_COMPLETED]: number;



    [PlayerEventType.TEXT_CUE]: TextCue;
    [PlayerEventType.TEXT_METADATA_CUE]: TextMetadataCue;
    [PlayerEventType.TIME_UPDATE]: number;
    [PlayerEventType.VOLUME_CHANGED]: number;


}

/**
 * @internal
 * Publicly exposed state change events (listen with `addEventListener()`).
 * One of these is fired whenever `getPlayerState` changes. The getters that
 * are updated with each state change are listed below. The string values of
 * each state MUST match the string representation of the 'State' enum in player.hpp.
 */
/**
 * An enumeration describing {@link Player} state updates.
 *
 * To listen to events, use {@link Player.addEventListener}.
 * @public
 * @event
 */
export declare enum PlayerState {
    /**
     * Indicates that the Player is idle or paused. This is the initial state.
     * @updated {@link Player.getState}
     * @param payload - `void`
     * @event
     */
    IDLE = "Idle",
    /**
     * Indicates that the Player is ready to play the loaded video or live stream.
     * @updated {@link Player.getState} {@link Player.getQualities}
     * @param payload - `void`
     * @event
     */
    READY = "Ready",
    /**
     * Indicates that the Player is buffering content and playback stopped.
     * @updated {@link Player.getState}
     * @param payload - `void`
     * @event
     */
    BUFFERING = "Buffering",
    /**
     * Indicates that the Player is playing.
     * @updated {@link Player.getState}
     * @param payload - `void`
     * @event
     */
    PLAYING = "Playing",
    /**
     * Indicates that the Player reached the end of a video or a live stream ends.
     * @updated {@link Player.getState}
     * @param payload - `void`
     * @event
     */
    ENDED = "Ended"
}

/**
 * An interface describing a media rendition, which is a selection from video/audio tracks of the loaded media.
 * @public
 */
export declare interface Quality {
    /** The name of the quality object. */
    name: string;

    /** The codec string, both audio and video tracks. For example, "avc1.64002A,mp4a.40.2". */
    codecs: string;
    /** The bitrate of the media in bits per second. */
    bitrate: number;
    /** The video width, or zero if unknown or not applicable. */
    width: number;
    /** The video height, or zero if unknown or not applicable. */
    height: number;


}

/**
 * Registers the Amazon IVS quality plugin with Video.js. No-op if already registered.
 *
 * Once registered, you have access to the
 * {@link VideoJSQualityPlugin.enableIVSQualityPlugin} method on the Video.js object,
 * which enables the quality UI toggle.
 *
 * @param videojs - video.js object.
 * @throws Will throw a {@link VideoJSError} if video.js is not available
 */
export declare function registerIVSQualityPlugin(videojs: any): void;

/**
 * Registers the Amazon IVS tech with Video.js. No-op if already registered.
 *
 * @param vjs - video.js object.
 * @param config - {@link PlayerConfig} object.
 * @throws Will throw a {@link VideoJSError} if video.js or WebAssembly is not available
 */
export declare function registerIVSTech(vjs: any, config: PlayerConfig): void;

declare interface RemotePlayerMap {




}

/**
 * @public
 * Configuration for a service worker. Primary used to enable low latency
 * mode on iOS Safari.
 */
export declare interface ServiceWorkerConfig {
    /**
     * URL to the service worker script.
     * */
    url: string;
    /**
     * Scope of the service worker. Defaults to the service worker path.
     * */
    scope?: string;






}

/**
 * Maps {@link PlayerState} event names to their payload values.
 * All state events return `void`.
 */
declare type StatePayloadMap = {
    [S in PlayerState]: void;
};

/**
 * Contains information for the display of subtitles and captions including styling and positioning.
 * Note: currently IVS streams do not contain positioning or styling information for TextCues.
 * TextCues should be rendered in accordance with user preferences for captions/subtitles and should
 * be cleared/reset when switching streams in the player or after a preset timeout period.
 * @public
 */
export declare interface TextCue extends Cue {
    /** The line on which the text belongs. */
    line: number;
    /** The size of the cue as a percentage of the video. */
    size: number;
    /** The position of the text as a fraction of the cue box within the video. */
    position: number;
    /** The text of the cue. */
    text: string;
    type: 'TextCue';
}

/**
 * Contains text timed metadata from the stream.
 * @public
 */
export declare interface TextMetadataCue extends Cue {
    /** The description for the cue. */
    description: string;
    /** The text information for the cue. */
    text: string;
    /** The source of the cue, either RTMP inband or HTTP out of band. */
    owner: string;
    type: 'TextMetadataCue';
}

/**
 * Type definition for a thrown exception from our video.js tech
 */
export declare interface VideoJSError {
    /** The error message. */
    message: string;
    /** The error code, representing one of these states:
     *
     * 1: Video.js is not available.
     *
     * 2: WebAssembly is not available.
     */
    code: number;
}

/**
 * The interface you get when calling getIVSEvents on the Amazon IVS Video.js tech.
 * This holds the events and errors that are emitted from the Amazon IVS player.
 */
export declare interface VideoJSEvents {
    /** A reference to the PlayerEventType enumeration. */
    PlayerEventType: typeof PlayerEventType;
    /** A reference to the PlayerState enumeration. */
    PlayerState: typeof PlayerState;
    /** A reference to the ErrorType enumeration. */
    ErrorType: typeof ErrorType;
}

/**
 * Type definition for an instance of the Video.js player that uses the Amazon IVS Video.js tech.
 *
 * Techs are essentially mixins, so this type interface should be used as an
 * [intersection type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types) with
 * the [Video.js player](https://www.npmjs.com/package/@types/video.js) interface.
 */
export declare interface VideoJSIVSTech {
    /** Gets the {@link Player} instance. */
    getIVSPlayer(): Player;
    /** Gets a {@link VideoJSEvents} object, which holds IVS Player events and errors. */
    getIVSEvents(): VideoJSEvents;
}

/**
 * Interface for the Amazon IVS Video.js quality plugin.
 *
 * Plugins are essentially mixins, so this type interface should be used as an
 * [intersection type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types) with the [Video.js player](https://www.npmjs.com/package/@types/video.js) interface.
 *
 */
export declare interface VideoJSQualityPlugin {
    /** Enables the quality plugin. */
    enableIVSQualityPlugin(): void;
}

export { }
