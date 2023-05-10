import { useState, useEffect, useRef } from 'react';
import { LazyMotion, domMax, useMotionValue, m } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useFirstMountState } from '../hooks/useFirstMountState';
import { 
   useButtonOpacityTransform, 
   useMinusIconColorTransform, 
   usePlusIconColorTransform, 
   useTrackColorTransform, 
   useTrackPositionTransform, 
   useXIconContainerOpacityTransform
 } from '../hooks/transforms';
import { MinusIcon, XIcon, PlusIcon } from '../icons';
import { sizeToScale, StyledFramerCounter } from '../style';
import { DragDirection, Props} from '../types'

export const FramerCounter = ({
  minimumValue = 0,
  maximumValue = Number.MAX_SAFE_INTEGER,
  stepValue = 1,
  initialValue = minimumValue,
  onChange,
  size = 'sm',
  inactiveTrackColor = '#2b2b2b',
  activeTrackColor = '#1f1f1f',
  hoverButtonColor = 'transparent',
  activeButtonColor = '#ececec',
  inactiveIconColor = '#858585',
  hoverIconColor = '#ffffff',
  activeIconColor = '#000000',
  disabledIconColor = '#383838',
  thumbColor = '#444444',
  thumbLabelColor = '#ffffff',
  thumbShadowAnimationOnTrackHoverEnabled = true,
  focusRingColor = '#ececec',
  decrementButtonAriaLabel,
  thumbAriaLabel,
  incrementButtonAriaLabel,
}: Props) => {

   const [value, setValue] = useState<number>(initialValue);
   const [dragListener, setDragListener] = useState<boolean>(true);
   const [dragDirection, setDragDirection] = useState<DragDirection>();
   const [isDragging, setIsDragging] = useState<boolean>(false);
   const draggableAreaRef = useRef<HTMLDivElement>(null);
   const thumbLabelContainerRef = useRef<HTMLDivElement>(null);
   const isFirstMount = useFirstMountState();
   const thumbPositionX = useMotionValue<number>(0);
   const thumbPositionY = useMotionValue<number>(0);
   const buttonOpacity = useButtonOpacityTransform(thumbPositionY, size);
   const minusIconColor = useMinusIconColorTransform(
      thumbPositionX,
      size,
      inactiveIconColor,
      hoverIconColor,
      disabledIconColor
    );
    const plusIconColor = usePlusIconColorTransform(
      thumbPositionX,
      size,
      inactiveIconColor,
      hoverIconColor,
      disabledIconColor
    );
    const trackColor = useTrackColorTransform(
      thumbPositionX,
      size,
      inactiveTrackColor,
      activeTrackColor
    );
    const trackPosition = useTrackPositionTransform(
      thumbPositionX,
      thumbPositionY
    );
    const xIconContainerOpacity = useXIconContainerOpacityTransform(
      thumbPositionY,
      size
    );
  
    useEffect(() => {
      if (!isFirstMount) {
        onChange?.(value);
      }
    }, [isFirstMount, onChange, value]);
  

   const isDecrementable = value - stepValue >= minimumValue;
   const isIncrementable = value + stepValue <= maximumValue;

  function decrementValue(): void {
    if (isDecrementable) {
      setValue((value) => value - stepValue);
    }
  }

  function incrementValue(): void {
    if (isIncrementable) {
      setValue((value) => value + stepValue);
    }
  }

  function resetValue(): void {
    setValue(minimumValue);
  }

  function onDirectionLock(axis: DragDirection): void {
    setDragDirection(axis);
  }

  function onDragStart(): void {
    setIsDragging(true);
  }

  function onDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void {
    setDragListener(false);
    setTimeout(() => {
      setIsDragging(false);
      setDragListener(true);
    }, 350);

    if (dragDirection === 'x' && info.offset.x >= 6 * sizeToScale(size)) {
      incrementValue();
    } else if (
      dragDirection === 'x' &&
      info.offset.x <= -6 * sizeToScale(size)
    ) {
      decrementValue();
    } else if (
      dragDirection === 'y' &&
      info.offset.y >= 2 * sizeToScale(size)
    ) {
      resetValue();
    }
  }

  return (
   <LazyMotion features={domMax} strict>
      <StyledFramerCounter
        size={size}
        inactiveTrackColor={inactiveTrackColor}
        activeTrackColor={activeTrackColor}
        hoverButtonColor={hoverButtonColor}
        activeButtonColor={activeButtonColor}
        inactiveIconColor={inactiveIconColor}
        hoverIconColor={hoverIconColor}
        activeIconColor={activeIconColor}
        disabledIconColor={disabledIconColor}
        thumbColor={thumbColor}
        thumbLabelColor={thumbLabelColor}
        thumbShadowAnimationOnTrackHoverEnabled={
          thumbShadowAnimationOnTrackHoverEnabled
        }
        focusRingColor={focusRingColor}
        isDragging={isDragging}
        style={{
          x: trackPosition.x,
          y: trackPosition.y,
          backgroundColor: trackColor,
        }}
        data-testid="framer-counter"
      >
        <div ref={draggableAreaRef}>
          <m.button
            type="button"
            style={{ opacity: buttonOpacity, color: minusIconColor }}
            aria-disabled={!isDecrementable}
            aria-label={decrementButtonAriaLabel}
            data-testid="framer-counter-decrement-button"
            onClick={isDecrementable ? decrementValue : undefined}
          >
            <MinusIcon aria-hidden="true" />
          </m.button>
          <m.div
            style={{
              opacity: xIconContainerOpacity,
            }}
            aria-hidden="true"
          >
            <XIcon />
          </m.div>
          <m.button
            drag
            dragConstraints={draggableAreaRef}
            dragDirectionLock
            dragSnapToOrigin
            dragElastic={{
              left: 0.3,
              bottom: 0.5,
              right: 0.3,
            }}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 250, bounceDamping: 15 }}
            dragListener={dragListener}
            type="button"
            style={{ x: thumbPositionX, y: thumbPositionY }}
            aria-label={thumbAriaLabel}
            aria-live="polite"
            data-testid="framer-counter-thumb"
            onDirectionLock={onDirectionLock}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={
              isIncrementable && !isDragging ? incrementValue : undefined
            }
          >
            <div ref={thumbLabelContainerRef}>{value}</div>
          </m.button>
          <m.button
            type="button"
            style={{ opacity: buttonOpacity, color: plusIconColor }}
            aria-disabled={!isIncrementable}
            aria-label={incrementButtonAriaLabel}
            data-testid="framer-counter-increment-button"
            onClick={isIncrementable ? incrementValue : undefined}
          >
            <PlusIcon aria-hidden="true" />
          </m.button>
        </div>
      </StyledFramerCounter>
    </LazyMotion>
  );
};
