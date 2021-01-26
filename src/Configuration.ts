import * as vscode from "vscode";
import * as path from "path";

export function getGlobalOptions(document: vscode.TextDocument): EasyLessOptions {
  const lessFilenamePath: path.ParsedPath = path.parse(document.fileName);
  const defaultOptions: EasyLessOptions = {
    plugins: [],
    rootFileInfo: getRootFileInfo(lessFilenamePath),
    relativeUrls: false,
  };

  const configuredOptions = vscode.workspace
    .getConfiguration("less", document.uri)
    .get<EasyLessOptions>("compile");
  return { ...defaultOptions, ...configuredOptions };
}

export function getRootFileInfo(parsedPath: path.ParsedPath): Less.RootFileInfo {
  parsedPath.ext = ".less";
  parsedPath.base = parsedPath.name + ".less";

  return {
    filename: parsedPath.base,
    currentDirectory: parsedPath.dir,
    relativeUrls: false,
    entryPath: parsedPath.dir + "/",
    rootpath: null!,
    rootFilename: null!,
    reference: false,
  };
}

export interface EasyLessOptions extends Less.Options {
  main?: string | string[];
  out?: string | boolean;
  outExt?: string;
  sourceMap?: any;
  relativeUrls?: boolean;
  sourceMapFileInline?: boolean;
  autoprefixer?: string | string[];
  javascriptEnabled?: boolean;
  rootFileInfo?: Less.RootFileInfo;
  // sourceMapURL?: string;
  // sourceMapBasepath?: string;
  // sourceMapRootpath?: string;
  // outputSourceFiles?: boolean;
  // sourceMapFilename?: string;
}
