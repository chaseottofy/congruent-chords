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
    this.handleResetDom = null;
  }

  setResetDom(callback) {
    this.handleResetDom = callback;
  }

  getResetDom() {
    return this.handleResetDom;
  }

  getSample() { return this.sample.value; }
  getChord() { return this.chord.value; }
  getArp() { return this.arp.value; }
  getSliderValue(slider) { return this[slider].value; }
  getCheckboxValue(checkbox) { return this[checkbox].checked; }

  getPlaybackMode() {
    return this.modes[0].checked ? "note" : "chord";
  }

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
  setCheckbox(checkbox) {
    this[checkbox].checked = !this[checkbox].checked;
  }

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

    if (curr === 1 && arg === "subtract"
      || curr === 8 && arg === "add") return;

    // reset will re-render the notes associated with sampler and circle
    const reset = this.getResetDom();
    curr += arg === "add" ? 1 : -1;

    if (target === "lower") {
      this.octavelow.value = curr;
      reset();
    } else {
      this.octavehigh.value = curr;
      reset();
    }
  }

  handleClick() {
    $$(".octave__add").forEach(el => {
      el.onclick = () => this.setOctaves(
        el.getAttribute("data-target"), "add"
      );
    });
    $$(".octave__subtract").forEach(el => {
      el.onclick = () => this.setOctaves(
        el.getAttribute("data-target"), "subtract"
      );
    });

    // toggle between note and chord mode
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

  /*
    I use onchange instead of addEventListener("change") for the following reasons:
    - I do not want multiple event listeners for the same element
    - Removing becomes as simple as { onchange = null }
    - Less overhead
    - Not worried about debugging, each element does one thing
  */
  handleChange() {
    const select = ['sample', 'chord', 'arp'];
    const sliders = ['attack', 'sustain', 'decay', 'release', 'volume', 'lowpass', 'highpass'];
    const checkboxes = ['reverb', 'delay'];

    select.forEach((select) => {
      const handler = this.setSelect(select, this[select].value);
      this[select].onchange = handler;
    });

    sliders.forEach((slider) => {
      const handler = this.setSlider(slider, this[slider].value);
      this[slider].onchange = handler;
    });

    checkboxes.forEach((checkbox) => {
      const handler = this.setCheckbox(checkbox);
      this[checkbox].onchange = handler;
    });

    this.modes[0].onchange = () => this.setPlaybackMode("note");
    this.modes[1].onchange = () => this.setPlaybackMode("chord");
  }

  removeOnChange(element) { this[element].onchange = null; }
  removeOnClick(element) { this[element].onclick = null; }
}

const controls = new Controls();
export default controls;