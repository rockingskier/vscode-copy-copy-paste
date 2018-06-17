import { QuickPickItem } from "vscode";

export default interface ClipBoardItem extends QuickPickItem {

    /**
     * All the selected areas. May contain many lines.
     */
    blocks: Array<string>;

    /**
     * All lines in all selected areas.
     */
    lines: Array<string>;
}