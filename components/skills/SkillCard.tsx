import Image from "next/image"
import { useEffect, useState } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { skill } from "@/types/main";
import { useTheme } from "next-themes";
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTD,
};





const Skill = ({ name, image }: skill) => {
useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    logEvent(analytics, 'page_view', {
    page_title: 'Skill',
  });
     
    // Now you have the analytics instance, you can use it in the component
  }, []); // Empty dependency array ensures the effect runs only once


    const { theme } = useTheme();
    const [bgColor, setBgColor] = useState("")
    useEffect(() => {
        new FastAverageColor().getColorAsync(image)
            .then(color => {
                const rgba = color.rgb.split(')')
                setBgColor(rgba[0] + ',0.07)')
            })
            .catch(e => {
                console.log(e);
            })
    }, [image])

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div title={name} style={{ backgroundColor: bgColor }}
                className={"h-20 w-20 md:h-24 md:w-24 rounded-full bg-gray-100 dark:bg-grey-800 flex items-center justify-center"}>
                <Image alt="skill" width={100} height={100} className={`h-12 w-12 md:h-14 md:w-14 object-contain ${theme === 'dark' && (name === "GitHub" || name === "Vercel" || name === "NextJS" || name === "ExpressJS" ? 'invert' : 'invert-0')}`} src={image} />
            </div>
            <p className="text-sm md:text-base">{name}</p>
        </div>
    )
}

export default Skill