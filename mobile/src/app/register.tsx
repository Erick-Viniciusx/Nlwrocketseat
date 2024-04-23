import { View, Image, StatusBar, Alert} from "react-native";
import { Input } from "@/components/input"
import { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import axios from "axios"

import { api } from "@/server/api"
import { useBadgeStore } from "@/store/badge-store";

import { Link, router} from 'expo-router'

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"

export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const bagdeStore = useBadgeStore();

   async function handleRegister(){
       
        try {
            if(!name.trim() || !email.trim()){
                    return Alert.alert('Inscrição', "Preencha todos os campos!")
            }

            setIsLoading(true);

        
            const registerResponse =  await api.post(`/events/${EVENT_ID}/attendees`, {name, email})
            

            if(registerResponse.data.attendeeId){
                const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`);

                bagdeStore.save(badgeResponse.data.bagde);

                Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
                    {text: "Ok", onPress: () => router.push("/ticket") },
                ])
            }
            
        } catch (error){
            
            if(axios.isAxiosError(error)){
                if(String(error.response?.data.message).includes("already registered")){
                    return Alert.alert("Inscrição", "Este email já está cadastrado!")
                }
            }
            
                Alert.alert("Inscrição", "Não foi possível fazer a inscrição!")

            }finally{
                setIsLoading(false)
            }
        
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
                    <FontAwesome
                        name="user-circle"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field 
                    placeholder="Nome Completo" 
                    onChangeText={setName}
                    />
                </Input>

                <Input>
                    <MaterialIcons
                        name="alternate-email"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    onChangeText={setEmail}
                    />

                </Input>


                <Button 
                title="Realizar Inscrição" 
                onPress={handleRegister}
                isLoading={isLoading}
                />

                <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">
                    Já possui ingresso?
                </Link>
            </View>

        </View>
    )
}

