import "@/styles/global.css"
import { Slot } from "expo-router"


import { Loading } from "@/components/loading"

import { useFonts, Roboto_500Medium, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto"

export default function Layout(){
    const [fontsLoaded] = useFonts({
        Roboto_500Medium, 
        Roboto_400Regular, 
        Roboto_700Bold,
    })

    if (!fontsLoaded){
        return <Loading/>
    }
    return <Slot/>
}