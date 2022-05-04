import MyComponent from '../../../../slices/AngleSlice';

export default {
  title: 'slices/AngleSlice'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"angle_slice","items":[],"primary":{},"id":"_Default"}} />
_Default.storyName = 'Default'

export const _Inverted = () => <MyComponent slice={{"variation":"inverted","name":"Inverted","slice_type":"angle_slice","items":[],"primary":{},"id":"_Inverted"}} />
_Inverted.storyName = 'Inverted'
