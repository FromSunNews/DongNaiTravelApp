import { useTheme } from "customHooks/useTheme"

/**
 * HOC này dùng để sử dụng theme của app. Khi dùng hoc này thì component sẽ nhận thêm
 * 2 props ở trong `props`:
 * - `theme`: là object chứa màu của app.
 * - `toggleTheme`: là object chuyển theme.
 * @param {() => JSX.Element} WrappedComponent 
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
 * ```
 */
export function withTheme(WrappedComponent) {
  const { theme, toggleTheme } = useTheme();
  /**
   * @pấm
   */
  return function (props) {
    props.theme = theme;
    props.toggleTheme = toggleTheme;
    return <WrappedComponent {...props} />
  }
}