import type { Component, ReactNode } from 'react'
//https://github.com/iamhosseindhv/notistack/issues/485#issuecomment-1704823508
declare module 'notistack' {
  export interface SnackbarProvider extends Component<SnackbarProviderProps> {
    render(): ReactNode
  }
}
