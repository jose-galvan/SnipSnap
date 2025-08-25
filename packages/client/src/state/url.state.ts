import { hookstate } from '@hookstate/core'
import type { UrlType } from '@generated/server.sdk'

interface IUrlState {
  lastUrlGenerated: Partial<UrlType> | null
}

export const UrlState = hookstate<IUrlState>({
  lastUrlGenerated: null,
})

export const clearUrlState = () => {
  UrlState.merge({
    lastUrlGenerated: null,
  })
}
