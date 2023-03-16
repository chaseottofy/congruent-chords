class Controls {
  constructor () {
    this.modes = document.querySelectorAll(".playback-option");
    this.sample = document.querySelector(".sample-select");
    this.chord = document.querySelector(".chord-select");
    this.arp = document.querySelector(".arp-select");
    this.octavelow = document.querySelector(".lower-octave__val");
    this.octavehigh = document.querySelector(".upper-octave__val");
    this.volume = document.querySelector(".volume-slider");
    this.lowpass = document.querySelector(".lowpass-slider");
    this.highpass = document.querySelector(".highpass-slider");
    this.attack = document.querySelector(".attack-slider");
    this.sustain = document.querySelector(".sustain-slider");
    this.decay = document.querySelector(".decay-slider");
    this.release = document.querySelector(".release-slider");
    this.reverb = document.querySelector(".reverb-status");
    this.delay = document.querySelector(".delay-status");
  }

  getSample() { return this.sample.value; }
  getChord() { return this.chord.value; }
  getArp() { return this.arp.value; }
  getSliderValue(slider) { return this[slider].value; }
  getCheckboxValue(checkbox) { return this[checkbox].checked; }
  getPlaybackMode() { return this.modes[0].checked ? "note" : "chord"; }
  getOctaves() { 
    return [+this.octavelow.textContent, +this.octavehigh.textContent]; 
  }
  getASDR() {
    return {
      attack: this.getSliderValue('attack'),
      sustain: this.getSliderValue('sustain'),
      decay: this.getSliderValue('decay'),
      release: this.getSliderValue('release'),
    };
  }
  getDefaults() {
    return {
      sample: this.getSample(),
      chord: this.getChord(),
      arp: this.getArp(),
      octaves: this.getOctaves(),
      volume: this.getSliderValue('volume'),
      lowpass: this.getSliderValue('lowpass'),
      highpass: this.getSliderValue('highpass'),
      attack: this.getSliderValue('attack'),
      sustain: this.getSliderValue('sustain'),
      decay: this.getSliderValue('decay'),
      release: this.getSliderValue('release'),
      reverb: this.getCheckboxValue('reverb'),
      delay: this.getCheckboxValue('delay'),
      mode: this.getPlaybackMode(),
    };
  }

  setOctaves(lower, upper) {
    this.octavelow.textContent = lower;
    this.octavehigh.textContent = upper;
  }

  setSlider(slider, value) { this[slider].value = value; }
  setSelect(select, value) { this[select].value = value; }
  setCheckbox(checkbox) { this[checkbox] = !this[checkbox]; }
  setPlaybackMode(mode) { 
    this.modes[mode === "note" ? 0 : 1].checked = true;
    if (mode === "note") {
      this.chord.disabled = true;
      this.arp.disabled = true;
      this.chord.classList.add("hide-chord")
    } else {
      this.chord.disabled = false;
      this.arp.disabled = false;
      this.chord.classList.remove("hide-chord")
    }
  }
  setOctaves(target, arg) {
    const [currLower, currUpper] = this.getOctaves();
    let curr = target === "lower" ? +currLower : +currUpper;
    if (curr === 1 && arg === "subtract" || curr === 8 && arg === "add") return;
  
    curr += arg === "add" ? 1 : -1;
    target === "lower" ? this.octavelow.textContent = curr : this.octavehigh.textContent = curr;
  }
}

const controls = new Controls();

export default controls;