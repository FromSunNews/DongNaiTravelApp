import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React from 'react'

import styles from './AppBarChartStyles'
import { app_c } from 'globals/styles'
import { AppText } from 'components'

const defaultDataSetValue = {
  indexUnit: '',
  valueUnit: '',
  levelStep: 10,
  dataSet: []
}

const defaultAppearance = {
  valueVisualizationType: 'percent',
  labelColor: app_c.HEX.fourth,
  labelFont: 'body3',
  labelFontStyle: 'normal',
  labelWeight: 'normal',
  valueBarColor: app_c.HEX.fourth,
  valueBarContainerColor: app_c.HEX.ext_primary,
  containerStyle: {}
}

/**
 * @typedef BarChartData
 * @property {string} indexUnit Đơn vị của chỉ mục so sánh.
 * @property {string} valueUnit Đơn vị của giá trị so sánh.
 * @property {string} levelStep Khoảng cách giá trị của mức giá trị so sánh.
 * @property {Array<{ index: string, value: number}>} dataSet (Quan trọng) bộ dữ liệu cần có để vẽ biểu đồ.
 */

/**
 * @typedef BarChartAppearanceProps
 * @property {'nolimit' | 'percent'} [valueVisualizationType=nolimit] Kiểu hiển thị giá trị so sánh của đồ thị. Đọc thêm tại doc.
 * @property {'primary' | 'second' | 'third' | 'fourth' | 'sub_primary' | 'sub_second' | 'sub_third' | 'sub_fourth' | 'ext_primary' | 'ext_second' | 'ext_third'} [labelColor=fourth] Màu cho label của giá trị so sánh.
 * @property {'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body0' | 'body1' | 'body2' | 'body3' | 'sub0' | 'sub1'} [labelFont=body1] Màu cho label của giá trị so sánh.
 * @property {'normal' | 'italic'} [labelFontStyle=normal] Màu cho label của giá trị so sánh.
 * @property {'normal' | 'lighter' | 'bolder'} [labelWeight=normal] Màu cho label của giá trị so sánh.
 * @property {string} valueBarColor Màu cho thanh value bar.
 * @property {string} [valueBarContainerColor] Màu cho container của value bar.
 * @property {StyleProp<ViewStyle>} containerStyle Style cho chart container.
 */

/**
 * @typedef BarChartProps
 * @property {string} indexUnit Đơn vị của chỉ mục so sánh.
 * @property {string} valueUnit Đơn vị của giá trị so sánh.
 * @property {number} levelStep Khoảng cách giá trị của mức giá trị so sánh.
 * @property {[indexes: Array<string>, values: Array<number>]} data Dữ liệu đã được tính toán để render.
 * @property {'primary' | 'second' | 'third' | 'fourth' | 'sub_primary' | 'sub_second' | 'sub_third' | 'sub_fourth' | 'ext_primary' | 'ext_second' | 'ext_third'} [labelColor=fourth] Màu cho label của giá trị so sánh.
 * @property {'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body0' | 'body1' | 'body2' | 'body3' | 'sub0' | 'sub1'} [labelFont=body1] Màu cho label của giá trị so sánh.
 * @property {'normal' | 'italic'} [labelFontStyle=normal] Màu cho label của giá trị so sánh.
 * @property {'normal' | 'lighter' | 'bolder'} [labelWeight=normal] Màu cho label của giá trị so sánh.
 * @property {string} valueBarColor Màu cho thanh value bar.
 * @property {string} [valueBarContainerColor] Màu cho container của value bar.
 * @property {StyleProp<ViewStyle>} containerStyle Style cho chart container.
 */

/**
 * @typedef HOCBarChartProps
 * @property {(props: BarChartProps) => JSX.Element} Component
 */

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Bar chart dùng để thống kê, so sánh một bộ dữ liệu đầu vào và đồ hoạ hoá dữ liệu đó ở đầu ra
 * ở dạng các thanh ngang.
 * @param {(props: BarChartProps) => JSX.Element} Component - Props của component.
 * @returns `View`
 */
