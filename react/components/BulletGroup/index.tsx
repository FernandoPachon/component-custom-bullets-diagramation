import React, { PropsWithChildren } from 'react'
import { BulletsSchema } from './BulletType'
import { useDevice } from 'vtex.device-detector'
import { getBulletsAsTSXList } from './modules/bulletsAsList'
import {useListContext,ListContextProvider} from 'vtex.list-context'
import { useCssHandles } from 'vtex.css-handles'



export interface BulletGroupProps {
  bullets: BulletsSchema
}
const BulletGroup = ({
  bullets,
  children,
}: PropsWithChildren<BulletGroupProps>) => {
  const { isMobile } = useDevice()
  const {list} = useListContext() || []

  const bulletsGroup= getBulletsAsTSXList(bullets);
  const newListContextValue = list.concat(bulletsGroup)

  const CSS_HANDLES = ['bullet_container']
  const handles = useCssHandles(CSS_HANDLES)


  return (
    <ListContextProvider list={newListContextValue}>
      {
      isMobile
      ?
        <div className={handles.bullet_container}>{bulletsGroup}</div>
       :
        children
      }
    </ListContextProvider>
  )
}

export default BulletGroup
