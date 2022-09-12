// RootNavigation.js
import { AppRootParamsList } from '@interfaces/type';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<AppRootParamsList>();

export function navigate(name: keyof AppRootParamsList, ...params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// add other navigation functions that you need and export them
