import { Range } from 'ace-builds';

const keyBindings = [
    {
        bindKey: { linux: 'ctrl-shift-l', mac: 'command-shift-l', win: 'ctrl-shift-l' },
        name: 'toggleSplitSelectionIntoLines'
    },
    {
        bindKey: { mac: 'option-enter', win: 'alt-enter' },
        name: 'findAll'
    },
    {
        bindKey: { mac: 'command-y', win: 'ctrl-y' },
        name: 'removeline'
    },
    {
        bindKey: { mac: 'command-d', win: 'ctrl-d' },
        name: 'duplicateSelection'
    }
];

const remapKeys = editor => {
    const handler = editor.getKeyboardHandler();

    keyBindings.forEach(({ bindKey, name }) => {
        const command = handler.commands[name];
        if (command) command.bindKey = bindKey;
        handler.bindKey(bindKey, command || name);
    });

    editor.commands.addCommand({
        name: 'beautify',
        description: 'Beautify code',
        bindKey: { win: 'ctrl-alt-l', mac: 'command-alt-l' },
        exec: editor => {
            const code = editor.session.getValue();
            try {
                const parsed = JSON.parse(code);
                editor.session.setValue(JSON.stringify(parsed, null, 4));
            } catch (e) {
                // do nothing
            }
        }
    });

    editor.commands.addCommand({
        name: 'enumerate',
        description: 'Insert line number',
        bindKey: { win: 'ctrl-shift-p', mac: 'command-shift-p' },
        multiSelectAction: 'forEach',
        exec: editor => {
            const { row } = editor.selection.lead;
            editor.insert(`${row + 1}`);
        }
    });

    editor.commands.addCommand({
        name: 'eval',
        description: 'Eval expression',
        bindKey: { win: 'ctrl-j', mac: 'command-j' },
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        exec: editor => {
            const range = editor.getSelectionRange();

            if (editor.selection.isEmpty()) return;

            const text = editor.session.getTextRange(range);

            try {
                // eslint-disable-next-line no-eval
                const evaled = eval(text);
                const evaledString = String(evaled);
                editor.session.replace(range, evaledString);
                const { start } = range;
                editor.selection.setSelectionRange(
                    new Range(start.row, start.column, start.row, start.column + evaledString.length)
                );
            } catch (e) {
                // do nothing
            }
        }
    });
};

export default remapKeys;
