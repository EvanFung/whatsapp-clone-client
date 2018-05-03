import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleVertical } from '../utils/scale';

export default function GradientButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={['#ff9147', '#ff524c']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{props.children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10,
    height: scaleVertical(40)
  },
  text: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18
  }
});
