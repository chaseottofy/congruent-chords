import * as Tone from 'tone';
import key1 from './samples/key1.mp3';
import key2 from './samples/key2.mp3';
import pad1 from './samples/pad1.mp3';
import pad2 from './samples/pad2.mp3';
import pad3 from './samples/pad3.mp3';
import piano1 from './samples/piano1.mp3';
import distortedorgan1 from './samples/distortedorgan1.mp3';

class Sampler {
  #samples = {
    'key1': key1,
    'key2': key2,
    'pad1': pad1,
    'pad2': pad2,
    'pad3': pad3,
    'piano1': piano1,
    'distortedorgan1': distortedorgan1,
  };

  constructor (defaults, filters) {
    this.currentChord = null;

    this.delayStatus = filters.delay;
    this.reverbStatus = filters.reverb;
    this.reverb = new Tone.Reverb().toDestination();

    this.sampler = this.setSampler(
      defaults.sample,
      defaults.volume,
      defaults.attack,
      defaults.release,
      true,
    );
  }

  setSampler(sample, volume, attack, release, isInit = false) {
    const newSampler = new Tone.Sampler({
      urls: { C3: this.#samples[sample] || piano1 },
      attack: +attack,
      release: +release,
      volume: -(parseInt(60 - volume)),
      onload: () => { console.log('Samples loaded'); },
    }).toDestination();


    if (isInit) {
      return newSampler;
    } else {
      this.sampler.dispose();
      this.sampler = newSampler;
    }
  }

  setFilter(lowpass, highpass, reverb, delay, isInit = false) {
    this.reverbStatus = reverb;
    this.delayStatus = delay;
    console.log('ran');
  }

  noteon(note) {
    this.sampler.triggerAttack(note).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
  }

  noteoff(note) {
    this.sampler.triggerRelease(note).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
  }

  chordon(chord) {
    this.currentChord = chord;
    this.sampler.triggerAttack(chord).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
  }

  chordoff() {
    this.sampler.triggerRelease(this.currentChord).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
    this.currentChord = null; // chord set during chordon
  }
}

export default Sampler;
