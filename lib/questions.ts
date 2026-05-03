export type Theme = {
  emoji: string;
  gradient: string;
};

export type Question = {
  id: number;
  prompt: string;
  choices: string[];
  answerIndex: number;
  theme: Theme;
};

export const questions: Question[] = [
  {
    id: 1,
    prompt: "What material is required to mine diamond ore?",
    choices: ["Stone pickaxe", "Iron pickaxe", "Gold pickaxe", "Diamond pickaxe"],
    answerIndex: 1,
    theme: { emoji: "💎", gradient: "from-cyan-900 via-sky-800 to-blue-950" },
  },
  {
    id: 2,
    prompt: "Which mob drops Ender Pearls?",
    choices: ["Zombie", "Skeleton", "Enderman", "Creeper"],
    answerIndex: 2,
    theme: { emoji: "👁️", gradient: "from-purple-950 via-violet-900 to-fuchsia-950" },
  },
  {
    id: 3,
    prompt: "How many Eyes of Ender are needed to activate an End Portal?",
    choices: ["10", "12", "8", "16"],
    answerIndex: 1,
    theme: { emoji: "🌀", gradient: "from-indigo-950 via-violet-900 to-purple-950" },
  },
  {
    id: 4,
    prompt: "What is the maximum stack size for most items in Minecraft?",
    choices: ["32", "64", "100", "128"],
    answerIndex: 1,
    theme: { emoji: "📦", gradient: "from-amber-900 via-orange-900 to-yellow-950" },
  },
  {
    id: 5,
    prompt: "Which biome is the only place you can find Mooshrooms naturally?",
    choices: ["Plains", "Jungle", "Mushroom Fields", "Swamp"],
    answerIndex: 2,
    theme: { emoji: "🍄", gradient: "from-rose-900 via-red-900 to-pink-950" },
  },
  {
    id: 6,
    prompt: "What do you craft a Beacon with on top of an obsidian base?",
    choices: [
      "Nether Star + Glass + Obsidian",
      "Diamond + Glass + Iron",
      "Nether Star + Glass + Iron",
      "Dragon Egg + Glass + Obsidian",
    ],
    answerIndex: 0,
    theme: { emoji: "✨", gradient: "from-yellow-900 via-amber-800 to-orange-950" },
  },
  {
    id: 7,
    prompt: "What is the rarest naturally generated ore in the Overworld?",
    choices: ["Diamond", "Emerald", "Ancient Debris", "Gold"],
    answerIndex: 1,
    theme: { emoji: "💚", gradient: "from-emerald-950 via-green-900 to-teal-950" },
  },
  {
    id: 8,
    prompt: "Which mob is immune to fire and lava?",
    choices: ["Blaze", "Magma Cube", "Wither Skeleton", "All of the above"],
    answerIndex: 3,
    theme: { emoji: "🔥", gradient: "from-red-950 via-orange-900 to-amber-950" },
  },
  {
    id: 9,
    prompt: "What block must you stand on to sleep through a thunderstorm safely?",
    choices: ["Any block", "A bed", "Obsidian", "Wool"],
    answerIndex: 1,
    theme: { emoji: "🛏️", gradient: "from-slate-900 via-blue-950 to-indigo-950" },
  },
  {
    id: 10,
    prompt: "What is the name of the final boss accessed via the End Portal?",
    choices: ["The Wither", "The Ender Dragon", "The Warden", "The Elder Guardian"],
    answerIndex: 1,
    theme: { emoji: "🐉", gradient: "from-zinc-950 via-purple-950 to-black" },
  },
  {
    id: 11,
    prompt: "What is the name of the dimension accessed via a Nether Portal?",
    choices: ["The End", "The Nether", "The Aether", "The Void"],
    answerIndex: 1,
    theme: { emoji: "🔥", gradient: "from-red-950 via-rose-900 to-orange-950" },
  },
  {
    id: 12,
    prompt: "What food item is required to tame a wolf?",
    choices: ["Wheat", "Cooked Steak", "Bone", "Raw Porkchop"],
    answerIndex: 2,
    theme: { emoji: "🦴", gradient: "from-stone-800 via-slate-900 to-zinc-950" },
  },
  {
    id: 13,
    prompt: "Which boss mob has three heads?",
    choices: ["Ender Dragon", "The Wither", "Elder Guardian", "Ravager"],
    answerIndex: 1,
    theme: { emoji: "☠️", gradient: "from-zinc-900 via-stone-950 to-black" },
  },
  {
    id: 14,
    prompt: "What was Minecraft originally called when Notch first prototyped it?",
    choices: ["Block World", "Cave Game", "Survival Test", "Infiniminer"],
    answerIndex: 1,
    theme: { emoji: "🕹️", gradient: "from-amber-950 via-stone-900 to-yellow-950" },
  },
  {
    id: 15,
    prompt: "Who originally created Minecraft?",
    choices: ["Markus Persson", "Jens Bergensten", "Phil Spencer", "Hideo Kojima"],
    answerIndex: 0,
    theme: { emoji: "🧑‍💻", gradient: "from-blue-950 via-sky-900 to-indigo-950" },
  },
  {
    id: 16,
    prompt: "What is the maximum build height in modern Minecraft (Java Edition)?",
    choices: ["Y=256", "Y=320", "Y=384", "Y=512"],
    answerIndex: 1,
    theme: { emoji: "⛰️", gradient: "from-sky-900 via-cyan-900 to-blue-950" },
  },
  {
    id: 17,
    prompt: "Which blind hostile mob lives in the Deep Dark biome and senses vibrations?",
    choices: ["Warden", "Sniffer", "Ravager", "Phantom"],
    answerIndex: 0,
    theme: { emoji: "👂", gradient: "from-teal-950 via-cyan-950 to-slate-950" },
  },
  {
    id: 18,
    prompt: "Where can you find the Pigstep music disc?",
    choices: ["End City", "Ancient City", "Bastion Remnant", "Stronghold"],
    answerIndex: 2,
    theme: { emoji: "🎵", gradient: "from-fuchsia-950 via-pink-900 to-purple-950" },
  },
  {
    id: 19,
    prompt: "What yellow block do bees produce that can be used to craft candles?",
    choices: ["Honey Block", "Honeycomb", "Wax Block", "Glowstone"],
    answerIndex: 1,
    theme: { emoji: "🐝", gradient: "from-yellow-800 via-amber-900 to-orange-950" },
  },
  {
    id: 20,
    prompt: "What underwater hostile mob shoots a laser-like beam?",
    choices: ["Drowned", "Squid", "Guardian", "Pufferfish"],
    answerIndex: 2,
    theme: { emoji: "🐠", gradient: "from-cyan-950 via-teal-900 to-blue-950" },
  },
  {
    id: 21,
    prompt: "What block emits a redstone signal when an entity steps on it?",
    choices: ["Lever", "Pressure Plate", "Daylight Sensor", "Trapdoor"],
    answerIndex: 1,
    theme: { emoji: "⚡", gradient: "from-stone-800 via-zinc-900 to-slate-950" },
  },
  {
    id: 22,
    prompt: "What is the maximum enchantment level for Sharpness on a sword?",
    choices: ["III", "IV", "V", "VI"],
    answerIndex: 2,
    theme: { emoji: "⚔️", gradient: "from-slate-900 via-blue-950 to-indigo-950" },
  },
  {
    id: 23,
    prompt: "Which rideable mob is native to the Nether and walks on lava?",
    choices: ["Horse", "Strider", "Llama", "Camel"],
    answerIndex: 1,
    theme: { emoji: "🦶", gradient: "from-orange-900 via-red-900 to-rose-950" },
  },
  {
    id: 24,
    prompt: "Which Nether biome is filled with cyan-blue fungal trees?",
    choices: ["Crimson Forest", "Warped Forest", "Soul Sand Valley", "Basalt Deltas"],
    answerIndex: 1,
    theme: { emoji: "🌲", gradient: "from-teal-900 via-cyan-950 to-emerald-950" },
  },
  {
    id: 25,
    prompt: "What item do you throw to locate a Stronghold?",
    choices: ["Compass", "Eye of Ender", "Ender Pearl", "Map"],
    answerIndex: 1,
    theme: { emoji: "🧭", gradient: "from-indigo-950 via-purple-950 to-violet-950" },
  },
];

export function pickRandomQuestions(n: number): Question[] {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}

export function getQuestionById(id: number): Question | undefined {
  return questions.find((q) => q.id === id);
}
