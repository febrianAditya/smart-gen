import { useEffect, useState, useRef } from "react"
// import { GreetingComponent } from "../components"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import './GreetingComponent.css'

export default function OpeningPage() {
    const [wordGreeting, setWordGreeting] = useState("")
    const [nextPage, setNextPage] = useState(false)
    const navigate = useNavigate()
    const countingRef = useRef(0)

    const collectionLanguages = ["Indonesia", "English", "Japan", "China", "Netherlands", "Korean"]


    useEffect(() => {
        const intervalId = setInterval(() => {
          const language = collectionLanguages[countingRef.current] 
          switch (language) {
            case "Indonesia":
              setWordGreeting("Selamat Datang")
              break
            case "English":
              setWordGreeting("Welcome")
              break
            case "Japan":
              setWordGreeting("Irasshaimase")
              break
            case "China":
              setWordGreeting("欢迎")
              break
            case "Netherlands":
              setWordGreeting("Welkom")
              break
            case "Korean":
              setWordGreeting("환영")
              setNextPage(true)
              break
            default:
              break
          }
    
          countingRef.current += 1
          if (countingRef.current === collectionLanguages.length) {
            clearInterval(intervalId)
          }
        }, 1000)
    
        return () => clearInterval(intervalId)
      }, [])
    
      useEffect(() => {
        if (nextPage) {
          setTimeout(() => {
            navigate("/main")
          }, 1000)
        }
      }, [nextPage])

    return(
        <>
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
        >
            <div className="greeting-screen">
                <h1> <div className="icon-dot">.</div> {wordGreeting} </h1>                
            </div>
        </motion.div>
        </>
    )
}