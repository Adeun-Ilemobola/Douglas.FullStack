import  { useState, useEffect } from 'react'
import Button from './Button';

export default function ThemeToggle() {
     const [themeToggle, setThemeToggle] = useState("dark");

     useEffect(() => {
          const theme = document.querySelector("[data-toggle]");
          theme?.setAttribute("data-theme", themeToggle === "dark" ? "dark" : "light")

     }, [themeToggle])

     return (
          <Button
               onClick={() => setThemeToggle(themeToggle === "dark" ? "light" : "dark")}
          >{themeToggle} </Button>
     )
}
