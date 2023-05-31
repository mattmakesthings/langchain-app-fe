import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Nav/NavBar'
import DescriptionBox from './components/Social_Media_Assistant/Input'

export default function Home() {
  return (
    <main>
      <Navbar/>
      <div>
      <DescriptionBox></DescriptionBox>
      </div>
    </main>
  )
}
