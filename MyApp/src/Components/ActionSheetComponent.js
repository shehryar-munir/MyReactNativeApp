import React, { createRef, useState } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  actionSheetStyle: {
    margin: 10,
  },
})

const ActionSheetComponent = () => {
  const actionSheetRef = createRef()

  const [isAgreed, setIsAgreed] = useState(false)

  const handleTouch = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const closeModal = agreed => {
    console.log(actionSheetRef.current)
    console.log(agreed)
    setIsAgreed(agreed)
    actionSheetRef.current?.setModalVisible(false)
  }

  return (
    <View>
      <Button title={'Accept terms & conditions'} onPress={handleTouch} />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetStyle}>
          <Text>Terms & Conditions</Text>
          <Text>
            By accessing and using our website/app, you agree to comply with and
            be bound by the following terms and conditions. Please review these
            terms carefully before using our services. If you do not agree to
            these terms, you should not use our website/app. We reserve the
            right to modify or update these terms at any time without notice,
            and it is your responsibility to review them periodically. Your
            continued use of the website/app after any changes indicates your
            acceptance of the updated terms.
          </Text>

          <View>
            <Button title={'Agree'} onPress={() => closeModal(true)} />
            <Button title={'Cancel'} onPress={() => closeModal(false)} />
          </View>
        </View>
      </ActionSheet>
    </View>
  )
}

export default ActionSheetComponent
