import type { PropOptions } from 'vue'
import type { StoryFn, PropsStoryFn, DemoContext } from './type'

export { DemoContext }
export function PropsStoryFnFactory<Args = unknown>(propsStoryFn: PropsStoryFn<Args>): PropsStoryFn<Args>
export function PropsStoryFnFactory<Args = unknown>(propsStoryFn: PropsStoryFn<Args>, fakeProps: Args): StoryFn<Args>
export function PropsStoryFnFactory<Args = unknown>(
  propsStoryFn: PropsStoryFn<Args>,
  fakeProps?: Args,
): PropsStoryFn<Args> | StoryFn<Args> {
  const storyFn: StoryFn<Args> = (props, context) => {
    const componentOptions = propsStoryFn(props, context)
    if ('props' in componentOptions) {
      if (Array.isArray(componentOptions.props)) {
        return {
          ...componentOptions,
          props: [...Object.keys(context.argTypes), ...componentOptions.props],
        }
      } else {
        return {
          ...componentOptions,
          props: {
            ...Object.keys(context.argTypes).reduce(
              (sum, propName) => ({
                ...sum,
                [propName]: {
                  default: context.argTypes[propName].defaultValue,
                },
              }),
              {} as Record<string, PropOptions>,
            ),
            ...componentOptions.props,
          },
        }
      }
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
