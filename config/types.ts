import { ImageSourcePropType } from "react-native";

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



export type { SlideItem, ProfileHeaderProps }