import React, { useRef } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
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
    options:data?.length?data:[],
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
})

const Signup = ({ navigation }) => {
  const formikRef = useRef()
  const handleSubmit = values => {
    console.log('Value: ', formikRef?.current?.values)
    console.log('Errors: ', formikRef?.current?.errors)
    navigation.navigate('Home', { data: formikRef.current?.values })
  }

  const handleChange = (key, value) => {
    console.log("value", value)
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

            <ActionSheetComponent
              fieldKey={values[KEY_CAREER_PREFERENCE].key}
              options={values[KEY_CAREER_PREFERENCE]?.options}
              handleChangeFunction={handleChange}
            />

            <Button title={'Signup'} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  )
}

export default Signup
