type BaseStoryFn<Props, T> = (a: Props, p: import('@storybook/addons').StoryContext) => T

export type StoryFn<Props = unknown> = BaseStoryFn<Props, import('vue').ComponentOptions<any, any, any, any, any, any>>

export type PropsStoryFn<Props = unknown> = StoryFn & {
  args?: Props
  parameters?: {
    puppeteerTest?: (page: import('puppeteer').Page) => void | Promise<void>
  }
}
