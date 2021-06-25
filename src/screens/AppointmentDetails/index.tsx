import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, FlatList, View, Share } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { ListHeader } from '../../components/ListHeader'
import BannerIMG from '../../assets/banner.png'
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import { Member, MemberProps } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { AppointmentProps } from '../../components/Appointment'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import { Alert } from 'react-native'
import { Platform } from 'react-native'

type Params = {
  appointment: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {

  const route = useRoute()
  const [loading, setLoading] = useState(true)
  const [widget, setWidget] = useState<GuildWidget>()

  const { appointment } = route.params as Params

  async function fetchGuildInfo() {
    try {
      const response = await api.get(`/guilds/${appointment.guild.id}/widget.json`)

      setWidget(response.data)

    } catch (error) {
      Alert.alert('Erro ao buscar')
    }

    setLoading(false)
  }

  async function handleShareInvite() {
    const message = Platform.OS === 'ios' ? `Junte-se a ${appointment.guild.name}` : widget?.instant_invite

    Share.share({ message, url: widget?.instant_invite || '' })
  }

  async function handleOpenGuild() {
    Linking.openURL(widget?.instant_invite || '')
  }

  useEffect(() => {
    fetchGuildInfo()
  }, [])

  return (
    <Background>
      <Header title="Detalhes"
        action={appointment.guild.owner &&
          <BorderlessButton onPress={handleShareInvite} >
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>}
      />

      <ImageBackground style={styles.banner} source={BannerIMG} >
        <Text style={styles.title}>{appointment.guild.name}</Text>
        <Text style={styles.subTitle}>{appointment.description || ''}</Text>
      </ImageBackground>

      <ListHeader title="Jogadores" subTitle={`Total: ${widget?.presence_count || '0'}`} />
      {
        loading ?
          <Loading />
          :
          <FlatList
            style={styles.members}
            data={widget?.members || []}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider />} />
      }

      {appointment.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida" />
        </View>
      }
    </Background>
  )
}