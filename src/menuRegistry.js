/**
 * Registry to subscribe, unsubscribe and update data of menus.
 *
 * menu data: {
 *   instance: react instance
 *   triggerLayout: Object - layout of menu trigger if known
 *   optionsLayout: Object - layout of menu options if known
 * }
*/
export default function makeMenuRegistry(menus = new Map()) {

  /**
   * Subscribes menu instance.
   */
  function subscribe(instance) {
    menus.set(instance.getName(), { name: instance.getName(), instance });
  }

  /**
   * Unsubscribes menu instance.
   */
  function unsubscribe(instance) {
    menus.delete(instance.getName());
  }

  /**
   * Updates layout infomration.
   */
  function updateLayoutInfo(name, { triggerLayout, optionsLayout }) {
    if (!menus.has(name)) {
      return;
    }
    const menu = Object.assign({}, menus.get(name));
    triggerLayout && (menu.triggerLayout = triggerLayout);
    optionsLayout && (menu.optionsLayout = optionsLayout);
    menus.set(name, menu);
  }

  /**
   * Get `menu data` by name.
   */
  function getMenu(name) {
    return menus.get(name);
  }

  /**
   * Returns all subscribed menus as array of `menu data`
   */
  function getAll() {
    return [...menus.values()];
  }

  return { subscribe, unsubscribe, updateLayoutInfo, getMenu, getAll };
}
