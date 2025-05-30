declare namespace chrome {
  namespace runtime {
    interface OnMessageEvent {
      addListener(
        callback: (
          message: any,
          sender: chrome.runtime.MessageSender,
          sendResponse: (response?: any) => void
        ) => void | boolean
      ): void
    }
    const onMessage: OnMessageEvent
  }

  namespace runtime {
    interface MessageSender {
      tab?: chrome.tabs.Tab
      frameId?: number
      id?: string
      url?: string
      tlsChannelId?: string
    }
  }

  namespace tabs {
    interface Tab {
      id?: number
      url?: string
      title?: string
      active: boolean
      pinned: boolean
      windowId: number
    }
  }
} 