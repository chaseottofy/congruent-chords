const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
class Controls {
  constructor () {
    this.toggle = $(".toggle-controls");
    this.modes = $$(".playback-option");
    this.sample = $(".sample-select");
    this.chord = $(".chord-select");
    this.arp = $(".arp-select");
    this.octavelow = $(".lower-octave__val");
    this.octavehigh = $(".upper-octave__val");
    this.volume = $(".volume-slider");
    this.lowpass = $(".lowpass-slider");
    this.highpass = $(".highpass-slider");
    this.attack = $(".attack-slider");
    this.sustain = $(".sustain-slider");
    this.decay = $(".decay-slider");
    this.release = $(".release-slider");
    this.reverb = $(".reverb-status");
    this.delay = $(".delay-status");
  }

  getSample() { return this.sample.value; }
  getChord() { return this.chord.value; }
  getArp() { return this.arp.value; }
  getSliderValue(slider) { return this[slider].value; }
  getCheckboxValue(checkbox) { return this[checkbox].checked; }
  getPlaybackMode() { return this.modes[0].checked ? "note" : "chord"; }
  getOctaves() {
    return [+this.octavelow.value, +this.octavehigh.value];
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
    this.octavelow.value = lower;
    this.octavehigh.value = upper;
  }

  setSlider(slider, value) { this[slider].value = value; }
  setSelect(select, value) { this[select].value = value; }
  setCheckbox(checkbox) { this[checkbox] = !this[checkbox]; }
  setPlaybackMode(mode) {
    this.modes[mode === "note" ? 0 : 1].checked = true;
    if (mode === "note") {
      this.chord.disabled = true;
      this.arp.disabled = true;
      this.chord.classList.add("hide-chord");
    } else {
      this.chord.disabled = false;
      this.arp.disabled = false;
      this.chord.classList.remove("hide-chord");
    }
  }
  setOctaves(target, arg) {
    const [currLower, currUpper] = this.getOctaves();
    let curr = target === "lower" ? +currLower : +currUpper;
    if (curr === 1 && arg === "subtract" || curr === 8 && arg === "add") return;

    curr += arg === "add" ? 1 : -1;
    target === "lower" ? this.octavelow.textContent = curr : this.octavehigh.textContent = curr;
  }

  handleClick() {
    $$(".octave__add").forEach(el => {
      el.onclick = () => this.setOctaves(el.dataset.target, "add");
    });
    $$(".octave__subtract").forEach(el => {
      el.onclick = () => this.setOctaves(el.dataset.target, "subtract");
    });

    this.toggle.onclick = () => {
      const [openIcon, closedIcon] = this.toggle.children;
      if (openIcon.classList.contains("icon-hidden")) {
        openIcon.classList.remove("icon-hidden");
        closedIcon.classList.add("icon-hidden");
      } else {
        openIcon.classList.add("icon-hidden");
        closedIcon.classList.remove("icon-hidden");
      }

      $(".controls").classList.toggle("controls-collapse");
      $(".main").classList.toggle("main-expand");
      $$(".controls__section").forEach((section) => {
        if (!section.classList.contains(".volume")) {
          section.classList.toggle("hide-controls");
        }
      });
    };
  }

  handleChange() {
    this.sample.onchange = () => this.setSelect('sample', this.sample.value);
    this.chord.onchange = () => this.setSelect('chord', this.chord.value);
    this.arp.onchange = () => this.setSelect('arp', this.arp.value);
    this.volume.onchange = () => this.setSlider('volume', this.volume.value);
    this.lowpass.onchange = () => this.setSlider('lowpass', this.lowpass.value);
    this.highpass.onchange = () => this.setSlider('highpass', this.highpass.value);
    this.attack.onchange = () => this.setSlider('attack', this.attack.value);
    this.sustain.onchange = () => this.setSlider('sustain', this.sustain.value);
    this.decay.onchange = () => this.setSlider('decay', this.decay.value);
    this.release.onchange = () => this.setSlider('release', this.release.value);
    this.reverb.onchange = () => this.setCheckbox('reverb');
    this.delay.onchange = () => this.setCheckbox('delay');
    this.modes[0].onchange = () => this.setPlaybackMode("note");
    this.modes[1].onchange = () => this.setPlaybackMode("chord");
    console.log('ran');
  }
}

const controls = new Controls();
export default controls;