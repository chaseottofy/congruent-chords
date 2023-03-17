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
    'distortedorgan1': distortedorgan1,
    'key1': key1,
    'key2': key2,
    'pad1': pad1,
    'pad2': pad2,
    'pad3': pad3,
    'piano1': piano1,
  };

  constructor (defaults, filters) {
    this.currentChord = null;
    this.lowpassStatus = false;
    this.highpassStatus = false;
    this.reverbStatus = filters.reverb;
    this.delayStatus = filters.delay;
    this.reverb = new Tone.Reverb().toDestination();
    this.delay = new Tone.FeedbackDelay().toDestination();
    this.lowpass = null;
    this.highpass = null;

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

  // this cant be right but it works and im over this project 
  setFilter(lowpass, highpass, reverb, delay) {
    if (this.lowpass) {this.lowpass.dispose();}
    if (this.highpass) {this.highpass.dispose();}
    if (this.reverb) {this.reverb.dispose();}
    if (this.delay) {this.delay.dispose();}

    if (lowpass > 0) {
      this.lowpassStatus = true;
      this.lowpass = new Tone.Filter(lowpass, "lowpass").toDestination();
    } else {
      this.lowpassStatus = false;
    }

    if (highpass > 0) {
      this.highpassStatus = true;
      this.highpass = new Tone.Filter(highpass, "highpass").toDestination();
    } else {
      this.highpassStatus = false;
    }

    if (reverb) {
      this.reverbStatus = true;
      this.reverb = new Tone.Reverb().toDestination();
    } else {
      this.reverbStatus = false;
    }

    if (delay) {
      this.delayStatus = true;
      this.delay = new Tone.FeedbackDelay().toDestination();
    } else {
      this.delayStatus = false;
    }
  }

  noteon(note) {
    this.sampler.triggerAttack(note).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
    if (this.reverbStatus) { this.sampler.connect(this.reverb); }
    if (this.delayStatus) { this.sampler.connect(this.delay); }
    if (this.lowpassStatus) { this.sampler.connect(this.lowpass); }
    if (this.highpassStatus) { this.sampler.connect(this.highpass); }
  }

  noteoff(note) {
    this.sampler.triggerRelease(note).connect(
      this.reverbStatus ? this.reverb : Tone.Destination
    );
  }

  chordon(chord) {
    this.currentChord = chord;
    this.sampler.triggerAttack(chord);
    if (this.reverbStatus) { this.sampler.connect(this.reverb); }
    if (this.delayStatus) { this.sampler.connect(this.delay); }
    if (this.lowpassStatus) { this.sampler.connect(this.lowpass); }
    if (this.highpassStatus) { this.sampler.connect(this.highpass); }
  }

  chordoff() {
    this.sampler.triggerRelease(this.currentChord);
    this.currentChord = null;
  }
}

export default Sampler;
