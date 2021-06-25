import React from 'react'
import { ScrollView } from 'react-native'
import { categories } from '../../utils/categories'
import { Category } from '../Category'
import { styles } from './styles'

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
}

export function CategorySelect({ setCategory, categorySelected }: Props) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
      {
        categories.map((category) =>
          <Category
            onPress={() => setCategory(category.id)}
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected} />)
      }
    </ScrollView>
  );
}