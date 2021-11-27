import {app, Menu, MenuItem, MenuItemConstructorOptions, Tray} from "electron";
import path from "path";

const icon = path.join(app.getAppPath(), "static", "tray.png");

export default class extends Tray {
  contextMenu: (MenuItemConstructorOptions | MenuItem)[] = null;
  
  constructor() {
    super(icon);
    
    this.on("click", this.showMainWindow);
  }
  
  public init = () => {
    this.contextMenu = [
      {
        label: "Click Me",
        type: "normal",
        click: () => {
          this.contextMenu[0].label = "you are a (👑)";
          this.rebuildContentMenu();
        },
      }, {
        label: "Start at login",
        type: "checkbox",
        checked: app.getLoginItemSettings().openAtLogin,
        click: () => app.setLoginItemSettings({
          openAtLogin: !app.getLoginItemSettings().openAtLogin
        }),
      }, {
        label: "Quit",
        type: "normal",
        click: app.quit
      }
    ];
    
    this.rebuildContentMenu();
  };
  
  private rebuildContentMenu = () => this.setContextMenu(Menu.buildFromTemplate(this.contextMenu));
  
  private showMainWindow = () => {
    if (global.browser) {
      global.browser.isVisible() ? global.browser.focus() : global.browser.show();
    }
  };
}
