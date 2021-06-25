import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { compareAsc, parseISO } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Appointment, AppointmentProps } from '../../components/Appointment'
import { Background } from '../../components/Background'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader'
import { Profile } from '../../components/Profile'
import { styles } from './styles';
import { Loading } from '../../components/Loading'

export function Home() {

  const navigation = useNavigation()
  const [category, setCategory] = useState('')
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails(appointment: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { appointment })
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem('@gameplay:appointments')
    const storageAppointments: AppointmentProps[] = storage ? JSON.parse(storage) : []

    if (category) {
      setAppointments(storageAppointments.filter(item => item.category === category).sort((item, item2) => compareAsc(parseISO(item.date), parseISO(item2.date))))
    } else {
      setAppointments(storageAppointments.sort((item, item2) => compareAsc(parseISO(item.date), parseISO(item2.date))))
    }

    setLoading(false)
  }


  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))


  return (
    <Background>

      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        setCategory={handleCategorySelect}
        categorySelected={category} />

      <ListHeader title="Partidas Agendas" subTitle={`Total: ${appointments.length}`} />
      {loading ? <Loading /> :
        <FlatList
          ItemSeparatorComponent={() => <ListDivider />}
          ListHeaderComponent={() => <ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
          style={styles.matches}
          data={appointments}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) =>
            <Appointment
              onPress={() => handleAppointmentDetails(item)}
              data={item} />} />
      }

    </Background>
  )
}
