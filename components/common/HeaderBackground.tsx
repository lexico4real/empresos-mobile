import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Polygon } from 'react-native-svg'

export default function HeaderBackground({ style }: { style?: any }) {
  return (
    <View
      className="absolute top-0 left-0 right-0 z-[-1] h-[300px]"
      style={style}
    >
      <LinearGradient
        colors={['#c7c3d1', '#bdb8c9', '#b3afc1']}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <Svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Polygon
          points="0,0 200,0 0,100"
          fill="#d1cddc"
          opacity="0.5"
        />
        <Polygon
          points="100,0 400,0 400,100"
          fill="#bcb7c7"
          opacity="0.4"
        />
        <Polygon
          points="300,0 500,0 300,100"
          fill="#a9a4b7"
          opacity="0.8"
        />
      </Svg>
    </View>
  )
}
