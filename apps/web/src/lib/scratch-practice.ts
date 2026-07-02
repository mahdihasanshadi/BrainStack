/** Practice lessons mapped to dashboard class recordings (Month 1 focus). */
export interface ScratchPracticeLesson {
  classNumber: number;
  title: string;
  description: string;
  duration: string;
  /** TurboWarp / Scratch project ID for starter template. null = blank editor */
  starterProjectId: string | null;
  goals: string[];
  videoUrl: string;
}

export const SCRATCH_PRACTICE_LESSONS: ScratchPracticeLesson[] = [
  {
    classNumber: 0,
    title: "Environment Setup — Your First Sprite",
    description:
      "Set up Scratch, add a sprite, and make it say your name using looks and events blocks.",
    duration: "30 mins",
    starterProjectId: null,
    goals: [
      "Add a sprite from the library",
      "Drag a “when green flag clicked” block",
      "Use “say” block with your name for 2 seconds",
      "Click the green flag to run",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    classNumber: 1,
    title: "Introduction to Scratch & Sprite Coordinates",
    description:
      "Learn how the 2D grid works, drag blocks, and make sprites move with arrow keys.",
    duration: "45 mins",
    starterProjectId: "60917032",
    goals: [
      "Use motion blocks to change x and y",
      "Add arrow key events to move the sprite",
      "Keep the sprite on the stage edges",
      "Test with the green flag",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    classNumber: 2,
    title: "Understanding Loops, Control & Directions",
    description:
      "Explore forever and repeat loops to animate characters and control directions.",
    duration: "52 mins",
    starterProjectId: "414716080",
    goals: [
      "Use a forever loop for continuous motion",
      "Use repeat (10) for timed animations",
      "Switch costumes inside a loop",
      "Combine loops with movement blocks",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    classNumber: 3,
    title: "Key Press Events & Sound Integration",
    description:
      "Create keyboard controls, play sounds, and design simple obstacle mechanics.",
    duration: "48 mins",
    starterProjectId: "15832807",
    goals: [
      "Add when key pressed blocks",
      "Play a sound when something happens",
      "Use if/touching blocks for collisions",
      "Test all keys and sounds",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    classNumber: 4,
    title: "Sprite Interactions & Broadcast Messages",
    description:
      "Coordinate actions between sprites using broadcast messages and level transitions.",
    duration: "55 mins",
    starterProjectId: "414716080",
    goals: [
      "Use broadcast and when I receive blocks",
      "Make two sprites react to each other",
      "Hide/show sprites with messages",
      "Run a full scene with broadcasts",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    classNumber: 5,
    title: "Variables & Game Scoring Systems",
    description:
      "Store points, track lives, and build a simple score display for your game.",
    duration: "50 mins",
    starterProjectId: "60917032",
    goals: [
      "Create a Score variable",
      "Increase score when something good happens",
      "Show score on stage with a variable monitor",
      "Reset score when green flag clicked",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function getPracticeLesson(classNumber: number): ScratchPracticeLesson | undefined {
  return SCRATCH_PRACTICE_LESSONS.find((lesson) => lesson.classNumber === classNumber);
}

export function getTurboWarpEditorUrl(projectId: string | null): string {
  if (projectId) {
    return `https://turbowarp.org/${projectId}/editor`;
  }
  return "https://turbowarp.org/editor.html";
}

export function getTurboWarpEmbedEditorUrl(projectId: string | null): string {
  if (projectId) {
    return `https://turbowarp.org/${projectId}/embed?addons=pause,fullscreen&autoplay=button`;
  }
  return "https://turbowarp.org/editor.html";
}

export function getTurboWarpPlayerEmbedUrl(projectId: string): string {
  return `https://turbowarp.org/${projectId}/embed?addons=pause,fullscreen&autoplay=button`;
}