const withBarChartCalculator = (Component) => {
  /**
   * @param {BarChartData & BarChartAppearanceProps} props 
   * 
   */
  // @param {BarChartData} props.dataSet
  // @param {BarChartAppearanceProps} [props.appearance]
  return function({
    indexUnit = '',
    valueUnit = '',
    levelStep = 10,
    dataSet = [],
    valueVisualizationType = 'percent',
    labelColor = app_c.HEX.fourth,
    labelFont = 'body3',
    labelFontStyle = 'normal',
    labelWeight = 'normal',
    valueBarColor = app_c.HEX.fourth,
    valueBarContainerColor = app_c.HEX.ext_primary,
    containerStyle = {}
  }) {
    console.log("Co render lai khong anh chai?");

    const data = React.useMemo(() => {
      console.log("Co tinh toan lai khong anh chai?");
      let indexes = [];
      let values = [];
      if(valueVisualizationType === "percent") {
        const total = dataSet.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        for(let data of dataSet) {
          indexes.push(data.index);
          values.push(Math.round(data.value / total * 100))
        }
      } else {
        const maxLevel = Math.max(...dataSet.map(data => data.value));
        for(let data of dataSet) {
          indexes.push(data.index);
          values.push(Math.round(data.value / maxLevel * 100))
        }
      }
      return [indexes, values]
    }, [dataSet, valueVisualizationType]);

    return (
      <Component
        data={data}
        indexUnit={indexUnit}
        valueUnit={valueUnit}
        levelStep={levelStep}
        valueBarColor={valueBarColor}
        valueBarContainerColor={valueBarContainerColor}
        labelColor={labelColor}
        labelFont={labelFont}
        labelFontStyle={labelFontStyle}
        labelWeight={labelWeight}
        containerStyle={containerStyle}
      />
    )
  }
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Bar chart với mục đích hiển thị tất cả các dữ liệu.
 * @param {BarChartProps} props - Props của component.
 * @returns `View`
 */
const ComplexBarChartWithoutComputing = (props) => {
  const [indexes, values] = React.useMemo(() => props.data, [props.data]);

  return (
    <View style={[styles.styles, props.containerStyle]}>
      {/* Đây là chỗ hiển thị chính */}
      <View>
        {
          indexes.map(data => (
            <View>

            </View>
          ))
        }
      </View>

      {/* Đây là container của trục x, bao gồm các value label và value unit */}
      <View>

      </View>
    </View>
  )
}

/**
 * __Creator__: @NguyenAnhTuan1912
 * 
 * Bar chart với mục đích hiển thị các dữ liệu đơn giản nhưng cần thiết.
 * @param {BarChartProps} props - Props của component.
 * @returns `View`
 */
const SimpleBarChartWithoutComputing = (props) => {
  const [indexes, values] = React.useMemo(() => props.data, [props.data]);

  return (
    <View style={[styles.styles, props.containerStyle]}>
      {/* Đây là chỗ hiển thị chính */}
      <View>
        {
          indexes.map((data, index) => (
            <View style={styles.bar_chart_row} key={data}>
              <View style={styles.bar_chart_label_container}>
                <AppText
                  color={props.labelColor}
                  font={props.labelFont}
                  fontStyle={props.labelFontStyle}
                  weight={props.labelWeight}
                >
                  {data}
                </AppText>
              </View>
              <View style={[styles.bar_chart_container, { backgroundColor: props.valueBarContainerColor }]}>
                <View style={[styles.bar_chart, { backgroundColor: props.valueBarColor, width: `${values[index]}%` }]}></View>
              </View>
            </View>
          ))
        }
      </View>
    </View>
  )
}

const ComplexBarChart = React.memo(withBarChartCalculator(ComplexBarChartWithoutComputing));
const SimpleBarChart = React.memo(withBarChartCalculator(SimpleBarChartWithoutComputing));

export {
  ComplexBarChart,
  SimpleBarChart
}