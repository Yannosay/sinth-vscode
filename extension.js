const { spawn } = require('child_process');
const path = require('path');

function activate(context) {
    const vscode = require('vscode');
    const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

    const outputChannel = vscode.window.createOutputChannel('Sinth Language Server');

    const serverOptions = {
        command: 'node',
        args: ['C:\\Users\\yanno\\Desktop\\sinth-package\\bin\\sinth-lsp.js'],
        transport: TransportKind.stdio
    };

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'sinth' }],
        outputChannel: outputChannel,
        errorHandler: {
            error: () => ({ action: 2 }),
            closed: () => ({ action: 2 })
        }
    };

    const client = new LanguageClient(
        'sinth-lsp',
        'Sinth Language Server',
        serverOptions,
        clientOptions
    );

    client.start();
    context.subscriptions.push(client);
}

function deactivate() {}

module.exports = { activate, deactivate };