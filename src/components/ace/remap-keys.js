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
        bindKey: { win: 'ctrl-alt-l', mac: 'command-alt-l' },
        exec: function (editor) {
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
        name: 'beautify',
        bindKey: { win: 'ctrl-shift-p', mac: 'command-shift-p' },
        multiSelectAction: 'forEach',
        exec: function (editor) {
            const { row } = editor.selection.lead;
            editor.insert(`${row + 1}`);
        }
    });
};

export default remapKeys;
