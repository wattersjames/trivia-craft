"use client";

import { useEffect } from "react";

const Hz = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
} as const;

const SEQUENCE: number[] = [
  Hz.E4, Hz.A4, Hz.C5, Hz.E5,
  Hz.C4, Hz.F4, Hz.A4, Hz.C5,
  Hz.G4, Hz.C5, Hz.E5, Hz.G5,
  Hz.D4, Hz.G4, Hz.B4, Hz.D5,
];

const NOTE_SPACING = 0.55;
const NOTE_DURATION = 1.4;

export function useEndGameMusic(enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    filter.Q.value = 0.5;
    filter.connect(master);

    const fadeInEnd = ctx.currentTime + 1.5;
    master.gain.linearRampToValueAtTime(0.13, fadeInEnd);

    function playNote(freq: number, when: number) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, when);
      gain.gain.linearRampToValueAtTime(0.7, when + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, when + NOTE_DURATION);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(when);
      osc.stop(when + NOTE_DURATION + 0.1);
    }

    let nextNoteTime = ctx.currentTime + 0.2;
    let noteIndex = 0;

    function scheduleAhead() {
      while (nextNoteTime < ctx.currentTime + 2) {
        playNote(SEQUENCE[noteIndex % SEQUENCE.length], nextNoteTime);
        nextNoteTime += NOTE_SPACING;
        noteIndex++;
      }
    }

    scheduleAhead();
    const intervalId = window.setInterval(scheduleAhead, 500);

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    return () => {
      clearInterval(intervalId);
      const fadeEnd = ctx.currentTime + 0.4;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, fadeEnd);
      window.setTimeout(() => {
        ctx.close().catch(() => {});
      }, 500);
    };
  }, [enabled]);
}
