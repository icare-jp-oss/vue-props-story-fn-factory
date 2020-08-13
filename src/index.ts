import { StoryFn, PropsStoryFn } from './type'

export function PropsStoryFnFactory<Args = unknown>(propsStoryFn: PropsStoryFn<Args>): PropsStoryFn<Args>
export function PropsStoryFnFactory<Args = unknown>(propsStoryFn: PropsStoryFn<Args>, fakeProps: Args): StoryFn<Args>
export function PropsStoryFnFactory<Args = unknown>(
  propsStoryFn: PropsStoryFn<Args>,
  fakeProps?: Args,
): PropsStoryFn<Args> | StoryFn<Args> {
  const storyFn: StoryFn<Args> = (props, context) => {
    const componentOptions = propsStoryFn(props, context)
    if ('props' in componentOptions) {
      return componentOptions
    }
    return {
      ...componentOptions,
      props: Object.keys(context.argTypes),
    }
  }

  return Object.assign(storyFn, {
    args: fakeProps,
  })
}
