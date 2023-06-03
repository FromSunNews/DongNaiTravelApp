import { ActionSheetProvider, } from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, } from 'react-native';
import uuid from 'uuid';
import { Actions } from './Actions';
import { Avatar } from './Avatar';
import Bubble from './Bubble';
import { Composer } from './Composer';
import { MAX_COMPOSER_HEIGHT, MIN_COMPOSER_HEIGHT, TEST_ID } from './Constant';
import { Day } from './Day';
import GiftedAvatar from './GiftedAvatar';
import { GiftedChatContext } from './GiftedChatContext';
import { InputToolbar } from './InputToolbar';
import { LoadEarlier } from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import { MessageImage } from './MessageImage';
import { MessageText } from './MessageText';
import { Send } from './Send';
import { SystemMessage } from './SystemMessage';
import { Time } from './Time';
import * as utils from './utils';
dayjs.extend(localizedFormat);
function GiftedChat(props) {
    const { messages = [], text = undefined, initialText = '', isTyping, messageIdGenerator = () => uuid.v4(), user = {}, onSend = () => { }, locale = 'en', renderLoading = null, actionSheet = null, textInputProps = {}, renderChatFooter = null, renderInputToolbar = null, renderAccessory = null, isKeyboardInternallyHandled = true, bottomOffset = null, minInputToolbarHeight = 44, keyboardShouldPersistTaps = Platform.select({
        ios: 'never',
        android: 'always',
        default: 'never',
    }), onInputTextChanged = null, maxInputLength = null, forceGetKeyboardHeight = false, inverted = true, minComposerHeight = MIN_COMPOSER_HEIGHT, maxComposerHeight = MAX_COMPOSER_HEIGHT, } = props;
    const isMountedRef = useRef(false);
    const keyboardHeightRef = useRef(0);
    const bottomOffsetRef = useRef(0);
    const maxHeightRef = useRef(undefined);
    const isFirstLayoutRef = useRef(true);
    const actionSheetRef = useRef(null);
    const messageContainerRef = useRef(null);
    let _isTextInputWasFocused = false;
    let textInputRef = useRef();
    const [state, setState] = useState({
        isInitialized: false,
        composerHeight: minComposerHeight,
        messagesContainerHeight: undefined,
        typingDisabled: false,
        text: undefined,
        messages: undefined,
    });
    useEffect(() => {
        isMountedRef.current = true;
        setState({
            ...state,
            messages,
            // Text prop takes precedence over state.
            ...(text !== undefined && text !== state.text && { text: text }),
        });
        if (inverted === false && (messages === null || messages === void 0 ? void 0 : messages.length)) {
            setTimeout(() => scrollToBottom(false), 200);
        }
        return () => {
            isMountedRef.current = false;
        };
    }, [messages, text]);
    const getTextFromProp = (fallback) => {
        if (text === undefined) {
            return fallback;
        }
        return text;
    };
    const getKeyboardHeight = () => {
        if (Platform.OS === 'android' && !forceGetKeyboardHeight) {
            // For android: on-screen keyboard resized main container and has own height.
            // @see https://developer.android.com/training/keyboard-input/visibility.html
            // So for calculate the messages container height ignore keyboard height.
            return 0;
        }
        return keyboardHeightRef.current;
    };
    const calculateInputToolbarHeight = (composerHeight) => {
        const getMinInputToolbarHeight = renderAccessory
            ? minInputToolbarHeight * 2
            : minInputToolbarHeight;
        return composerHeight + (getMinInputToolbarHeight - minComposerHeight);
    };
    /**
     * Returns the height, based on current window size, without taking the keyboard into account.
     */
    const getBasicMessagesContainerHeight = (composerHeight = state.composerHeight) => {
        return maxHeightRef.current - calculateInputToolbarHeight(composerHeight);
    };
    /**
     * Returns the height, based on current window size, taking the keyboard into account.
     */
    const getMessagesContainerHeightWithKeyboard = (composerHeight = state.composerHeight) => {
        return (getBasicMessagesContainerHeight(composerHeight) -
            getKeyboardHeight() +
            bottomOffsetRef.current);
    };
    /**
     * Store text input focus status when keyboard hide to retrieve
     * it after wards if needed.
     * `onKeyboardWillHide` may be called twice in sequence so we
     * make a guard condition (eg. showing image picker)
     */
    const handleTextInputFocusWhenKeyboardHide = () => {
        var _a;
        if (!_isTextInputWasFocused) {
            _isTextInputWasFocused = ((_a = textInputRef.current) === null || _a === void 0 ? void 0 : _a.isFocused()) || false;
        }
    };
    /**
     * Refocus the text input only if it was focused before showing keyboard.
     * This is needed in some cases (eg. showing image picker).
     */
    const handleTextInputFocusWhenKeyboardShow = () => {
        if (textInputRef.current &&
            _isTextInputWasFocused &&
            !textInputRef.current.isFocused()) {
            textInputRef.current.focus();
        }
        // Reset the indicator since the keyboard is shown
        _isTextInputWasFocused = false;
    };
    const onKeyboardWillShow = (e) => {
        handleTextInputFocusWhenKeyboardShow();
        if (isKeyboardInternallyHandled) {
            keyboardHeightRef.current = e.endCoordinates
                ? e.endCoordinates.height
                : e.end.height;
            bottomOffsetRef.current = bottomOffset != null ? bottomOffset : 1;
            const newMessagesContainerHeight = getMessagesContainerHeightWithKeyboard();
            setState({
                ...state,
                typingDisabled: true,
                messagesContainerHeight: newMessagesContainerHeight,
            });
        }
    };
    const onKeyboardWillHide = (_e) => {
        handleTextInputFocusWhenKeyboardHide();
        if (isKeyboardInternallyHandled) {
            keyboardHeightRef.current = 0;
            bottomOffsetRef.current = 0;
            const newMessagesContainerHeight = getBasicMessagesContainerHeight();
            setState({
                ...state,
                typingDisabled: true,
                messagesContainerHeight: newMessagesContainerHeight,
            });
        }
    };
    const onKeyboardDidShow = (e) => {
        if (Platform.OS === 'android') {
            onKeyboardWillShow(e);
        }
        setState({
            ...state,
            typingDisabled: false,
        });
    };
    const onKeyboardDidHide = (e) => {
        if (Platform.OS === 'android') {
            onKeyboardWillHide(e);
        }
        setState({
            ...state,
            typingDisabled: false,
        });
    };
    const scrollToBottom = (animated = true) => {
        if (messageContainerRef === null || messageContainerRef === void 0 ? void 0 : messageContainerRef.current) {
            if (!inverted) {
                messageContainerRef.current.scrollToEnd({ animated });
            }
            else {
                messageContainerRef.current.scrollToOffset({
                    offset: 0,
                    animated,
                });
            }
        }
    };
    const renderMessages = () => {
        const { messagesContainerStyle, ...messagesContainerProps } = props;
        const fragment = (<View style={[
                typeof state.messagesContainerHeight === 'number' && {
                    height: state.messagesContainerHeight,
                },
                messagesContainerStyle,
            ]}>
        <MessageContainer {...messagesContainerProps} invertibleScrollViewProps={{
                inverted: inverted,
                keyboardShouldPersistTaps: keyboardShouldPersistTaps,
                onKeyboardWillShow: onKeyboardWillShow,
                onKeyboardWillHide: onKeyboardWillHide,
                onKeyboardDidShow: onKeyboardDidShow,
                onKeyboardDidHide: onKeyboardDidHide,
            }} messages={state.messages} forwardRef={messageContainerRef} isTyping={isTyping}/>
        {_renderChatFooter()}
      </View>);
        return isKeyboardInternallyHandled ? (<KeyboardAvoidingView enabled>{fragment}</KeyboardAvoidingView>) : (fragment);
    };
    const _onSend = (messages = [], shouldResetInputToolbar = false) => {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        const newMessages = messages.map(message => {
            return {
                ...message,
                user: user,
                createdAt: new Date(),
                _id: messageIdGenerator && messageIdGenerator(),
            };
        });
        if (shouldResetInputToolbar === true) {
            setState({
                ...state,
                typingDisabled: true,
            });
            resetInputToolbar();
        }
        if (onSend) {
            onSend(newMessages);
        }
        // if (shouldResetInputToolbar === true) {
        //   setTimeout(() => {
        //     if (isMountedRef.current === true) {
        //       setState({
        //         ...state,
        //         typingDisabled: false,
        //       })
        //     }
        //   }, 100)
        // }
    };
    const resetInputToolbar = () => {
        if (textInputRef.current) {
            textInputRef.current.clear();
        }
        notifyInputTextReset();
        const newMessagesContainerHeight = getMessagesContainerHeightWithKeyboard(minComposerHeight);
        setState({
            ...state,
            text: getTextFromProp(''),
            composerHeight: minComposerHeight,
            messagesContainerHeight: newMessagesContainerHeight,
        });
    };
    const onInputSizeChanged = (size) => {
        const newComposerHeight = Math.max(minComposerHeight, Math.min(maxComposerHeight, size.height));
        const newMessagesContainerHeight = getMessagesContainerHeightWithKeyboard(newComposerHeight);
        setState({
            ...state,
            composerHeight: newComposerHeight,
            messagesContainerHeight: newMessagesContainerHeight,
        });
    };
    const _onInputTextChanged = (_text) => {
        if (state.typingDisabled) {
            return;
        }
        if (onInputTextChanged) {
            onInputTextChanged(_text);
        }
        // Only set state if it's not being overridden by a prop.
        if (text === undefined) {
            setState({ ...state, text: _text });
        }
    };
    const notifyInputTextReset = () => {
        if (onInputTextChanged) {
            onInputTextChanged('');
        }
    };
    const onInitialLayoutViewLayout = (e) => {
        const { layout } = e.nativeEvent;
        if (layout.height <= 0) {
            return;
        }
        notifyInputTextReset();
        maxHeightRef.current = layout.height;
        const newMessagesContainerHeight = getMessagesContainerHeightWithKeyboard(minComposerHeight);
        setState({
            ...state,
            isInitialized: true,
            text: getTextFromProp(initialText),
            composerHeight: minComposerHeight,
            messagesContainerHeight: newMessagesContainerHeight,
        });
    };
    const onMainViewLayout = (e) => {
        // TODO: fix an issue when keyboard is dismissing during the initialization
        const { layout } = e.nativeEvent;
        if (maxHeightRef.current !== layout.height ||
            isFirstLayoutRef.current === true) {
            maxHeightRef.current = layout.height;
            setState({
                ...state,
                messagesContainerHeight: keyboardHeightRef.current > 0
                    ? getMessagesContainerHeightWithKeyboard()
                    : getBasicMessagesContainerHeight(),
            });
        }
        if (isFirstLayoutRef.current === true) {
            isFirstLayoutRef.current = false;
        }
    };
    const _renderInputToolbar = () => {
        const inputToolbarProps = {
            ...props,
            text: getTextFromProp(state.text),
            composerHeight: Math.max(minComposerHeight, state.composerHeight),
            onSend: _onSend,
            onInputSizeChanged: onInputSizeChanged,
            onTextChanged: _onInputTextChanged,
            textInputProps: {
                ...textInputProps,
                ref: (textInput) => (textInputRef = textInput),
                maxLength: state.typingDisabled ? 0 : maxInputLength,
            },
        };
        if (renderInputToolbar) {
            return renderInputToolbar(inputToolbarProps);
        }
        return <InputToolbar {...inputToolbarProps}/>;
    };
    const _renderChatFooter = () => {
        if (renderChatFooter) {
            return renderChatFooter();
        }
        return null;
    };
    const _renderLoading = () => {
        if (renderLoading) {
            return renderLoading();
        }
        return null;
    };
    const contextValues = useMemo(() => ({
        actionSheet: actionSheet || (() => { var _a; return (_a = actionSheetRef.current) === null || _a === void 0 ? void 0 : _a.getContext(); }),
        getLocale: () => locale,
    }), [actionSheet, locale]);
    if (state.isInitialized === true) {
        return (<GiftedChatContext.Provider value={contextValues}>
        <View testID={TEST_ID.WRAPPER} style={styles.wrapper}>
          <ActionSheetProvider ref={actionSheetRef}>
            <View style={styles.container} onLayout={onMainViewLayout}>
              {renderMessages()}
              {_renderInputToolbar()}
            </View>
          </ActionSheetProvider>
        </View>
      </GiftedChatContext.Provider>);
    }
    return (<View testID={TEST_ID.LOADING_WRAPPER} style={styles.container} onLayout={onInitialLayoutViewLayout}>
      {_renderLoading()}
    </View>);
}
GiftedChat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    messagesContainerStyle: utils.StylePropType,
    text: PropTypes.string,
    initialText: PropTypes.string,
    placeholder: PropTypes.string,
    disableComposer: PropTypes.bool,
    messageIdGenerator: PropTypes.func,
    user: PropTypes.object,
    onSend: PropTypes.func,
    locale: PropTypes.string,
    timeFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    isKeyboardInternallyHandled: PropTypes.bool,
    loadEarlier: PropTypes.bool,
    onLoadEarlier: PropTypes.func,
    isLoadingEarlier: PropTypes.bool,
    renderLoading: PropTypes.func,
    renderLoadEarlier: PropTypes.func,
    renderAvatar: PropTypes.func,
    showUserAvatar: PropTypes.bool,
    actionSheet: PropTypes.func,
    onPressAvatar: PropTypes.func,
    onLongPressAvatar: PropTypes.func,
    renderUsernameOnMessage: PropTypes.bool,
    renderAvatarOnTop: PropTypes.bool,
    isCustomViewBottom: PropTypes.bool,
    renderBubble: PropTypes.func,
    renderSystemMessage: PropTypes.func,
    onLongPress: PropTypes.func,
    renderMessage: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderMessageImage: PropTypes.func,
    imageProps: PropTypes.object,
    videoProps: PropTypes.object,
    audioProps: PropTypes.object,
    lightboxProps: PropTypes.object,
    renderCustomView: PropTypes.func,
    renderDay: PropTypes.func,
    renderTime: PropTypes.func,
    renderFooter: PropTypes.func,
    renderChatEmpty: PropTypes.func,
    renderChatFooter: PropTypes.func,
    renderInputToolbar: PropTypes.func,
    renderComposer: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderAccessory: PropTypes.func,
    onPressActionButton: PropTypes.func,
    bottomOffset: PropTypes.number,
    minInputToolbarHeight: PropTypes.number,
    listViewProps: PropTypes.object,
    keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled']),
    onInputTextChanged: PropTypes.func,
    maxInputLength: PropTypes.number,
    forceGetKeyboardHeight: PropTypes.bool,
    inverted: PropTypes.bool,
    textInputProps: PropTypes.object,
    extraData: PropTypes.object,
    minComposerHeight: PropTypes.number,
    maxComposerHeight: PropTypes.number,
    alignTop: PropTypes.bool,
};
GiftedChat.append = (currentMessages = [], messages, inverted = true) => {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }
    return inverted
        ? messages.concat(currentMessages)
        : currentMessages.concat(messages);
};
GiftedChat.prepend = (currentMessages = [], messages, inverted = true) => {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }
    return inverted
        ? currentMessages.concat(messages)
        : messages.concat(currentMessages);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
});
export * from './Models';
export { GiftedChat, Actions, Avatar, Bubble, SystemMessage, MessageImage, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils, };
//# sourceMappingURL=GiftedChat.js.map