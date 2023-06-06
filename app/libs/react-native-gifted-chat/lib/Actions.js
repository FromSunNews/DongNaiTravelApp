import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import Color from './Color';
import { StylePropType } from './utils';
import { useChatContext } from './GiftedChatContext';
// import { useCallbackOne } from 'use-memo-one';
export function Actions({ options = {}, optionTintColor = Color.optionTintColor, icon, wrapperStyle, iconTextStyle, onPressActionButton, containerStyle, }) {
    const { actionSheet } = useChatContext();
    const onActionsPress = useCallback(() => {
        const optionKeys = Object.keys(options);
        const cancelButtonIndex = optionKeys.indexOf('Cancel');
        actionSheet().showActionSheetWithOptions({
            options: optionKeys,
            cancelButtonIndex,
            tintColor: optionTintColor,
        }, (buttonIndex) => {
            const key = optionKeys[buttonIndex];
            if (key) {
                options[key]();
            }
        });
    }, []);
    const renderIcon = useCallback(() => {
        if (icon) {
            return icon();
        }
        return (<View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>);
    }, []);
    return (<TouchableOpacity style={[styles.container, containerStyle]} onPress={onPressActionButton || onActionsPress}>
      {renderIcon()}
    </TouchableOpacity>);
}
Actions.propTypes = {
    onSend: PropTypes.func,
    options: PropTypes.object,
    optionTintColor: PropTypes.string,
    icon: PropTypes.func,
    onPressActionButton: PropTypes.func,
    wrapperStyle: StylePropType,
    containerStyle: StylePropType,
};
const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: Color.defaultColor,
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: Color.defaultColor,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: Color.backgroundTransparent,
        textAlign: 'center',
    },
});
//# sourceMappingURL=Actions.js.map