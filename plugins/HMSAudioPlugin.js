export const HMSVideoPluginType = {
  TRANSFORM: 'TRANSFORM',
  ANALYZE: 'ANALYZE'
}

export class GainPlugin {
  constructor(gainValue  = 0.25, name = "gain-plugin") {
    if (gainValue  !== undefined) {
      this.gainValue  = gainValue ;
    }
    if (name) {
      this.name = name;
    }
  }

  async processAudioTrack(ctx, source) {
    if (!ctx) {
      throw new Error('Audio context is not created');
    }
    if (!source) {
      throw new Error('source is not defined');
    }
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = this.gainValue;
    source.connect(this.gainNode);
    return this.gainNode;
  }


  checkSupport() {
    // This is when plugin is supported.
    return {
      isSupported: true,
    }
    // if plugin is not supported in some browser, you can send error here.
    // return {
    //   isSupported: false,
    //   errType: HMSPluginUnsupportedTypes.PLATFORM_NOT_SUPPORTED;
    //   errMsg: 'Error message you want to share'
    // }
  }


  init() {}

  getName() {
    return this.name;
  }

  getPluginType() {
    return HMSAudioPluginType.TRANSFORM;
  }

  stop() {
    this.gainNode?.disconnect();
    this.gainNode = undefined;
  }
}
