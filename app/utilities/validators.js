import React from 'react'

export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid.'

export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'At least 1 letter, a number, at least 8 characters.'

export const BIRTHDAY_RULE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
export const BIRTHDAY_RULE_MESSAGE = 'Incorrect format dd/mm/yyyy'


export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const FIELD_MIN_LENGTH_MESSAGE = "This field must be at least 8 characters"

export const FILE_URL_RULE = /((http|https):\/\/[\w\d_\-.]+\.[\w\d]{2,}([:\d]+)?(\/[\w\d\-._?,'/\\+&%$#=~]*)?)/

export const fieldErrorMessage = (errors, fieldName) => {
  if (!errors || !errors[fieldName]) return null
  return <div className='auth__form__field-error'>{errors[fieldName]?.message}</div>
}

export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid.'
  }
  return null
}