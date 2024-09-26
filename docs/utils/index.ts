import { camelCase } from 'change-case';

function installedStyleSheetFilter(
  name: string,
  prefix: string
): (s: CSSStyleSheet) => boolean {
  return (item: CSSStyleSheet) => {
    const rules = Array.from(item.cssRules);
    const found = rules.findIndex(
      (rule) =>
        (rule as { selectorText?: string }).selectorText === `.${prefix}${name}`
    );
    return found >= 0;
  };
}

/**
 * 获取通过样式表预装的主题
 * @param name 主题名称
 * @param prefix 主题类名前缀
 * @returns 主题name样式表中的主题变量
 */
export function getInstalledThemdFromStyle(
  name: string,
  prefix: string
): Record<string, string> | undefined {
  const styleSheets = Array.from(document.styleSheets);
  const styleSheet = styleSheets.filter(
    installedStyleSheetFilter(name, prefix)
  )[0];

  if (styleSheet) {
    const style = (styleSheet.cssRules[0] as { style?: CSSStyleDeclaration })
      .style!;
    const names = Array.from(style).filter((n) => n.startsWith('--'));
    return Object.fromEntries(
      names.map((n) => [camelCase(n), style.getPropertyValue(n)])
    ) as unknown as Record<string, string>;
  } else {
    return void 0;
  }
}
