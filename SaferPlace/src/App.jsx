import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Content/Home'
import styles from "./assets/styles/Header.module.scss"
import Footer from './components/Footer'



function App() {
  

  return (
    <>
    <Header/>
      <Home/>
      <Footer/>
      
    </>
  )
}

export default App
