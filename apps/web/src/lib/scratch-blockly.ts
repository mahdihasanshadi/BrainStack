import type { ScratchPracticeLesson } from "./scratch-practice";

/** Blockly toolbox tuned per class lesson */
export function getBlocklyToolbox(lesson: ScratchPracticeLesson) {
  const contents: Record<string, unknown>[] = [
    {
      kind: "category",
      name: "Events",
      colour: "#FFBF00",
      contents: [{ kind: "block", type: "event_when_flag" }],
    },
    {
      kind: "category",
      name: "Motion",
      colour: "#4C97FF",
      contents: [
        { kind: "block", type: "motion_move", fields: { STEPS: 10 } },
        { kind: "block", type: "motion_turn", fields: { DEGREES: 15 } },
        { kind: "block", type: "motion_goto", fields: { X: 0, Y: 0 } },
      ],
    },
    {
      kind: "category",
      name: "Looks",
      colour: "#9966FF",
      contents: [
        { kind: "block", type: "looks_say", fields: { MESSAGE: "Hello!" } },
        { kind: "block", type: "looks_think", fields: { MESSAGE: "Hmm..." } },
      ],
    },
    {
      kind: "category",
      name: "Control",
      colour: "#FFAB19",
      contents: [
        { kind: "block", type: "control_wait", fields: { SECS: 1 } },
        { kind: "block", type: "control_repeat", fields: { TIMES: 10 } },
        { kind: "block", type: "control_forever" },
      ],
    },
  ];

  if (lesson.classNumber >= 3) {
    contents.push({
      kind: "category",
      name: "Sensing",
      colour: "#5CB1D6",
      contents: [
        { kind: "block", type: "sensing_key_pressed", fields: { KEY: "space" } },
        { kind: "block", type: "logic_if" },
      ],
    });
  }

  if (lesson.classNumber >= 5) {
    contents.push({
      kind: "category",
      name: "Variables",
      colour: "#FF8C1A",
      contents: [
        { kind: "block", type: "variables_set", fields: { VAR: "Score", VALUE: 0 } },
        { kind: "block", type: "variables_change", fields: { VAR: "Score", DELTA: 1 } },
      ],
    });
  }

  return { kind: "categoryToolbox" as const, contents };
}

