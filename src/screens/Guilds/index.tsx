import React from 'react'
import { useState } from 'react';
import { FlatList, View } from 'react-native'

import { Loading } from '../../components/Loading'
import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles';
import { api } from '../../services/api';
import { useEffect } from 'react';

type Props = {
  handleGuildSelect: (guildSelect: GuildProps) => void
}

export function Guilds({ handleGuildSelect }: Props) {

  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchGuild() {
    setLoading(true)
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGuild()
  }, [])

  return (
    <View style={styles.container}>
      {loading ? < Loading /> :
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 69 }}
          style={styles.guilds}
          ItemSeparatorComponent={() => <ListDivider />}
          ListHeaderComponent={() => <ListDivider />}
          data={guilds}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <Guild onPress={() => handleGuildSelect(item)} data={item} />} />
      }
    </View>
  )
}
