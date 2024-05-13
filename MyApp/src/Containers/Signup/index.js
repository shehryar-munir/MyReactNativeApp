import React, { useContext, useRef, useState } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import InputField from '@/Components/InputField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from '@/Components/ErrorMessage'
import ActionSheetComponent from '@/Components/ActionSheetComponent'
import { AppNameContext } from '@/Navigators/Main'

const KEY_USERNAME = 'username'
const KEY_PASSWORD = 'password'
const KEY_CAREER_PREFERENCE = 'careerPreference'

const data = [
  { id: '1', value: 'Software Development', isSelected: false },
  { id: '2', value: 'Data Science', isSelected: false },
  { id: '3', value: 'Software Quality Assurance', isSelected: false },
  { id: '4', value: 'Machine Learning', isSelected: false },
  { id: '5', value: 'Business Analytics', isSelected: false },
]

const initialValues = {
  [KEY_USERNAME]: {
    key: KEY_USERNAME,
    value: '',
    label: 'Username',
    placeholder: 'Enter username...',
    keyboardType: 'default',
    secureTextEntry: false,
  },

  [KEY_PASSWORD]: {
    key: KEY_PASSWORD,
    value: '',
    label: 'Password',
    placeholder: 'Enter password....',
    keyboardType: 'default',
    secureTextEntry: true,
  },

  [KEY_CAREER_PREFERENCE]: {
    key: KEY_CAREER_PREFERENCE,
    options: data?.length ? data : [],
    value: [],
  },
}

const loginValidationSchema = Yup.object().shape({
  [KEY_USERNAME]: Yup.object().shape({
    value: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 6 characters'),
  }),

  [KEY_PASSWORD]: Yup.object().shape({
    value: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-=`{}[\]:;"'<>,.?\\/]).*$/,
        'Password must contain at least one capital letter, one number, and one special character',
      ),
  }),

  [KEY_CAREER_PREFERENCE]: Yup.object().shape({
    value: Yup.array().min(1, 'At least one career must be selected'),
  }),
})

const Signup = ({ navigation }) => {
  const appNameContext = useContext(AppNameContext)

  const [appName, setAppName] = useState('')

  const formikRef = useRef()

  const onSubmit = () => {
    formikRef?.current?.handleSubmit()
  }

  const handleSubmit = () => {
    // console.log('Value: ', formikRef?.current?.values)
    // console.log('Errors: ', formikRef?.current?.errors)
    // console.log('Formik Object: ', formikRef?.current)

    if (Object.entries(formikRef?.current?.errors).length > 0) {
      alert('Completed Requirements')
    } else {
      navigation.navigate('Home', { data: formikRef.current?.values })
    }
  }

  const handleChange = (key, value) => {
    formikRef?.current?.setFieldValue(key, {
      ...formikRef?.current?.values[key],
      value: value,
    })
  }

  const handleAppNameChange = () => {
    appNameContext.setAppName(appName)
  }

  return (
    <View style={styles.center}>
      <Text>{appNameContext.appName}</Text>
      <TextInput
        value={appName}
        onChangeText={val => setAppName(val)}
        style={{ borderWidth: 1, width: 100 }}
      />

      <Button title={'Change app name'} onPress={handleAppNameChange} />

      <Text>Login Screen</Text>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={handleSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ values }) => (
          <>
            <InputField
              fieldKey={values[KEY_USERNAME].key}
              value={values[KEY_USERNAME].value}
              label={values[KEY_USERNAME].label}
              placeholder={values[KEY_USERNAME].placeholder}
              keyboardType={values[KEY_USERNAME].keyboardType}
              secureTextEntry={values[KEY_USERNAME].secureTextEntry}
              handleChangeFunction={handleChange}
            />

            {formikRef?.current?.errors[KEY_USERNAME] ? (
              <ErrorMessage
                errorMessage={formikRef?.current?.errors[KEY_USERNAME].value}
              />
            ) : null}

            <InputField
              fieldKey={values[KEY_PASSWORD].key}
              value={values[KEY_PASSWORD].value}
              label={values[KEY_PASSWORD].label}
              placeholder={values[KEY_PASSWORD].placeholder}
              keyboardType={values[KEY_PASSWORD].keyboardType}
              secureTextEntry={values[KEY_PASSWORD].secureTextEntry}
              handleChangeFunction={handleChange}
            />

            {formikRef?.current?.errors[KEY_PASSWORD] ? (
              <ErrorMessage
                errorMessage={formikRef?.current?.errors[KEY_PASSWORD].value}
              />
            ) : null}

            <ActionSheetComponent
              fieldKey={values[KEY_CAREER_PREFERENCE].key}
              options={values[KEY_CAREER_PREFERENCE]?.options}
              handleChangeFunction={handleChange}
            />
            {formikRef.current?.errors[KEY_CAREER_PREFERENCE] ? (
              <ErrorMessage
                errorMessage={
                  formikRef?.current?.errors[KEY_CAREER_PREFERENCE].value
                }
              />
            ) : null}

            {values[KEY_CAREER_PREFERENCE] &&
            values[KEY_CAREER_PREFERENCE].value &&
            values[KEY_CAREER_PREFERENCE].value.length > 0 ? (
              <View>
                <Text>Selected Careers</Text>
                {values[KEY_CAREER_PREFERENCE].value.map((item, index) => {
                  return <Text key={index}>{item}</Text>
                })}
              </View>
            ) : null}

            <Button title={'Signup'} onPress={onSubmit} />
          </>
        )}
      </Formik>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
})
