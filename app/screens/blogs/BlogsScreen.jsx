import { View, Text } from 'react-native'
import React from 'react'

import MarkFormat from 'components/mark_format/MarkFormat';

import { styles } from './BlogsScreenStyles'

import { full_2, full_3 } from 'libs/mark-format/src/assets/data';
import { ScrollView } from 'react-native-gesture-handler';

const text = full_3
const text2 = `
# Day la title

## Day __la de__ muc 1
Day la ==noi __dung **cua** de__ muc== 1

## Day la de muc 2
Day la noi dung cua de muc 2. Noi chung la hoat dong kha la on roi, gio thi thu xem ol list co hoat dong hay khong?
Day la mot danh sach OL
1. Day la danh sach 1
1. Day la danh sach 2
- Con day la danh sach khong duoc sap xep 1
- Con day la danh sach khong duoc sap xep 2
- Con day la danh sach khong duoc sap xep 3
1. Day la danh sach 3
1. Day la danh sach 4

![Anh ngoi nha ben bo song](https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990__340.jpg)

## Day la de muc 3
Day __**la noi dung cua de**__ muc 3
Day la mot danh sach
- Item 1
- Item 2
- Item 3
- Item 4
- Item 5

## Day la de muc 4
Day la noi dung cua de muc 4

Lien he: [Nguyen Anh Tuan](https://facebook.com)
`
const hs = `# Day la tieu de
## Day la de muc 1
### Day la de muc 2
#### Day la de muc 3
##### Day la de muc 4
###### Day la de muc 5

Con day la mot doan van ban thuong, khong co gi thay doi ca.

#~ Day la phu de 1
##~ Day la phu de 2`;

const BlogsScreen = () => {
  return (
    <ScrollView>
      <MarkFormat text={text} />
    </ScrollView>
  )
}

export default BlogsScreen