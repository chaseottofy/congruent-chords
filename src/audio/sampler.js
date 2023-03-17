import * as Tone from 'tone';
import key1 from './samples/key1.mp3';
import key2 from './samples/key2.mp3';
import pad1 from './samples/pad1.mp3';
import pad2 from './samples/pad2.mp3';
import pad3 from './samples/pad3.mp3';
import piano1 from './samples/piano1.mp3';
import piano2 from './samples/piano2.mp3';
import distortedorgan1 from './samples/distortedorgan1.mp3';

class Sampler {
  #samples = {
    'key1': key1,
    'key2': key2,
    'pad1': pad1,
    'pad2': pad2,
    'pad3': pad3,
    'piano1': piano1,
    'piano2': piano2,
    'distortedorgan1': distortedorgan1,
  };

  constructor (defaults) {
    this.currentChord = null;
    this.limiter = new Tone.Limiter(-20).toDestination();
    this.reverb = new Tone.Reverb({
      decay: 4,
      wet: 0.5,
    }).toDestination();
    this.envelope = new Tone.AmplitudeEnvelope({
      attack: +defaults.attack,
      decay: +defaults.decay,
      sustain: +defaults.sustain,
      release: +defaults.release,
    }).toDestination();

    this.volume = new Tone.Volume({ volume: -(+defaults.volume) }).toDestination();

    this.sampler = new Tone.Sampler({
      urls: { C3: this.#samples[defaults.sample] || piano1 },
      onload: () => { console.log('Samples loaded'); },
    }).toDestination();

  }

  // Load a new sample
  loadSample(note, url) {
    this.sampler.add(note, url);
  }

  // Set the chord
  setChord(chordName) {
    this.chord.value = [chordName];
  }

  // Set the ADSR envelope
  setEnvelope(env) {
    this.envelope.attack = +env.attack;
    this.envelope.decay = +env.decay;
    this.envelope.sustain = +env.sustain;
    this.envelope.release = +env.release;
  }

  // Set the lowpass filter
  setLowpass(cutoff, resonance) {
    this.filter.type = 'lowpass';
    this.filter.frequency.value = cutoff;
    this.filter.Q.value = resonance;
  }

  // Set the highpass filter
  setHighpass(cutoff, resonance) {
    this.filter.type = 'highpass';
    this.filter.frequency.value = cutoff;
    this.filter.Q.value = resonance;
  }

  // Set the reverb
  setReverb(decay, wet) {
    this.reverb.decay = decay;
    this.reverb.wet.value = wet;
  }

  setDelay(delayTime, wet) {
    this.delay.delayTime.value = delayTime;
    this.delay.wet.value = wet;
  }

  // Set the limiter threshold
  setLimiter(threshold) {
    this.limiter.threshold = threshold;
  }

  noteon(note) {
    this.sampler.triggerAttack(note).chain(
      this.reverb, this.envelope, this.limiter, this.volume, Tone.Destination
    );
  }

  noteoff(note) {
    this.sampler.triggerRelease(note).chain(
      this.reverb, this.envelope, this.limiter, this.volume, Tone.Destination
    );
  }

  chordon(chord) {
    this.currentChord = chord;
    this.sampler.triggerAttack(chord).chain(
      this.reverb, this.envelope, this.limiter
    );
  }

  chordoff() {
    this.sampler.triggerRelease(this.currentChord).chain(
      this.reverb, this.envelope, this.limiter
    );
    this.currentChord = null; // chord set during chordon
  }
}

export default Sampler;
