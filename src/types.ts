export type Size = 'xs' | 'sm' | 'md' | 'lg';

export type DragDirection = 'x' | 'y';

export interface StyledProps {
   size?: Size;
   inactiveTrackColor?: string;
   activeTrackColor?: string;
   hoverButtonColor?: string;
   activeButtonColor?: string;
   inactiveIconColor?: string;
   hoverIconColor?: string;
   activeIconColor?: string;
   disabledIconColor?: string;
   thumbColor?: string;
   thumbLabelColor?: string;
   thumbShadowAnimationOnTrackHoverEnabled?: boolean;
   focusRingColor?: string;
 }

 export interface AccessibilityProps {
   decrementButtonAriaLabel?: string;
   thumbAriaLabel?: string;
   incrementButtonAriaLabel?: string;
 }

 export interface Props extends StyledProps, AccessibilityProps {
   minimumValue?: number;
   maximumValue?: number;
   stepValue?: number;
   initialValue?: number;
   onChange?: (value: number) => void;
 }