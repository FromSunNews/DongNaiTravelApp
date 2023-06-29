import { themes } from "globals/styles/theme";
import { useTheme } from "customHooks/useTheme"

/**
 * @typedef WithThemeWrappedComponentProps
 * @property {themes[keyof themes]} theme Chủ đề màu sắc của app, bao gồm `light` (sáng) và `dark` (tối).
 * @property {"light" | "dark"} themeMode Mode chủ đề, có 2 loại chính `light` (sáng) và `dark` (tối)
 * @property {() => ({ type: "theme/toggleThemeState", payload: undefined })} toggleTheme Hàm dùng để switch từ chủ đề này sang chủ đề khác.
 */

/**
 * HOC này dùng để sử dụng theme của app. Khi dùng hoc này thì component sẽ nhận thêm
 * 2 props ở trong `props`:
 * - `theme`: là object chứa màu của app.
 * - `toggleTheme`: là object chuyển theme.
 * @template T
 * @param {(props: WithThemeWrappedComponentProps) => JSX.Element} WrappedComponent 
 * @returns 
 * 
 * @examples
 * ```jsx
 * ...
 * import { withTheme } from 'hocs/withTheme';
 * // MyComponent sẽ nhận thêm 2 props từ withTheme (như ở dưới)
 * // theme và toggleTheme
 * function MyComponent({
 *    data,
 *    ...props
 * }) {
 *    return (
 *      <View style={{backgroundColor: props.theme.subBackground}}>
 *        <Text style={{backgroundColor: props.theme.onSubBackground}}>Test theme</Text>
 *        <Button title="Toggle Theme" onPress={() => { props.toggleTheme() }} />
 *      </View>
 *    )
 * }
 * 
 * // Dùng withTheme và export như này mới dùng được theme và toggleTheme
 * // được truyền từ withTheme
 * export default withTheme(MyComponent)
 * 
 * // OR
 * // Recommend cách này hơn
 * const MyScreen = withTheme(({
 *   route,
 *   theme,
 *   toggleTheme
 * }) => {
 *   return (
 *      <View style={{backgroundColor: props.theme.subBackground}}>
 *        <Text style={{backgroundColor: props.theme.onSubBackground}}>Test theme</Text>
 *        <Button title="Toggle Theme" onPress={() => { props.toggleTheme() }} />
 *      </View>
 *    )
 * })
 * 
 * export default MyScreen
 * ```
 */
export function withTheme(WrappedComponent) {
  /**
   * @param {T} props
  */
 return function(props) {
    const { theme, themeMode, toggleTheme } = useTheme();
    return (
      <WrappedComponent
        {...props}
        theme={theme}
        toggleTheme={toggleTheme}
        themeMode={themeMode}
      />
    )
  }
}