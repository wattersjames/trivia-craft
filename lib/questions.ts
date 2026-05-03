export type Theme = {
  emoji: string;
  gradient: string;
};

export type Question = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  theme: Theme;
};

export const questions: Question[] = [
  {
    prompt: "What material is required to mine diamond ore?",
    choices: ["Stone pickaxe", "Iron pickaxe", "Gold pickaxe", "Diamond pickaxe"],
    answerIndex: 1,
    theme: { emoji: "💎", gradient: "from-cyan-900 via-sky-800 to-blue-950" },
  },
  {
    prompt: "Which mob drops Ender Pearls?",
    choices: ["Zombie", "Skeleton", "Enderman", "Creeper"],
    answerIndex: 2,
    theme: { emoji: "👁️", gradient: "from-purple-950 via-violet-900 to-fuchsia-950" },
  },
  {
    prompt: "How many Eyes of Ender are needed to activate an End Portal?",
    choices: ["10", "12", "8", "16"],
    answerIndex: 1,
    theme: { emoji: "🌀", gradient: "from-indigo-950 via-violet-900 to-purple-950" },
  },
  {
    prompt: "What is the maximum stack size for most items in Minecraft?",
    choices: ["32", "64", "100", "128"],
    answerIndex: 1,
    theme: { emoji: "📦", gradient: "from-amber-900 via-orange-900 to-yellow-950" },
  },
  {
    prompt: "Which biome is the only place you can find Mooshrooms naturally?",
    choices: ["Plains", "Jungle", "Mushroom Fields", "Swamp"],
    answerIndex: 2,
    theme: { emoji: "🍄", gradient: "from-rose-900 via-red-900 to-pink-950" },
  },
  {
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
    prompt: "What is the rarest naturally generated ore in the Overworld?",
    choices: ["Diamond", "Emerald", "Ancient Debris", "Gold"],
    answerIndex: 1,
    theme: { emoji: "💚", gradient: "from-emerald-950 via-green-900 to-teal-950" },
  },
  {
    prompt: "Which mob is immune to fire and lava?",
    choices: ["Blaze", "Magma Cube", "Wither Skeleton", "All of the above"],
    answerIndex: 3,
    theme: { emoji: "🔥", gradient: "from-red-950 via-orange-900 to-amber-950" },
  },
  {
    prompt: "What block must you stand on to sleep through a thunderstorm safely?",
    choices: ["Any block", "A bed", "Obsidian", "Wool"],
    answerIndex: 1,
    theme: { emoji: "🛏️", gradient: "from-slate-900 via-blue-950 to-indigo-950" },
  },
  {
    prompt: "What is the name of the final boss accessed via the End Portal?",
    choices: ["The Wither", "The Ender Dragon", "The Warden", "The Elder Guardian"],
    answerIndex: 1,
    theme: { emoji: "🐉", gradient: "from-zinc-950 via-purple-950 to-black" },
  },
];
