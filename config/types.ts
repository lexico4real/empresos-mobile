import { ImageSourcePropType } from "react-native";
import { APP_INFO_URL, CONTACT_DETAILS_URL, LANGUAGE_CONFIG_URL, DOCUMENT_URL, PAYMENT_URL, SECURITY_URL } from "./routes";

interface SlideItem {
  id: number;
  image: any;
  title: string;
  titleHighlight: string;
  subtitle: string;
}


interface ProfileHeaderProps {
  title?: string
  showBackArrow?: boolean
  showNotification?: boolean
  onBackPress?: () => void
  onNotificationPress?: () => void
  rightComponent?: React.ReactNode
  backArrowIcon?: ImageSourcePropType
  logo?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
  onRightPress?: () => void
  titleAlignment?: 'left' | 'center'
}

type RouteType = typeof CONTACT_DETAILS_URL | typeof SECURITY_URL | typeof PAYMENT_URL | typeof DOCUMENT_URL | typeof LANGUAGE_CONFIG_URL | typeof APP_INFO_URL

type NavigationOption = {
  title: string
  value?: string
} & (
    | {
      hasArrow: true
      route: RouteType
    }
    | {
      toggle: true
      state: boolean
      onToggle: () => void
    }
  )


type Recipient = {
  id: string;
  type: 'new' | 'recent';
  initial?: string;
  accountNumber: string;
};

type TransferOption = {
  id: string;
  title: string;
  subtitle: string;
};
export type { SlideItem, ProfileHeaderProps, NavigationOption, RouteType, Recipient, TransferOption }