export function registerScratchBlocks(
  Blockly: typeof import("blockly"),
  javascriptGenerator: import("blockly/javascript").JavascriptGenerator,
) {
  Blockly.common.defineBlocksWithJsonArray([
    {
      type: "event_when_flag",
      message0: "when 🚩 clicked %1",
      args0: [{ type: "input_statement", name: "DO" }],
      colour: 20,
      hat: "cap",
    },
    {
      type: "motion_move",
      message0: "move %1 steps",
      args0: [{ type: "field_number", name: "STEPS", value: 10 }],
      previousStatement: null,
      nextStatement: null,
      colour: 160,
    },
    {
      type: "motion_turn",
      message0: "turn %1 degrees",
      args0: [{ type: "field_number", name: "DEGREES", value: 15 }],
      previousStatement: null,
      nextStatement: null,
      colour: 160,
    },
    {
      type: "motion_goto",
      message0: "go to x: %1 y: %2",
      args0: [
        { type: "field_number", name: "X", value: 0 },
        { type: "field_number", name: "Y", value: 0 },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160,
    },
    {
      type: "looks_say",
      message0: "say %1",
      args0: [{ type: "field_input", name: "MESSAGE", text: "Hello!" }],
      previousStatement: null,
      nextStatement: null,
      colour: 270,
    },
    {
      type: "looks_think",
      message0: "think %1",
      args0: [{ type: "field_input", name: "MESSAGE", text: "Hmm..." }],
      previousStatement: null,
      nextStatement: null,
      colour: 270,
    },
    {
      type: "control_wait",
      message0: "wait %1 seconds",
      args0: [{ type: "field_number", name: "SECS", value: 1, min: 0, max: 10 }],
      previousStatement: null,
      nextStatement: null,
      colour: 40,
    },
    {
      type: "control_repeat",
      message0: "repeat %1",
      args0: [{ type: "field_number", name: "TIMES", value: 10, min: 1, max: 50 }],
      message1: "%1",
      args1: [{ type: "input_statement", name: "DO" }],
      previousStatement: null,
      nextStatement: null,
      colour: 40,
    },
    {
      type: "control_forever",
      message0: "forever %1",
      args0: [{ type: "input_statement", name: "DO" }],
      previousStatement: null,
      nextStatement: null,
      colour: 40,
    },
    {
      type: "sensing_key_pressed",
      message0: "key %1 pressed?",
      args0: [
        {
          type: "field_dropdown",
          name: "KEY",
          options: [
            ["space", "space"],
            ["↑", "ArrowUp"],
            ["↓", "ArrowDown"],
            ["←", "ArrowLeft"],
            ["→", "ArrowRight"],
          ],
        },
      ],
      output: "Boolean",
      colour: 200,
    },
    {
      type: "logic_if",
      message0: "if %1 then %2",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 40,
    },
    {
      type: "variables_set",
      message0: "set Score to %1",
      args0: [{ type: "field_number", name: "VALUE", value: 0 }],
      previousStatement: null,
      nextStatement: null,
      colour: 330,
    },
    {
      type: "variables_change",
      message0: "change Score by %1",
      args0: [{ type: "field_number", name: "DELTA", value: 1 }],
      previousStatement: null,
      nextStatement: null,
      colour: 330,
    },
  ]);

  javascriptGenerator.forBlock.event_when_flag = (block, generator) => {
    const branch = generator.statementToCode(block, "DO");
    return `await __runStack(async () => {\n${branch}});\n`;
  };

  javascriptGenerator.forBlock.motion_move = (block) => {
    const steps = block.getFieldValue("STEPS");
    return `await __move(${steps});\n`;
  };

  javascriptGenerator.forBlock.motion_turn = (block) => {
    const degrees = block.getFieldValue("DEGREES");
    return `await __turn(${degrees});\n`;
  };

  javascriptGenerator.forBlock.motion_goto = (block) => {
    const x = block.getFieldValue("X");
    const y = block.getFieldValue("Y");
    return `await __goto(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock.looks_say = (block) => {
    const message = block.getFieldValue("MESSAGE");
    return `await __say(${JSON.stringify(String(message))});\n`;
  };

  javascriptGenerator.forBlock.looks_think = (block) => {
    const message = block.getFieldValue("MESSAGE");
    return `await __think(${JSON.stringify(String(message))});\n`;
  };

  javascriptGenerator.forBlock.control_wait = (block) => {
    const secs = block.getFieldValue("SECS");
    return `await __wait(${secs});\n`;
  };

  javascriptGenerator.forBlock.control_repeat = (block, generator) => {
    const times = Number(block.getFieldValue("TIMES"));
    const branch = generator.statementToCode(block, "DO");
    return `for (let __i = 0; __i < ${times}; __i++) {\n${branch}}\n`;
  };

  javascriptGenerator.forBlock.control_forever = (block, generator) => {
    const branch = generator.statementToCode(block, "DO");
    return `for (let __i = 0; __i < 30; __i++) {\n${branch} await __wait(0.05);\n}\n`;
  };

  javascriptGenerator.forBlock.sensing_key_pressed = (block) => {
    const key = block.getFieldValue("KEY");
    return [`__keyDown(${JSON.stringify(key)})`, 0];
  };

  javascriptGenerator.forBlock.logic_if = (block, generator) => {
    const condition = generator.valueToCode(block, "COND", 0) || "false";
    const branch = generator.statementToCode(block, "DO");
    return `if (${condition}) {\n${branch}}\n`;
  };

  javascriptGenerator.forBlock.variables_set = (block) => {
    const value = block.getFieldValue("VALUE");
    return `__vars.Score = ${value};\nawait __updateVars();\n`;
  };

  javascriptGenerator.forBlock.variables_change = (block) => {
    const delta = block.getFieldValue("DELTA");
    return `__vars.Score = (__vars.Score ?? 0) + ${delta};\nawait __updateVars();\n`;
  };
}
