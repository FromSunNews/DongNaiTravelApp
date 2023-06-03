import {
  View
} from 'react-native'
import React from 'react'

import {
  Search,
  SearchResultList
} from 'components'

/**
 * @typedef SearchCreatorOptionsProps
 * @property {string} placeHolder Cái này là place holder.
 * @property {"normal" | "float-top" | "float-bottom"} resultListPosition Cái này là dùng để chỉ vị trí của List với thanh search.
 * @property {(item: any, index: number) => string} keyExtractor Cái này là hàm set key cho mỗi `RenderItem`, bởi vì cái này nó dùng `FlatList`
 * @property {(props: any) => JSX.Element} renderResultItem Các function component để render kết quả.
 * @property {boolean} scrollEnabled Result list có thể scroll không? Mặc định là `true`
 */

/**
 * Hàm này dùng để tạo ra một component search có kết quả trả về, nhưng sẽ cần phải cấp cho nó apis.
 * Ngoài ra thì muốn build thì import Search với SearchResultList và apis để build riêng.
 * @param {Array<(text: string) => Promise<any>>} apis Các apis cần để tìm dữ liệu search.
 * @param {SearchCreatorOptionsProps} options Các options.
 * @returns 
 */
export function createSearchWithResultList(apis) {
  /**
   * @param {SearchCreatorOptionsProps} options Các options.
   */
  return function(options) {
    const [result, setResult] = React.useState([]);
    options = React.useMemo(() => Object.assign({}, {
      placeHolder: "Search...",
      resultListPosition: "normal",
      scrollEnabled: true
    }, options), []);

    if(!options.renderResultItem) {
      console.warn("Please add search result render item.");
      return null;
    }

    console.log("APIs: ", apis);

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 10
        }}
      >
        <Search
          apis={apis}
          placeHolder={options.placeHolder}
          callBack={(searchString, data) => {
            if(!data) return;
            setResult(data);
          }}
        />
        <SearchResultList
          results={result}
          resultListPosition={options.resultListPosition}
          renderResultItem={options.renderResultItem}
          keyExtractor={options.keyExtractor}
          scrollEnabled={options.scrollEnabled}
        />
      </View>
    )
  }
}