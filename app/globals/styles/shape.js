import { StyleSheet } from "react-native"

const shape = StyleSheet.create({
  capsule: {
    borderRadius: 9999
  },

  circle: {
    borderRadius: '100%',
    aspectRatio: 1
  },

  rounded_3: {
    borderRadius: 3
  },

  rounded_4: {
    borderRadius: 4
  },

  rounded_6: {
    borderRadius: 8
  },

  rounded_8: {
    borderRadius: 8
  },

  rounded_12: {
    borderRadius: 16
  },

  rounded_16: {
    borderRadius: 16
  },

  ronuded_top_4: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },

  ronuded_top_8: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },

  ronuded_top_16: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },

  ronuded_top_3: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3
  },

  ronuded_top_6: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },

  ronuded_top_12: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },

  ronuded_bottom_4: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4
  },

  ronuded_bottom_8: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },

  ronuded_bottom_16: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16
  },

  ronuded_bottom_3: {
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3
  },

  ronuded_bottom_6: {
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6
  },

  ronuded_bottom_12: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12
  }
});

const app_sh = {...shape};

export default app_sh