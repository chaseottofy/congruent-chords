import * as Tone from 'tone';
import key1 from './samples/key1.mp3';
import key2 from './samples/key2.mp3';
import pad1 from './samples/pad1.mp3';
import pad2 from './samples/pad2.mp3';
import pad3 from './samples/pad3.mp3';
import piano1 from './samples/piano1.mp3';
import piano2 from './samples/piano2.mp3';
import distortedorgan1 from './samples/distortedorgan1.mp3';
import createChord from "../utilities/createChord";

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
  }

  constructor(sample) {
    this.volume = new Tone.Volume().toDestination();
    this.limiter = new Tone.Limiter(-6).connect(this.volume);
    this.reverb = new Tone.Reverb().connect(this.limiter);
    this.delay = new Tone.FeedbackDelay().connect(this.reverb);
    this.filter = new Tone.Filter().connect(this.delay);
    this.sampler = new Tone.Sampler({
      urls: {
        C3: this.#samples[sample] || piano1,
      },
      onload: () => {
        console.log('Samples loaded');
      },
    }).connect(this.filter);
    this.sampler.release = 0.5;
    this.sampler.volume.value = -6;
    this.sampler.toDestination();
    this.notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    // this.arpeggiator = new Tone.Arpeggiator().connect(this.sampler);
    // this.chord = new Tone.Chord().connect(this.sampler);
    // this.envelope = new Tone.AmplitudeEnvelope().connect(this.sampler);
  }

  // Load a new sample
  loadSample(note, url) {
    this.sampler.add(note, url);
  }

  // reset the sampler
  newSampler(note, url) {
    this.sampler.dispose();
    this.sampler = new Tone.Sampler({
      urls: {
        [note]: this.#samples[url] || piano1,
      },
      onload: () => {
        console.log('Samples loaded');
      },
    }).connect(this.filter);
    this.sampler.release = 0.5;
    this.sampler.volume.value = -6;
    this.sampler.toDestination();
  }

  // Set the arpeggiator
  // setArpeggiator(type, duration) {
  //   this.arpeggiator.pattern = type;
  //   this.arpeggiator.duration = duration;
  // }

  // Set the chord
  setChord(chordName) {
    this.chord.value = [chordName];
  }

  // Set the octave range
  setOctaveRange(range) {
    this.sampler.release = (range + 1) / 10;
    this.notes.forEach((note, index) => {
      this.sampler.set(note + '3', note + (range + 3));
    });
  }

  // Set the ADSR envelope
  setEnvelope(attack, decay, sustain, release) {
    this.envelope.attack = attack;
    this.envelope.decay = decay;
    this.envelope.sustain = sustain;
    this.envelope.release = release;
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

  // Select a new sample to play
  selectSample(sampleName) {
    this.sampler.triggerRelease();
    this.sampler.triggerAttack(sampleName);
  }

  // Play a note or chord
  playNotes(notes, duration) {
    if (notes.length === 1) {
      this.sampler.triggerAttack(notes[0], '+0.1', 1);
    } else {
      this.chord.value = [notes];
      this.sampler.triggerAttack(this.chord.get(), '+0.1', 1);
    }
    this.sampler.triggerRelease('+' + duration);
  }

  // Set the sampler volume
  setVolume(volume) {
    this.volume.volume.value = volume;
  }

  // Set the limiter threshold
  setLimiter(threshold) {
    this.limiter.threshold = threshold;
  }

  
}

export default Sampler;
