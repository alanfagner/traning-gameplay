import React, { useState } from 'react'
import {
  Modal,
  KeyboardAvoidingView,
  Text,
  Platform,
  View,
  ScrollView,
  Alert
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import { getYear, parse, format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import { CategorySelect } from '../../components/CategorySelect'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../Guilds'
import { GuildProps } from '../../components/Guild'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { AppointmentProps } from '../../components/Appointment'

export function AppointmentCreate() {

  const { goBack } = useNavigation();
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<GuildProps>();

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [min, setMin] = useState('')
  const [description, setDescription] = useState('')

  function handleToggleGuilds() {
    setOpenGuildsModal(prev => !prev)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect)
    handleToggleGuilds()
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  async function handleSave() {

    const date = parse(`${day}/${month}/${getYear(new Date())} ${hour}:${min}`, 'dd/MM/yyyy HH:mm', new Date(), { locale: ptBR })

    if (!category) {
      Alert.alert('Categoria invalida')
      return;
    }

    if (!guild) {
      Alert.alert('Guild invalida')
      return;
    }

    if (!isValid(date)) {
      Alert.alert('Data invalida')
      return;
    }

    const newAppointment: AppointmentProps = {
      id: uuid.v4().toString(),
      guild,
      category,
      date: date.toISOString(),
      description
    }

    const storage = await AsyncStorage.getItem('@gameplay:appointments')

    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem('@gameplay:appointments', JSON.stringify(([...appointments, newAppointment])))
    goBack()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      <Background>
        <Header title="Agendar partida" />

        <ScrollView>
          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>

          <CategorySelect setCategory={handleCategorySelect} categorySelected={category} />

          <View style={styles.form}>
            <RectButton onPress={handleToggleGuilds} >
              <View style={styles.select}>
                {guild ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather name="chevron-right" color={theme.colors.heading} size={18} />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 10 }]}>Dia e mês</Text>

                <View style={styles.column}>
                  <SmallInput onChangeText={setDay} value={day} maxLength={2} keyboardType="numeric" />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput onChangeText={setMonth} value={month} maxLength={2} keyboardType="numeric" />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 10 }]}>Hora e minuto</Text>

                <View style={styles.column}>
                  <SmallInput onChangeText={setHour} value={hour} maxLength={2} keyboardType="numeric" />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput onChangeText={setMin} value={min} maxLength={2} keyboardType="numeric" />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>
              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea onChangeText={setDescription} value={description} multiline maxLength={100} numberOfLines={5} />
          </View>

          <View style={styles.footerButton}>
            <Button onPress={handleSave} title="Agendar" />
          </View>
        </ScrollView>
      </Background>

      <ModalView onRequestClose={handleToggleGuilds} visible={openGuildsModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}