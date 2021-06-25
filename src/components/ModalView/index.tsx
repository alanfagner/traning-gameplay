import React, { ReactNode, useState } from 'react'
import {
  Modal,
  View,
  ModalProps,
  TouchableWithoutFeedback
} from 'react-native'
import { Background } from '../Background'
import { styles } from './styles'

type Props = ModalProps & {
  children: ReactNode;
}

export function ModalView({ children, onRequestClose, ...rest }: Props) {
  return (

    <Modal
      statusBarTranslucent
      onRequestClose={onRequestClose}
      transparent
      animationType="slide" {...rest}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  )
}