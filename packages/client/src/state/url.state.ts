import { hookstate } from '@hookstate/core'
import { localstored } from '@hookstate/localstored'
import type { UrlType } from '../../graphql/generated/server.sdk'

interface IUrlState {
  lastUrlGenerated: UrlType | null
}

export const UrlState = hookstate<IUrlState>(
  {
    lastUrlGenerated: null,
  },
  localstored({
    key: 'SniSnap-Url-State',
  })
)
