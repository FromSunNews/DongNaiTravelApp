import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
  useAuthState
} from 'customHooks/useAuth'

import BlogEditorScreen from 'screens/blog_editor/BlogEditorScreen'
import PrepareBlogPushlishScreen from 'screens/blog_editor/PrepareBlogPushlishScreen'
import UnAuthenticationScreen from 'screens/unauthentication/UnAuthenticationScreen'
import {
  AppHeader,
  AppText
} from 'components'

import {
  USER_ROLES
} from 'utilities/constants'

const BlogEditorStack = createNativeStackNavigator();

/**
 * Đây là `BlogEditorNavigator`. Bởi vì nó là tính năng đặc biệt, nằm ngoài `GroupBottomTab` cho nên nó sẽ có
 * Navigator riêng. Hiện tại thì trong Navigator này có `BlogEditorScreen`
 * @returns 
 */
const BlogEditorNavigator = ({navigation}) => {
  const {
    isAuthenticated,
    userRole
  } = useAuthState();

  React.useEffect(() => {
    return function() {
      console.log("BlogEditorNavigator is unmounted.");
    }
  }, []);

  return (
    <BlogEditorStack.Navigator
      screenOptions={{
        canBack: true
      }}
    >
      {
        (isAuthenticated && userRole === USER_ROLES.MEMBER)
        ? (
          <>
            <BlogEditorStack.Screen
              name="BlogEditorScreen"
              options={{
                title: 'Create a blog',
                headerShown: false
              }}
              component={BlogEditorScreen}
            />

            <BlogEditorStack.Screen
              name="PrepareBlogPushlishScreen"
              options={{
                title: 'Prepare to publish',
                header: props => (
                  <AppHeader
                    {...props}
                    setRightPart={() => null}
                  />
                )
              }}
              component={PrepareBlogPushlishScreen}
            />
          </>
        )
        : (
          <BlogEditorStack.Screen
            name="UnAuthenticationScreen"
            options={{
              title: 'Please sign in',
              header: AppHeader
            }}
            component={UnAuthenticationScreen}
          />
        )
      }
    </BlogEditorStack.Navigator>
  )
}

export default BlogEditorNavigator