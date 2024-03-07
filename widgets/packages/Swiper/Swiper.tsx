import React, { useRef, useState } from "react"
import {Animated, PanResponder, View, Text, Dimensions} from "react-native"

import { styles } from "./styles"

interface IProps {
  items: { title: string, color: string }[]
  action?: any
  onPress?: any
}

const SCREEN_HEIGHT = Dimensions.get("window").height
const TOGGLE_OFFSET = 50
const SECOND_CARD_POSITION = -12
const THIRD_CARD_POSITION = -24

export const Swiper = ({ items }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const pan = useRef(new Animated.ValueXY()).current
  const scale = useRef(new Animated.Value(1)).current
  const positionSecond = useRef(new Animated.Value(SECOND_CARD_POSITION)).current
  const positionThird = useRef(new Animated.Value(THIRD_CARD_POSITION)).current

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {
      dy: pan.y,
    }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      let newIndex: number

      if (gestureState.dy < 0) {
        newIndex = activeIndex + 1
      } else {
        newIndex = activeIndex - 1
      }

      if (newIndex < 0) {
        newIndex = items.length - 1
      } else if (newIndex >= items.length) {
        newIndex = 0
      }

      if (gestureState.dy < -TOGGLE_OFFSET || gestureState.dy > TOGGLE_OFFSET) {
        Animated.parallel([
          Animated.timing(pan, {
            toValue: { x: 0, y: gestureState.dy < 0 ? -SCREEN_HEIGHT : SCREEN_HEIGHT },
            useNativeDriver: false,
            duration: 200,
          }),
          Animated.timing(scale, {
            toValue: 0.95, // Уменьшаем размер при перетаскивании вверх
            useNativeDriver: false,
            duration: 200,
          }),
          Animated.timing(positionSecond, {
            toValue: 0,
            useNativeDriver: false,
            duration: 200,
          }),
          Animated.timing(positionThird, {
            toValue: SECOND_CARD_POSITION,
            useNativeDriver: false,
            duration: 200,
          }),
        ]).start(() => {
          setActiveIndex(newIndex)
          pan.setValue({ x: 0, y: 0 })
          scale.setValue(1)

          Animated.parallel([
            Animated.timing(positionSecond, {
              toValue: SECOND_CARD_POSITION,
              useNativeDriver: false,
              duration: 200,
            }),
            Animated.timing(positionThird, {
              toValue: THIRD_CARD_POSITION,
              useNativeDriver: false,
              duration: 200,
            }),
          ]).start()
        })
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start()
      }
    },
  })

  const getCardStyle = ({ isActive, isSecond, isThird }: any) => {
    if (isActive) {
      return {
        zIndex: 3,
        transform: [
          ...pan.getTranslateTransform(),
          { scale },
        ],
        opacity: scale
      }
    }

    if (isSecond) {
      return {
        zIndex: 2,
        transform: [
          { translateY: positionSecond },
          { scale: scale.interpolate({
              inputRange: [0.95, 1],
              outputRange: [1, 0.95],
            }) },
        ],
      }
    }

    if (isThird) {
      return {
        zIndex: 1,
        transform: [
          { translateY: positionThird },
          { scale: scale.interpolate({
              inputRange: [0.9, 1],
              outputRange: [1, 0.9],
            }) },
        ],
      }
    }

    return {
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const isSecond = index === (activeIndex + 1) % items.length
          const isThird = index === (activeIndex + 2) % items.length

          const cardStyle = getCardStyle({ isActive, isSecond, isThird })

          return (
            <Animated.View
              key={index}
              style={[styles.card, cardStyle, { backgroundColor: item.color }]}
              {...(isActive ? panResponder.panHandlers : {})}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardGrab} />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
              <View
                pointerEvents="none"
                style={[
                  styles.overlay,
                  isSecond && styles.overlaySecond,
                  isThird && !isActive && styles.overlayThird,
                ]}
              />
            </Animated.View>
          )
        })}
        <View
          pointerEvents="none"
          style={styles.points}
        >
          {items.map((item, key) => {
            return (
              <View
                key={key}
                style={[styles.point, activeIndex === key && styles.activePoint]}
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}
