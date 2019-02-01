import Sound from './Sound'
import { AssetId } from '../../enum/AssetId'

export type DecodeAudioCallback = (buffer: AudioBuffer) => void

/**
 * Audio manager class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class AudioManager {
  private audioContext: AudioContext
  private masterGain: GainNode
  private effectsGain: GainNode
  private ambientGain: GainNode

  constructor () {
    this.initAudioContext()
  }

  initAudioContext (): void {
    try {
      this.audioContext = new AudioContext()
      this.masterGain = this.audioContext.createGain()
      this.effectsGain = this.audioContext.createGain()
      this.ambientGain = this.audioContext.createGain()
      this.masterGain.gain.value = 1
      this.masterGain.connect(this.audioContext.destination)
      this.effectsGain.connect(this.masterGain)
      this.ambientGain.connect(this.masterGain)
      this.ambientGain.gain.value = 1
      this.effectsGain.gain.value = 1
    } catch (e) {
      console.log('Web Audio API is not supported in this browser')
    }
  }

  decodeAudio (data: any, id: AssetId, callback: DecodeAudioCallback): void {
    this.audioContext.decodeAudioData(data).then(
      buffer => callback(buffer),
      error => { console.log('Error with decoding audio data' + error) }
    )
  }

  adjustMasterVolume (value: number): void {
    this.masterGain.gain.value = value
  }

  adjustAmbientVolume (value: number): void {
    this.ambientGain.gain.value = value
  }

  adjustEffectsVolume (value: number): void {
    this.effectsGain.gain.value = value
  }

  createSound (buffer: AudioBuffer, ambient: boolean): Sound {
    return new Sound(this.audioContext, ambient ? this.ambientGain : this.effectsGain, buffer)
  }
}
