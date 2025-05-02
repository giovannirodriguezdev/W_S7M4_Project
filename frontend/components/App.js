import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import schemas from '../../shared/schemas'
import i18n from '../i18n/index.json';

/*
  👉 TASK 2

  Implement internationalization!

  This is commonly done using libraries such as `react-i18next` or `react-intl`
  But today you will do it "by hand" using the JSON file inside the `i18n` folder
*/

const getInitialValues = () => ({ username: '', favLanguage: '', favFood: '', agreement: false })
const getInitialValidation = () => ({ username: '', favLanguage: '', favFood: '', agreement: '' })

export default function App({ lang = 'en' }) {
  // ❗ IMPORTANT
  // ✨ The `lang` prop determines which language is used in the UI
  // ✨ If lang is "en" the interface should render in English
  // ✨ If lang is "esp" the interface should render in Spanish
  const [language, setLanguage] = useState(lang)
  const [values, setValues] = useState(getInitialValues())
  const [errors, setErrors] = useState(getInitialValidation())
  const [success, setSuccess] = useState()
  const [failure, setFailure] = useState()
  const [submitAllowed, setSubmitAllowed] = useState(false)
  const text = i18n[language];

  useEffect(() => {
    schemas.userSchema.isValid(values).then(setSubmitAllowed)
  }, [values])

  const onChange = evt => {
    let { type, name, value, checked } = evt.target
    value = (type == 'checkbox' ? checked : value)
    setValues({ ...values, [name]: value })
    yup.reach(schemas.userSchema, name).validate(value)
      .then(() => setErrors(e => ({ ...e, [name]: '' })))
      .catch(err => setErrors(e => ({ ...e, [name]: err.errors[0] })))
  }

  const onSubmit = evt => {
    evt.preventDefault()
    setSubmitAllowed(false)
    axios.post('http://localhost:9009/api/register', values)
      .then(res => {
        console.log(res.data)
        setValues(getInitialValues())
        setSuccess(res.data.message)
        setFailure()
      })
      .catch(err => {
        console.log(err.message)
        console.log(err?.response?.data?.message)
        setFailure(err?.response?.data?.message)
        setSuccess()
      })
      .finally(() => {
        setSubmitAllowed(true)
      })
  }

  return (
    <div>
      <h2>
        {text.TEXT_HEADING_CREATE_ACCOUNT}
        <span onClick={() => setLanguage(language === 'en' ? 'esp' : 'en')}>
          {language === 'en' ? ' 🇺🇸' : ' 🇪🇸'}
        </span>
      </h2>
      <form onSubmit={onSubmit}>
        {success && <h4 className="success">{success}</h4>}
        {failure && <h4 className="error">{failure}</h4>}

        <div className="inputGroup">
          <label htmlFor="username">{text.LABEL_USERNAME}</label>
          <input id="username" name="username" onChange={onChange} value={values.username} type="text" placeholder={text.PLACEHOLDER_USERNAME} />
          {errors.username && <div className="validation">{errors.username}</div>}
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>{text.TEXT_FAV_LANG}</legend>
            <label>
              <input onChange={onChange} type="radio" name="favLanguage" value="javascript" checked={values.favLanguage == 'javascript'} />
              {text.TEXT_FAV_LANG_JS}
            </label>
            <label>
              <input onChange={onChange} type="radio" name="favLanguage" value="rust" checked={values.favLanguage == 'rust'} />
              {text.TEXT_FAV_LANG_RUST}
            </label>
          </fieldset>
          {errors.favLanguage && <div className="validation">{errors.favLanguage}</div>}
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">{text.LABEL_FAV_FOOD}</label>
          <select id="favFood" name="favFood" value={values.favFood} onChange={onChange}>
            <option value="">{text.TEXT_OPT_FAV_FOOD_1}</option>
            <option value="pizza">{text.TEXT_OPT_FAV_FOOD_2}</option>
            <option value="spaghetti">{text.TEXT_OPT_FAV_FOOD_3}</option>
            <option value="broccoli">{text.TEXT_OPT_FAV_FOOD_4}</option>
          </select>
          {errors.favFood && <div className="validation">{errors.favFood}</div>}
        </div>

        <div className="inputGroup">
          <label>
            <input id="agreement" type="checkbox" name="agreement" checked={values.agreement} onChange={onChange} />
            {text.LABEL_ACCEPT_TERMS}
          </label>
          {errors.agreement && <div className="validation">{errors.agreement}</div>}
        </div>

        <div>
          <input type="submit" disabled={!submitAllowed} value={text.TEXT_SUBMIT} />
        </div>
      </form>
    </div>
  )
}
