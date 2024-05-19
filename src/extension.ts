// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "toolbox" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  const hoverProvider = vscode.languages.registerHoverProvider("ifc", {
    async provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position, /IFC[^(]*/g);
      if (range) {
        const word = document.getText(range);
        const commandUri = vscode.Uri.parse(`command:meuComandoPersonalizado`);
        const markdownPath = path.join(__dirname, "test.md");
        const markdownContent = fs.readFileSync(markdownPath, "utf8");
        const contents = new vscode.MarkdownString(markdownContent);
        contents.isTrusted = true;
        return new vscode.Hover(contents);
      }
    },
  });

  const commandProvider = vscode.commands.registerCommand(
    "toolbox.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Renato from toolbox!");
      const panel = vscode.window.createWebviewPanel(
        "toolbox",
        "Renato toolbox",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
    }
  );

  context.subscriptions.push(commandProvider);
  context.subscriptions.push(hoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
