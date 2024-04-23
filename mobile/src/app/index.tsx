import { View, Image, StatusBar, Alert} from "react-native";
import { Input } from "@/components/input";
import {useState} from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { api} from "@/server/api"
import { useBadgeStore } from "@/store/badge-store"

import { colors } from "@/styles/colors";

import { Button } from "@/components/button";
import { Link } from "expo-router/build/link/Link";

import { Redirect, router } from "expo-router";


export default function Home(){
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const badgeStore = useBadgeStore()

    async function handleAcessCrendential(){
        
        try {
            if(!code.trim()){
                return Alert.alert("Ingresso", "Informe o código do ingresso!");
            }

           setIsLoading(true)

           console.log(code)
           const { data } = await api.get(`/attendees/${code}/badge`);
           badgeStore.save(data.badge);
           console.log(data.bagde);


        }catch (error){
            console.log(error)
            setIsLoading(false)

            Alert.alert("Ingresso", "Ingresso não encontrado!")
        }
    }
    
    if(badgeStore.data?.checkInUrl){
        return <Redirect href={"/ticket"}/>
        
    }

    return (
        <View className="flex-1 justify-center items-center bg-green-500 p-8">
            <StatusBar barStyle="light-content"/>

            <Image
                source={require("@/assets/logo.png")}
                className="h-20" 
                resizeMode="contain"   
            />

            <View className="v-full mt-12 gap-3">

                <Input>
                    <MaterialCommunityIcons
                        name="ticket-confirmation-outline"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field 
                    placeholder="Código do Ingresso" 
                    onChangeText={setCode}/>
                </Input>

                <Button title="Fazer Login" onPress={handleAcessCrendential}  isLoading={isLoading}/>
                
                <Link href="/register" className="text-gray-100 text-base font-bold text-center mt-8">
                    Ainda não possui ingresso?
                </Link>
            </View>

        </View>
    )
}

