import React, { useRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import InputField from '@/Components/InputField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from '@/Components/ErrorMessage'
import ActionSheetComponent from '@/Components/ActionSheetComponent'

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
})

const KEY_USERNAME = 'username'
const KEY_PASSWORD = 'password'

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
})

const Login = () => {
  const formikRef = useRef()
  const handleSubmit = values => {
    console.log('Value: ', formikRef?.current?.values)
    console.log('Errors: ', formikRef?.current?.errors)
  }

  const handleChange = (key, value) => {
    console.log('Key sent: ', key, ' Value sent: ', value)
    formikRef?.current?.setFieldValue(key, {
      ...formikRef?.current?.values[key],
      value: value,
    })
  }

  return (
    <View style={styles.center}>
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

            <ActionSheetComponent />

            <Button title={'login'} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  )
}

export default Login
