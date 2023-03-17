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
    this.attack = $(".attack-slider");
    this.release = $(".release-slider");
    this.lowpass = $(".lowpass-slider");
    this.highpass = $(".highpass-slider");
    this.reverb = $(".reverb-status");
    this.delay = $(".delay-status");
    this.callbacks = {
      loadSample: null,
      loadFilter: null,
      setDom: null,
    };
  }
  // callbacks provided onLoad @index
  setCallback(name, callback) { this.callbacks[name] = callback; }
  getCallback(name) { return this.callbacks[name] || null; }

  getSample() {
    return this.sample.value;
  }

  getChord() {
    return this.chord.value;
  }

  getArp() {
    return this.arp.value;
  }

  getSliderValue(slider) {
    return this[slider].value;
  }

  getCheckboxValue(checkbox) {
    return this[checkbox].checked;
  }

  getPlaybackMode() {
    return this.modes[0].checked ? "note" : "chord";
  }

  getOctaves() {
    return [+this.octavelow.value, +this.octavehigh.value];
  }

  getSampleArgs() {
    return {
      sample: this.sample.value,
      volume: this.volume.value,
      attack: this.attack.value,
      release: this.release.value,
    };
  }

  getFilterArgs() {
    return {
      lowpass: this.lowpass.value,
      highpass: this.highpass.value,
      reverb: this.reverb.checked,
      delay: this.delay.checked,
    };
  }

  setSample() {
    const callback = this.getCallback("loadSample");
    const args = this.getSampleArgs();
    callback(
      args.sample,
      args.volume,
      args.attack,
      args.release
    );
  }

  setFilter() {
    const callback = this.getCallback('loadFilter');
    const args = this.getFilterArgs();
    callback(
      +args.lowpass > 0 ? 10000 - (parseInt(args.lowpass) * 100) : 0,
      +args.highpass > 0 ? parseInt(args.highpass) * 100 : 0,
      args.reverb,
      args.delay
    );
  }

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
      || curr === 7 && arg === "add") return;

    // reset re-renders notes associated with sampler && circle
    const reset = this.getCallback("setDom");
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

  handleChange() {
    const argsOne = ['sample', 'volume', 'attack', 'release'];
    const argsTwo = ['lowpass', 'highpass', 'reverb', 'delay'];

    argsOne.forEach((arg) => {
      this[arg].onchange = () => this.setSample();
    });

    argsTwo.forEach((arg) => {
      this[arg].onchange = () => this.setFilter();
    });

    this.modes[0].onchange = () => this.setPlaybackMode("note");
    this.modes[1].onchange = () => this.setPlaybackMode("chord");
  }

  removeOnChange(element) { this[element].onchange = null; }
  removeOnClick(element) { this[element].onclick = null; }
}

const controls = new Controls();
export default controls;